const emojiCharacters = require('../emojiCharacters');

module.exports = {
  name: 'damn',
  aliases: ['da'],
  description: 'Write damn',
  execute: async function(msg, client, args) {
    if (args.length===0) {
        msg.channel.send(emojiCharacters.damn);
        utilities.delete_msg(msg);
    }
  },
};