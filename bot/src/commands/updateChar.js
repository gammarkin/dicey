const { ENDPOINT, BOT_USER_TAG, ADMIN_TAG } = process.env;

const axios = require('axios');

const getUserTag = require('../helpers/getUserTag');

module.exports = async (message) => {
    const [_user, userTag] = getUserTag(message);

    if (message.content.includes('!up') && userTag !== BOT_USER_TAG) {
        if (message.content.split(' ').length <= 1)
            return message.reply('formatação errada!');

        if (userTag !== ADMIN_TAG)
            return message.reply('você não tem permissão para usar esse comando!')

        const desiredChange = message.content.split(' ')[1];
        let newValue = message.content.split(' ')[2];

        if (typeof newValue === 'object') {
            newValue = JSON.parse(newValue);
        }

        const char = await axios.put(`${ENDPOINT}/${userTag}`, { [desiredChange]: newValue });

        if (!char || char.status !== 200) {
            return message.reply(`algo errado aconteceu ao atualizar seu personagem. Tente novamente mais tarde.`);
        }

        return message.channel.send(`${char.data.characterName} foi atualizado com sucesso!`);
    }
}
