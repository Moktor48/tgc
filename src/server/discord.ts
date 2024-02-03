

import Discord from 'discord.js';
const client = new client.Discord({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers] });

client.login(process.env.DISCORD_TOKEN);

export default client;