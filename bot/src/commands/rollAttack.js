const { ENDPOINT, BOT_USER_TAG } = process.env;

const getUserTag = require('../helpers/getUserTag');

const axios = require('axios');
const randomInteger = require('random-number-csprng')

module.exports = async (message) => {
    const [user, _] = getUserTag(message);
    const userTag = message.author.id;

    if (message.content.includes('!a') && userTag !== BOT_USER_TAG) {
        if (message.content.split(' ').length < 2)
            return message.reply('formatação errada! Tente !ataque (arma) +(modificador)');

        const char = (await axios.get(`${ENDPOINT}/${userTag}`)).data;
        const weapons = char.weapons;
        const userWeapon = message.content.split(' ')[1];
        const userStr = char.skills.find((stat) => stat.name === 'força').value;

        const weapon = weapons.find((weapon) => weapon.name.toLowerCase().includes(userWeapon.toLowerCase()));

        if (!weapon) return message.reply('não achei a arma solicitada...');

        let mod = 0;

        if (message.content.includes('+')) {
            mod = +message.content.split(' ')[2].replace('+', '');

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
            const value = await randomInteger(MIN_DICE_VALUE, diceSides);

            rolls.push({ name: `roll #${i} (${value}) `, value, inline: true });
        }

        let total = rolls.reduce((acc, curr) => acc + curr.value, 0) + mod;

        if (message.content.includes('*')) {
            total *= Number(message.content.split(' ')[2].replace('*', ''));

            if (isNaN(mod)) return message.reply('o modificador deve ser um número!');
        }

        if (weapon.weapon_type === 'corpo a corpo') {
            total += +userStr;
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