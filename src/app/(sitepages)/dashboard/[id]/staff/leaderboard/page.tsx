//This page is a general query for a date range

import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import LBClientWrap from "~/app/_components/(adminComponents)/LBClientWrap";

type DataType = Record<string, string | number | null>;
export default async function page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { start: string; end: string };
}) {
  const session = await getServerAuthSession();
  if (!session) return <p>You need to log in</p>;
  const id = params.id;
  if (!id) return <p>Invalid ID</p>;

  const startDate = searchParams.start;
  const endDate = searchParams.end;

  // This query pulls all data from staff_duty given two dates
  const points = await api.get.dutyQuery.query({ startDate, endDate });

  // Raw data HERE [{}{}{}]
  const userPoints = points.map((data) => {
    return {
      user_id: data.gmember_id,
      user_name: data.discord_user.disc_nickname,
      points: data.staff_point_chart.point_value,
      task: data.staff_point_chart.task_description,
    };
  });

  // Push all data into an array
  const pointArray = points.map((data) => {
    return {
      points: data.staff_point_chart.point_value,
      task: data.staff_point_chart.task_description,
    };
  });

  // Combines all points earned to parse task points combined
  const taskPoints = pointArray.reduce<Record<string, number>>((acc, point) => {
    if (point.task && point.points) {
      if (acc[point.task]) {
        acc[point.task] += point.points;
      } else {
        acc[point.task] = point.points;
      }
    }
    return acc;
  }, {});
  // If points are less than 100, combine them into an "other" category
  const taskPointsWithOther = Object.entries(taskPoints).reduce<
    Record<string, number>
  >((acc, [task, points]) => {
    if (points < 100) {
      if (acc.other) {
        acc.other += points;
      } else {
        acc.other = points;
      }
    } else {
      acc[task] = points;
    }
    return acc;
  }, {});

  // Sorts by task, how many points were earned for each task into data to be read by initial CHART
  const pointsPerTask: DataType[] = Object.entries(taskPointsWithOther).map(
    ([task, points]) => ({
      task,
      points,
    }),
  );

  // Combining all points earned by user
  const objPoints = userPoints.reduce((acc: Record<string, number>, point) => {
    if (point.points) {
      if (acc[point.user_name]) {
        acc[point.user_name] += point.points;
      } else {
        acc[point.user_name] = point.points;
      }
    }
    return acc;
  }, {});
  // pushing objPoints into a clean and sorted array highest to lowest (User - Points leaderboard LIST)
  const objPointsArray: DataType[] = Object.entries(objPoints).map(
    ([user_name, points]) => ({
      user_name,
      points: Number(points),
    }),
  );

  // Sorts by user, how many points each user earned
  const rankedList = objPointsArray.sort((a, b) => {
    const aPoints = typeof a.points === "number" ? a.points : 0;
    const bPoints = typeof b.points === "number" ? b.points : 0;
    return bPoints - aPoints;
  });

  return (
    <div>
      <p className="newscolor text-center">
        This query is searching between {startDate} and {endDate}
      </p>
      <LBClientWrap
        rankedList={rankedList}
        chartData={pointsPerTask}
        rawData={userPoints}
      />
    </div>
  );
}
