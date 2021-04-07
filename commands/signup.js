module.exports={
    name: 'signup',
    aliases: [ "s" ],
    cooldown: 5,
    description: "Subscribe to the tournament",
    execute: async function(client, msg, args, utilities, postgress){
        try {
            //Add to database
            await utilities.query_runner(postgress, 'INSERT INTO Users(DiscordId) VALUES(' + msg.author + ');');
            let current_week = await utilities.get_current_week(postgress);
            for(; current_week<=process.env.NUMBER_OF_WEEKS; current_week++){
                const user = await utilities.get_user_from_database(postgress, msg.author.id);
                await utilities.query_runner(postgress, "INSERT INTO Ranking(WeekId, UserId, Points) VALUES(" + current_week + ", '" + user.userid + "', DEFAULT);");
            }

            //Give role
            let role = msg.guild.roles.cache.find(r => r.id === process.env.ID_ROLE_PARTECIPANT);
            msg.author.roles.add(role);

            msg.channel.send('Sign up!');
        } catch (err) {
            console.log(err);
        }
    }
}