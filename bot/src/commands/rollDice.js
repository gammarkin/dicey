const getUserTag = require('../helpers/getUserTag');
const randomInteger = require('random-integer')

const { BOT_USER_TAG } = process.env;

module.exports = async (message) => {
  const [user, userTag] = getUserTag(message);

  if (message.content.includes('!r') && userTag !== BOT_USER_TAG) {
    if (message.content.split(' ').length < 2)
      return message.reply('formatação errada! Tente !roll 1d20 +(modificador)');

    const rollsAndSides = message.content.split(' ')[1].replace('d', ' ').split(' ')
    const dice = message.content.split(' ')[1]
    const numberOfRolls = Number(rollsAndSides[0])
    const sides = Number(rollsAndSides[1])

    let mod = 0;
    let biggestRoll = 0;

    if (message.content.includes('+')) {
      mod = Number(message.content.split(' ')[2].replace('+', ''));

      if (isNaN(mod)) return message.reply('o modificador deve ser um número!');
    }

    const MIN_DICE_VALUE = 1;
    const rolls = [];

    for (let i = 0; i < numberOfRolls; i++) {
      const roll = randomInteger(MIN_DICE_VALUE, sides + MIN_DICE_VALUE);
      const value = `${roll + mod} (${roll})`

      rolls.push({ name: `roll #${i}`, value, inline: true, roll });

      if (value > biggestRoll) biggestRoll = value;
    }

    const total = rolls.reduce((acc, curr) => acc + curr.roll, 0);

    return message.channel.send({
      embeds: [{
        color: 0xf54257,
        title: `Maior dado: ${biggestRoll} | Total: ${total}`,
        description: `player: ${user} | dado: ${dice} | modificador: ${mod}`,
        fields: rolls,
        timestamp: new Date().toISOString(),
        footer: {
          text: `foi adicionado ${mod} ao seu dado`,
        },
      }]
    });
  }
}
