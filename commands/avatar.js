module.exports = {
    name: 'avatar',
    display: true,
    aliases: ['icon', 'pfp', 'propic'],
    cooldown: 1,
    description: 'Receive the link of the user avatar, you can tag someone else to get its one, with no tags you would receive yours',
    usage: "<@246710308817731585>",
    warning: "Remember propics are compressed!",
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