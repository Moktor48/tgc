"use client";
import React from "react";

import { useSession } from "next-auth/react";

export default function UserManage({ params }: { params: { id: string } }) {
  const session = useSession();

  if (!session) return <div>You must be logged in to view this page.</div>;

  return <div></div>;
}
