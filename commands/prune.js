

module.exports = { //TODO Substitute with the function
	name: 'prune',
    display: false,
    cooldown: 5,
    description: "Delete some messages",
    usage: "57",
    warning: "With the number is considered also the message .prune",
	execute(msg, args) {//just if you can manage msgs
        if(msg.member.hasPermission('KICK_MEMBERS')){
            const amount = parseInt(args[0]);//for 2-100 an 1-99 problem you can also add a +1 here

            if (isNaN(amount)) {
              return msg.reply('that doesn\'t seem to be a valid number.');
            } else if (amount < 1 || amount > 99) {//limitation of bulkDelete
              return msg.reply('you need to input a number between 1 and 99.');//normally it is between 2 and 100 but it counts also  !purse {number} msg
            }

            msg.channel.bulkDelete(amount, true)
                .catch(err => {// if all are older than 2 weeks it will still throw an error so we had to catch it
                      console.error(err);
                      msg.channel.send('there was an error trying to prune msgs in this channel!');
                });
        }
	},
};