const Discord = require('discord.js');
const DatabaseUtilities = require("../utilities/dbUtilities");
const DiscordInterfaceUtilities = require("../utilities/dsiUtilities");
const {defaultColor} = require("../config.json");

ranking =
    async(channel, args) =>{
        //await dsi_utilities.INSTANCE.dsi_show_ranking(msg, msg.channel, args)
        //const channel = await this.dsi_get_channel(channelid);
        if (args.length===0) {
            return channel.send(`You need to specify the list number`);
        }else if(args.length===1){
            if(args[0]>=1 && args[0]<=8){
                let embed = new Discord.MessageEmbed()
                    .setColor(defaultColor)
                    .setTimestamp(Date.now())//In because .send is not in the callback so I need to do all stuff here and .addField can not be used in (maybe)
                    .setTitle('Ranking');
                let toSend;
                let capability=50;
                let indexG;
                //3) 32: 3\n
                try{//It's going to be always someone for every week, example: someone joins in 6th week? they are added 3 lines (or 8?)
                    const ranking=await DatabaseUtilities.INSTANCE.getRanking(args[0]);
                    await Promise.all(
                        ranking.map(async (row, index) => {
                            DiscordInterfaceUtilities.INSTANCE.getUser(row.discordid).then(async user => {
                                //check if it's admin or winner of a week so ()
                                if(index%capability===0){
                                    toSend='';
                                }
                                toSend += (index+1)+'. '+ user.username + ': ' + row.points + '\r\n';
                                if(index%capability===capability-1){
                                    embed.addField(`Week: ${args[0]}`, toSend, false);
                                    await channel.send(embed);
                                    indexG=index;
                                }
                            });
                        })
                    );
                    embed.addField(`Week: ${args[0]}`, toSend, false);
                    await channel.send(embed);
                }catch(err){
                    throw err;
                }
            }else {
                return channel.send(`Week?`,{files: ["./media/iyahjbah.png"]});//No other ways
            }
        }else{
            return channel.send(`Too many arguments, you just need to put week number`);
        }
    }


module.exports = {
    name: 'ranking',
    display: false,
    aliases: ['ra'],
    description: 'Show ranking',
    usage: "5",
    warning: "This is just a way to get it whenever you want",
    execute: async function(msg, args) {
        await ranking(msg.channel, args);
    },
    ranking: ranking
};