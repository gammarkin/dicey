const axios = require('axios');
const getUserTag = require('../helpers/getUserTag');

const { ADMIN_TAG } = process.env;

module.exports = async (message) => {
    if (message.content.includes('!se') && message.author.tag === ADMIN_TAG) {
        await axios.get('http://localhost:3001/character/seed')

        return message.channel.send('seed executado com sucesso!');
    }

    if (message.content.includes('!se') && message.author.tag !== ADMIN_TAG) {
        return message.channel.send(`Você não tem permissão para executar esse comando, 
${getUserTag(message)[0]}`);
    }
}