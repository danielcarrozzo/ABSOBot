const Discord = require('discord.js');
const DatabaseUtilities = require("../utilities/dbUtilities");
const DiscordInterfaceUtilities = require("../utilities/dsiUtilities");
const { channelPastMatches, defaultColor, channelRanking, discordServer, numberPlayersPerMatch } = require('../config.json');
const { positioningEmojis } = require('../specialCharacters');

module.exports = {
    name: 'endmatch',
    display: true,
    aliases: [ "em" ],
    cooldown: 5,
    description: "Set the results of a match.\nCurrent kinds of events:\nabandonment/ab",
    usage: "[Score Team Alpha] [Score Team Beta] [Eventually events]",
    warning: "In case of problems ping admins",
    execute: async (msg, args) => {
        return endingMatch(msg, args);
    }
}

endingMatch =
    async (msg, args) => {
        const lobby = DiscordInterfaceUtilities.INSTANCE.getLobbyId(msg.channel.id);//Check if it's used out of lobby channels
        if ((await DatabaseUtilities.INSTANCE.isUserInALobby(msg.author.id)) === lobby && lobby) { //It also checks if this is a lobby (if it's not )
            let status=0;
            let resultsEmbed = new Discord.MessageEmbed()
                                .setDescription("Add a reaction ✅ to approve. If you don't, just write another message.")
                                .setColor(defaultColor)
                                .setTimestamp(Date.now());
            switch(args.length) {
                case 3://Events
                    switch(args[2]){
                        case 'ab':
                        case 'abandonment':
                            if(parseInt(args[0])+parseInt(args[1])<await DatabaseUtilities.INSTANCE.getMatchesToPlay()) {
                                status=1;

                                msg.channel.send(`Pls <@${msg.author.id}> tag users interested`)

                                //Get people to penalize
                                const filter = async response => { //I divide and I check
                                    if(response.author!==msg.author){
                                        return false;
                                    }
                                    return response.mentions.users.size;
                                };

                                msg.channel.awaitMessages(filter, {max: 1})
                                    .then(async collected => {
                                        let tagsToStamp="";
                                        collected.first().mentions.users.map(user=>tagsToStamp+=`${collected.first().mentions.users.first()!==user?`, `:``}${user.tag}`);
                                        resultsEmbed
                                            .setTitle("Match with abadonment")
                                            .addField(`Team Alpha`, `${args[0]} Points`)
                                            .addField(`Team Beta`, `${args[1]} Points`)
                                            .addField(tagsToStamp, `reported as quit`);
                                        await endMatch(msg, args, lobby, resultsEmbed, status, collected.first().mentions.users);
                                    });
                            }

                            break;
                        default:
                            msg.channel.send('Watch out, you didn\'t send a right event, pls send again the message and vote it.\n(I\'ve deleted the other one to avoid wrong results)');
                    }
                    break;
                case 2:
                    if (parseInt(args[0]) + parseInt(args[1]) === await DatabaseUtilities.INSTANCE.getMatchesToPlay()) {
                        resultsEmbed
                            .setTitle("Match")
                            .addField(`Team Alpha`, `${args[0]} Points`)
                            .addField(`Team Beta`, `${args[1]} Points`)
                        await endMatch(msg, args, lobby, resultsEmbed, status, []);
                    }
                    break;
                default:
                    msg.channel.send('You didn\'t set the right number of arguments inserting');
            }
        }
    }

endMatch = async (msg, args, lobby, resultsEmbed, event, affected) => {
    const resultMessage = await msg.channel.send(resultsEmbed);
    await resultMessage.react('✅');

    //Collection of partecipants reactions
    const filter = async (reaction, user) => {
        if(user===msg.author){
            reaction.users.remove(user.id);
            (await user.createDM()).send(`You can't react to your message, wait the others`);
            return false;
        }
        if (!((await DatabaseUtilities.INSTANCE.isUserInALobby(user.id)) === lobby)) {
            reaction.users.remove(user.id);
            (await user.createDM()).send(`You are not in this lobby, why are you seeing this channel?!`);
            return false;
        }
        return reaction.emoji.name === '✅' /*&& controlli user è iscritto*/;// && user.id === message.author.id
    };

    const collector = resultMessage.createReactionCollector(filter, {
        dispose: true,
        max: Math.trunc(numberPlayersPerMatch / 4 * 3)
    });

    collector.on('collect', (reaction, user) => {
    });

    collector.on('remove', (reaction, user) => {
    });

    collector.on('end', async collected => {
        //Get lobby data and Discord server platforms
        const lobbyData = DiscordInterfaceUtilities.INSTANCE.getLobbyData(lobby);
        const discordGuild = await DiscordInterfaceUtilities.INSTANCE.getGuild(discordServer);
        const roleAlpha = await DiscordInterfaceUtilities.INSTANCE.getRole(discordGuild, lobbyData.alpha);
        const roleBeta = await DiscordInterfaceUtilities.INSTANCE.getRole(discordGuild, lobbyData.beta);

        //Pick participants from Lobby
        const participants = await DatabaseUtilities.INSTANCE.getUsersInALobby(lobby);
        //Create match
        const matchId = await DatabaseUtilities.INSTANCE.insertMatch(lobby, args, null, null);

        //Prepare the message to send in the lobby channel
        let embed = new Discord.MessageEmbed()
            .setTitle(`Results ${args[0]}-${args[1]}`)
            .setDescription(`MatchId: ${matchId}`)
            .setColor(defaultColor)
            .setTimestamp(Date.now());
        let alphaTeamString = "";
        let betaTeamString = "";

        // await DatabaseUtilities.INSTANCE.addUsersPlayMatch(participants);
        //Removing role, adding points and add in played
        await Promise.all(
            participants.map(async participant => {
                const user = await DiscordInterfaceUtilities.INSTANCE.getUser(participant.discordid);
                //Remove role and add its name on the embed to send
                const member = await DiscordInterfaceUtilities.INSTANCE.getMember(discordGuild, participant.discordid);
                if (participant.team) {
                    member.roles.remove(roleAlpha);
                    alphaTeamString += `${user.tag} ${(participant.anchorback ? `<:${positioningEmojis.ab.name}:${positioningEmojis.ab.id}>` : ``)} ${(participant.midsupport ? `<:${positioningEmojis.ms.name}:${positioningEmojis.ms.id}>` : ``)} ${(participant.frontslayer ? `<:${positioningEmojis.fs.name}:${positioningEmojis.fs.id}>` : ``)}\n`
                } else {
                    member.roles.remove(roleBeta);
                    betaTeamString += `${user.tag} ${(participant.anchorback ? `<:${positioningEmojis.ab.name}:${positioningEmojis.ab.id}>` : ``)} ${(participant.midsupport ? `<:${positioningEmojis.ms.name}:${positioningEmojis.ms.id}>` : ``)} ${(participant.frontslayer ? `<:${positioningEmojis.fs.name}:${positioningEmojis.fs.id}>` : ``)}\n`
                }
                //Add players to Play table
                DatabaseUtilities.INSTANCE.insertPlay(participant.userid, matchId, participant.team);
                //console.log(affected)
                //console.log(participant)
                console.log(affected.find(player => {console.log(player, player.id, participant, participant.id); return player.id === participant.discordid}))
                if(affected.find(player => player.id === participant.discordid)) {
                    switch(event){
                        case 1:
                            //Remove points
                            DatabaseUtilities.INSTANCE.removePoints(participant.userid);
                            //Add players to Penalties
                            DatabaseUtilities.INSTANCE.insertPenalty(participant.userid, matchId);
                            break;
                    }
                }else{
                    //Add points
                    DatabaseUtilities.INSTANCE.addPoints(participant, args);
                }
            })
        )

        //Post in channel matches
        embed.addField(`Team Alpha`, alphaTeamString);
        embed.addField(`Team Beta`, betaTeamString);
        const channelPastMatch = await DiscordInterfaceUtilities.INSTANCE.getChannel(channelPastMatches);
        channelPastMatch.send(embed);

        //Conseguences of events


        //Removes players in a lobby, change the lobby status and posts again the ranking
        DatabaseUtilities.INSTANCE.deletePlayersInLobby(lobby);
        DatabaseUtilities.INSTANCE.setLobbyStatus(lobby, 0);
        const info = await DatabaseUtilities.INSTANCE.getInfo();
        repostRanking([info.currentweek]);
    });
}

repostRanking =
    async (args) => {
        const textChannelRanking = await DiscordInterfaceUtilities.INSTANCE.getChannel(channelRanking);
        await textChannelRanking.bulkDelete(10, true);
        const { commands } = DiscordInterfaceUtilities.INSTANCE.client;//I could use also the client using the msg
        await commands.get("ranking").ranking(textChannelRanking, args);
    }




