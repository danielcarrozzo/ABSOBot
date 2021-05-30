const DatabaseUtilities = require("../utilities/dbUtilities");
const Discord = require("discord.js");
const { defaultColor } = require("../config.json");

module.exports = {
    name: 'banplayer',
    display: false,
    aliases: ['bp'],
    cooldown: 5,
    description: 'Ban a player from the tournament for a certain period of time, use c at the end to insert a comment',
    usage: '[ban reason id] [number of days] @mention1/[ban reason id] [number of days] c @mention1 @mention2',
    warning: 'This could be used just by who has the permission',
    execute: async (msg, args) => {//solo se hai KICK
        if(await DatabaseUtilities.INSTANCE.isAdmin(msg.author.id)){
            if(args.length>=3){
                if(!(await DatabaseUtilities.INSTANCE.existsBanReason(args[0]))){
                    return msg.channel.send(`This ban reason doesn't exist`);
                }
                if(isNaN(args[1]) && args[1]!=='default'){//is a period
                    return msg.channel.send(`This is not a period, I like the following formats: 60, 4, 7`);
                }
                //I can't with collectors don't put it to continue from case 4 and use case 3
                if(args.length>=4 && args[2]==='c') {
                    msg.channel.send(`Send a comment:`);
                    const filter = response => {
                        return response.author === msg.author;
                    };
                    msg.channel.awaitMessages(filter, {max: 1})
                        .then(collected => {
                            console.log(collected.first().content)
                            args[2] = collected.first().content;
                            msg.channel.send(`Comment added`)
                            ban(msg, args, true);
                        });
                }else{
                    ban(msg, args, false);
                }
            }else{
                return msg.channel.send(`Not enough arguments`);
            }
        }
    },
};

ban = async (msg, args, withComment) => {
    Promise.all(
        msg.mentions.users.map(async user => { //await Object.keys(msg.mentions.users).map(userId
            await DatabaseUtilities.INSTANCE.insertBanned(user.id, args[0], (args[1]==='default'?args[1]:`${args[1]} days`), (withComment?args[2]:null));
            let embed = new Discord.MessageEmbed()
                .setTitle("You have banned "+user.tag)
                .setColor(defaultColor)
                .setTimestamp(Date.now())
                .addField(`Reason ${args[0]}`, `For ${args[1]} days`);
            msg.channel.send(embed);
        })
    )
}