const { default_color } = require('../config.json');
const { query_runner } = require('../utilities/utilities');
const Discord = require('discord.js');

module.exports={
    name: 'setroles',
    aliases: [ "sr" ],
    cooldown: 5,
    description: "Set roles for matchmaking, it's easy, you type the command and then 3 chars, if one it's 't' (without quotation marks) your role in that position is going to have a value of true, " +
                    "if not (use another letter, like 'f') your role in that position is going to have a value of false.\n" +
                    "The order is: Anchor/Back, Mid/Support, Front/Slayer",
    usage: "t f t",
    warning: "This affect the matchmaking, you don't want 3 snipers vs 0 so use it properly.",
    execute: async function(msg, client, args, postgreSQL){
        if(args.length===3){
            try {
                await query_runner(postgreSQL, "UPDATE Users SET anchorback="+(args[0]==='t').toString()+", midsupport="+(args[1]==='t').toString()+", frontslayer="+(args[2]==='t').toString()+" WHERE discordid='"+msg.author.id+"';");
                const embed = new Discord.MessageEmbed()
                    .setColor(default_color)
                    .setTitle("Now your current state is: ")
                    .setTimestamp(Date.now())
                    .addField("Anchor/Back <:anchorback:727452644842668033>",(args[0]==='t').toString(), false)
                    .addField("Mid/Support <:midsupport:727452644532027473>",(args[1]==='t').toString(), false)
                    .addField("Front/Slayer <:frontslayer:727452644272111644>",(args[2]==='t').toString(), false); /*https://gist.github.com/scragly/b8d20aece2d058c8c601b44a689a47a0#:~:text=You%20can%20get%20a%20custom,being%20the%20image%20file%20name.&text=All%20bots%20can%20use%20custom,server%2C%20just%20like%20Nitro%20users.*/
                return msg.channel.send(embed);
            }catch(err){
                return console.log(err);
            }
        }
        return msg.channel.send("It's ok, you don't know which role you have but not for this reason you need to put less or more than 3 arguments");
    }
}