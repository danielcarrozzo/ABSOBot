require("dotenv").config();


const Discord = require('discord.js')
const client = new Discord.Client()


client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`))

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pongt!')
  }
})

client.on('message', message => {
  if (message.content.startsWith('!kick')) {
    const member = message.mentions.members.first()

    if (!member) {
      return message.reply(
        `Who are you trying to kick? You must mention a user.`
      )
    }

    if (!member.kickable) {
      return message.reply(`I can't kick this user. Sorry!`)
    }

    return member
      .kick()
      .then(() => message.reply(`${member.user.tag} was kicked.`))
      .catch(error => message.reply(`Sorry, an error occured.`))
  }
})

client.login(process.env.DISCORD_TOKEN)