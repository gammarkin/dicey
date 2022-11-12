module.exports = (message) => {
    const { content } = message;

    if (content.includes('!help') || content.includes('!commands')) {
        return message.channel.send({
            embeds: [{
                color: 0xf54257,
                title: 'Comandos:',
                description: `Para ver as perícias disponíveis, digite !skills.
Para rolar um dado, digite !roll d20 +pericia.`,
                timestamp: new Date().toISOString(),
            }]
        });
    }
}
