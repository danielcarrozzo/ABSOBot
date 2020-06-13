require("dotenv").config();

const fs = require('fs');
const Discord = require('discord.js')
const { prefix, favourite_song } = require('./config.json');
//const {prefix}=require('./config.json');
//const config = require('./config.json');
const client = new Discord.Client();
const cooldowns = new Discord.Collection();

//Commands adding
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));//This next step is how you'll dynamically retrieve all your newly created command files. Add this below your client.commands line:
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);//Faccio una specie di hashmap con chiave (nome comando dentro il file) e file
}

client.login(process.env.DISCORD_TOKEN);

//client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`))
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', msg => {
  //if (!message.content.startsWith(prefix) || message.author.bot) return;
  // i msg.channel.send vanno bene anche senza return
  if (msg.content.startsWith(prefix)){
    const args = msg.content.slice(prefix.length).split(/*' '*// +/);//regex: regular expression
    //const command = args.shift().toLowerCase();
    const commandName /*command */= args.shift().toLowerCase();

    //Check if it exist
    //if (!client.commands.has(/*command*/commandName)) return;

    //check Alliases
    const command = client.commands.get(commandName)
    	|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
    
    var message=msg;

    //Check if it can't be used in DMs
    if (command.guildOnly && message.channel.type !== 'text') {
      return message.reply('I can\'t execute that command inside DMs!');
    }
    
    //Check if it can be used cause timeslice
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      //client.commands.get(command).execute(message, args);
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('there was an error trying to execute that command!');
    }
  }else{
    if (msg.content === 'Fottiti') {
      msg.channel.send(`Ma vafancul bukina mammt`);
    }else if (msg.content === 'Canzone preferita?') {
      msg.channel.send(`${favourite_song} OVVIAMENTE`);
    }else if (msg.content === 'Dove sono?') {
      msg.channel.send(`In un luogo magico e fatato chiamato ${msg.guild.name}`);
    }else if (msg.content === 'Dimmi di più su questo regno') {
      msg.channel.send(`È stato creato il ${msg.guild.createdAt} (La prossima volta cerco di dirlo in un modo meno rude) e nel globo è collocato in ${msg.guild.region}`);
    }else if (msg.content === 'Quanti siamo qua dentro?') {
      msg.channel.send(`Qualcosa come ${msg.guild.memberCount} anime`);
    }else if (msg.content === 'Chi sono?') {
      msg.channel.send(`Smemorato eh? Sei ${msg.author.username}!`);
    }else if (msg.content === 'Stringiamo amicizia?') {
      msg.channel.send(`Certo!`);
      msg.author.addFriend;//Idk se funziona
    }else if (msg.content === 'Chi sono?') {
      msg.channel.send(`Smemorato eh? Sei ${msg.author.username}!`);
    }else if (msg.content === 'Quanti siamo qua dentro?') {
      return msg.channel.send(`Qualcosa come ${msg.guild.memberCount} anime`);
    }else if(msg.content.startsWith('Buongiorno')){
      if(!byTheBot(msg)){
        const args = msg.content.split(/*' '*// +/);//regex: regular expression
        if(args.length==1){
          return msg.channel.send('A chi?');
        }else if (args[1] === 'ABSO') {
          return msg.channel.send('No vabbè mi ha salutato non ci credo');
        }
        return msg.channel.send(`Buongiorno ${args[1]}`);
      }
    }else if(msg.member.hasPermission('ADMINISTRATOR')){//'KICK_MEMBERS', 'BAN_MEMBERS'
      if (msg.content.startsWith('SpamTag')) {
        const member = msg.mentions.members.first()
        if(member!=null){
          var i;
          for (i = 0; i < 100; i++) {
            //msg.reply(`${member.reply}`)
            msg.channel.send(`${i} ${member}`);
            //get tag() {
            // return `${this.username}#${this.discriminator}`;
            //}
          } 
        }
      }else if (msg.content.startsWith('UltraMegaTopSecretSpamTag')) {
        const member = msg.mentions.members.first()
        if(member!=null){
          var i;
          for (i = 0; i < 10000; i++) {
            msg.channel.send(`${i} ${member}`);
          } 
        }
      }
    }
    if(msg.content=='Come mi chiamo?'){
      msg.channel.send(`${msg.author}`);
    }
  }
})

function byTheBot(msg){//funziona!
  return msg.author.bot;
}

function getUserFromMention(mention) {
	// The id is the first and only match found by the RegEx.
	const matches = mention.match(/^<@!?(\d+)>$/);

	// If supplied variable was not a mention, matches will be null instead of an array.
	if (!matches) return;

	// However the first element in the matches array will be the entire mention, not just the ID,
	// so use index 1.
	const id = matches[1];

	return client.users.cache.get(id);
}