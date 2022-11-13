const helpOptions = require('../data/helpOptions');

module.exports = (message) => {
    const { content } = message;

    if (content.includes('!help') || content.includes('!commands')) {
        return message.channel.send({
            embeds: [{
                color: 0xf54257,
                title: 'Comandos:',
                fields: helpOptions,
                timestamp: new Date().toISOString(),
            }]
        });
    }
}
