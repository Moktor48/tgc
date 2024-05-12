"use client";
import React from "react";
interface DisplayPointsByUserProps {
  join: Record<string, Record<string, number>>;
}
export const DisplayJoinsByUser: React.FC<DisplayPointsByUserProps> = ({
  join,
}) => {
  return (
    <div className="newscolor w-1/2">
      <h1 className="text-center underline">Members that Joined/Left</h1>
      {Object.entries(join).map(([user, tasks]) => (
        <div className="p-6" key={user}>
          <h1 className="underline">{user}</h1>
          {Object.entries(tasks).map(([task, points]) => (
            <p key={task}>
              {task}: {points}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};
