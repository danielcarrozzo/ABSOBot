const Discord = require('discord.js');
const emojiCharacters = require('../emojiCharacters');

module.exports = {
  name: 'loser',
  aliases: ['lo'],
  description: 'Add points to a user',
  execute(message, args) {
    var msg=message;
    if (args.length===0) {
        return msg.channel.send(emojiCharacters.loser);
    }
  },
};