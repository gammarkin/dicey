require('dotenv/config');

const { DISCORD_TOKEN } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js')

const showWeaponsCommand = require('./commands/showWeapons');
const rollAttackCommand = require('./commands/rollAttack');
const showSkillsCommand = require('./commands/showSkills');
const pureRollCommand = require('./commands/pureRoll');
const rollAttCommand = require('./commands/rollAttributes');
const helpCommand = require('./commands/help');

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

client.on('messageCreate', rollAttCommand);
client.on('messageCreate', showSkillsCommand);
client.on('messageCreate', helpCommand);
client.on('messageCreate', pureRollCommand);
client.on('messageCreate', rollAttackCommand);
client.on('messageCreate', showWeaponsCommand);

client.login(DISCORD_TOKEN);