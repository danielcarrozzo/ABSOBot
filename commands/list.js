module.exports = {
    name: 'list',
    aliases: ['l'],
    description: 'Show the list',
    execute(message, args) {
        var msg=message;
        if (!args) {
        return msg.channel.send(`You need to specify the list number`);
        }
        if(args.length==1){
        
        }else{
        return msg.channel.send(`Too many or too less arguments, it's needed the list number, the member and the number of points (it could be also negative)`);
        }
        return msg.channel.send(avatarList);
    },
};