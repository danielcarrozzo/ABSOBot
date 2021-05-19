const Discord = require('discord.js');
const DatabaseUtilities = require("../utilities/dbUtilities");
const DiscordInterfaceUtilities = require("../utilities/dsiUtilities");
const { wonderfulMatchmaking } = require("../utilities/externalUtilities");
const { defaultColor, numberPlayersPerMatch, discordServer, messagesStatus/*, number_lobbies*/ } = require('../config.json');
const { playRoles } = require('../specialCharacters');

module.exports = {
    name: 'startlobby',
    display: true,
    aliases: [ "sl" ],
    cooldown: 5,
    description: "Start a new tournament lobby",
    execute: async function(msg, args) {
        return createMatch(msg);
    }
}

createMatch=async function(msg){
    //Create lobby message
    let embed = new Discord.MessageEmbed()
        .setTitle("Lobby")
        .setDescription("Add a reaction ✅ to partecipate")
        .setColor(defaultColor)
        .setTimestamp(Date.now());
    const lobbymsg = await msg.channel.send(embed);
    await lobbymsg.react('✅');

    //Collection of partecipants reactions
    const filter = async (reaction, user) => {
        //Check subscribed
        const isSignup=await DatabaseUtilities.INSTANCE.getUserByDiscordId(user.id);//Can't put await async function with .length near
        if(!isSignup.length){
            await reaction.users.remove(user.id);//Find a way to remove from the collection
            const dmChannel=await user.createDM();
            await dmChannel.send(`You are not subscribed, why are you seeing this channel?!`);
            return false;
        }
        //Check if it's banned
        if(await DatabaseUtilities.INSTANCE.isBanned(user.id)){
            await reaction.users.remove(user.id);
            const dmChannel=await user.createDM();
            await dmChannel.send(`You are banned for a little...`);
            return false;
        }
        //matches per day
        if(await DatabaseUtilities.INSTANCE.isAtLimitOfMatchesToday(user.id)){
            await reaction.users.remove(user.id);
            const dmChannel=await user.createDM();
            await dmChannel.send(`You have already played the max limit of matches today`);
            return false;
        }
        //Check if it's already in a lobby <-- easy cause I have a message one by one
        if(DatabaseUtilities.INSTANCE.isUserInALobby(user.id).length){
            await reaction.users.remove(user.id);
            const dmChannel=await user.createDM();
            await dmChannel.send(`You are already in a lobby`);
            return false;
        }
        //Check if there is a free lobby
        if(!await DatabaseUtilities.INSTANCE.getStartableLobbies()){
            //remove reaction
            console.log(collector);
            await reaction.users.remove(user.id);
            console.log(collector);
            msg.channel.send(`Oh damn, someone tried to participate but there are no free lobbies, pls try again later.\nYou can check the status in <#${messagesStatus.free_lobbies}>`);
            return false;
        }
        return reaction.emoji.name === '✅' /*&& controlli user è iscritto*/ ;// && user.id === message.author.id
    };

    const collector = lobbymsg.createReactionCollector(filter, { dispose: true, max: numberPlayersPerMatch });

    collector.on('collect', async (reaction, user) => {
        //return dm
        DiscordInterfaceUtilities.INSTANCE.getUser(user.id).then((userGot) =>{
            embed=new Discord.MessageEmbed(embed).addField(userGot.tag, "placeholder switch code");
            lobbymsg.edit(embed);
        })
    });

    collector.on('remove', (reaction, user) =>{
        DiscordInterfaceUtilities.INSTANCE.getUser(user.id).then((userGot) =>{
            embed=new Discord.MessageEmbed(embed).spliceFields(0, 8, embed.fields.filter((field) => field.name != userGot.tag));
            lobbymsg.edit(embed);
        })
    });

    collector.on('end', collected => {
        embed.setFooter(`Match started in ${Math.floor((Date.now()-lobbymsg.createdAt)/1000/60/60)} hours ${Math.floor((Date.now()-lobbymsg.createdAt)/1000/60%60)} minutes and ${Math.floor((Date.now() - lobbymsg.createdAt) / 1000 % 60 % 60)} seconds!`);
        lobbymsg.edit(embed);
        createMatch(lobbymsg);
        return startingMatch(msg, collector.users);//gives the ids
    });
}

startingMatch =
    async (msg, users) => {
        let usersData=[];
        await Promise.all(
            users.map(async (user) => {
                const tempUser= await DatabaseUtilities.INSTANCE.getUserByDiscordId(user.id);
                usersData.push(tempUser[0]);
            })
        )
        usersData = wonderfulMatchmaking(usersData);
        const lobby=await DatabaseUtilities.INSTANCE.startNewMatch(usersData);
        if(!lobby){
            return console.log("Out");
        }
        return startNewMatch(msg, lobby, usersData);
    }

startNewMatch =
    async (msg, lobby, usersData) => {
        const lobbyData = DiscordInterfaceUtilities.INSTANCE.getLobbyData(lobby);
        const discordGuild = await DiscordInterfaceUtilities.INSTANCE.getTournamentGuild(discordServer);
        const roleAlpha = await DiscordInterfaceUtilities.INSTANCE.getRole(discordGuild, lobbyData.alpha);
        const roleBeta = await DiscordInterfaceUtilities.INSTANCE.getRole(discordGuild, lobbyData.beta);
        await Promise.all(
            usersData.map(async (userData)=>{
                try{
                    const member = await DiscordInterfaceUtilities.INSTANCE.getMember(discordGuild, userData.discordid);
                    if(userData.team){
                        member.roles.add(roleAlpha);
                    }else{
                        member.roles.add(roleBeta);
                    }
                }catch(err){
                    console.log(err);
                }
            })
        )
        //const lobby_channel = await this.dsi_get_channel(this.dsi_get_lobby_channel(lobby));
        //await lobby_channel.bulkDelete(99, true);
        let embed = new Discord.MessageEmbed()
            .setTitle("Lobby")
            .setDescription("Teams")
            .setColor(defaultColor)
            .setTimestamp(Date.now());
        let alphaTeamString="";
        let betaTeamString="";
        await Promise.all(
            usersData.map(async userData => {
                const user = await DiscordInterfaceUtilities.INSTANCE.getUser(userData.discordid);
                if(userData.team){
                    alphaTeamString+=`${user.tag} ${(userData.anchorback?`<:${playRoles.ab.name}:${playRoles.ab.id}>`:``)} ${(userData.midsupport?`<:${playRoles.ms.name}:${playRoles.ms.id}>`:``)} ${(userData.frontslayer?`<:${playRoles.fs.name}:${playRoles.fs.id}>`:``)}`
                }else{
                    betaTeamString+=`${user.tag} ${(userData.anchorback?`<:${playRoles.ab.name}:${playRoles.ab.id}>`:``)} ${(userData.midsupport?`<:${playRoles.ms.name}:${playRoles.ms.id}>`:``)} ${(userData.frontslayer?`<:${playRoles.fs.name}:${playRoles.fs.id}>`:``)}`;
                }
            })
        );
        embed.addField("Team Alpha", alphaTeamString);
        embed.addField("Team Beta", betaTeamString);
        const channelLobby = await DiscordInterfaceUtilities.INSTANCE.getChannel(lobbyData.channel);
        return channelLobby.send(embed);
        //await lobbymsg.react('✅');

        //const res = await db_utilities.INSTANCE.db_query_runner('SELECT * FROM Ranking INNER JOIN Users ON ranking.userid = users.userid WHERE WeekId='+args[0]+' ORDER BY Points ASC;');
        /*await Promise.all(
            res.rows.map(async (row, index) => {
                await this.dsi_get_user(row.discordid).then(async user => {
                    //check if it's admin or winner of a week so ()
                    if(index%capability===0){
                        toSend='';
                    }
                    toSend += (index+1)+'. '+ user.username + ': ' + row.points + '\r\n';
                    if(index%capability===capability-1){
                        embed.addField('Week: '+args[0], toSend, false);
                        channel.send(embed);
                        indexG=index;
                    }
                });
            })
        );*/
        //matchmaking
        //pusho la query
        //ruoli agli 8

    }