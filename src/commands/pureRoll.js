const getUserTag = require('../helpers/getUserTag');

const { BOT_USER_TAG } = process.env;

module.exports = async (message) => {
    const [user, userTag] = getUserTag(message);

    if (message.content.includes('!ro') && userTag !== BOT_USER_TAG) {
        if (message.content.split(' ').length < 2)
            return message.reply('formatação errada! Tente !roll 1d20 +(modificador)');

        const diceAndSide = message.content.split(' ')[1].replace('d', ' ').split(' ')
        const timesToRoll = +diceAndSide[0]
        const sides = +diceAndSide[1]

        let mod = 0;

        if (message.content.includes('+')) {
            mod = +message.content.split(' ')[2].replace('+', '')

            if (isNaN(mod)) return message.reply('o modificador deve ser um número!');
        }

        const MIN_DICE_VALUE = 1;
        const rolls = [];

        for (let i = 0; i < timesToRoll; i++) {
            const roll = (Math.floor(Math.random() * sides) + MIN_DICE_VALUE);
            const value = roll + mod

            rolls.push({ name: `roll #${i} (${roll}) `, value, inline: true });
        }

        return message.channel.send({
            embeds: [{
                color: 0xf54257,
                title: 'Resultados:',
                description: `player: ${user} | dado: ${message.content.split(' ')[1]} | modificador: ${mod}`,
                fields: rolls,
                timestamp: new Date().toISOString(),
                footer: {
                    text: `foi adicionado ${mod} ao seu dado`,
                },
            }]
        });
    }
}
