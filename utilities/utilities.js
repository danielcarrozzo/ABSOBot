const { number_player_per_match } = require('../config.json');

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
    },
    wonderful_matchmaking:
    function (users){
        alpha=[];
        beta=[];
        //faccio l'array sort
        users.sort(sorter);
        //divido
        users.forEach((user, index) => {
            if(alpha.length===beta.length){//can not be =4
                if(summation(alpha)===summation(beta)){//alpha.length===0 && beta.length===0 is covered
                    if(parseInt(Math.random()*2)===0){//I don't want backs play always in Alpha team, just for it :(
                        alpha.push(user);
                    }else{
                        beta.push(user);
                    }
                }else if(summation(alpha)>summation(beta)){
                    beta.push(user);
                }else{
                    alpha.push(user);
                }
            }else if(alpha.length===number_player_per_match/2 || alpha.length>beta.length){
                beta.push(user);
            }else if(beta.length===number_player_per_match/2 || alpha.length<beta.length){
                alpha.push(user);
            }
        });

        /*
        0) t, f, f   1) f, f, t   2) f, t, f   3) t, t, f
        4) f, t, t   5) t, f, t   6) t, t, t,  7) f, f, f/null
         */
        function sorter(user){
            if(user.anchorback){
                if(user.midsupport){
                    if(user.frontslayer){
                        return 6;
                    }else{
                        return 3;
                    }
                }else{
                    if(user.frontslayer){
                        return 5;
                    }else{
                        return 0;
                    }
                }
            }else{
                if(user.midsupport){
                    if(user.frontslayer){
                        return 4;
                    }else{
                        return 2;
                    }
                }else{
                    if(user.frontslayer){
                        return 1;
                    }else{
                        return 7;
                    }
                }
            }
        }

        function summation(array){
            let sum=[0, 0, 0];
            array.forEach(user => {
                let weight=weight(user);
                sum[0]+=weight[0];
                sum[1]+=weight[1];
                sum[2]+=weight[2];
            });
            return sum;
        }

        function converter2(user){
            return ((user.anchorback?1:0)*100+(user.midsupport?1:0)*10+(user.frontslayer?1:0)).toString();
        }

        function weight(user){//null?-->false
            return [(user.anchorback?1:0), user.midsupport?1:0, user.frontslayer?1:0];
        }
    }
}