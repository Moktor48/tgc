//This form is a server-side component that does initial db queries to prep information for the child component, PostSelect.
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import PostSelect from "./PostSelect";

interface Props {
  userId: string;
}

export default async function PostForm({ userId }: Props) {
  const session = await getServerAuthSession();
  const STAFF = await api.get.staffPermission.query({ userId });
  const ESO = await api.get.esoPermission.query({ userId });
  const FFXIV = await api.get.ffxivPermission.query({ userId });
  const SWTOR = await api.get.swtorPermission.query({ userId });
  if (!session) return <p>Log in!!!!</p>;

  return (
    <div>
      <PostSelect
        staff={STAFF}
        eso={ESO}
        ffxiv={FFXIV}
        swtor={SWTOR}
        id={userId}
      />
    </div>
  );
}
/*
Make this a mass query somewhere, reduce this shit
*/
