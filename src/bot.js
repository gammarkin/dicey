require('dotenv/config');

const { DISCORD_TOKEN } = process.env;
const { EmbedBuilder } = require('discord.js');
const { Client, Collection, GatewayIntentBits } = require('discord.js')

const skills = require('./skills');
const first4Skills = require('./fSkills');

const axios = require('axios');

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

client.on('messageCreate', async message => {
  const user = message.member.user.tag
  const userTag = user.split('#')[1]

  if (message.content.includes('!roll') && userTag !== '2158') {
    if (message.content.split(' ').length < 3)
      return message.reply('formatação errada! Tente !roll d20 +skill');

    const messageSkill = message.content.split(' ')[2].slice(0, 4).toLowerCase();
    const diceType = +message.content.split(' ')[1].replace('d', '')

    for (const skill in skills) {
      const firstFourSkillLetters = skill.slice(0, 4).toLowerCase();
      const playerMessage = message.content.toLowerCase();

      if (playerMessage.includes(firstFourSkillLetters)) {
        const character = await axios.get(`http://localhost:3001/character/${userTag}`);
        const timesToRoll = character.data.skills[skills[skill]]
        const attToAdd = character.data.attributes[first4Skills[messageSkill]]
        const MIN_DICE = 1;
        const rolls = [];

        for (let i = 0; i < timesToRoll; i++) {
          const value = (Math.floor(Math.random() * diceType) + MIN_DICE) + attToAdd;

          rolls.push({ name: `roll #${i}`, value, inline: true });
        }

        message.channel.send({
          embeds: [{
            color: 0xf54257,
            title: 'Resultados:',
            description: `player: ${user} | pericia: ${skill} | dado: d${diceType}`,
            fields: rolls,
            timestamp: new Date().toISOString(),
            footer: {
              text: `foi adicionado ${attToAdd} de ${skill} ao seu dado`,
            },
          }]
        });

        return;
      }
    }

    return message.reply('não achei a perícia solicitada...');
  }


});

client.login(DISCORD_TOKEN);