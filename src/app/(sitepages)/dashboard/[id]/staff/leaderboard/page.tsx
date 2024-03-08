import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import PieChart from "~/app/_components/(adminComponents)/PieChart";
type DatasetType = { task: string; points: number }[];
type PointObject = {
  user_name: string;
  points: number;
};

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
  console.log(points);

  const userPoints = points.map((data) => {
    return {
      user_id: data.gmember_id.toString(),
      user_name: data.discord_user.disc_nickname,
      points: data.staff_point_chart.point_value,
    };
  });
  // Parses data to compare tasks
  const pointArray = points.map((data) => {
    return {
      points: data.staff_point_chart.point_value,
      task: data.staff_point_chart.task_description,
    };
  });

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

  const taskPointsWithOther = Object.entries(taskPoints).reduce<
    Record<string, number>
  >((acc, [task, points]) => {
    if (points < 2600) {
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
  console.log(taskPointsWithOther);
  const dataset: DatasetType = Object.entries(taskPointsWithOther).map(
    ([task, points]) => ({
      task,
      points,
    }),
  );
  console.log(dataset);

  // Parses data to compare user activity
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

  type UserPoints = { user_name: string; points: number };

  const objPointsArray: UserPoints[] = Object.entries(objPoints).map(
    ([user_name, points]) => ({
      user_name,
      points: Number(points),
    }),
  );

  const sortedObjPointsArray = objPointsArray.sort(
    (a, b) => b.points - a.points,
  );
  console.log(sortedObjPointsArray);

  return (
    <div>
      <h1>Points-Processing</h1>
      <p>
        This query is searching between {startDate} and {endDate}
      </p>
      <div>
        <table>
          <tr>
            <th>Name</th>
            <th>Points</th>
          </tr>
          {sortedObjPointsArray.map((data) => {
            return (
              <tr>
                <td>{data.user_name}</td>
                <td>{data.points}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <PieChart dataset={dataset} />
    </div>
  );
}

/*
Next, truncate and page

const itemsPerPage = 20;
const [currentPage, setCurrentPage] = useState(1);

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;

const currentPageData = sortedObjPointsArray.slice(startIndex, endIndex);

return (
  <div>
    <h1>Points-Processing</h1>
    <p>
      This query is searching between {startDate} and {endDate}
    </p>
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Points</th>
        </tr>
        {currentPageData.map(({ user_name, points }) => (
          <tr key={user_name}>
            <td>{user_name}</td>
            <td>{points}</td>
          </tr>
        ))}
      </table>
    </div>
    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
      Previous
    </button>
    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * itemsPerPage >= sortedObjPointsArray.length}>
      Next
    </button>
    <PieChart dataset={dataset} />
  </div>
);
*/
