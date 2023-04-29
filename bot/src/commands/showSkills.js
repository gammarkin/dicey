const skills = require('../data/skillsAttribute');

module.exports = (message) => {
  const { content } = message;

  if (content.includes('!sk')) {
    const skillsList = skills.map((skill) => {
      return {
        nome: skill.name,
        atributo: skill.attribute,
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