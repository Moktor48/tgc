"use client";
import React from "react";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";

export default function UserManage({ params }: { params: { id: string } }) {
  const session = useSession();
  const id = params.id;
  if (!session) return <div>You must be logged in to view this page.</div>;

  return <div></div>;
}
