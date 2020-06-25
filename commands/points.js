module.exports = {
    name: 'points',
    aliases: ['p', 'addpoints'],
      description: 'Add points to a user',
      execute(message, args) {
          var msg=message;
          if (!args) {
            return msg.channel.send(`You need to specify the list number, the member and the number of points (it could be also negative)`);
          }
          if(args.length==3){
            var fs = require('fs');
            var content;
            var dataToUse;
            fs.readFile(/*'./listes/'+args[0]+*/'listes/1.txt', 'utf8', function read(err, data) {
                msg.channel.send('Ciao1');
                if (err) {
                   return console.error(err);
                }
                content=data;
                msg.channel.send(`${content.length}`);
                dataToUse=content.split("\n");
            });
            console.log(dataToUse);
            msg.channel.send(`${dataToUse}`);
            //fs.writeFile();
            //msg.channel.send(dataToUse);
            //const contents = dataToUse.split(/*' '*// +/||/\n/);//regex: regular expression
            //for(var i=0; i<contents.length; i++){
            //    msg.channel.send(`${contents[i]}`);
            //}
          }else{
            return msg.channel.send(`Too many or too less arguments, it's needed the list number, the member and the number of points (it could be also negative)`);
          }
      },
  };

  //function readAll(){
    
    //dataToUse=data;
  //}