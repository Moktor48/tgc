import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

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
  const points = await api.get.pointQuery.query({ startDate, endDate });
  console.log(points);
  type PointObject = { GID: bigint; total: number };

  // This piece of code will iterate through the points array and create a new array of objects with the GID and the total points by adding all points together for each GID
  const objPoints = points.reduce((acc: PointObject[], point) => {
    if (
      !point ??
      !point.gmember_id ??
      !point.staff_point_chart ??
      point.staff_point_chart.point_value === undefined
    )
      return acc;
    // Find the index of the object with the same GID
    const index = acc.findIndex((obj) => obj.GID === point?.gmember_id);

    if (index !== -1 && point?.staff_point_chart?.point_value !== undefined) {
      // If the GID is found, push the point_value to the values array
      acc[index]!.total += point.staff_point_chart.point_value;
    } else if (
      point?.gmember_id !== undefined &&
      point?.staff_point_chart?.point_value !== undefined
    ) {
      // If the GID is not found, create a new object and push it to the array
      acc.push({
        GID: point.gmember_id,
        total: point.staff_point_chart.point_value,
      });
    }

    return acc;
  }, []);
  console.log("OBJPOINTS:", objPoints);

  const keys = [] as bigint[];
  objPoints.map((obj) => {
    keys.push(obj.GID);
  });

  const nameTable = await api.get.nameQuery.query({ keys });
  console.log("nameTable:", nameTable);
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
          {objPoints.map((obj) => {
            return (
              <tr key={obj.GID}>
                <td>
                  {
                    nameTable.find((name) => name.gmember_id === obj.GID)
                      ?.disc_nickname
                  }
                </td>
                <td>{obj.total}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
