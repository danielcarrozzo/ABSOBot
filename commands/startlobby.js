const Discord = require('discord.js');
const DatabaseUtilities = require("../utilities/dbUtilities");
const DiscordInterfaceUtilities = require("../utilities/dsiUtilities");
const { wonderfulMatchmaking } = require("../utilities/externalUtilities");
const { defaultColor, numberPlayersPerMatch, discordServer, messagesStatus, friendcode } = require('../config.json');
const { positioningEmojis } = require('../specialCharacters');

module.exports = {
    name: 'startlobby',
    display: false,
    aliases: [ "sl" ],
    cooldown: 5,
    description: "Send a message for the lobby",
    usage: "",
    warning: "",
    execute: async function(msg, args) {
        if(await DatabaseUtilities.INSTANCE.isAdmin(msg.author.id)){
            const channelmsg = msg.channel;
            msg.delete();
            return createMatch(channelmsg);
        }
    }
}

createMatch =
    async function (channelmsg) {
    //Create lobby message
    let embeded = new Discord.MessageEmbed()
        .setTitle("Lobby")
        .setDescription("Add a reaction ✅ to partecipate")
        .setColor(defaultColor)
        .setTimestamp(Date.now());
    const lobbymsg = await channelmsg.send(embeded);
    await lobbymsg.react('✅');

    //Collection of partecipants reactions
    const filter = async (reaction, user) => {
        //Check subscribed
        if ((await DatabaseUtilities.INSTANCE.getUserByDiscordId(user.id)) === undefined) {
            reaction.users.remove(user.id);
            (await user.createDM()).send(`You are not subscribed, why are you seeing this channel?!`);
            return false;
        }
        //Check if it's banned
        if (await DatabaseUtilities.INSTANCE.isBanned(user.id)) {
            reaction.users.remove(user.id);
            (await user.createDM()).send(`You are banned for a little...`);
            return false;
        }
        //Check if the player can play another match today
        if (await DatabaseUtilities.INSTANCE.isAtLimitOfMatchesToday(user.id)) {
            reaction.users.remove(user.id);
            (await user.createDM()).send(`You have already played the max limit of matches today`);
            return false;
        }
        //Check if it's already in a lobby (It's already started and in the database because there is just one message to create a lobby)
        if (await DatabaseUtilities.INSTANCE.isUserInALobby(user.id)) {
            reaction.users.remove(user.id);
            (await user.createDM()).send(`You are already in a lobby`);
            return false;
        }
        //Check if there is a free lobby
        freeLobby = await DatabaseUtilities.INSTANCE.getStartableLobbies();
        console.log(freeLobby);
        if (!freeLobby) {
            reaction.users.remove(user.id);
            msg.channel.send(`Oh damn, someone tried to participate but there are no free lobbies, pls try again later.\nYou can check the status in <#${messagesStatus.free_lobbies}>`);
            return false;
        }
        return reaction.emoji.name === '✅' /*&& controlli user è iscritto*/;// && user.id === message.author.id
    };

    const collector = lobbymsg.createReactionCollector(filter, {dispose: true, max: numberPlayersPerMatch});

    collector.on('collect', async (reaction, user) => {
        embeded = new Discord.MessageEmbed(embeded).addField((await DiscordInterfaceUtilities.INSTANCE.getUser(user.id)).tag, `Current week points: ${(await DatabaseUtilities.INSTANCE.getCurrentRanking(user.id)).points}`);
        await lobbymsg.edit(embeded);
    });


    collector.on('remove', async (reaction, user) => {
        const p = (await DiscordInterfaceUtilities.INSTANCE.getUser(user.id));
        embeded = new Discord.MessageEmbed(embeded).spliceFields(0, 8, embeded.fields.filter(field => field.name !== p.tag));//Can't use promises in filter or for filter
        await lobbymsg.edit(embeded);
    });

    collector.on('end', async collected => {
        if(true) {//TODO collected > 8
            setTimeout(async () => { //Idk, in the past it doesn't have problems but cause async I think collected comes after this and I got 1, 1+time/1+2+time, 1+2 instead of 1, 1+2, 1+2+time
                embeded = (new Discord.MessageEmbed(embeded)).setFooter(`Match started in ${Math.floor((Date.now() - lobbymsg.createdAt) / 1000 / 60 / 60)} hours ${Math.floor((Date.now() - lobbymsg.createdAt) / 1000 / 60 % 60)} minutes and ${Math.floor((Date.now() - lobbymsg.createdAt) / 1000 % 60 % 60)} seconds!`);//Gives problem if named embed or embedded
                await lobbymsg.edit(embeded);
            }, 100);

            //Send another message
            createMatch(lobbymsg);

            //Take a lobby
            const lobby = await DatabaseUtilities.INSTANCE.getStartableLobbies(); //Semaphore if I haven't just one message for create a lobby and a check if there are not (now I make it when you react)
            await DatabaseUtilities.INSTANCE.setLobbyStatus(lobby, 1);

            //Collecting users from database
            let users = [];
            await Promise.all(
                collector.users.map(async (user) => {
                    users.push((await DatabaseUtilities.INSTANCE.getUserByDiscordId(user.id)));
                })
            )

            //Matchmaking
            users = wonderfulMatchmaking(users);

            //Get lobby data and Discord server platforms
            const lobbyData = DiscordInterfaceUtilities.INSTANCE.getLobbyData(lobby);
            const discordGuild = await DiscordInterfaceUtilities.INSTANCE.getGuild(discordServer);
            const roleAlpha = await DiscordInterfaceUtilities.INSTANCE.getRole(discordGuild, lobbyData.alpha);
            const roleBeta = await DiscordInterfaceUtilities.INSTANCE.getRole(discordGuild, lobbyData.beta);

            //Prepare the message to send in the lobby channel
            let embed = new Discord.MessageEmbed()
                .setTitle("Lobby")
                .setDescription("Teams")
                .setColor(defaultColor)
                .setTimestamp(Date.now());
            let alphaTeamString = "";
            let betaTeamString = "";

            //Insert the player in the lobby on db, giving the role and adding it's name to the strings on the message to send in the channel
            await Promise.all(
                users.map(async (userData) => {
                    const user = await DiscordInterfaceUtilities.INSTANCE.getUser(userData.discordid);
                    try {
                        //Add role and add its profile on the embed to send
                        const member = await DiscordInterfaceUtilities.INSTANCE.getMember(discordGuild, userData.discordid);
                        let codeToStamp = "";
                        if (userData.friendcode) {
                            for (let i = 0; i < friendcode.friendcodeSize; i += friendcode.sectionSize) {
                                codeToStamp += (i !== 0 ? "-" : "") + userData.friendcode.substr(i, friendcode.sectionSize);
                            }
                        }
                        if (userData.team) {
                            member.roles.add(roleAlpha);
                            alphaTeamString += `${user.tag} ${(userData.anchorback ? `<:${positioningEmojis.ab.name}:${positioningEmojis.ab.id}>` : ``)} ${(userData.midsupport ? `<:${positioningEmojis.ms.name}:${positioningEmojis.ms.id}>` : ``)} ${(userData.frontslayer ? `<:${positioningEmojis.fs.name}:${positioningEmojis.fs.id}>` : ``)}\n${codeToStamp === "" ? `No data` : codeToStamp}\n`
                        } else {
                            member.roles.add(roleBeta);
                            betaTeamString += `${user.tag} ${(userData.anchorback ? `<:${positioningEmojis.ab.name}:${positioningEmojis.ab.id}>` : ``)} ${(userData.midsupport ? `<:${positioningEmojis.ms.name}:${positioningEmojis.ms.id}>` : ``)} ${(userData.frontslayer ? `<:${positioningEmojis.fs.name}:${positioningEmojis.fs.id}>` : ``)}\n${codeToStamp === "" ? `No data` : codeToStamp}\n`
                        }
                        //Insert in Joined In
                        DatabaseUtilities.INSTANCE.insertJoinedIn(userData.userid, lobby, userData.team);
                    } catch (err) {
                        console.log(err);
                    }
                })
            )
            //await lobby_channel.bulkDelete(99, true);

            //Send the message in the lobby chat
            embed.addField("Team Alpha", alphaTeamString);
            embed.addField("Team Beta", betaTeamString);
            const channelLobby = await DiscordInterfaceUtilities.INSTANCE.getChannel(lobbyData.channel);
            channelLobby.send(embed);
            return channelLobby.send(`<@&${lobbyData.alpha}> <@&${lobbyData.beta}>`)
        }else{
            channelmsg.send(`The collection is not full`);
        }
    });
}