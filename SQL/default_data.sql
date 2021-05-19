INSERT INTO BanReasons
VALUES (DEFAULT, '');

INSERT INTO Users(DiscordId, anchorback, midsupport, frontslayer)
VALUES('246710308817731585', false, true, true);


INSERT INTO banreasons(Explanation, DefaultBanTime)

INSERT INTO Weeks(WeekId,rankingmessageid) OVERRIDING SYSTEM VALUE VALUES(1, 1);
SELECT setval(pg_get_serial_sequence('weeks', 'weekid'), 1);
DELETE FROM Weeks;

INSERT INTO Ranking(weekid, userid) VALUES(2,'cd599e10-dd3a-4372-bfdc-552a78d1420c');

INSERT INTO Info(CurrentWeek, InProgress) VALUES(1, true);


UPDATE Lobbies SET Status=0 WHERE lobbyid>0;
DELETE FROM JoinedIn WHERE lobbyid>0;


DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

INSERT INTO Weeks(WeekId) VALUES(default);
INSERT INTO Weeks(WeekId) VALUES(default);
INSERT INTO Weeks(WeekId) VALUES(default);
INSERT INTO Weeks(WeekId) VALUES(default);
INSERT INTO Weeks(WeekId) VALUES(default);
INSERT INTO Weeks(WeekId) VALUES(default);
INSERT INTO Weeks(WeekId) VALUES(default);
INSERT INTO Weeks(WeekId) VALUES(default);

INSERT INTO Lobbies(LobbyId, Status) VALUES(default, 0);
INSERT INTO Lobbies(LobbyId, Status) VALUES(default, 0);
INSERT INTO Lobbies(LobbyId, Status) VALUES(default, 0);
INSERT INTO Lobbies(LobbyId, Status) VALUES(default, 0);
INSERT INTO Lobbies(LobbyId, Status) VALUES(default, 0);


INSERT INTO Rulements(RulementId, MaxGamesToPlayInADay, MatchestoPlay, WonMatchPoint, WinBonus, FirstAbandonmentMalus, SecondAbandonmentMalus, ThirdAbandonmentMalus)
VALUES(default, 3, 5, 1, 2, 2, 4, 7);

INSERT INTO Info(CurrentWeek, InProgress, CurrentRulement)
VALUES(1, true, 1);

/*https://stackoverflow.com/questions/55664506/reset-identity-column-with-last-value-of-tables-identity-in-postgres*/

/*Buttare giù MessageId in Weeks
  Matches drop MessageId, MessageTeamA, MessageTeamB*/

/*Potrei mettere la data nelle lobby, poi la sposto e la uso per dire "la partita è durata tot+ ho le partite all'inizio, non quando finiscono"*/