import React from "react";
import StaffDutyForm from "~/app/_components/(adminComponents)/StaffDutyForm";

import { getServerAuthSession } from "~/server/auth";

export default async function page() {
  const session = await getServerAuthSession();
  if (!session) return <p>Log in!</p>;
  /* const duty = await api.post.staffDuty.mutate({
    guildmember_id,
    duty_type,
    timestamp,
    eso_target_user,
  }); */
  return (
    <div>
      <StaffDutyForm />
    </div>
  );
}
