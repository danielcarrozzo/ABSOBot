const Discord = require("discord.js");
const { creator, defaultColor } = require("../config.json")

module.exports={
    name: "credits",
    display: true,
    aliases: ['c'],
    cooldown: 1,
    description: 'See who made, who helped and some infos about ABSO',
    usage: "",
    warning: "ABSO has been made as a final graduation school project but the develop will continue",
    execute: (msg)=>{
        let embed = new Discord.MessageEmbed()
            .setAuthor("Creator: KraY", `https://cdn.discordapp.com/avatars/${creator}/b30cd28864e9aae905bf3dba5acd4db3.png?size=64`, `https://discordapp.com/users/${creator}`)
            .setColor(defaultColor)
            .addField("If you understand the GIF below you know, '1'+1=11 🥺", "https://github.com/DARKRAYTA/ABSOBot")
            .setImage("https://media.discordapp.net/attachments/829107266199224322/843035398992560128/nodeparrot.gif");
        //.setImage("../media/nodeparrot.gif");
        msg.channel.send(embed);
    }
}