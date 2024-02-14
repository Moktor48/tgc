import React from "react";
import UserPull from "~/app/_components/(adminComponents)/UserPull";
import UserSearch from "~/app/_components/(adminComponents)/UserSearch";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  if (!session) return <div>You must be logged in to view this page.</div>;
  const id = params.id;
  const perm = await api.get.staffPermission.query({
    userId: id,
  });
  if (!perm?.admin) return <p>You aren't allowed to be here!</p>;

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="newsletter flex w-1/2 justify-center">
          <p className="w-full bg-black text-center">
            If I did this right, you are {session.user.name}, are set as{" "}
            {session.user.role}, and have access as{" "}
            {perm.admin && "Administrator"}
          </p>
          <UserPull />
          <UserSearch />
        </div>
      </div>
    </>
  );
}

/*
Components for Admin:
- User Search, pulls all records of users
- Post Query, pulls all posts and their permissions
Linking to post form is fine

Activation button for new members
edit user/post forms
List guest accounts, on approval it will:
1. Upgrade role to member
2. Add to all three games as rank: "none"
3.  
*/
