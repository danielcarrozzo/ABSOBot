const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'View commands usable',
	aliases: ['h', 'commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(msg, client, args) {
		var embed=new Discord.MessageEmbed();
		const { commands } = msg.client;
		if (!args.length) {
			//embed.setDescription('Hi luv 🤍!');
			embed.addField('These are my commands right now:', commands.map(command => command.name).join(', '));
			embed.setFooter(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			/*return msg.author.send(embed)
				.then(() => {
					if (msg.channel.type === 'dm') return;
					msg.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
					msg.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
				});*/
			return msg.channel.send(embed);
		}
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return msg.reply('that\'s not a valid command!');
		}

		embed.setTitle(`**Name:** ${command.name}`);

		if (command.aliases) embed.addField(`**Aliases:**`, `${command.aliases.join(', ')}`);
		if (command.description) embed.addField(`**Description:**`, `${command.description}`);
		if (command.usage) embed.addField(`**Usage:**`, `${prefix}${command.name} ${command.usage}`);
		if (command.warning) embed.addField(`**Warning:**`, `${command.warning}`);

		embed.addField(`**Cooldown:**`, `${command.cooldown || 3} second(s)`);

		msg.channel.send(embed);
	},
};