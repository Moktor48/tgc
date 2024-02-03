"use client";
import React from "react";
import { api } from "~/trpc/react";
import { useSearchParams } from "next/navigation";

export default function UserManage() {
  const [searchParams] = useSearchParams();
  return <div></div>;
}
