module.exports = {
	name: 'kick',
    display: true,
    guildOnly: 'true',
    cooldown: 5,
    description: 'Kick users from the server',
    usage: '[user mention]',
    warning: 'This could be used just by who has the permission',
    execute(msg, args) {//solo se hai KICK
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