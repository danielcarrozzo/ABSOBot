const Discord = require("discord.js");
const { creator, defaultColor } = require("../config.json")

module.exports={
    name: "credits",
    display: true,
    execute: (msg)=>{
        let embed = new Discord.MessageEmbed()
            .setAuthor("Creator: KraY", msg.author.avatarURL(), `https://discordapp.com/users/${creator}`)
            .setColor(defaultColor)
            .setImage("https://media.discordapp.net/attachments/829107266199224322/843035398992560128/nodeparrot.gif");
        //.setImage("../media/nodeparrot.gif");
        msg.channel.send(embed);
    }
}