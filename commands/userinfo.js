const Discord = require('discord.js');
const DatabaseUtilities = require("../utilities/dbUtilities");
const DiscordInterfaceUtilities = require("../utilities/dsiUtilities");
const { defaultColor, friendcode } = require('../config.json');
const { positioningEmojis, switchIconEmoji } = require('../specialCharacters');

module.exports = {
    name: 'userinfo',
    display: true,
    aliases: [ "ui" ],
    cooldown: 5,
    description: "Get user info. You can choose to not mention nobody, to ping one or more.",
    usage: "[Optional mentions]",
    warning: "",
    execute: async function(msg, args) {
        if(args.length){
            Promise.all(
                msg.mentions.users.map(user => {
                    sendProfile(msg.channel, user.id)
                })
            )
        }else{
            await sendProfile(msg.channel, msg.author.id);
        }
    }
}

sendProfile =
    async (channel, discordId) => {
        const userTag = (await DiscordInterfaceUtilities.INSTANCE.getUser(discordId)).tag;
        const user = await DatabaseUtilities.INSTANCE.getUserByDiscordId(discordId);
        if(user){
            let codeToStamp="";
            if(user.friendcode){
                for(let i=0;i<friendcode.friendcodeSize; i+=friendcode.sectionSize){
                    codeToStamp+=(i!==0?"-":"")+user.friendcode.substr(i, friendcode.sectionSize);
                }
            }
            const embed = new Discord.MessageEmbed()
                .setTitle(`User profile of ${userTag}`)
                .setColor(defaultColor)
                .addField("Id", user.userid)
                .addField(`Nintendo Switch  <:${switchIconEmoji.name}:${switchIconEmoji.id}>`, (codeToStamp===""?'Not inserted yet':codeToStamp), false)//ask if it's oke or not
                .addField(`Anchor/Back <:${positioningEmojis.ab.name}:${positioningEmojis.ab.id}>`, user.anchorback.toString(), true)
                .addField(`Mid/Support <:${positioningEmojis.ms.name}:${positioningEmojis.ms.id}>`, user.midsupport.toString(), true)
                .addField(`Front/Slayer <:${positioningEmojis.fs.name}:${positioningEmojis.fs.id}>`, user.frontslayer.toString(), true);
            channel.send(embed);
        }else{
            channel.send(`User ${userTag} is not subscribed`);
        }
    }