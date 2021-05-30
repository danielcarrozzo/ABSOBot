const Discord = require('discord.js');
const DiscordInterfaceUtilities = require("../utilities/dsiUtilities");
const { defaultColor } = require('../config.json');
const emojiCharacters = require('../specialCharacters');


module.exports={
    name: 'say',
    display: true,
    aliases: [  ],
    cooldown: 1,
    description: "Tell to the bot to say something, there are some special strings to send some special aswers",
    usage: "Hola",
    warning: "You can type it just in this ways: 012345678910, 0123-4567-8910 and 0123 4567 8910",
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