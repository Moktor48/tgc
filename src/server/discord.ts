import Discord from "discord.js";
import { Client, Events, IntentsBitField } from "discord.js";

export default async function DiscordClient() {
  const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers],
  });

  const login = await client.login(process.env.DISCORD_TOKEN);
}
