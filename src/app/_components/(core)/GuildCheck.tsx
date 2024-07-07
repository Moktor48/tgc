import React from "react";
import { api } from "~/trpc/server";
import type { GuildMember } from "~/type";
import type { RoleMapping } from "~/type";

interface Guild {
  id: string;
  name: string;
}
let status = false;
let guildStaff = false;

export default async function GuildCheck({ userId }: { userId: string }) {
  const token = await api.get.pullAccess.query({
    userId: userId,
  });

  if (!token) {
    return <div className="text-red-500">Not a Guild Member</div>;
  }

  const userAccess = await api.get.fullProfile.query({ userId });

  const esoEntry = {
    userId: userId,
    rank: "none",
    raid: false,
    raidlead: false,
    mentor: false,
  };
  const ffxivEntry = {
    userId: userId,
    rank: "none",
    raid: false,
    raidlead: false,
    mentor: false,
  };
  const swtorEntry = {
    userId: userId,
    rank: "none",
    raid: false,
    raidlead: false,
    mentor: false,
  };
  const staffEntry = {
    userId: userId,
    admin: userAccess?.staff?.admin ?? false,
    specialist: false,
    representative: false,
    juniorofficer: false,
    officer: false,
    highcouncil: false,
    guildmaster: false,
  };

  if (!userAccess?.eso?.userId) {
    await api.post.createEsoPermission.mutate({
      userId: userId,
      rank: "none",
      raid: false,
      raidlead: false,
      mentor: false,
    });
  }
  if (!userAccess?.ffxiv?.userId) {
    await api.post.createFfxivPermission.mutate({
      userId: userId,
      rank: "none",
      raid: false,
      raidlead: false,
      mentor: false,
    });
  }
  if (!userAccess?.swtor?.userId) {
    await api.post.createSwtorPermission.mutate({
      userId: userId,
      rank: "none",
      raid: false,
      raidlead: false,
      mentor: false,
    });
  }
  if (!userAccess?.staff?.userId) {
    await api.post.createStaffPermission.mutate({
      userId: userId,
      admin: false,
      specialist: false,
      representative: false,
      juniorofficer: false,
      officer: false,
      highcouncil: false,
      guildmaster: false,
    });
  }

  const guildRes = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });

  const guilds: Guild[] = (await guildRes.json()) as [];

  const tgc = guilds.find((g) => g.id === "314436945792991232");
  if (tgc?.id != "314436945792991232") {
    return (
      <div className="text-red-500">
        You are not a member of The Gaming Council
      </div>
    );
  } else {
    status = true;
    await api.put.updateUser.mutate({
      id: userId,
      guild: true,
    });
  }

  const roleMapping: RoleMapping = {
    "567556412360622080": "Active Staff", // User.role = staff
    "504802843966963723": "Junior Officer", // staff.juniorofficer = true
    "504803026368856074": "Guild Specialist", //staff.specialist = true
    "504811023111290881": "Guildmaster", // staff.guildmaster = true
    "504801655154540547": "High Council", // staff.highcouncil = true
    "809241522058952725": "Certified Mentor",
    "900500968016318516": "Representative", // staff.representative = true
    "504803493396348939": "Raid Leader Core",
    "791378938969718815": "Raid Leader Open",
    "576530924712361986": "Untagged",
    "1161503594672050206": "Developer",
    "452344937263005696": "ESO", //eso.rank = member
    "715796093983653930": "ESO Staff", //eso.rank = officer
    "379492525964001290": "SWTOR", //swtor.rank = member
    "715795715808297022": "SWTOR Staff", //swtor.rank = officer
    "1068151252837478410": "FFXIV", //ffxiv.rank = member
    "1071853800438108320": "FFXIV Staff", //ffxiv.rank = officer
    "504802286560739338": "Community Officer", // staff.officer = true
    "513499609125879813": "Inactive Staff", // Need to figure this one out for queries
  };

  const guildData = await fetch(
    "https://discord.com/api/users/@me/guilds/314436945792991232/member",
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    },
  );

  const guildMember = (await guildData.json()) as GuildMember;

  if (guildMember.roles.includes("576530924712361986")) {
    return alert("Please wait until your Discord verification is complete");
  } else {
    guildMember.roles.forEach((roleId) => {
      const role = roleMapping[roleId];

      switch (role) {
        case "Developer":
          staffEntry.admin = true;
          break;
        case "ESO":
          esoEntry.rank = "member";
          break;
        case "ESO Staff":
          esoEntry.rank = "officer";
          break;
        case "SWTOR":
          swtorEntry.rank = "member";
          break;
        case "SWTOR Staff":
          swtorEntry.rank = "officer";
          break;
        case "FFXIV":
          ffxivEntry.rank = "member";
          break;
        case "FFXIV Staff":
          ffxivEntry.rank = "officer";
          break;
        case "Active Staff":
          guildStaff = true;
          break;
        case "Guild Specialist":
          staffEntry.specialist = true;
          break;
        case "Guildmaster":
          staffEntry.guildmaster = true;
          staffEntry.admin = true;
          break;
        case "High Council":
          staffEntry.highcouncil = true;
          break;
        case "Certified Mentor":
          esoEntry.mentor = true;
          ffxivEntry.mentor = true;
          swtorEntry.mentor = true;
          break;
        case "Representative":
          staffEntry.representative = true;
          break;
        case "Junior Officer":
          staffEntry.juniorofficer = true;
          break;
        case "Community Officer":
          staffEntry.officer = true;
          break;
        case "Raid Leader Core":
          esoEntry.raidlead = true;
          ffxivEntry.raidlead = true;
          swtorEntry.raidlead = true;
          break;
        case "Raid Leader Open":
          esoEntry.raidlead = true;
          ffxivEntry.raidlead = true;
          swtorEntry.raidlead = true;
          break;
        default:
          break;
      }
    });
  }
  await api.put.updateUserEso.mutate(esoEntry);
  await api.put.updateUserFfxiv.mutate(ffxivEntry);
  await api.put.updateUserSwtor.mutate(swtorEntry);
  console.log(staffEntry);
  await api.put.updateUserStaff.mutate(staffEntry);

  if (guildStaff) {
    await api.put.updateUser.mutate({ id: userId, role: "staff" });
  }
  return status;
}
