const Discord = require('discord.js');
const emojiCharacters = require('../emojiCharacters');

module.exports = {
  name: 'remove',
  aliases: ['re'],
  description: 'Add points to a user',
  execute(client, message, args, prefix) {
    var msg=message;
    if(message.author.id==="246710308817731585"||message.author.id==="308273491541622794"){
      if (args.length===0) {
        return msg.channel.send(`You need to specify the list number and the member (It will be removed the first player with that name (No caps friendly))`);
      }else if(args.length===2){
        var fs = require('fs');
        var dataToUse;
        fs.readFile('listes/'+args[0]+'.txt', 'utf8', function read(err, data) {
          if (err) {
              return console.error(err);
          }
          dataToUse=data.split("\r\n");
          dataToUse.pop();//remove the last caused by the for at the end of the commandm, the file will ever finish with a \r\n          //console.log(typeof dataToUse);
          //Idk if it throws an exception
          //console.log(dataToUse);
          //msg.channel.send(dataToUse[0]);
          for(var i=0; i<dataToUse.length; i+=2){
            if(dataToUse[i]===args[1]){
              var oldScore=dataToUse[i+1];
              msg.channel.send("You are removing "+`${dataToUse[i]}`+" with "+`${dataToUse[i+1]}`+" in list number "+`${args[0]}`);
              dataToUse.splice(i+1, 1);//per capire concettualmente +1, non si può invertire, sennò doppia i
              dataToUse.splice(i, 1);
              msg.channel.send("Done");
              fs.appendFile('listes/log.txt', 'remove '+`${args[0]}`+` `+`${msg.author.username}`+` `+`${args[1]}`+` `+`${oldScore}`+`\r\n`, function (err) {
                if (err) {
                  //throw err;
                  return console.error(err);
                }
              });
            }
          }
          var finalString="";
          for(var i=0; i<dataToUse.length; i++){
            finalString+=dataToUse[i]+"\r\n";
          }
          fs.writeFile('listes/'+args[0]+'.txt', finalString, function(err, result) {
            if (err) {
              return console.error(err);
            }
          });
        });
      }
    }
  },
};
