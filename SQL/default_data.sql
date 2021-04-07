INSERT INTO BanReasons
VALUES (DEFAULT, '');

INSERT INTO Users(DiscordId, anchorback, midsupport, frontslayer)
VALUES('246710308817731585', false, true, true);

DELETE FROM Users;

SELECT * FROM users;

INSERT INTO banreasons(Explanation, DefaultBanTime)
VALUES()

INSERT INTO Weeks(RankingMessageId) VALUES(8);
INSERT INTO Weeks(WeekId,rankingmessageid) OVERRIDING SYSTEM VALUE VALUES(1, 1);
SELECT setval(pg_get_serial_sequence('weeks', 'weekid'), 1);
SELECT * FROM Weeks;
DELETE FROM Weeks;

INSERT INTO Ranking(weekid, userid) VALUES(2,'cd599e10-dd3a-4372-bfdc-552a78d1420c');

INSERT INTO Info(CurrentWeek, InProgress) VALUES(1, true);

/*https://stackoverflow.com/questions/55664506/reset-identity-column-with-last-value-of-tables-identity-in-postgres*/

/*Buttare giù MessageId in Weeks
  Matches drop MessageId, MessageTeamA, MessageTeamB*/