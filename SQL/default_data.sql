INSERT INTO BanReasons
VALUES (DEFAULT, '');

INSERT INTO Users(DiscordId, anchorback, midsupport, frontslayer)
VALUES('246710308817731585', false, true, true);


INSERT INTO banreasons(Explanation, DefaultBanTime)

ADD COLUMN Lobbies.Comment

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


INSERT INTO BanReasons(Explanation, DefaultBanTime)
VALUES('Someone hated by all the community', '10 years');

INSERT INTO BanReasons(Explanation, DefaultBanTime)
VALUES('Racism', '1 years');

INSERT INTO BanReasons(Explanation, DefaultBanTime)
VALUES('Homophobia and Transphobia', '1 years');

INSERT INTO BanReasons(Explanation, DefaultBanTime)
VALUES('Xenophobia', '1 month');

INSERT INTO BanReasons(Explanation, DefaultBanTime)
VALUES('Heavy insults', '14 days');

INSERT INTO BanReasons(Explanation, DefaultBanTime)
VALUES('More insults', '7 days');

INSERT INTO BanReasons(Explanation, DefaultBanTime)
VALUES('Insults', '3 days');

INSERT INTO BanReasons(Explanation, DefaultBanTime)
VALUES('Frequently abandonment', '5 days');

INSERT INTO BanReasons(Explanation, DefaultBanTime)
VALUES('Using improperly ABSO', '7 days');


INSERT INTO admins(userid, title, description) VALUES ('64d2f43b-bb97-453e-9662-821bc64c9cc2', 'Founder', 'ABSO developer');

INSERT INTO MatchEvents(Explanation) VALUES ('Abadonment');


/*290496299868880898
577202395776286731*/

/*https://stackoverflow.com/questions/55664506/reset-identity-column-with-last-value-of-tables-identity-in-postgres*/

/*Buttare giù MessageId in Weeks
  Matches drop MessageId, MessageTeamA, MessageTeamB*/

/*Potrei mettere la data nelle lobby, poi la sposto e la uso per dire "la partita è durata tot+ ho le partite all'inizio, non quando finiscono"*/