module.exports = {
  name: 'reload',
  aliases: ['r'],
  description: 'Reloads a command',
  execute(client, msg, args, prefix) {
    if(msg.author.id==="246710308817731585"){
      if (!args.length) return msg.channel.send(`You didn't pass any command to reload, ${msg.author}!`);
        const commandName = args[0].toLowerCase();
        const command = msg.client.commands.get(commandName)
            || msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            
        if (!command) return msg.channel.send(`There is no command with name or alias \`${commandName}\`, ${msg.author}!`);

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
          const newCommand = require(`./${command.name}.js`);//it's a overwrite
            msg.client.commands.set(newCommand.name, newCommand);
        } catch (error) {//it doesn't delete all the command if there is an error
            console.log(error);
            msg.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.msg}\``);
        }

        msg.channel.send(`Command \`${command.name}\` was reloaded!`);
    }else{
        return msg.channel.send('Ao solo KraY reloadda ok?');
    }
  },
};