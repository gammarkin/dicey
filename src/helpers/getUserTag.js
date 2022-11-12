module.exports = (message) => {
    const user = message.member.user.tag
    const userTag = user.split('#')[1]

    return [user, userTag];
}