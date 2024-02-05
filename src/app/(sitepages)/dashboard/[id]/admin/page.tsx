import React from "react";
import UserBuilder from "~/app/_components/(adminComponents)/UserBuilder";
import UserPull from "~/app/_components/UserPull";
import UserSearch from "~/app/_components/(adminComponents)/UserSearch";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import NavBarDB from "~/app/_components/(gameComponents)/(dashboard)/NavBarDB";

export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  if (!session) return <div>You must be logged in to view this page.</div>;
  const id = params.id;
  const perm = await api.get.staffPermission.query({
    userId: id,
  });
  if (!perm?.admin) return <p>You aren't allowed to be here!</p>;

  return (
    <div>
      <NavBarDB session={session} id={id} perm={perm} />
      <p>
        If I did this right, you are {session.user.name}, are set as{" "}
        {session.user.role}, and have access as {perm.admin && "Administrator"}
      </p>
      <UserPull />
      <UserSearch />
      <UserBuilder />
    </div>
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
