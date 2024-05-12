"use client";
import React from "react";
interface DisplayPointsByUserProps {
  point: Record<string, Record<string, number>>;
}
export const DisplayPointsByUser: React.FC<DisplayPointsByUserProps> = ({
  point,
}) => {
  return (
    <div className="newscolor w-1/2">
      <h1 className="text-center underline">Points Earned by User</h1>
      {Object.entries(point).map(([user, tasks]) => (
        <div className="p-6" key={String(user)}>
          <h1 className="underline">{String(user)}</h1>
          {Object.entries(tasks).map(([task, points]) => (
            <p key={String(task)}>
              {String(task)}: {String(points)}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};
