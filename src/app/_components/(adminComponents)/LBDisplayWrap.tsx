"use client";
import React, { useState } from "react";
import { DisplayPointsByUser } from "./DisplayPointsByUser";
import { DisplayTasksByUser } from "./DisplayTasksByUser";
import { DisplayJoinsByUser } from "./DisplayJoinsByUser";

export default function LBDisplayWrap({
  join,
  point,
  task,
}: {
  join: Record<string, Record<string, number>>;
  point: Record<string, Record<string, number>>;
  task: Record<string, Record<string, number>>;
}) {
  const [lbDisplay, setLbDisplay] = useState<string | null>(null);

  return (
    <div>
      <div className="flex justify-center">
        <button className="button-40" onClick={() => setLbDisplay("points")}>
          Points by User
        </button>
        <button className="button-40" onClick={() => setLbDisplay("tasks")}>
          Tasks by User
        </button>
        <button className="button-40" onClick={() => setLbDisplay("join")}>
          Join/Leave List
        </button>
      </div>
      <div className="flex w-full justify-center">
        {lbDisplay === "points" && <DisplayPointsByUser point={point} />}
        {lbDisplay === "tasks" && <DisplayTasksByUser task={task} />}
        {lbDisplay === "join" && <DisplayJoinsByUser join={join} />}
      </div>
    </div>
  );
}
