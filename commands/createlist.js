module.exports = {
	name: 'createlist',//anche cl
    display: false,
	description: 'Add a list in all the structure',
	execute(msg, client, args) {
        if (!args.length) {
          return msg.channel.send(`You didn't provide any arguments, ${msg.author}! Pls add a name for the list`);
        }
        msg.channel.send(`First argument: ${args[0]}`);
	},
};