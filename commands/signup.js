module.exports={
    name: 'signup',
    aliases: [ "su" ],
    cooldown: 5,
    description: "Subscribe to the tournament",
    execute: async function(msg, client, args, postgreSQL){
        try {
            //Add to database
            await utilities.query_runner(postgreSQL, 'INSERT INTO Users(DiscordId) VALUES(' + msg.author + ');');
            let current_week = await utilities.get_current_week(postgreSQL);
            for(; current_week<=process.env.NUMBER_OF_WEEKS; current_week++){
                const user = await utilities.get_user_from_database(postgreSQL, msg.author.id);
                await utilities.query_runner(postgreSQL, "INSERT INTO Ranking(WeekId, UserId, Points) VALUES(" + current_week + ", '" + user.userid + "', DEFAULT);");
            }

            //Give role
            let role = msg.guild.roles.cache.find(r => r.id === process.env.ID_ROLE_PARTECIPANT);
            try{
                await msg.member.roles.add(role);
            }catch(err){
                console.log(err);
            }

            msg.channel.send('Signed up!');
        } catch (err) {
            console.log(err);
        }
    }
}