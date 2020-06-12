module.exports = {
	name: 'prune',
	description: 'Delete some messages',
	execute(message, args) {//just if you can manage messages
        const amount = parseInt(args[0]);//for 2-100 an 1-99 problem you can also add a +1 here
      
        if (isNaN(amount)) {
          return message.reply('that doesn\'t seem to be a valid number.');
        } else if (amount < 1 || amount > 99) {//limitation of bulkDelete
          return message.reply('you need to input a number between 1 and 99.');//normally it is between 2 and 100 but it counts also  !purse {number} message
        }

        //message.channel.bulkDelete(amount);
        //message.channel.bulkDelete(amount, true); //messages older than 2 weeks now have throw errors catched with true
        message.channel.bulkDelete(amount, true).catch(err => {// if all are older than 2 weeks it will still throw an error so we had to catch it
          console.error(err);
          message.channel.send('there was an error trying to prune messages in this channel!');
        });
	},
};