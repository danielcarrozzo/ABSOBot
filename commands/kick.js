module.exports = {
	name: 'kick',
  description: 'How cya dudes and gurls',
  guildOnly: 'true',
  execute(client, msg, args) {//solo se hai KICK
    if(msg.member.hasPermission('KICK_MEMBERS')){
      const member = msg.mentions.members.first()
      if (!member) {
        return msg.reply(`Who are you trying to kick? You must mention a user.`)
      }else if (!member.kickable) {
        return msg.reply(`I can't kick this user. Sorry!`)
      }
      return member
        .kick()
        .then(() => msg.reply(`${member.user.tag} was kicked.`))
        .catch(error => msg.reply(`Sorry, an error occured.`))
    }
	},
};