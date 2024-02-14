import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
interface Guild {
  id: string;
  name: string;
}
export async function GuildPull() {
  const session = await getServerAuthSession();
  if (!session)
    return <div className="text-3xl text-red-500">You are not logged in.</div>;

  const guild = session.user.guild;

  if (!guild) {
    const token = await api.get.pullAccess.query({
      userId: session.user.id,
    });
    if (!token)
      return (
        <div className="text-3xl text-red-500">You are not logged in.</div>
      );

    const guildRes = await fetch("https://discord.com/api/users/@me/guilds", {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    const guilds: Guild[] = (await guildRes.json()) as [];
    console.log(guilds);
    const tgc = guilds.find((g) => g.id === "314436945792991232");
    console.log(tgc);
    if (tgc?.id != "314436945792991232") {
      return (
        <div className="text-5xl text-red-500">
          You are not a member of The Gaming Council
        </div>
      );
    } else {
      await api.put.updateUser.mutate({
        id: session.user.id,
        guild: true,
      });
    }
  }
  return <div className="text-3xl text-green-500">Authorized Guild Member</div>;
}
