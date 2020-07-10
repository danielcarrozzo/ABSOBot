module.exports = {
	name: 'kick',
  description: 'How cya dudes and gurls',
  guildOnly: 'true',
  execute(client, message, args, prefix) {//solo se hai KICK
    var msg=message;
    if(msg.member.hasPermission('KICK_MEMBERS')){
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
    }
	},
};