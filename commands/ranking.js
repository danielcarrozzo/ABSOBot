const Discord = require('discord.js');

module.exports = {
    name: 'ranking',
    aliases: ['ra'],
    description: 'Show the list as it is',
    execute: async function(client, msg, args, utilities, postgress) {
        if (args.length===0) {
            return msg.channel.send(`You need to specify the list number`);
        }else if(args.length===1){
            if(args[0]>=1 && args[0]<=8){
                var embed = new Discord.MessageEmbed().setColor('#771177').setTimestamp(Date.now());//In because .send is not in the callback so I need to do all stuff here and .addField can not be used in (maybe)
                embed.setTitle('Ranking');
                let toSend;
                let capability=50;
                let indexG;
//3) 32: 3\n
                try{//It's going to be always someone for every week, example: someone joins in 6th week? they are added 3 lines (or 8?)
                    const res=await utilities.query_runner(postgress, 'SELECT * FROM Ranking INNER JOIN Users ON ranking.userid = users.userid WHERE WeekId='+args[0]+' ORDER BY Points ASC;');
                    await Promise.all(
                        res.rows.map(async (row, index) => {
                            await utilities.get_user_from_discord(client, row.discordid).then(async user => {
                                if(index%capability===0){
                                    toSend='';
                                }
                                toSend += (index+1)+'. '+ user.username + ': ' + row.points + '\r\n';
                                if(index%capability===capability-1){
                                    embed.addField('Week: '+args[0], toSend, false);
                                    msg.channel.send(embed);
                                    indexG=index;
                                }
                            });
                        })
                    );
                    embed.addField('Week: '+args[0], toSend, false);
                    msg.channel.send(embed);
                    utilities.delete_msg(msg);
                }catch(err){
                    throw err;
                }
            }else {
                return msg.channel.send(`Week?`,{files: ["./media/iyahjbah.png"]});//No other ways
            }
        }else{
            return msg.channel.send(`Too many arguments, you just need to put week number`);
        }
    },
};