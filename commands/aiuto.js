module.exports = {
	name: 'aiuto',
	description: 'View commands usable',
	execute(message, args) {
      var msg=message;
      return msg.channel.send('Hey ciao amor! Questi al momento sono i miei comandi:\n');// senza punto e virgola spamma
	},
};