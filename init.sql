PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE users (
   username TEXT PRIMARY KEY NOT NULL,
   hash TEXT NOT NULL
);
INSERT INTO "users" VALUES('vivek','$2a$10$cEpt5YcoQTL5bA1W.EKIBeZ/RbjymsLHXod0HSjy0w.NSJHFsKu1e');
CREATE TABLE favorites (
   username TEXT NOT NULL,
   type TEXT NOT NULL,
   id TEXT NOT NULL
);
COMMIT;
