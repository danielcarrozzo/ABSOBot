module.exports = {
    name: 'avatar',
    display: true,
    aliases: ['icon', 'pfp', 'propic'],
	description: 'Receive the link of the user avatar',
	execute(msg, args) {
        if (!msg.mentions.users.size) {
          return msg.channel.send(`Your avatar: <${msg.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
        }
        const avatarList = msg.mentions.users.map(user => {
          return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
        });
        return msg.channel.send(avatarList);
	},
};