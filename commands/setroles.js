module.exports={
    name: 'setroles',
    aliases: [ "sr" ],
    cooldown: 5,
    description: "Set roles for matchmaking",
    execute: async function(client, msg, args, utilities, postgreSQLClient){
        try {

            const res = await utilities.query_runner(postgress, 'SELECT * FROM Ranking INNER JOIN Users ON ranking.userid = users.userid WHERE WeekId=' + args[0] + ' ORDER BY Points ASC;');
            await Promise.all(
                res.rows.map(async (row, index) => {
                    await utilities.get_user(client, row.discordid).then(async user => {
                        if (index % capability === 0) {
                            toSend = '';
                        }
                        toSend += (index + 1) + '. ' + user.username + ': ' + row.points + '\r\n';
                        if (index % capability === capability - 1) {
                            embed.addField('Week: ' + args[0], toSend, false);
                            msg.channel.send(embed);
                            indexG = index;
                        }
                    });
                })
            );
        }catch(err){

        }
    }
}