const Discord = require('discord.js');

module.exports = {
    name: 'viewlist',
    aliases: ['vl'],
    description: 'Show the list as it is',
    execute: async function(client, msg, args, postgress) {
        if (args.length===0) {
            return msg.channel.send(`You need to specify the list number`);
        }else if(args.length===1){

            //faccio la query
            /*if() {//try catch se serve
                embed.addField('Lista com\'è della sessione n°'+`${args[0]}`, data, true);
            }else if(){//se è vuota
                embed.addField('This list is empty');
            }else{
                embed.addField('This list doesn\'t exist');
            }*/


            /*+parse.Int(args[0])+*/

            postgress.connect();

            var embed = new Discord.MessageEmbed().setColor('#771177');//In because .send is not in the callback so I need to do all stuff here and .addField can not be used in (maybe)
            embed.setTitle('Ranking');
            toSend='';

            try{
                const res = await postgress.query('SELECT * FROM Ranking INNER JOIN Users ON ranking.userid = users.userid WHERE WeekId=1 ORDER BY Points ASC;');
                await Promise.all(
                    res.rows.map(async row => {
                        // msg.guild.members.
                        var User=await client.users.fetch(row.discordid);

                        toSend+=User.username+': '+row.points+'\r\n';
                    })
                );
                embed.addField('Week: '+args[0], toSend, false);
                return msg.channel.send(embed);
            }catch(err){
                throw err;
            }

            //It doesn't come out from the function until I do postgress.end(), I don't want to do that
            //Putting all out of the function: Ur current issue is race condition, trying to populate the embed before the send fires, but the send will always fire first bc it’s not inside of the cb





            /*postgress.end();*/

            /*var fs = require('fs');
            fs.readFile('listes/'+args[0]+'.txt', 'utf8', function read(err, data) {
                if (err) {
                    return console.error(err);
                }
                var embed = new Discord.MessageEmbed().setColor('#771177');
                try{
                  embed.addField('Lista com\'è della sessione n°'+`${args[0]}`, data, true);
                }catch{
                  return msg.channel.send('This list is empty');
                }
            });*/
        }
    },
};