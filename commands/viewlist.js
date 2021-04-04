const Discord = require('discord.js');

module.exports = {
    name: 'viewlist',
    aliases: ['vl'],
    description: 'Show the list as it is',
    execute(client, postgress, msg, args) {
        var embed = new Discord.MessageEmbed().setColor('#771177');
        if (args.length===0) {
            //return msg.channel.send(`You need to specify the list number`);
            //show tables
//embed=tables
        }else if(args.length===1){

            //faccio la query
            /*if() {//try catch se serve
                embed.addField('Lista com\'è della sessione n°'+`${args[0]}`, data, true);
            }else if(){//se è vuota
                embed.addField('This list is empty');
            }else{
                embed.addField('This list doesn\'t exist');
            }*/
            postgress.connect();
            postgress.query('SELECT * FROM Ranking WHERE WeekId='+args[0]+';', (err, res) => {
                if (err) throw err;
                for (let row of res.rows) {
                    console.log(JSON.stringify(row));
                    embed.addField(JSON.stringify(row.userid+': '+row.points));
                }
                postgress.end();
            });
            return msg.channel.send(embed);

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

        return msg.channel.send(embed);
    },
};