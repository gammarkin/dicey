const skillAttrs = require('../data/skillAttributes');
const skillNames = require('../data/skillNames');

const axios = require('axios');
const randomInteger = require('random-integer')

const getUserTag = require('../helpers/getUserTag');

const { ENDPOINT, BOT_USER_TAG } = process.env;

module.exports = async (message) => {
  const [user, userTag] = getUserTag(message);

  if (message.content.includes('!p') && userTag !== BOT_USER_TAG) {

    if (message.content.split(' ').length < 2 || message.content.split(' ').length > 3)
      return message.reply('formatação errada! Tente !pericia (pericia)');

    if (message.content.split(' ').length === 2) {
      const userSkill = message.content.split(' ')[1].slice(0, 4).toLowerCase();
      const skill = skillNames.find(skill => skill.code === userSkill).name;
      const attribute = skillAttrs.find(attr => attr.name === skillToUse).attribute;

      const character = await axios.get(`${ENDPOINT}/${userTag}`);
      const attToSum = character.attributes.find(charAttr => charAttr.name === attribute).value;

      const NEGATIVE_ROLL_QTY = 2;
      const DICE_SIDES = 20;
      const MIN_DICE_VALUE = 1;

      let timesToRoll = character.skills.find(charSkill => charSkill.name === skill).value;
      let biggestRoll = 0;
      let NEGATIVE_ROLL_MSG = ''

      const rolls = [];

      for (let i = 0; i < timesToRoll; i++) {
        const value = randomInteger(MIN_DICE_VALUE, DICE_SIDES) + attToSum;

        rolls.push({ name: `roll #${i + 1}`, value, inline: true });

        if (value > biggestRoll) {
          biggestRoll = value;
        }
      }

      if (timesToRoll === 0) {
        timesToRoll = NEGATIVE_ROLL_QTY;
        NEGATIVE_ROLL_MSG = ' (negativo)';

        biggestRoll = rolls.reduce((min, curr) => {
          return curr.value < min ? curr.value : min;
        }, rolls[0].value);
      }

      return message.channel.send({
        embeds: [{
          color: 0xf54257,
          title: `Maior dado: ${biggestRoll} ${NEGATIVE_ROLL_MSG}`,
          description: `player: ${user} | pericia: ${skill} | dado: ${timesToRoll}d${DICE_SIDES}`,
          fields: rolls,
          timestamp: new Date().toISOString(),
          footer: {
            text: `foi adicionado ${attToSum} de ${skill} ao seu dado`,
          },
        }]
      });
    }

    if (message.content.split(' ').length === 3) {
      let skillToUse = message.content.split(' ')[2].slice(0, 4).toLowerCase();
      let diceType = +message.content.split(' ')[1].replace('d', '')
      let mod = 0;

      for (const skill in skills) {
        const firstFourSkillLetters = skill.slice(0, 4).toLowerCase();
        const playerMessage = message.content.toLowerCase();
        const attribute = first4Skills[skillToUse];

        if (playerMessage.includes('+')) {
          mod = +message.content.split(' ')[2].replace('+', '');

          skillToUse = message.content.split(' ')[1].slice(0, 4).toLowerCase();
          diceType = 20;

          if (isNaN(mod)) return message.reply('o modificador deve ser um número!');
        }

        if (playerMessage.includes(firstFourSkillLetters)) {
          const character = await axios.get(`${ENDPOINT}/${userTag}`);
          let timesToRoll = character.data.skills[skills[skill]]
          const attToSum = character.data.attributes[attribute]

          if (timesToRoll === 0) {
            timesToRoll = 2
          }

          const MIN_DICE_VALUE = 1;
          const rolls = [];

          let biggestRoll = 0;

          for (let i = 0; i < timesToRoll; i++) {
            const value = randomInteger(MIN_DICE_VALUE, diceType);

            rolls.push({ name: `roll #${i + 1}`, value, inline: true });

            if (value > biggestRoll) {
              biggestRoll = value;
            }
          }

          if (mod) {
            return message.channel.send({
              embeds: [{
                color: 0xf54257,
                title: `Maior dado: ${biggestRoll + attToSum + mod} (${biggestRoll})`,
                description: `player: ${user} | pericia: ${skill} | dado: ${timesToRoll}d${diceType}`,
                fields: rolls,
                timestamp: new Date().toISOString(),
                footer: {
                  text: `foi adicionado ${attToSum} de ${skill} ao seu dado e ${mod} de modificador`,
                },
              }]
            });
          }

          return message.channel.send({
            embeds: [{
              color: 0xf54257,
              title: `Maior dado: ${biggestRoll + attToSum} (${biggestRoll})`,
              description: `player: ${user} | pericia: ${skill} | dado: ${timesToRoll}d${diceType}`,
              fields: rolls,
              timestamp: new Date().toISOString(),
              footer: {
                text: `foi adicionado ${attToSum} de ${skill} ao seu dado`,
              },
            }]
          });
        }
      }
    }

    return message.reply('pericia não encontrada! Tente !p (pericia)');
  }
}
