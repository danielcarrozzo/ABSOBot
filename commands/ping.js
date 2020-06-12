module.exports = {
	name: 'ping',
	description: 'Ping and Pong',
	execute(message, args) {
      return msg.channel.send('Pong');
    },
};