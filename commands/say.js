const { default_color } = require('../config.json');
const emojiCharacters = require('../emojiCharacters');
const Discord = require('discord.js');

module.exports={
    name: 'say',
    execute: async function (msg, client, args, postgreSQL){
        try{
            await msg.channel.send(emojiCharacters[args[0]]);
            utilities.delete_msg(msg);
        }catch(err){
            switch(args[0]){
                case 'kazoo':{
                    msg.channel.send("Someone need a Kazoo: https://www.youtube.com/watch?v=RzbEWCMVndM&t=5s");
                    break;
                }
                default:
                    const content=msg.content.substr(msg.content.indexOf(" "));
                    let embed = new Discord.MessageEmbed()
                        .setColor(default_color)
                        .setDescription(content)
                        .setAuthor(msg.author.username + " said", msg.author.avatarURL(), "https://discord.com/channels/@me/"+msg.author)
                    await msg.channel.send(embed);
                    break;
            }
            utilities.delete_msg(msg);
        }
    }
}