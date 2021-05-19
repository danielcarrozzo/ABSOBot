const Discord = require('discord.js');
const DatabaseUtilities = require("../utilities/dbUtilities");
const DiscordInterfaceUtilities = require("../utilities/dsiUtilities");
const { wonderfulMatchmaking } = require("../utilities/externalUtilities");
const { channel_ranking, defaultColor, channelRanking, discordServer, numberPlayersPerMatch, discordGuild/*, number_lobbies*/ } = require('../config.json');

module.exports = {
    name: 'endmatch',
    display: true,
    aliases: [ "em" ],
    cooldown: 5,
    description: "Set the results of a match",
    execute: async function(msg, args) {
        return endingMatch(msg, args);
    }
}

endMatch =
    async (lobby, msg, args) => {
        await msg.react('✅');

        //Collection of partecipants reactions
        const filter = async (reaction, user) => {
            if (!await DatabaseUtilities.INSTANCE.isInThisLobby(user.id, lobby)) {
                await reaction.users.remove(user.id);
                const dmChannel=await user.createDM();
                await dmChannel.send(`You are not in this lobby, why are you seeing this channel?!`);
                return false;
            }
            return reaction.emoji.name === '✅' /*&& controlli user è iscritto*/;// && user.id === message.author.id
        };

        const collector = msg.createReactionCollector(filter, { dispose: true, max: Math.trunc(numberPlayersPerMatch/4*3) });

        collector.on('collect', (reaction, user) => {
        });

        collector.on('remove', (reaction, user) =>{
        });

        collector.on('end', async collected => {
            //lobbymsg.edit(embed);
            //createMatch(lobbymsg);
            //return startingMatch(msg, collector.users);
            //return doAll(); //I have to return this async
            const lobbyData = DiscordInterfaceUtilities.INSTANCE.getLobbyData(lobby);
            const discordGuild = await DiscordInterfaceUtilities.INSTANCE.getTournamentGuild(discordServer);
            const roleAlpha = await DiscordInterfaceUtilities.INSTANCE.getRole(discordGuild, lobbyData.alpha);
            const roleBeta = await DiscordInterfaceUtilities.INSTANCE.getRole(discordGuild, lobbyData.beta);

            //Pick participants from Lobby
            const participants=await DatabaseUtilities.INSTANCE.getUsersInALobby(lobby);
            //Create match
            const matchId=await DatabaseUtilities.INSTANCE.createMatch(lobby, args);
           // await DatabaseUtilities.INSTANCE.addUsersPlayMatch(participants);
            //Removing role, adding points and add in played
            await Promise.all(
                participants.map(async participant => {
                    try{
                        const member = await DiscordInterfaceUtilities.INSTANCE.getMember(discordGuild, participant.discordid);
                        if(participant.team){
                            await member.roles.remove(roleAlpha);
                        }else{
                            await member.roles.remove(roleBeta);
                        }
                        //Add points
                        await DatabaseUtilities.INSTANCE.addPoints(participant, args);
                        await DatabaseUtilities.INSTANCE.addUsersPlayMatch(participant, matchId);
                    }catch(err){
                        console.log(err);
                    }
                })
            )
            DatabaseUtilities.INSTANCE.deletePlayersInLobby(lobby);
            DatabaseUtilities.INSTANCE.setLobbyStatus(lobby, 0);
            const info=await DatabaseUtilities.INSTANCE.getInfo();
            repostRanking([info.currentweek]);
        });
    }

endingMatch =
    async (msg, args) => {
        const lobby = DiscordInterfaceUtilities.INSTANCE.getLobbyId(msg.channel.id);//Check if it's used out of lobby channels
        if(lobby){

            //collection
            //checks
            switch(args.length){
                case 3:
                    //set event
                    switch(args[2]){
                        case 'ab':
                        case 'abandonment':

                            break;
                        case '':
                            break;
                        default:
                            msg.channel.send('Watch out, you didn\'t send a right event, pls send again the message and vote it.\n(I\'ve deleted the other one to avoid wrong results)');
                    }
                    if(parseInt(args[0])+parseInt(args[1])<await DatabaseUtilities.INSTANCE.getMatchesToPlay()) {
                        await endMatch(lobby, msg, args);
                    }
                    break;
                case 2:
                    if(parseInt(args[0])+parseInt(args[1])===await DatabaseUtilities.INSTANCE.getMatchesToPlay()){
                        await endMatch(lobby, msg, args);
                    }

                    //set match
                    //await DatabaseUtilities.INTERFACE.
                    //    await DatabaseUtilities.INTERFACE.queryRunner(`DELETE FROM JoinedIn WHERE LobbyId=${lobby}`);
                    //await DatabaseUtilities.INTERFACE.setLobbyStatus(lobby, 0);
                    //send match on results channel
                    //add match

                    //add points

                    //repost ranking
                    //remove roles

                    //member.roles.remove(this.dsi_get_team_roles(roles_lobbies))
                    break;
                default:
                    msg.channel.send('You didn\'t set the right number of arguments inserting');
            }
        }
    }

    /*if(){
        Collector with reactions
            Promise.all
        member.roles.remove(this.dsi_get_team_roles(roles_lobbies))

        db_utilities
    else
        //pusho la query
        //tolgo i permessi
        //
        this.dsi_repost_ranking(msg, [currentWeek]);
        //empty chat to don't show users what it has been written. At the end cause dsi_show_ranking delete the message for better styling. I can bring it out but I prefer the deletion only if all worked in that function.
    }*/


repostRanking =
    async (args) => {
        const textChannelRanking = await DiscordInterfaceUtilities.INSTANCE.getChannel(channelRanking);
        await textChannelRanking.bulkDelete(10, true);
        const { commands } = DiscordInterfaceUtilities.INSTANCE.client;
        await commands.get("ranking").ranking(textChannelRanking, args);
    }




