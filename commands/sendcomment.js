const DiscordInterfaceUtilities = require("../utilities/dsiUtilities");
const DatabaseUtilities = require("../utilities/dbUtilities");
const Discord = require("discord.js");
const { defaultColor, numberPlayersPerMatch } =require("../config.json");

module.exports = {
    name: 'sendcomment',
    display: true,
    aliases: [ "sc" ],
    cooldown: 5,
    description: "Send a comment regarding the server where you are",
    usage: " I'm commenting something just like this",
    warning: "You are not doing anything, all it has to been processed by admins",
    execute: async function(msg, args) { //I don't use a listener in the lobby and get one because I can end the collector but it will be difficult send another one to overwrite a first comment with a second
        //take match stats

        const lobby = DiscordInterfaceUtilities.INSTANCE.getLobbyId(msg.channel.id);//Check if it's used out of lobby channels
        if(lobby){

            //Making an embed to don't allow people modify the message and put another content/saving the string/aesthetic
            let embed = new Discord.MessageEmbed()
                .setTitle("Comment to send")
                .setDescription("Add a reaction ✅ to send, keep in mind that you could redo this command to overwrite a previous comment set to this match")
                .setColor(defaultColor)
                .addField(msg.author.tag, args.join(" "))
                .setTimestamp(Date.now());
            const lobbymsg = await msg.channel.send(embed);
            await lobbymsg.react('✅');

            //Collection of partecipants reactions
            const filter = async (reaction, user) => {
                if(user===msg.author){
                    reaction.users.remove(user.id);
                    (await user.createDM()).send(`You can't react to your message, wait the others`);
                    return false;
                }
                if (!await DatabaseUtilities.INSTANCE.isUserInALobby(user.id) === lobby) {
                    reaction.users.remove(user.id);
                    (await user.createDM()).send(`You are not in this lobby, why are you seeing this channel?!`);
                    return false;
                }
                return reaction.emoji.name === '✅' /*&& controlli user è iscritto*/ ;// && user.id === message.author.id
            };

            const collector = lobbymsg.createReactionCollector(filter, { dispose: true, max: Math.trunc(numberPlayersPerMatch / 4 * 3) });

            collector.on('collect', async (reaction, user) => {
            });

            collector.on('remove', async (reaction, user) =>{
            });

            collector.on('end', async collected => {
                await DatabaseUtilities.INSTANCE.setComment(lobby, args.join(" "));
                const { commands } = DiscordInterfaceUtilities.INSTANCE.client;
                await commands.get("report").report(msg, args, lobby);
                msg.channel.send(`Comment set and ready to be pushed!`);
            });
        }
    }
}