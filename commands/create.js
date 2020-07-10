module.exports = {
	name: 'create',//anche c
	description: 'Create all',
	execute(client, message, args, prefix) {
        var msg=message;
        //creare il tutto
          msg.channel.send('I created the base for all what you need to do!');
	},
};