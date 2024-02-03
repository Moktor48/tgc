import React from 'react'
import { Client, IntentsBitField } from 'discord.js';
import { env } from '~/env';


export default async function DiscordBot() {
const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);

  // Get the guild to log members for
  const guild = client.guilds.cache.get('GUILD_ID');
  if (!guild) {
    console.error('GUILD_ID not found in client.guilds.cache');
    return;
  }
  // Log all members
  guild.members.cache.forEach(member => {
    console.log(member.user.tag); 
  });
});

await client.login(env.NEXT_PUBLIC_DISCORD_TOKEN);

  return (
    <div>DiscordBot</div>
  )
}




