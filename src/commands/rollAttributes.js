const skills = require('../data/skills');
const first4Skills = require('../data/firstFourLetterSkills');

const axios = require('axios');

const getUserTag = require('../helpers/getUserTag');

const { ENDPOINT, BOT_USER_TAG } = process.env;

module.exports = async (message) => {
  const [user, userTag] = getUserTag(message);

  if (message.content.includes('!pe') && userTag !== BOT_USER_TAG) {
    if (message.content.split(' ').length !== 3)
      return message.reply('formatação errada! Tente !pericia d20 +skill');

    const skillToUse = message.content.split(' ')[2].slice(0, 4).toLowerCase();
    const diceType = +message.content.split(' ')[1].replace('d', '')

    for (const skill in skills) {
      const firstFourSkillLetters = skill.slice(0, 4).toLowerCase();
      const playerMessage = message.content.toLowerCase();
      const attribute = first4Skills[skillToUse]

      if (playerMessage.includes(firstFourSkillLetters)) {
        const character = await axios.get(`${ENDPOINT}/${userTag}`);
        const timesToRoll = character.data.skills[skills[skill]]
        const attToSum = character.data.attributes[attribute]

        const MIN_DICE_VALUE = 1;
        const rolls = [];

        for (let i = 0; i < timesToRoll; i++) {
          const roll = (Math.floor(Math.random() * diceType) + MIN_DICE_VALUE);
          const value = roll + attToSum

          rolls.push({ name: `roll #${i} (${roll}) `, value, inline: true });
        }

        return message.channel.send({
          embeds: [{
            color: 0xf54257,
            title: 'Resultados:',
            description: `player: ${user} | pericia: ${skill} | dado: d${diceType}`,
            fields: rolls,
            timestamp: new Date().toISOString(),
            footer: {
              text: `foi adicionado ${attToSum} de ${skill} ao seu dado`,
            },
          }]
        });
      }
    }

    return message.reply('não achei a perícia solicitada...');
  }
}
