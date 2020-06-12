module.exports = {
	name: 'kick',
	description: 'How cya dudes and gurls',
	execute(message, args) {//solo se hai KICK
        var msg=message;
        const member = message.mentions.members.first()
        if (!member) {
          return message.reply(`Who are you trying to kick? You must mention a user.`)
        }else if (!member.kickable) {
          return message.reply(`I can't kick this user. Sorry!`)
        }
        return member
          .kick()
          .then(() => message.reply(`${member.user.tag} was kicked.`))
          .catch(error => message.reply(`Sorry, an error occured.`))
	},
};