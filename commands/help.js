const Discord = require('discord.js');
const { prefix, defaultColor } = require('../config.json');

module.exports = {
	name: 'help',
	display: true,
	aliases: ['h', 'commands'],
	cooldown: 5,
	description: 'View commands usable',
	usage: '[command name]',
	execute(msg, args) {
		let embed=new Discord.MessageEmbed();
		const { commands } = msg.client;
		if (!args.length) {
			//embed.setDescription('Hi luv 🤍!');
			embed.addField('These are my commands right now:', commands.filter(command => command.display).map(command => command.name).join(', '))
				.setFooter(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`)
				.setColor(defaultColor);

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

		embed.setTitle(`**Name:** ${command.name}`)
			.setColor(defaultColor);

		if (command.aliases) embed.addField(`**Aliases:**`, `${command.aliases.join(', ')}`);
		if (command.description) embed.addField(`**Description:**`, `${command.description}`);
		if (command.usage) embed.addField(`**Usage:**`, `${prefix}${command.name} ${command.usage}`);
		if (command.warning) embed.addField(`**Warning:**`, `${command.warning}`);

		embed.addField(`**Cooldown:**`, `${command.cooldown || 3} second(s)`);

		msg.channel.send(embed);
	},
};