CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE BanReasons(
    BanReasonId     SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    Explanation     VARCHAR(255) NOT NULL,
    DefaultBantime  INTERVAL NOT NULL
);

CREATE TABLE Users(
    UserId          UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    DiscordId       CHAR(18) NOT NULL UNIQUE,
    FriendCode      CHAR(12) UNIQUE,
    AnchorBack      BOOLEAN,
    MidSupport      BOOLEAN,
    FrontSlayer     BOOLEAN
);

CREATE TABLE Admins(
    UserId          UUID PRIMARY KEY,
    Title           VARCHAR(50) NOT NULL,
    Description     VARCHAR(255),
    CONSTRAINT UserAdmin FOREIGN KEY(UserId) REFERENCES Users(UserId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Weeks(
    WeekId          SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    UserChampionId          UUID,
    CONSTRAINT UserChampion FOREIGN KEY(UserChampionId) REFERENCES Users(UserId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE MatchEvents(
    EventId         SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    Explanation     VARCHAR(255) NOT NULL
);

CREATE TABLE Rulements(
    RulementId      SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    MaxGamesToPlayInADay SMALLINT NOT NULL,
    MatchesToPlay   SMALLINT NOT NULL,
    WonMatchPoint   SMALLINT NOT NULL,
    WinBonus        SMALLINT NOT NULL,
    FirstAbandonmentMalus   SMALLINT NOT NULL,
    SecondAbandonmentMalus  SMALLINT NOT NULL,
    ThirdAbandonmentMalus   SMALLINT NOT NULL
);

CREATE TABLE Matches(
    MatchId         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    WeekId          SMALLINT NOT NULL,
    IndexId          SMALLINT NOT NULL,
    TeamAlphaScore  SMALLINT NOT NULL,
    TeamBetaScore   SMALLINT NOT NULL,
    RulementId      SMALLINT NOT NULL,
    DateTimeInsert  TIMESTAMP NOT NULL DEFAULT NOW(),
    EventId         SMALLINT,
    Comment         VARCHAR(255),
    CONSTRAINT RulementMatch FOREIGN KEY(RulementId) REFERENCES Rulements(RulementId)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
    CONSTRAINT WeekMatch FOREIGN KEY(WeekId) REFERENCES Weeks(WeekId)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
    CONSTRAINT EventMatch FOREIGN KEY(EventId) REFERENCES MatchEvents(EventId)
        ON DELETE SET NULL
        ON UPDATE SET NULL,
    UNIQUE(WeekId, IndexId)
);

CREATE TABLE Banned(
    UserId          UUID,
    BanReasonId     SMALLINT,
    Start           TIMESTAMP DEFAULT NOW(),
    Period          INTERVAL NOT NULL,
    Comment         VARCHAR(255),
    CONSTRAINT UserBanned FOREIGN KEY(UserId) REFERENCES Users(UserId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT BanReasonBanned FOREIGN KEY(BanReasonId) REFERENCES BanReasons(BanReasonId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    PRIMARY KEY (UserId, BanReasonId, Start)
);

CREATE TABLE Play(
    UserId          UUID,
    MatchId         UUID,
    Team            BOOLEAN NOT NULL,
    CONSTRAINT UserPlay FOREIGN KEY(UserId) REFERENCES Users(UserId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT MatchPlayed FOREIGN KEY(MatchId) REFERENCES Matches(MatchId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    PRIMARY KEY (UserId, MatchId)
);

CREATE TABLE Penalties(
    UserId          UUID,
    MatchId         UUID,
    Comment         VARCHAR(255),
    CONSTRAINT UserPlayPenalized FOREIGN KEY(UserId, MatchId) REFERENCES Play(UserId, MatchId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    PRIMARY KEY (UserId, MatchId)
);

CREATE TABLE Ranking(
    WeekId          SMALLINT,
    UserId          UUID,
    Points          SMALLINT DEFAULT 0,
    CONSTRAINT WeekRank FOREIGN KEY(WeekId) REFERENCES Weeks(WeekId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT UserRank FOREIGN KEY(UserId) REFERENCES Users(UserId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    PRIMARY KEY (WeekId, UserId)
);

CREATE TABLE Info(
    CurrentWeek     SMALLINT PRIMARY KEY,
    InProgress      BOOLEAN NOT NULL,
    CurrentRulement SMALLINT NOT NULL,
    CONSTRAINT WeekNow FOREIGN KEY(CurrentWeek) REFERENCES Weeks(WeekId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT RulementNow FOREIGN KEY(CurrentRulement) REFERENCES Rulements(RulementId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Lobbies(
    LobbyId         SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    Status          SMALLINT NOT NULL DEFAULT 0,
    Comment         VARCHAR(255)
);

CREATE TABLE JoinedIn(
     UserId          UUID,
     LobbyId         SMALLINT,
     Team            BOOLEAN NOT NULL,
     CONSTRAINT UserJoinedIn FOREIGN KEY(UserId) REFERENCES Users(UserId)
         ON DELETE CASCADE
         ON UPDATE CASCADE,
     CONSTRAINT LobbiesJoinedIn FOREIGN KEY(LobbyId) REFERENCES Lobbies(LobbyId)
         ON DELETE CASCADE
         ON UPDATE CASCADE,
     PRIMARY KEY (UserId, LobbyId)
);

CREATE UNIQUE INDEX discordIds
    ON Users (discordId);