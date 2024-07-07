//This is the home page, think of this as the index.html/php/etc
import FrontContent from "./_components/(core)/FrontContent";
import WarningBanner from "./_components/(core)/WarningBanner";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import GuildCheck from "./_components/(core)/GuildCheck";

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session) return <div className="text-red-500">Not a Guild Member</div>;
  const userId = session.user.id;

  const status = await GuildCheck({ userId });
  if (!status) return <div className="text-red-500">Not a Guild Member</div>;
  return (
    <main>
      {status && <div className="text-green-500">Authorized Guild Member</div>}
      {!status && <div className="text-red-500">Not a Guild Member</div>}

      <div className="header-container">
        <div className="header">
          <h3>TGC Community Updates</h3>
        </div>
        <div className="header">
          <h3>MMO Updates</h3>
        </div>
      </div>
      <FrontContent />
      <WarningBanner />
    </main>
  );
}
