const DatabaseUtilities = require("../utilities/dbUtilities");
const DiscordInterfaceUtilities = require("../utilities/dsiUtilities");
const { roleEligible, roleParticipants } = require("../config.json");

module.exports={
    name: 'signup',
    display: true,
    aliases: [ "su" ],
    cooldown: 5,
    description: "Subscribe to the tournament",
    usage: "",
    warning: "If you change account, come out and come in from the server pls ask help to admins",
    execute: async function(msg, args){
        console.log(msg.member.roles.cache);
        if(msg.member.roles.cache.has(roleEligible)) {
            //Add to database
            await DatabaseUtilities.INSTANCE.insertPlayer(msg.author.id);
            let info = await DatabaseUtilities.INSTANCE.getInfo();
            const numberOfWeeks = (await DatabaseUtilities.INSTANCE.getWeeks()).length;
            for (; info.currentweek <= numberOfWeeks; info.currentweek++) {
                const user = await DatabaseUtilities.INSTANCE.getUserByDiscordId(msg.author.id);
                await DatabaseUtilities.INSTANCE.insertRanking(info.currentweek, user.userid);
            }

            //Give role
            let role = await DiscordInterfaceUtilities.INSTANCE.getRole(msg.guild, roleParticipants)//msg.guild.roles.cache.find(r => r.id === roleParticipants);
            try {
                await msg.member.roles.add(role);
            } catch (err) {
                console.log(err);
            }

            msg.channel.send('Signed up!');
        }else{
            msg.channel.send(`You don't seems to be eligible to play this tournament yest. Pls send your ranks in <#>`)
        }
    }
}