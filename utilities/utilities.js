module.exports = {
    query_runner:
    async function (postgress, query){
        return await postgress.query(query);
    },
    is_admin:
    async function (postgress, userid){
        let res=await postgress.query('SELECT * FROM Admins WHERE ');
        return res.length > 0
    },
    get_user_from_discord:
    async function (client, discordid){
        return await client.users.fetch(discordid);// msg.guild.members.
    },
    get_user_from_database:
    async function (postgress, discordid){
        const user = await postgress.query("SELECT * FROM Users WHERE discordid='"+discordid+"';");// msg.guild.members.
        return user.rows[0];
    },
    delete_msg:
    (msg) => {
        msg.delete().catch(error => {// Only log the error if it is not an Unknown Message error
            if (error.code !== 10008/*Discord.Constants.APIErrors.UNKNOWN_MESSAGE */) {
                console.error('Failed to delete the msg:', error);
            }
        });
    },
    repost_ranking:
    (week) => {
        process.env.CHANNEL_RANKING.bulkDelete(10, true);
        process.env.CHANNEL_RANKING.send("-ra "+week);
    },
    get_current_week:
    async function (postgress){
        const res = await postgress.query('SELECT CurrentWeek FROM Info;');
        return res.rows[0].currentweek;
    }
}