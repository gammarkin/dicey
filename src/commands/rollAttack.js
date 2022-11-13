const { ENDPOINT, BOT_USER_TAG } = process.env;

const getUserTag = require('../helpers/getUserTag');
const axios = require('axios');

module.exports = async (message) => {
    const [user, userTag] = getUserTag(message);

    if (message.content.includes('!at') && userTag !== BOT_USER_TAG) {
        if (message.content.split(' ').length !== 2)
            return message.reply('formatação errada! Tente !ataque (arma)');

        const char = await axios.get(`${ENDPOINT}/${userTag}`);
        const weapons = char.data.weapons;
        const userWeapon = message.content.split(' ')[1];

        const weapon = weapons.find((weapon) => weapon.name.toLowerCase().includes(userWeapon.toLowerCase()));

        if (!weapon) return message.reply('não achei a arma solicitada...');

        let mod = char.data.attributes.luta

        if (weapon.type.toLowerCase().includes('distancia')) {
            mod = char.data.attributes.pontaria
        }

        const timesToRoll = weapon.damageDice.split('d')[0];
        const diceSides = weapon.damageDice.split('d')[1];

        const MIN_DICE_VALUE = 1;
        const rolls = [];

        for (let i = 0; i < timesToRoll; i++) {
            const roll = (Math.floor(Math.random() * diceSides) + MIN_DICE_VALUE);
            const value = roll + mod;

            rolls.push({ name: `roll #${i} (${roll}) `, value, inline: true });
        }

        return message.channel.send({
            embeds: [{
                color: 0xf54257,
                title: 'Resultados:',
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