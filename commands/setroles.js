const Discord = require('discord.js');
const DatabaseUtilities = require("../utilities/dbUtilities");
const DiscordInterfaceUtilities = require("../utilities/dsiUtilities");
const { defaultColor, rolesPositioning } = require('../config.json');
const { positioningEmojis } = require('../specialCharacters');

module.exports={
    name: 'setroles',
    display: true,
    aliases: [ "sr" ],
    cooldown: 5,
    description: "Set roles for matchmaking, it's easy, you type the command and then 3 chars, if one it's 't' (without quotation marks) your role in that position is going to have a value of true, " +
                    "if not (use another letter, like 'f') your role in that position is going to have a value of false.\n" +
                    "The order is: Anchor/Back, Mid/Support, Front/Slayer",
    usage: "t f t",
    warning: "This affect the matchmaking, you don't want 3 snipers vs 0 so use it properly.",
    execute: async function(msg, args){
        if(args.length===3){
            try {
                await DatabaseUtilities.INSTANCE.setRoles(msg, args);
                DiscordInterfaceUtilities.INSTANCE.getRole(msg.guild, rolesPositioning.ab).then(abRole=> (args[0]==='t'?msg.member.roles.add(abRole):msg.member.roles.remove(abRole)));
                DiscordInterfaceUtilities.INSTANCE.getRole(msg.guild, rolesPositioning.ms).then(msRole=> (args[1]==='t'?msg.member.roles.add(msRole):msg.member.roles.remove(msRole)));
                DiscordInterfaceUtilities.INSTANCE.getRole(msg.guild, rolesPositioning.fs).then(fsRole=> (args[2]==='t'?msg.member.roles.add(fsRole):msg.member.roles.remove(fsRole)));
                const embed = new Discord.MessageEmbed()
                    .setColor(defaultColor)
                    .setTitle("Now your current roles are: ")
                    .setTimestamp(Date.now())
                    .addField(`Anchor/Back <:${positioningEmojis.ab.name}:${positioningEmojis.ab.id}>`,(args[0]==='t').toString(), false)
                    .addField(`Mid/Support <:${positioningEmojis.ms.name}:${positioningEmojis.ms.id}>`,(args[1]==='t').toString(), false)
                    .addField(`Front/Slayer <:${positioningEmojis.fs.name}:${positioningEmojis.fs.id}>`,(args[2]==='t').toString(), false); /*https://gist.github.com/scragly/b8d20aece2d058c8c601b44a689a47a0#:~:text=You%20can%20get%20a%20custom,being%20the%20image%20file%20name.&text=All%20bots%20can%20use%20custom,server%2C%20just%20like%20Nitro%20users.*/
                return msg.channel.send(embed);
            }catch(err){
                return console.log(err);
            }
        }
        return msg.channel.send("It's ok, you don't know which role you have but not for this reason you need to put less or more than 3 arguments");
    }
}