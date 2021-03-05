const Discord = require('discord.js');

module.exports = {
    name: 'viewlist',
    aliases: ['vl'],
    description: 'Show the list as it is',
    execute(client, msg, args, prefix) {
        if (args.length===0) {
            return msg.channel.send(`You need to specify the list number`);
        }else if(args.length===1){
            var fs = require('fs');
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
                return msg.channel.send(embed);
            });
        }
    },
};