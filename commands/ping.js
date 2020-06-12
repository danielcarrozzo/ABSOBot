module.exports = {
	name: 'ping',
	description: 'Ping and Pong',
	execute(message, args) {
        var msg=message;
      return msg.channel.send('Pong');
    },
};