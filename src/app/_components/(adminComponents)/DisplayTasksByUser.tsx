"use client";
import React from "react";
interface DisplayPointsByUserProps {
  task: Record<string, Record<string, number>>;
}
export const DisplayTasksByUser: React.FC<DisplayPointsByUserProps> = ({
  task,
}) => {
  return (
    <div className="newscolor w-1/2">
      <h1 className="text-center underline">Tasks Completed by User</h1>
      {Object.entries(task).map(([user, tasks]) => (
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
