const Discord = require('discord.js');
const emojiCharacters = require('../emojiCharacters');

module.exports = {
  name: 'loser',
  aliases: ['lo'],
  description: 'Write loser',
  execute(client, message, args, prefix) {
    var msg=message;
    if (args.length===0) {
        for(var i=0; i<100; i++){
            msg.channel.send('Rain ti apprezzo e ti ammiro tantissimo');
        }
        message.delete().catch(error => {
            // Only log the error if it is not an Unknown Message error
          if (error.code !== 10008/*Discord.Constants.APIErrors.UNKNOWN_MESSAGE */) {
            console.error('Failed to delete the message:', error);
          }
        });
    }
  },
};