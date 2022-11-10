require('dotenv/config');

const { DISCORD_TOKEN } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js')

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

client.on('messageCreate', message => {
    if (message.content === '!roll') {
        return message.channel.send('Pong!');
    }
});

client.login(DISCORD_TOKEN);