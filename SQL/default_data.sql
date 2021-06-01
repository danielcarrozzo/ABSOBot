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