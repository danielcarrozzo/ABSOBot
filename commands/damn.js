const emojiCharacters = require('../emojiCharacters');

module.exports = {
  name: 'damn',
  aliases: ['da'],
  description: 'Write damn',
  execute: async function(client, msg, args) {
    if (args.length===0) {
        msg.channel.send(emojiCharacters.damn);
        msg.delete().catch(error => {
            // Only log the error if it is not an Unknown Message error
          if (error.code !== 10008/*Discord.Constants.APIErrors.UNKNOWN_MESSAGE */) {
            console.error('Failed to delete the msg:', error);
          }
        });
    }
  },
};