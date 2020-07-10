const Discord = require('discord.js');

module.exports = {
    name: 'tournamentlog',
    aliases: ['tl'],
    description: 'Show the log of the actions made on the files',
    execute(client, message, args, prefix) {
        var msg=message;
        var fs = require('fs');
        fs.readFile('listes/log.txt', 'utf8', function read(err, data) {
            if (err) {
                return console.error(err);
            }
            //var embed = new Discord.MessageEmbed().setColor('#771177');
            //embed.addField('Log', data, true);
            return msg.channel.send(/*embed*/data, {split: true}
            );
        });
    },
};