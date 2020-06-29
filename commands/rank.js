const Discord = require('discord.js');
const emojiCharacters = require('../emojiCharacters');

module.exports = {
  name: 'rank',
  aliases: ['ra', 'ranking'],
  description: 'Add points to a user',
  execute(message, args) {
    var msg=message;
    if (args.length===0) {
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
            /*var times=0;
            var j=0;
            var maxValue=Number.MIN_VALUE;
            while(j!=-1){
              var j=-1;
              for(var i=times; i<scores.length; i++){
                if(scores[i]>maxValue){
                  maxValue=scores[i];
                  j=i;
                }
              }
              players.splice(times, 0, players[j]);
              scores.splice(times, 0, players[i]);
              times++;
            }*/
            var playersFinal = [];
            //const scoresFinal = { ...scores }; //shallow
            //var scoresFinal = Object.assign({}, scores); //shallow
            var scoresFinal = JSON.parse(JSON.stringify(scores)); //deep
            //JSON.stringify/parse only work with Number and String and Object literal without function or Symbol properties.
            //deepClone work with all types, function and Symbol are copied by reference.
            scoresFinal.sort(function(a, b) {
              return parseInt(b) - parseInt(a);
            });
            for(var i=0; i<scoresFinal.length; i++){
              var k=i;
              var cambio=false;
              for(var j=0; j<scores.length; j++){
                if(scoresFinal[i]===scores[j]){
                  playersFinal.push(players[j]);
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
              finalString+=(i/2===0 ? emojiCharacters.first_place : (i/2===1 ? emojiCharacters.second_place : (i/2===2 ? emojiCharacters.third_place : "<:Polpuccino:630329792302022666>")))+' '+scoresFinal[i/2]+' '+playersFinal[i/2]+'\r\n';
            }
            var embed = new Discord.MessageEmbed().setColor('#771177');
            embed.addField('Classifica sessione n°'+`${args[0]}`, finalString, true);
            return msg.channel.send(embed);
        });
        

    }//else{
      //return msg.channel.send(`Too many or too less arguments, it's needed the list number, the member and the number of points (it could be also negative)`);
    //}
    //const client = new Discord.Client();
    //function emoji (name/*, id, message*/) {
      //return client.emojis.find(emoji => emoji.name === name).toString()
      //return client.emojis.get(id).toString();
      //return message.guild.emojis.get(id).toString();
    //}
  },
};
