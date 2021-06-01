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
            return (await this.postgress.query(query)).rows;
        }

    async ping(){
        await this.postgress.query(`SELECT 1`);
    }

    isAdmin =
        async discordUserId => (await this.queryRunner(`SELECT Users.UserId
                                                              FROM Users JOIN Admins ON Users.UserId=Admins.UserId
                                                              WHERE Users.DiscordId='${discordUserId}';`)).length

    isBanned =
        async discordUserId => (await this.queryRunner(`SELECT Users.UserId
                                                              FROM Users JOIN Banned ON Users.UserId=Banned.UserId
                                                              WHERE Users.DiscordId='${discordUserId}' AND NOW()<Start+Period;`)).length;

    isUserInALobby =
        async discordUserId => {
            const lobby = (await this.queryRunner(`SELECT LobbyId
                                                        FROM Users JOIN JoinedIn ON Users.UserId = JoinedIn.UserId
                                                        WHERE DiscordId='${discordUserId}';`))
            if(lobby.length){
                return lobby[0].lobbyid;
            }else{
                return 0;
            }
        }
        

    isAtLimitOfMatchesToday =
        async (discordUserId) => {
            Promise.all(
                [this.queryRunner(`SELECT Users.UserId, DateTimeInsert 
                                            FROM (Users JOIN Play ON Users.UserId=Play.UserId)
                                                JOIN Matches ON Play.MatchId=Matches.MatchId
                                            WHERE Date(DateTimeInsert) = DATE(NOW()) AND Users.DiscordId='${discordUserId}'`),//matchesPlayedTodayPromise
                    this.getInfo()]//rulement
            ).then(async values => values[0].length===(await this.getRulementRules(values[1].currentrulement)).maxgamestoplayinaday)
        }

    getInfo = async () => (await this.queryRunner(`SELECT * FROM Info;`))[0];

    getRulementRules =
        async rulementId => (await this.queryRunner(`SELECT *
                                                        FROM Rulements
                                                        WHERE RulementId=${rulementId};`))[0];

    getUserByDiscordId =
        async discordUserId => (await this.queryRunner(`SELECT *
                                                             FROM Users
                                                             WHERE discordid='${discordUserId}';`))[0];// msg.guild.members.

    getWeeks = async () => (await this.queryRunner(`SELECT * FROM Weeks;`));

    getRulements = async () => (await this.queryRunner(`SELECT * FROM Rulements;`));

    getRanking =
        async week => await this.queryRunner(`SELECT *
                                                        FROM Ranking JOIN Users ON ranking.userid = users.userid
                                                        WHERE WeekId=${week}
                                                        ORDER BY Points DESC;`);

    getIndexWeek =
        async week => {
            const indexes = await this.queryRunner(`SELECT MAX(indexid)
                                                        FROM Matches
                                                        WHERE WeekId=${week}`);
            if(isNaN(indexes[0].max)) return 1
            return indexes[0].max+1;
        }

    getStartableLobbies =
        async () => {
            const freeLobbies = await this.queryRunner(`SELECT LobbyId
                                                                FROM Lobbies
                                                                WHERE status=0;`) //await .. .then gave me errors
            if(freeLobbies.length){
                return freeLobbies[0].lobbyid;
            }else{
                return 0;
            }
        }

    getUsersInALobby =
        async lobby => await this.queryRunner(`SELECT Users.*, Team
                                                        FROM Users JOIN JoinedIn ON Users.UserId = JoinedIn.UserId
                                                        WHERE LobbyId=${lobby};`)

    getMatchesToPlay =
        async () => (await this.getRulementRules((await this.getInfo()).currentrulement)).matchestoplay;

    getLobby = async (lobbyId) => (await this.queryRunner(`SELECT * FROM Lobbies WHERE LobbyId=${lobbyId}`))[0];

    getCurrentRanking =
        async (discordId) => (await this.queryRunner(`SELECT Points
                                                            FROM (Info JOIN Ranking ON CurrentWeek=WeekId) JOIN Users ON Ranking.UserId=Users.UserId
                                                            WHERE DiscordId='${discordId}';`))[0];

    getPenaltiesOfTheWeek =
        async (participant, weekId) => await this.queryRunner(`SELECT * FROM Penalties JOIN Matches ON Penalties.MatchId=Matches.MatchId WHERE UserId='${participant}' AND WeekId=${weekId}`)

    existsBanReason =
        async banReasonId => await this.queryRunner(`SELECT * FROM BanReasons WHERE BanReasonId=${banReasonId}`);

    addPoints =
        async (participant, args) => {
            const info = (await this.getInfo());
            const rulement = await this.getRulementRules(info.currentrulement);
            return this.queryRunner(`UPDATE Ranking
                                            SET Points=Points+
                                                       ${(participant.team?args[0]:args[1])*rulement.wonmatchpoint + (args[0]+args[1]===rulement.matchestoplay?((args[0]>args[1]&&participant.team)||(args[0]<args[1]&&!participant.team)?rulement.winbonus:0):0)}
                                            WHERE UserId='${participant.userid}' AND WeekId=${info.currentweek}`);
        }

    removePoints =
        async (participant) => {
            const info = (await this.getInfo());
            const rulement = await this.getRulementRules(info.currentrulement);
            const nPenalties = (await this.getPenaltiesOfTheWeek(participant, info.currentweek)).length;
            return this.queryRunner(`UPDATE Ranking
                                            SET Points=Points-${(nPenalties?(nPenalties===1?rulement.secondabandonmentmalus:rulement.thirdabandonmentmalus):rulement.firstabandonmentmalus)}
                                            WHERE UserId='${participant}' AND WeekId=${info.currentweek}`)
        }

    setLobbyStatus =
        async (lobbyid, status) => await this.queryRunner(`UPDATE Lobbies
                                                            SET Status=${status}
                                                            WHERE LobbyId=${lobbyid};`)

    setRoles = async (msg, args) => await this.queryRunner(`UPDATE Users SET anchorback=${(args[0]==='t').toString()}, midsupport=${(args[1]==='t').toString()}, frontslayer=${(args[2]==='t').toString()} WHERE discordid='${msg.author.id}';`);

    setInfo = async args => await this.queryRunner(`UPDATE Info SET CurrentWeek=${args[0]}, InProgress=${args[1]}, CurrentRulement=${args[2]}`);

    setFriendCode = async (discordId, friendCode) => await this.queryRunner(`UPDATE Users SET FriendCode=${friendCode} WHERE DiscordId='${discordId}';`);

    setComment = async (lobbyId, comment) => await this.queryRunner(`UPDATE Lobbies SET Comment='${comment}' WHERE LobbyId=${lobbyId};`)

    insertPlayer = async discordUserId => await this.queryRunner(`INSERT INTO Users(DiscordId) VALUES('${discordUserId}') RETURNING UserId;`)

    insertRanking = async (currentWeek, userId) => await this.queryRunner(`INSERT INTO Ranking(WeekId, UserId, Points) VALUES(${currentWeek}, '${userId}', DEFAULT);`)

    insertJoinedIn = async (userId, lobbyId, teamUser) => await this.queryRunner(`INSERT INTO JoinedIn(UserId, LobbyId, Team) VALUES('${userId}', ${lobbyId}, ${teamUser});`);

    insertMatch =
        async (lobbyid, args, event, comment) => {
            const info = await this.getInfo();
            const index = await this.getIndexWeek(info.currentweek);
            return (await this.queryRunner(`INSERT INTO Matches(MatchId, WeekId, IndexId, TeamAlphaScore, TeamBetaScore, RulementId, DatetimeInsert, EventId, Comment) VALUES(default, ${info.currentweek}, ${index}, ${args[0]}, ${args[1]}, ${info.currentrulement}, default, ${event}, ${comment}) RETURNING MatchId;`))[0].matchid;
        }

    insertPlay = async (userId, matchId, teamUser) => await this.queryRunner(`INSERT INTO Play(UserId, MatchId, Team) VALUES('${userId}', '${matchId}', ${teamUser})`);

    insertPenalty = async (userId, matchId) => await this.queryRunner(`INSERT INTO Penalties(UserId, MatchId) VALUES('${userId}', '${matchId}')`)

    insertBanned = async (discordUserId, banReasonId, period, comment) =>{
        let userId = (await this.getUserByDiscordId(discordUserId)).userid;
        if(userId === undefined){
            userId = await this.insertPlayer(discordUserId);
        }
        await this.queryRunner(`INSERT INTO Banned(UserId, BanReasonId, Start, Period, Comment) VALUES('${userId}', ${banReasonId}, default, ${(period==='default'?`(SELECT defaultbantime FROM BanReasons WHERE BanReasonId=${banReasonId})`:`'${period}'`)}, '${comment}')`)
    }

    deletePlayersInLobby = async lobby => await this.queryRunner(`DELETE FROM JoinedIn WHERE LobbyId=${lobby}`)
}

module.exports = DatabaseUtilities;