/*https://www.postgresqltutorial.com/ */

/*The system keeps scores and for every match and penalty added will add, or remove points
  They could always be calculated again*/

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE BanReasons(
    BanReasonId     SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    Explanation     VARCHAR(255) NOT NULL,
    DefaultBantime  SMALLINT NOT NULL
);

CREATE TABLE Users(
    UserId          UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    DiscordId       CHAR(18) NOT NULL UNIQUE,
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
    RankingMessageId    CHAR(18) NOT NULL UNIQUE
);

CREATE TABLE MatchEvents(
    EventId         SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    Explanation     VARCHAR(255) NOT NULL
);

CREATE TABLE Rulements(
    RulementId      SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    WonMatchPoint   SMALLINT NOT NULL,
    WinBonus        SMALLINT NOT NULL,
    FirstAbandonmentMalus   SMALLINT NOT NULL,
    SecondAbandonmentMalus  SMALLINT NOT NULL,
    ThirdAbandonmentMalus   SMALLINT NOT NULL
);

CREATE TABLE Matches(
    MatchId         UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    MessageId       CHAR(14) NOT NULL,
    TeamAlphaScore  SMALLINT NOT NULL,
    TeamBetaScore   SMALLINT NOT NULL,
    MessageTeamAlphaScoreId CHAR(18) NOT NULL,
    MessageTeamBetaScoreId  CHAR(18) NOT NULL,
    RulementId      SMALLINT NOT NULL,
    WeekId          SMALLINT NOT NULL,
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
    UNIQUE(MessageId, MessageTeamAlphaScoreId, MessageTeamBetaScoreId)
);

CREATE TABLE Banned(
    UserId          UUID,
    BanReasonId     SMALLINT,
    Date            DATE DEFAULT CURRENT_DATE ,
    Comment         VARCHAR(255),
    CONSTRAINT UserBanned FOREIGN KEY(UserId) REFERENCES Users(UserId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT BanReasonBanned FOREIGN KEY(BanReasonId) REFERENCES BanReasons(BanReasonId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    PRIMARY KEY (UserId, BanReasonId, Date)
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
    RulementId      SMALLINT NOT NULL,
    Comment         VARCHAR(255),
    CONSTRAINT UserPlayPenalized FOREIGN KEY(UserId, MatchId) REFERENCES Play(UserId, MatchId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT RulementPenalty FOREIGN KEY(RulementId) REFERENCES Rulements(RulementId)
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
    InProgress      BOOLEAN NOT NULL
);

/*Numeric types: https://www.postgresql.org/docs/9.1/datatype-numeric.html*/
/*Generated always as identity: https://www.postgresqltutorial.com/postgresql-identity-column/#:~:text=The%20GENERATED%20ALWAYS%20instructs%20PostgreSQL,value%20for%20the%20identity%20column.*/
/*posting_date DATE NOT NULL DEFAULT CURRENT_DATE
  https://www.postgresqltutorial.com/postgresql-date/
 */
/*Compare ban: https://www.postgresql.org/docs/8.0/functions-datetime.html*/