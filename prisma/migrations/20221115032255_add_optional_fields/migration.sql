-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "concludedAt" DATETIME,
    "deadline" DATETIME,
    "isUrgent" BOOLEAN NOT NULL,
    "description" TEXT,
    "pomodorable" BOOLEAN NOT NULL,
    "estimatedSessions" INTEGER,
    "doneSessions" INTEGER,
    "closed" BOOLEAN,
    "tagId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Task_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Task_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("closed", "concludedAt", "createdAt", "deadline", "description", "doneSessions", "estimatedSessions", "id", "isUrgent", "name", "ownerId", "pomodorable", "tagId") SELECT "closed", "concludedAt", "createdAt", "deadline", "description", "doneSessions", "estimatedSessions", "id", "isUrgent", "name", "ownerId", "pomodorable", "tagId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
