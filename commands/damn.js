const Discord = require('discord.js');
const emojiCharacters = require('../emojiCharacters');

module.exports = {
  name: 'damn',
  aliases: ['da'],
  description: 'Write damn',
  execute(client, message, args, prefix) {
    var msg=message;
    if (args.length===0) {
        msg.channel.send(emojiCharacters.damn);
        message.delete().catch(error => {
            // Only log the error if it is not an Unknown Message error
          if (error.code !== 10008/*Discord.Constants.APIErrors.UNKNOWN_MESSAGE */) {
            console.error('Failed to delete the message:', error);
          }
        });
    }
  },
};