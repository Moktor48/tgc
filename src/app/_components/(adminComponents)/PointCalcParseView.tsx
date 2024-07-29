import React from "react";

export default function PointCalcParseView({
  points,
  botPoints,
  nonInvitePoints,
  invitePoints,
  kickPoints,
  joinLeave,
  userTasks,
  raw,
  excluded,
}) {
  const ptLth = points.length as number;
  const lastEntry = ptLth - 1;
  // Initialize the total sum
  let totalSum = 0;

  // Iterate through the outer object
  for (const user in userTasks) {
    if (userTasks.hasOwnProperty(user)) {
      // Iterate through the inner object
      for (const task in userTasks[user]) {
        if (userTasks[user].hasOwnProperty(task)) {
          // Sum up the values of the inner object
          totalSum += userTasks[user][task];
        }
      }
    }
  }
  return (
    <div className="bg-black">
      <h1>All the freaking data</h1>
      <p>Number of entries: {points.length.toString()}</p>
      <p>Entries left after removing bots: {botPoints.length.toString()}</p>
      <p>Entries after removing joined/left: {joinLeave.length.toString()}</p>
      <p>Number of non-invite entries: {nonInvitePoints.length.toString()}</p>
      <p>Number of invite entries: {invitePoints.length.toString()}</p>
      <p>Number of kick entries: {kickPoints.length.toString()}</p>
      <p>RAW count: {raw.length.toString()}</p>
      <p>Excluded Count: {excluded.length.toString()}</p>
      <p>
        Number of expected tasks based on the above:{" "}
        {(nonInvitePoints.length + invitePoints.length).toString()}
      </p>
      <p>Aggregate number of tasks counted for users: {totalSum.toString()}</p>
      <p>
        First entry taken: {points[0].gmember_id.toString()}:
        {points[0].discord_user.disc_nickname}, {points[0].timestamp.toString()}{" "}
        -{points[0].duty_type.toString()}
      </p>
      <p>
        Last entry taken:
        {points[lastEntry].gmember_id.toString()}:
        {points[lastEntry].discord_user.disc_nickname}{" "}
        {points[lastEntry].timestamp.toString()} -
        {points[lastEntry].duty_type.toString()}
      </p>
    </div>
  );
}
/*
First and last data record retrieved
Date range of query
Full dump total

 */
