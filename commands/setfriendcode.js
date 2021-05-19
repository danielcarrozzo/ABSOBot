const Discord = require('discord.js');
const DatabaseUtilities = require("../utilities/dbUtilities");
const { defaultColor } = require('../config.json');

module.exports={
    name: 'setfriendcode',
    display: true,
    aliases: [ "sfc" ],
    cooldown: 5,
    description: "Set Nintendo Switch account friend code to easily share it during lobbies with players.",
    usage: "0123",
    warning: "You can type it just in this ways: 012345678910, 0123-4567-8910 and 0123 4567 8910",
    execute: async function(msg, args){
        try {//TODO testare
            const codeSize=12;
            const sectionSize=4;
            let fc;
            if(args.length===1){
                fc=args[0];
            }else if(args.length===3){
                fc=args[0].concat(args[1], args[2]);
            }
            //I check anyway if it's a number or not using filters and replace
            //I do the same on the database
            fc=fc.replace(/\D/g,'');//https://stackoverflow.com/questions/1862130/strip-all-non-numeric-characters-from-string-in-javascript
            const embed = new Discord.MessageEmbed()
                .setColor(defaultColor)
                .setTimestamp(Date.now());
            console.log(!isNaN(fc) && fc.length===codeSize);
            if(!isNaN(fc) && fc.length===codeSize){//https://www.w3schools.com/jsref/jsref_isnan.asp
                let codeToStamp="";
                for(i=0;i<codeSize; i+=sectionSize){
                    codeToStamp+=(i!==0?"-":"")+fc.substr(i, sectionSize);
                }
                await DatabaseUtilities.INSTANCE.setFriendCode(fc);
                embed.setTitle("Now your current friend code is: ")
                    .addField("Nintendo Switch /*emoji*/", codeToStamp, false)
                return msg.channel.send(embed);
            }else{
                embed.setTitle("Your friend code hasn't been written in a proper way.")
                return msg.channel.send(embed);
            }
        }catch(err){
            return console.log(err);
        }
    }
}