const axios = require('axios');
const getUserTag = require('../helpers/getUserTag');

const { ADMIN_TAG } = process.env;

module.exports = async (message) => {
    const [_user, userTag] = getUserTag(message);
    if (message.content.includes('!se') && userTag === ADMIN_TAG) {

        return message.channel.send('seed executado com sucesso!');
    }

    if (message.content.includes('!se') && userTag !== ADMIN_TAG) {
        return message.channel.send(`Você não tem permissão para executar esse comando, 
${getUserTag(message)[0]}`);
    }
}