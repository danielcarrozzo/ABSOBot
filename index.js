require("dotenv").config();

const Discord = require('discord.js')
//const {prefix, favourite_song}=require('./config.json');
//const config = require('./config.json');
const client = new Discord.Client()

client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`))

client.login(process.env.DISCORD_TOKEN);

client.on('message', msg => {
  if (msg.content === 'Favourite song?') {
    msg.reply(`${favourite_song}`);
  }
  if (msg.content === 'Ping') {
    msg.reply(`Pong`);
  }
  //if(msg.content.startsWith()){
  //}
  if (msg.content === 'Ciao') {
    msg.channel.send('Ciao')
  }
  if(msg.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])){
    if (msg.content.startsWith('SpamTag')) {
      const member = msg.mentions.members.first()
      if(member!=null){
        var i;
        for (i = 0; i < 100; i++) {
          //msg.reply(`${member.reply}`)
          msg.channel.send(`${member}`);
          //get tag() {
          // return `${this.username}#${this.discriminator}`;
          //}
        } 
      }
    }
    if (msg.content.startsWith('UltraMegaTopSecretSpamTag')) {
      const member = msg.mentions.members.first()
      if(member!=null){
        var i;
        for (i = 0; i < 2500; i++) {
          msg.channel.send(`${member}`);
        } 
      }
    }
  }
  if(msg.content=='Come mi chiamo?'){
    msg.channel.send(`${msg.author}`);
  }
})

client.on('message', message => {
  if(message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])){
    if (message.content.startsWith('!kick')) {
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
  }
})