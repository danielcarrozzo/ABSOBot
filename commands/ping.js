module.exports = {
	name: 'ping',
  cooldown: 5,
	description: 'Ping and Pong',
	execute(message, args) {
        var msg=message;
      return msg.channel.send('Pong');
    },
};