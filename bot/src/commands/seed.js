const axios = require('axios');
const getUserTag = require('../helpers/getUserTag');

const { ADMIN_TAG, ENDPOINT } = process.env;

module.exports = async (message) => {
    const [_user, userTag] = getUserTag(message);
    if (message.content.includes('!se') && userTag === '8831') {

        try {
            await axios.get(`${ENDPOINT}/seed`)

            return message.channel.send('seed executado com sucesso!');
        } catch (error) {
            return message.channel.send('erro ao executar seed');
        }
    }

    if (message.content.includes('!se') && userTag !== '8831') {
        return message.channel.send(`Você não tem permissão para executar esse comando, 
${getUserTag(message)[0]}`);
    }
}