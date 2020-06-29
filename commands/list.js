const Discord = require('discord.js');

module.exports = {
    name: 'list',
    aliases: ['l'],
    description: 'Show the list',
    execute(message, args) {
        var msg=message;
        if (!args) {
            return msg.channel.send(`You need to specify the list number`);
        }else if(args.length===1){
            var fs = require('fs');
            var dataToUse;
            fs.readFile('listes/'+args[0]+'.txt', 'utf8', function read(err, data) {
                if (err) {
                    return console.error(err);
                }
                dataToUse=data.split("\r\n");
                dataToUse.pop();
                var players = [];
                var scores = [];
                for(var i=0; i<dataToUse.length; i+=2){
                  players.push(dataToUse[i]);
                  scores.push(dataToUse[i+1]);
                }
                var playersFinal = JSON.parse(JSON.stringify(players));
                playersFinal.sort();
                var scoresFinal = [];
                for(var i=0; i<playersFinal.length; i++){
                  var k=i;
                  var cambio=false;
                  for(var j=0; j<players.length; j++){
                    if(playersFinal[i]===players[j]){
                      scoresFinal.push(scores[j]);
                      if(cambio){
                        k++;
                      }
                      cambio=true;
                    }
                  }
                  i=k;
                }
                var finalString="";
                for(var i=0; i<dataToUse.length; i+=2){
                  finalString+=' '+scoresFinal[i/2]+' ';
                  var k=5;
                  for(var j=0.1; j<scoresFinal[i/2]; j*=10){
                      k--;//Non funziona rip (limitazione di discord moltissimo probabilmente)
                  }
                  for(k; k>=0; k--){
                    finalString+=' ';
                  }
                  finalString+=playersFinal[i/2]+'\r\n';
                }
                var embed = new Discord.MessageEmbed().setColor('#771177');
                embed.addField('Lista in ordine alfabetico sessione n°'+`${args[0]}`, finalString, true);
                return msg.channel.send(embed);
            });
        }
    },
};