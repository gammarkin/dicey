const { ENDPOINT, BOT_USER_TAG } = process.env;

const axios = require('axios');

const getUserTag = require('../helpers/getUserTag');

module.exports = async (message) => {
  const [user, userTag] = getUserTag(message);

  if (message.content.includes('!ar') && userTag !== BOT_USER_TAG) {
    const char = await axios.get(`${ENDPOINT}/${userTag}`);
    const weapons = char.data.weapons;

    const weaponsList = weapons.map((weapon) => {
      return {
        name: weapon.name,
        value: `dano: ${weapon.damageDice} 
tipo: ${weapon.damageType}`,
        inline: true
      }
    });

    return message.channel.send({
      embeds: [{
        color: 0xf54257,
        title: `Armas: (${user})`,
        fields: weaponsList,
        timestamp: new Date().toISOString(),
        footer: {
          text: `para atacar com uma arma, use !at (nome da arma)`,
        },
      }]
    });
  }
}