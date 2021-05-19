const DatabaseUtilities = require("../utilities/dbUtilities");
const { roleParticipants, numberWeeks} = require("../config.json");

module.exports={
    name: 'signup',
    aliases: [ "su" ],
    cooldown: 5,
    description: "Subscribe to the tournament",
    execute: async function(msg, args){
        try {
            //Add to database
            await DatabaseUtilities.INSTANCE.insertPlayer(msg.author.id);
            let info = await DatabaseUtilities.INSTANCE.getInfo();
            for(; info.currentweek<=numberWeeks; currentweek++){
                const user = await DatabaseUtilities.INSTANCE.getUserByDiscordId(msg.author.id);
                await DatabaseUtilities.INSTANCE.insertRanking(info.currentweek, user[0].userid);
            }

            //Give role
            let role = msg.guild.roles.cache.find(r => r.id === roleParticipants);
            try{
                await msg.member.roles.add(role);
            }catch(err){
                console.log(err);
            }

            msg.channel.send('Signed up!');
        } catch (err) {
            msg.channel.send('Something went wrong');
            console.log(err);
        }
    }
}