import React from "react";
import UserSearch from "~/app/_components/(adminComponents)/UserSearch";
import { getServerAuthSession } from "~/server/auth";

export default async function page() {
  const session = await getServerAuthSession();
  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  } else if (session.user.role !== "staff") return "forbidden";
  const id = session.user.id;
  return (
    <div>
      <UserSearch id={id} />
    </div>
  );
}
