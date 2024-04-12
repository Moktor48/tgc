"use server";
import { api } from "~/trpc/server";
import type { Profile } from "~/app/_components/types";

export async function UserQuery(userId: string): Promise<Profile | null> {
  const user = await api.get.fullProfile.query({ userId });
  console.log(user);
  if (user === null) {
    return null;
  }
  return user;
}
