require('dotenv/config');

const { DISCORD_TOKEN } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js')

const rollDiceCommand = require('./events/roll');
const showSkillsCommand = require('./events/showSkills');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.commands = new Collection();

client.once('ready', () => {
  console.log('bot is online!');
});

client.on('messageCreate', rollDiceCommand);
client.on('messageCreate', showSkillsCommand);

client.login(DISCORD_TOKEN);