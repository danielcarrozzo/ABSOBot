module.exports = {
    name: 'avatar',
	description: 'Receive the link of the user avatar',
	execute(message, args) {
        var msg=message;
        if (!msg.mentions.users.size) {
          return msg.channel.send(`Your avatar: <${msg.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
        }
        const avatarList = msg.mentions.users.map(user => {
          return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
        });
        return msg.channel.send(avatarList);
	},
};