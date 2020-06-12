module.exports = {
	name: 'createlist',//anche cl
	description: 'Add a list in all the structure',
	execute(message, args) {
        var msg=message;
        if (!args.length) {
          return msg.channel.send(`You didn't provide any arguments, ${msg.author}! Pls add a name for the list`);
        }
        msg.channel.send(`First argument: ${args[0]}`);
	},
};