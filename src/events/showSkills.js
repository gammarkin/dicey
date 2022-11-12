const skills = require('../helpers/skills');

module.exports = (message) => {
  const { content } = message;

  if (content.includes('!skills')) {
    const skillsList = [];

    for (const skill in skills) {
      const firstFourSkillLetters = skill.slice(0, 4).toLowerCase();

      skillsList.push({ name: firstFourSkillLetters, value: skill, inline: true });
    }

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