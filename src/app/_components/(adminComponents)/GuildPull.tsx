import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
interface Guild {
  id: string;
  name: string;
}
type GuildMember = {
  avatar: string | null;
  communication_disabled_until: string | null;
  flags: number;
  joined_at: string;
  nick: string;
  pending: boolean;
  premium_since: string | null;
  roles: string[];
  unusual_dm_activity_until: string | null;
  user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string | null;
    accent_color: string | null;
    global_name: string;
    avatar_decoration_data: string | null;
    banner_color: string | null;
    clan: string | null;
  };
  mute: boolean;
  deaf: boolean;
  bio: string;
  banner: string | null;
};
type RoleMapping = Record<string, string>;
export async function GuildPull() {
  const session = await getServerAuthSession();
  if (!session)
    return <div className="text-red-500">You are not logged in.</div>;
  const userId = session.user.id;
  const guild = session.user.guild;

  if (!guild) {
    const token = await api.get.pullAccess.query({
      userId: session.user.id,
    });
    if (!token)
      return <div className="text-red-500">You are not logged in.</div>;
    const userAccess = await api.get.fullProfile.query({ userId });
    const roleMapping: RoleMapping = {
      "567556412360622080": "Active Staff", // User.role = staff
      "504803026368856074": "Guild Specialist", //staff.specialist = true
      "504811023111290881": "Guildmaster", // staff.guildmaster = true
      "504801655154540547": "High Council", // staff.highcouncil = true
      "809241522058952725": "Certified Mentor",
      "900500968016318516": "Representative", // staff.representative = true
      "504803493396348939": "Raid Leader Core",
      "791378938969718815": "Raid Leader Open",
      "576530924712361986": "Untagged",
      "452344937263005696": "ESO", //eso.rank = member
      "715796093983653930": "ESO Staff", //eso.rank = officer
      "379492525964001290": "SWTOR", //swtor.rank = member
      "715795715808297022": "SWTOR Staff", //swtor.rank = officer
      "1068151252837478410": "FFXIV", //ffxiv.rank = member
      "1071853800438108320": "FFXIV Staff", //ffxiv.rank = officer
    };

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
      await api.put.updateUser.mutate({
        id: session.user.id,
        guild: true,
      });
    }
    const guildData = await fetch(
      "https://discord.com/api/users/@me/guilds/314436945792991232/member",
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      },
    );
    const esoEntry = {
      id: null,
      userId: userId,
      rank: "none",
      raid: false,
      raidlead: false,
      mentor: false,
    };
    const ffxivEntry = {
      id: "",
      userId: userId,
      rank: "none",
      raid: false,
      raidlead: false,
      mentor: false,
    };
    const swtorEntry = {
      id: "",
      userId: userId,
      rank: "none",
      raid: false,
      raidlead: false,
      mentor: false,
    };
    const staffEntry = {
      userId: userId,
      admin: false,
      specialist: false,
      representative: false,
      highcouncil: false,
      guildmaster: false,
    };
    const guildMember = (await guildData.json()) as GuildMember;
    if (guildMember.roles.includes("576530924712361986")) {
      return <p>Please wait until your Discord verification is complete</p>;
    } else {
      guildMember.roles.forEach((roleId) => {
        const role = roleMapping[roleId];

        switch (role) {
          case "ESO":
            esoEntry.rank = "ESO";
            break;
          case "ESO Staff":
            esoEntry.rank = "ESO Staff";
            esoEntry.raidlead = true;
            break;
          case "SWTOR":
            swtorEntry.rank = "SWTOR";
            break;
          case "SWTOR Staff":
            swtorEntry.rank = "SWTOR Staff";
            swtorEntry.raidlead = true;
            break;
          case "FFXIV":
            ffxivEntry.rank = "FFXIV";
            break;
          case "FFXIV Staff":
            ffxivEntry.rank = "FFXIV Staff";
            ffxivEntry.raidlead = true;
            break;
          case "Active Staff":
            staffEntry.admin = true;
            break;
          case "Guild Specialist":
            staffEntry.specialist = true;
            break;
          case "Guildmaster":
            staffEntry.guildmaster = true;
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
    await api.put.updateUserStaff.mutate(staffEntry);
  }
  return <div className="text-green-500">Authorized Guild Member</div>;
}

/**
Untagged: 576530924712361986 

ESO: 452344937263005696
ESO Staff: 715796093983653930

SWTOR: 379492525964001290
SWTOR Staff: 715795715808297022

FFXIV: 1068151252837478410
FF Staff: 1071853800438108320

Active Staff: 567556412360622080
Guild Specialist: 504803026368856074
GM: 504811023111290881
HC: "504801655154540547"

Cert Mentor: 809241522058952725

Raid Leader Core: 504803493396348939
RL Open: 791378938969718815
 */
