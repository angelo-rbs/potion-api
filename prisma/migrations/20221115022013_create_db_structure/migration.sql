-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "concludedAt" DATETIME NOT NULL,
    "deadline" DATETIME NOT NULL,
    "isUrgent" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "pomodorable" BOOLEAN NOT NULL,
    "estimatedSessions" INTEGER NOT NULL,
    "doneSessions" INTEGER NOT NULL,
    "closed" BOOLEAN NOT NULL,
    "tagId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Task_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Task_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "areaId" TEXT,
    "subAreaId" TEXT,
    CONSTRAINT "Tag_subAreaId_fkey" FOREIGN KEY ("subAreaId") REFERENCES "SubArea" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Tag_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Area" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "SubArea" (
    "id" TEXT NOT NULL PRIMARY KEY
);
