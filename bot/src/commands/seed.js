const axios = require('axios');
const getUserTag = require('../helpers/getUserTag');

const { ADMIN_TAG, ENDPOINT } = process.env;

module.exports = async (message) => {
    const userTag = message.author.id;
    if (message.content.includes('!se') && userTag === ADMIN_TAG) {
        try {
            await axios.get(`${ENDPOINT}/seed`)

            return message.channel.send('seed executado com sucesso!');
        } catch (error) {
            return message.channel.send('erro ao executar seed');
        }
    }

    if (message.content.includes('!se') && userTag !== ADMIN_TAG) {
        return message.channel.send(`Você não tem permissão para executar esse comando, ${message.author.id}`);
    }
}