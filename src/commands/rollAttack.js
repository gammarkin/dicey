const { ENDPOINT, BOT_USER_TAG } = process.env;

const getUserTag = require('../helpers/getUserTag');

const axios = require('axios');
const randomInteger = require('random-int');


module.exports = async (message) => {
    const [user, userTag] = getUserTag(message);

    if (message.content.includes('!at') && userTag !== BOT_USER_TAG) {
        if (message.content.split(' ').length < 2)
            return message.reply('formatação errada! Tente !ataque (arma) +(modificador)');

        const char = await axios.get(`${ENDPOINT}/${userTag}`);
        const weapons = char.data.weapons;
        const userWeapon = message.content.split(' ')[1];

        const weapon = weapons.find((weapon) => weapon.name.toLowerCase().includes(userWeapon.toLowerCase()));

        if (!weapon) return message.reply('não achei a arma solicitada...');

        let mod = 0;

        if (message.content.includes('+')) {
            mod = +message.content.split(' ')[2].replace('+', '')

            if (isNaN(mod)) return message.reply('o modificador deve ser um número!');
        }

        if (message.content.includes('-')) {
            mod = -Number(message.content.split(' ')[2].replace('-', ''));

            if (isNaN(mod)) return message.reply('o modificador deve ser um número!');
        }

        const timesToRoll = weapon.damageDice.split('d')[0];
        const diceSides = weapon.damageDice.split('d')[1];

        const MIN_DICE_VALUE = 1;
        const rolls = [];

        for (let i = 0; i < timesToRoll; i++) {
            const value = randomInteger(MIN_DICE_VALUE, sides);

            rolls.push({ name: `roll #${i} (${value}) `, value, inline: true });
        }

        const total = rolls.reduce((acc, curr) => acc + curr.value, 0) + mod;


        if (message.content.includes('*')) {
            mod = Number(message.content.split(' ')[2].replace('*', ''));
            mod = (mod - 1) * total;

            if (isNaN(mod)) return message.reply('o modificador deve ser um número!');
        }

        return message.channel.send({
            embeds: [{
                color: 0xf54257,
                title: `Resultado Total: ${total}`,
                description: `player: ${user} | arma: ${weapon.name} | dado: ${weapon.damageDice}`,
                fields: rolls,
                timestamp: new Date().toISOString(),
                footer: {
                    text: `foi adicionado ${mod} de dano ao seu dado. Tipo: ${weapon.damageType}`,
                },
            }]
        });
    }
}