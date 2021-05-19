//Singleton https://javascript.info/static-properties-methods, https://www.html.it/pag/48316/singleton-pattern-in-javascript/
class DatabaseUtilities {
    static _instance;

    postgress;

    //dbUtilities(){}

    static get INSTANCE() {
        if (!DatabaseUtilities._instance) {
            DatabaseUtilities._instance = new DatabaseUtilities();
        }
        return DatabaseUtilities._instance;
    }

    setConnection(postgress) {
        this.postgress = postgress
    }

    queryRunner =
        async (query) => {
            console.log(query);
            return await this.postgress.query(query);
        }

    isAdmin =
        async (discordId) => {
            const res = await this.queryRunner(`SELECT Users.UserId
                                                        FROM Users JOIN Admins ON Users.UserId=Admins.UserId
                                                        WHERE Users.DiscordId='${discordId}';`);
            return res.rows.length;//res.length > 0
        }

    isBanned =
        async (discordId) => {
            const res = await this.queryRunner(`SELECT Users.UserId
                                                        FROM Users JOIN Banned ON Users.UserId=Banned.UserId
                                                        WHERE Users.DiscordId='${discordId}';`);
            return res.rows.length;
        }

    insertPlayer = async (discordId) => await this.queryRunner(`INSERT INTO Users(DiscordId) VALUES('${discordId}');` );

    insertRanking = async (currentWeek, userId) => await this.queryRunner(`INSERT INTO Ranking(WeekId, UserId, Points) VALUES(${currentWeek}, '${userId}', DEFAULT);`);

    setFriendCode =
        async (fc) => await this.queryRunner(`UPDATE Users SET FriendCode=${fc};`);

    getInfo =
        async () => {
            const res = await this.queryRunner(`SELECT * FROM Info;`);
            return res.rows[0];
        }

    getUserByDiscordId =
        async (discordId) => {
            const user = await this.queryRunner(`SELECT *
                                                    FROM Users
                                                    WHERE discordid='${discordId}';`);// msg.guild.members.
            console.log(user.rows);console.log(user.rows.length);
            return user.rows;
        }

    addPoints =
        async (participant, args) => {
            const info = await this.getInfo();
            const rulement = await this.getRulementRules(info.currentrulement);
            await this.queryRunner(`UPDATE Ranking
                                            SET Points=Points+
                                                       ${(participant.team?args[0]:args[1])*rulement.wonmatchpoint
                                                       +((args[0]>args[1]&&participant.team)||(args[0]<args[1]&&!participant.team)?rulement.winbonus:0)}
                                            WHERE UserId='${participant.userid}' AND WeekId=${info.currentweek}`)
        }

    getStartableLobbies =
        async () => {
            /*for(let i=0; i<number_lobbies; i++){
                const res = await this.queryRunner("SELECT LobbyId FROM Lobbies WHERE NOT EXISTS(SELECT LobbyId FROM JoinedIn)")
                console.log(res);
                if(res.rows.length>0){
                    return res.rows[0].LobbyId;
                }
                return 0;//(false) It has not to happen, just in case there is something with prebuilt does not run
            }*/
            try{
                const res=await this.queryRunner(`SELECT LobbyId
                                                        FROM Lobbies
                                                        WHERE status=0;`);//.then( res => {
                    //console.log(res);
                    //console.log(res.rows[0].lobbyid);
                    return res.rows[0].lobbyid;
                //});
            }catch(err){
                console.log(err);
                return 0;
            }
        }

    isAtLimitOfMatchesToday =
        async (discordId) => {
            const matchesPlayedToday=await this.queryRunner(`SELECT Users.UserId, DateTimeInsert
                                                                    FROM (Users JOIN Play ON Users.UserId=Play.UserId)
                                                                        JOIN Matches ON Play.MatchId=Matches.MatchId
                                                                    WHERE Date(DateTimeInsert) = DATE(NOW()) AND Users.DiscordId='${discordId}';`);
            const info = await this.getInfo();
            const rulement = await this.getRulementRules(info.currentrulement);
            return matchesPlayedToday.rows.length===rulement.maxgamestoplayinaday;
        }

    getRulementRules =
        async (rulementId) => {
            const res = await this.queryRunner(`SELECT *
                                                        FROM Rulements
                                                        WHERE RulementId=${rulementId};`)
            return res.rows[0];
        }

    isUserInALobby =
        async(discordId) => {
            const res = await this.queryRunner(`SELECT *
                                                        FROM Users JOIN JoinedIn ON Users.UserId = JoinedIn.UserId
                                                        WHERE DiscordId='${discordId}';`)
            return res.rows;
        }

    getUsersInALobby =
        async (lobby) => {
            const res = await this.queryRunner(`SELECT Users.*, Team
                                                        FROM Users JOIN JoinedIn ON Users.UserId = JoinedIn.UserId
                                                        WHERE LobbyId=${lobby}`);
            return res.rows;
        }

    setLobbyStatus =
        async(lobbyid, status) =>{
            this.queryRunner(`UPDATE Lobbies
                                    SET Status=${status}
                                    WHERE LobbyId=${lobbyid};`)
        }

    startNewMatch =
        async (users) => {
            const lobby = await this.getStartableLobbies();
            if(lobby){
                this.setLobbyStatus(lobby, 1);
                //console.log(players);
                    //console.log(users)
                await Promise.all(
                    users.map(async (user) => {
                        //const user = await this.db_get_user(player);
                        await this.queryRunner(`INSERT INTO JoinedIn(UserId, LobbyId, Team)
                                                        VALUES('${user.userid}', ${lobby}, ${user.team});`);
                    })
                );
            }else{
                //out of lobby
                console.log("Out");
            }
            return lobby;
        }

    getMatchesToPlay =
        async () => {
            const info = await this.getInfo();
            const rulement = await this.getRulementRules(info.currentrulement);
            return rulement.matchestoplay;
        }

    isInThisLobby =
        async (discordid, lobby) => {
            const res = await this.queryRunner(`SELECT Users.UserId
                                                        FROM Users JOIN JoinedIn ON Users.UserId=JoinedIn.UserId
                                                        WHERE DiscordId='${discordid}' AND LobbyId=${lobby}`)
            return res.rows.length;
        }

    getRanking =
        async (week) => {
            const res= await this.queryRunner(`SELECT *
                                                        FROM Ranking JOIN Users ON ranking.userid = users.userid
                                                        WHERE WeekId=${week}
                                                        ORDER BY Points ASC;`);
            return res.rows;
        }

    createMatch =
        async (lobbyid, args) => {
            const info = await this.getInfo();
            const index = await this.getIndexWeek(info.currentweek);
            const res=await this.queryRunner(`INSERT INTO Matches(MatchId, WeekId, IndexId, TeamAlphaScore, TeamBetaScore, RulementId, DatetimeInsert)
                                            VALUES(default, ${info.currentweek}, ${index}, ${args[0]}, ${args[1]}, ${info.currentrulement}, default) RETURNING MatchId;`);
            return res.rows[0].matchid;
        }

    addUsersPlayMatch =
        async (participant, matchId) => {
            await this.queryRunner(`INSERT INTO Play(UserId, MatchId, Team)
                                            VALUES('${participant.userid}', '${matchId}', ${participant.team})`);
        }

    getIndexWeek =
        async (week) => {
            const index = await this.queryRunner(`SELECT MAX(indexid)
                                                        FROM Matches
                                                        WHERE WeekId=${week}`);
            if(isNaN(index.rows[0].max)) return 1
            return index.rows[0].max+1;
        }

    deletePlayersInLobby =
        async (lobby) => {
            await this.queryRunner(`DELETE FROM JoinedIn WHERE LobbyId=${lobby}`)
        }
}

module.exports = DatabaseUtilities;