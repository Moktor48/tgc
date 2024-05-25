import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import LBClientWrap from "./LBClientWrap";
import LBDisplayWrap from "./LBDisplayWrap";
type DataType = Record<string, string | number | null>;
export default async function WeekLeader(params: { id: string }) {
  const session = await getServerAuthSession();
  if (!session) return <p className="text-yellow-500">You need to log in</p>;
  const id = params.id;
  if (!id) return <p className="text-red-500">Invalid ID</p>;
  const admin = await api.get.staffPermission.query({ userId: id });
  if (!admin) return <p className="text-red-500">Invalid Permissions</p>;

  const today = new Date();
  const day = today.getDay();
  const diff = day >= 6 ? day - 6 : 5 + (7 - day); // calculate the difference to the last Friday
  today.setDate(today.getDate() - diff); // subtract the difference from today's date
  const end = today;
  const start = new Date(end);
  start.setDate(end.getDate() - 7);
  start.setUTCHours(4, 0, 0, 0); // Set the time to 04:00:00.000Z
  end.setUTCHours(3, 59, 59, 999); // Set the time to 03:59:59.999Z

  // This query pulls all data from staff_duty given two dates
  const points = await api.get.dutyQuery.query({ start, end });

  // Raw data HERE [{}{}{}] This is the primary source of data, name/task/points
  const userPoints = points.map((data) => {
    return {
      user_id: data.gmember_id,
      user_name: data.discord_user.disc_nickname,
      points: data.staff_point_chart.point_value,
      task: data.staff_point_chart.task_description,
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
  console.log("User Task Count:", userTasks);
  console.log("Filtered Users:", filteredUsers);

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

  // Sorts by user, how many points each user earned
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
    <div className="flex justify-center text-white">
      <div className="newsletter w-2/3">
        <p className="newscolor text-center">
          This query is searching between {start.toISOString()} and{" "}
          {end.toISOString()}
        </p>
        <LBClientWrap
          rankedList={rankedList}
          chartData={pointsPerTask}
          rawData={userPoints}
        />

        <LBDisplayWrap
          point={taskPointsIndividual}
          task={userTasks}
          join={filteredUsers}
        />

        <p>This component will generate the final leaderboard for each week.</p>

        <pre>
          {`Guild Specialist:
   Expected: 500 <= x
   Promotable: Avg. 750 <= x
   Poor Performance: x < 350
   Auto-Probation: x < 180
Junior Guild Officer:
   Expected: 700 <= x
   Promotable: Avg. 1000 <= x
   Poor Performance: x < 600
   Auto-Probation: x < 350
Guild Officer:
   Expected: 750 <= x
   Poor Performance: x < 600
   Auto-Probation: x < 400
Senior Officer:
   Expected: 1000 <= x
   Poor Performance: x < 750
   Auto-Probation: x < 500

Performance evaluated once monthly. 
Staff consistently in "Poor Performance" averages are considered for demotion one step down.
Staff with "Promotable" averages are considered for promotion one step up. 
GO+ promotions are based on more than points.`}
        </pre>
      </div>
    </div>
  );
}

/*
Determine time/date/day of week right now. 
Count days back to the last Friday
Set the end date to that Friday, 0400 UTC
Set the start date to the Friday before that, 0400 UTC
All other code should be ready to draw that information 
*/
