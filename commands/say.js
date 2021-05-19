const Discord = require('discord.js');
const DiscordInterfaceUtilities = require("../utilities/dsiUtilities");
const { defaultColor } = require('../config.json');
const emojiCharacters = require('../specialCharacters');


module.exports={
    name: 'say',
    display: true,
    execute: async function (msg, args){
        try{
            await msg.channel.send(emojiCharacters[args[0].toLowerCase()]);
        }catch(err){
            const content=msg.content.substr(msg.content.indexOf(" "));
            let embed = new Discord.MessageEmbed()
                .setColor(defaultColor)
                .setDescription(content)
                .setAuthor(msg.author.username + " said", msg.author.avatarURL(), `https://discord.com/channels/@me/${msg.author}`)
            await msg.channel.send(embed);
        }
        DiscordInterfaceUtilities.INSTANCE.deleteMessage(msg);
    }
}