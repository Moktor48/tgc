import React from "react";
import StaffDutyForm from "~/app/_components/(adminComponents)/StaffDutyForm";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function page() {
  const session = await getServerAuthSession();
  if (!session) return <p>Log in!</p>;
  const admin = await api.get.staffPermission.query({
    userId: session.user.id,
  });
  if (!admin?.admin)
    return <span className="bg-black text-red-500">UNAUTHORIZED</span>;
  return (
    <div>
      <StaffDutyForm />
    </div>
  );
}
