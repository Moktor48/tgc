import Link from "next/link";
import React from "react";
import { api } from "~/trpc/server";
export default async function page({ params }: { params: { id: string } }) {
  const id = params.id;
  const bugs = await api.get.getBugs.query();
  return (
    <div>
      {bugs.map((bug) => (
        <Link href={`/dashboard/${id}/staff/bug/display/${bug.id}`}>
          <div className="card card-bordered w-96 border-red-900 bg-base-100 shadow-xl">
            <p className="p-1" key={bug.id}>
              {bug.title}
            </p>
            <p className="p-1">Submitted by {bug.createdBy.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
