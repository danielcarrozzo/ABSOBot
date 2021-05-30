const DatabaseUtilities = require("../utilities/dbUtilities");
const Discord = require("discord.js");
const { defaultColor } =require("../config.json");

module.exports = {
    name: 'setinfo',
    display: false,
    aliases: [ "si" ],
    cooldown: 5,
    description: "Set a new tournament week",
    //permissionRequired: 0, // 0 All, 1 Mods, 2 Admins, 3 Server Owner, 4 Bot Admin, 5 Bot Owner
    usage: "5 t []",
    warning: "Pls, keep in mind what you are doing",
    //checkArgs: (args) => !args.length,
    execute: async function(msg, args) {
        if(await DatabaseUtilities.INSTANCE.isAdmin(msg.author.id)){
            console.log((await DatabaseUtilities.INSTANCE.getWeeks()).length);
            if(args[0]<=0 || args[0]>(await DatabaseUtilities.INSTANCE.getWeeks()).length){
                return msg.channel.send(`This is not an available week`);
            }
            args[1]=args[1]==='t';
            if(args[2]<=0 || args[2]>(await DatabaseUtilities.INSTANCE.getRulements()).length){
                return msg.channel.send(`This is not an available rulement`);
            }
            await DatabaseUtilities.INSTANCE.setInfo(args);
            let embed = new Discord.MessageEmbed()
                .setTitle("Tournament infos updated")
                .setColor(defaultColor)
                .addField(`Current week:`, args[0])
                .addField(`Status:`, (args[1]?`In progress`:`Stopped`))
                .addField(`Rulement:`, args[2])
                .setTimestamp(Date.now());
            msg.channel.send(embed);
        }else{
            msg.channel.send(`You are not an admin so you could not use this command`)
        }
    }
}