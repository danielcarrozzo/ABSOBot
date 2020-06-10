require("dotenv").config();

const Discord = require('discord.js')
const { prefix, favourite_song } = require('./config.json');
//const {prefix}=require('./config.json');
//const config = require('./config.json');
const client = new Discord.Client()

//client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`))
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.login(process.env.DISCORD_TOKEN);

client.on('message', msg => {
  //if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (message.content.startsWith(prefix)){
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    //else if (command === 'args-info') {
    //  if (!args.length) {
    //    return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    //  }//Looks good! Don't worry about the comma separation; that's the expected output when trying to send an array as a string.
    //  else if (args[0] === 'foo') {
		//    return message.channel.send('bar');
	  //  }
    //  message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    //}
    if(command === 'create'||command=== 'c'){
      //creare il tutto
      msg.channel.send('I created the base for all what you need to do!');
    }else if(command === 'createlist'||command==='cl'){
      if (!args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}! Pls add a name for the lis`);
      }
    }else if(command === 'Buongiorno'){
      if(!args.length){
        return message.channel.send('A chi?');
      }else if (args[0] === 'ABSO') {
        return message.channel.send('No vabbè mi ha salutato non ci credo');
      }
      message.channel.send(`First argument: ${args[0]}`);
    }
  }else{
    if (msg.content === 'Canzone preferita?') {
      msg.channel.send(`${favourite_song} OVVIAMENTE`);
    }
    if (msg.content === 'Dove sono?') {
      msg.channel.send(`In un luogo magico e fatato chiamato ${msg.guild.name}`);
    }
    if (msg.content === 'Dimmi di più su questo regno') {
      msg.channel.send(`È stato creato il ${msg.guild.createdAt} (La prossima volta cerco di dirlo in un modo meno rude) e nel globo è collocato in ${msg.guild.region}`);
    }
    if (msg.content === 'Quanti siamo qua dentro?') {
      msg.channel.send(`Qualcosa come ${msg.guild.memberCount} anime`);
    }
    if (msg.content === 'Chi sono?') {
      msg.channel.send(`Smemorato eh? Sei ${msg.author.username}!`);
    }
    if (msg.content === 'Stringiamo amicizia?') {
      msg.channel.send(`Certo!`);
      msg.author.addFriend;//Idk se funziona
    }
    if (msg.content === 'Chi sono?') {
      msg.channel.send(`Smemorato eh? Sei ${msg.author.username}!`);
    }
    if (msg.content === 'Quanti siamo qua dentro?') {
      msg.channel.send(`Qualcosa come ${msg.guild.memberCount} anime`);
    }
    if (msg.content.startsWith === `${prefix}aiuto`) {
      msg.channel.send('Hey ciao amor! Questi al momento sono i miei comandi:\n');// senza punto e virgola spamma
    }
    if (msg.content === `${prefix}ping`) {
      msg.channel.send('Pong');
    }
    //if(msg.content.startsWith()){
    //}
    if(msg.member.hasPermission('ADMINISTRATOR')){//'KICK_MEMBERS', 'BAN_MEMBERS'
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