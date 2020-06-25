module.exports = {
    name: 'points',
    aliases: ['p', 'addpoints'],
      description: 'Add points to a user',
      execute(message, args) {
          var msg=message;
          if (!args) {
            return msg.channel.send(`You need to specify the list number, the member and the number of points (it could be also negative)Your avatar: <${msg.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
          }
          if(args.length==3){
            var fs = require("fs");
            fs.readFileSync("./listes/"+args[0].toString()+'.txt', 'utf8', function (err, data) {
                msg.channel.send('Ciao');
                if (err) {
                   return console.error(err);
                }
                const contents = data.split(/*' '*// +/||/\n/);//regex: regular expression
                for(var i=0; i<contents.length; i++){
                    msg.channel.send(`${contents[i]}`);
                }
            });
          }else{
            return msg.channel.send(`Too many or too less arguments, it's needed the list number, the member and the number of points (it could be also negative)`);
          }
          return msg.channel.send(avatarList);
      },
  };