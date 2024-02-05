import { Client, IntentsBitField } from "discord.js";

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);

  // Get the guild to log members for
  const guild = client.guilds.cache.get("GUILD_ID");
  if (!guild) {
    console.error("GUILD_ID not found in client.guilds.cache");
    return;
  }
  // Log all members
  guild.members.cache.forEach((member) => {
    console.log(member.user.tag);
  });
});

await client.login(process.env.NEXTAUTH_URL);
