import React from "react";
import { api } from "~/trpc/server";
import LBClientWrap from "./LBClientWrap";
import LBDisplayWrap from "./LBDisplayWrap";
type DataType = Record<string, string | number | null>;

export default async function PointCalc({
  startD,
  endD,
}: {
  startD: string;
  endD: string;
}) {
  const start = new Date(startD);
  const end = new Date(endD);

  // This query pulls all data from staff_duty given two dates
  const points = await api.get.dutyQuery.query({ start, end });

  // Raw data HERE [{}{}{}] This is the primary source of data, name/task/points
  const userPoints = points.map((data) => {
    return {
      user_id: data.gmember_id,
      user_name: data.discord_user.disc_nickname,
      points: data.staff_point_chart.point_value,
      task: data.staff_point_chart.task_description,
      rank: data.discord_user.highest_rank_role,
    };
  });

  //---------------------------------------Task Count per User---------------------------------------
  // Counting tasks per user
  const filteredUsers: Record<string, Record<string, number>> = {};

  const userTasks = userPoints.reduce<Record<string, Record<string, number>>>(
    (acc, point) => {
      if (
        point.user_name &&
        point.task &&
        point.task !== "Left the Guild" &&
        point.task !== "Joined the Guild"
      ) {
        if (!acc[point.user_name]) {
          acc[point.user_name] = {};
        }
        if (!acc[point.user_name]![point.task]) {
          acc[point.user_name]![point.task] = 1;
        } else {
          acc[point.user_name]![point.task] += 1;
        }
      } else if (
        point.user_name &&
        (point.task === "Left the Guild" || point.task === "Joined the Guild")
      ) {
        if (!filteredUsers[point.user_name]) {
          filteredUsers[point.user_name] = {};
        }
        if (!filteredUsers[point.user_name]![point.task]) {
          filteredUsers[point.user_name]![point.task] = 1;
        } else {
          filteredUsers[point.user_name]![point.task] += 1;
        }
      }
      return acc;
    },
    {},
  );

  //----------------------------------------POINTS per TASK----------------------------------------
  // Push all data into an array, this is for the overall guild stats (tracking tasks of ALL)
  const pointArray = points.map((data) => {
    return {
      points: data.staff_point_chart.point_value,
      task: data.staff_point_chart.task_description,
    };
  });

  // Combines all points earned to parse task points combined (reduces all points by task)
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
  //-------------------------------------USER POINTS, GENERAL-------------------------------------
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

  // Sorts by user, how many points each user earned <--- Add rank into a new name/rank array!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const rankedList = objPointsArray.sort((a, b) => {
    const aPoints = typeof a.points === "number" ? a.points : 0;
    const bPoints = typeof b.points === "number" ? b.points : 0;
    return bPoints - aPoints;
  });

  //------------------------USER POINTS, Individual-------------------------------------
  const pointArrayIndividual = points.map((data) => {
    return {
      user_name: data.discord_user.disc_nickname,
      points: data.staff_point_chart.point_value,
      task: data.staff_point_chart.task_description,
    };
  });

  const taskPointsIndividual = pointArrayIndividual.reduce<
    Record<string, Record<string, number>>
  >((acc, point) => {
    if (point.task && point.points && point.user_name) {
      if (!acc[point.user_name]) {
        acc[point.user_name] = {};
      }
      if (acc[point.user_name]![point.task]) {
        acc[point.user_name]![point.task] += point.points;
      } else {
        acc[point.user_name]![point.task] = point.points;
      }
    }
    return acc;
  }, {});
  return (
    <div>
      <h1 className="newscolor text-center">Leaderboard</h1>
      <div className="">
        <LBClientWrap
          rankedList={rankedList}
          chartData={pointsPerTask}
          rawData={userPoints}
        />
      </div>
      <div className="">
        <LBDisplayWrap
          point={taskPointsIndividual}
          task={userTasks}
          join={filteredUsers}
        />
      </div>
    </div>
  );
}