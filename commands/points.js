module.exports = {
  name: 'points',
  aliases: ['a', 'p', 'addpoints'],
    description: 'Add points to a user',
    execute(message, args) {
      var msg=message;
      if(message.author.id==="246710308817731585"||message.author.id==="308273491541622794"){
        if (/*!args*/args.length===0) {
          return msg.channel.send(`You need to specify the list number, the member and the number of points to add (it could be also negative)`);
        }else if(args.length==3){
          var fs = require('fs');
          var content;
          var dataToUse;
          fs.readFile(/*'./listes/'+args[0]+*/'listes/'+args[0]+'.txt', 'utf8', function read(err, data) {
            if (err) {
                return console.error(err);
            }
            //console.log(typeof data);
            //console.log(data);
            content=data;
            //console.log(typeof content);
            //console.log(content);
            dataToUse=content.split("\r\n");
            dataToUse.pop();//remove the last caused by the for at the end of the commandm, the file will ever finish with a \r\n          //console.log(typeof dataToUse);
            //Idk if it throws an exception
            //console.log(dataToUse);
            //msg.channel.send(dataToUse[0]);
            var newPlayer=true;
            for(var i=0; i<dataToUse.length; i+=2){
              if(dataToUse[i]===args[1]){
                var oldPoints=parseInt(dataToUse[i+1]);
                var newPoints=oldPoints+parseInt(args[2]);
                dataToUse[i+1]=newPoints.toString();
                msg.channel.send("The new score is "+`${dataToUse[i+1]}`+" for "+`${dataToUse[i]}`);
                newPlayer=false;
                fs.appendFile('listes/log.txt', 'add'+` `+`${args[0]}`+` `+`${msg.author.username}`+` `+`${dataToUse[i]}`+` `+`${newPoints}`+` `+`${oldPoints}`+` `+`${args[2]}`+`\r\n`, function (err) {
                  if (err) {
                    //throw err;
                    return console.error(err);
                  }
                });
              }
            }
            if(newPlayer){
              //dataToUse.push(args[1]);//può diventare un writeFile
              //dataToUse.push(args[2]);
              msg.channel.send("The new score is "+`${args[1]}`+" for "+`${args[2]}`);
              fs.appendFile('listes/'+args[0]+'.txt', `${args[1]}`+`\r\n`+`${args[2]}`+`\r\n`, function (err) {
                if (err) {
                  //throw err;
                  return console.error(err);
                }
              });
              fs.appendFile('listes/log.txt', 'add'+` `+`${args[0]}`+` `+`${msg.author.username}`+` `+`${args[1]}`+` `+`${args[2]}`+` `+`0`+` `+`${args[2]}`+`\r\n`, function (err) {
                if (err) {
                  //throw err;
                  return console.error(err);
                }
              });
            }else{
              var finalString="";
              for(var i=0; i<dataToUse.length; i++){
                finalString+=dataToUse[i]+"\r\n";
              }
              fs.writeFile('listes/'+args[0]+'.txt', finalString, function(err, result) {
                if (err) {
                  return console.error(err);
                }
              });
            }
          });
          //msg.channel.send(`${dataToUse.length}`);
          //for(var i=0; i<dataToUse.length; i++){
              //msg.channel.send(`Ciao+${dataToUse.get}`);
          //}
          //fs.writeFile();
          //msg.channel.send(dataToUse);
          //const contents = dataToUse.split(/*' '*// +/||/\n/);//regex: regular expression
          //for(var i=0; i<contents.length; i++){
          //    msg.channel.send(`${contents[i]}`);
          //}
        }else{
          return msg.channel.send(`Too many or too less arguments, it's needed the list number, the member and the number of points (it could be also negative)`);
        }
      }else{
        return msg.channel.send('Dai non sono mica messo così male come Bot. Te invece mi sembri sufficientemente disperato...');
      }
    },
  };

  //function readAll(){
    
    //dataToUse=data;
  //}