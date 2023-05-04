const skills = require('../data/skillAttributes');

module.exports = (message) => {
  const { content } = message;

  if (content.includes('!sk')) {
    const skillsList = skills.map(({ name, attribute }) => {
      return {
        name,
        value: attribute,
      }
    });

    return message.channel.send({
      embeds: [{
        color: 0xf54257,
        title: 'Perícias:',
        fields: skillsList,
        timestamp: new Date().toISOString(),
      }]
    });
  }
}