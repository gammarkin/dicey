const skillAttrs = require('../data/skillAttributes');
const skillNames = require('../data/skillNames');

const axios = require('axios');
const randomInteger = require('random-number-csprng')

const getUserTag = require('../helpers/getUserTag');

const { ENDPOINT, BOT_USER_TAG } = process.env;

const NEGATIVE_ROLL_QTY = 2;
const DICE_SIDES = 20;
const MIN_DICE_VALUE = 1;

module.exports = async (message) => {
  const [user, userTag] = getUserTag(message);
  const messageLength = message.content.split(' ').length;

  if (message.content.includes('!p') && userTag !== BOT_USER_TAG) {

    if (messageLength < 2 || messageLength > 3)
      return message.reply('formatação errada! Tente !pericia (pericia)');

    const skill = message.content.split(' ')[1].slice(0, 4).toLowerCase();
    const skillName = skillNames.find(name => name.name.includes(skill)).name;
    const attribute = skillAttrs.find(attr => attr.name.includes(skill)).attribute;

    const character = (await axios.get(`${ENDPOINT}/${userTag}`)).data;
    const attToSum = character.attributes.find(charAttr => charAttr.name.includes(skill)).value;

    let timesToRoll = character.skills.find(charSkill => charSkill.name.includes(attribute)).value;
    let biggestRoll = 0;
    let mod = 0;
    let negativeRoll = 0;
    let NEGATIVE_ROLL_MSG = '';
    let diceSize = 'Maior';

    if (messageLength === 3) {
      mod = Number(message.content.split(' ')[2]);
      mod = isNaN(mod) ? 0 : mod;
    }

    const rolls = [];

    if (timesToRoll === 0) {
      NEGATIVE_ROLL_MSG = ' (negativo)';

      timesToRoll = NEGATIVE_ROLL_QTY
    }

    for (let i = 0; i < timesToRoll; i++) {
      const roll = await randomInteger(MIN_DICE_VALUE, DICE_SIDES);
      const value = `${roll + attToSum + mod} (${roll})`

      rolls.push({ name: `roll #${i + 1}`, value, inline: true });
    }

    if (NEGATIVE_ROLL_MSG) {
      negativeRoll = rolls.reduce((min, curr) => {
        return curr.value < min ? curr.value : min;
      }, rolls[0].value);

      diceSize = 'Menor'
    }

    biggestRoll = rolls.reduce((max, curr) => (
      Number(curr.value.split(' ')[0]) > max ? curr.value : max
    ), Number(rolls[0].value.split(' ')[0])) || 0;

    return message.channel.send({
      embeds: [{
        color: 0xf54257,
        title: `${diceSize} dado: ${negativeRoll || biggestRoll} ${NEGATIVE_ROLL_MSG}`,
        description: `player: ${user} | pericia: ${skillName} | dado: ${timesToRoll}d${DICE_SIDES}`,
        fields: rolls,
        timestamp: new Date().toISOString(),
        footer: {
          text: `foi adicionado ${attToSum + mod} de ${skillName} ao seu dado (mod ${mod})`,
        },
      }]
    });
  }
}
