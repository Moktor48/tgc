-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'guest',
    "tgc_guild_member" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "post" (
    "id" TEXT NOT NULL,
    "post" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_permission" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "general" BOOLEAN NOT NULL DEFAULT false,
    "eso" BOOLEAN NOT NULL DEFAULT false,
    "ffxiv" BOOLEAN NOT NULL DEFAULT false,
    "swtor" BOOLEAN NOT NULL DEFAULT false,
    "staff" BOOLEAN NOT NULL DEFAULT false,
    "officer" BOOLEAN NOT NULL DEFAULT false,
    "raid" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "guild_public" BOOLEAN NOT NULL DEFAULT false,
    "type" TEXT NOT NULL,

    CONSTRAINT "post_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eso" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rank" TEXT NOT NULL DEFAULT 'none',
    "raid" BOOLEAN DEFAULT false,
    "raidlead" BOOLEAN DEFAULT false,
    "mentor" BOOLEAN DEFAULT false,

    CONSTRAINT "eso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ffxiv" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rank" TEXT NOT NULL DEFAULT 'none',
    "raid" BOOLEAN DEFAULT false,
    "raidlead" BOOLEAN DEFAULT false,
    "mentor" BOOLEAN DEFAULT false,

    CONSTRAINT "ffxiv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "swtor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rank" TEXT NOT NULL DEFAULT 'none',
    "raid" BOOLEAN DEFAULT false,
    "raidlead" BOOLEAN DEFAULT false,
    "mentor" BOOLEAN DEFAULT false,

    CONSTRAINT "swtor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "admin" BOOLEAN DEFAULT false,
    "specialist" BOOLEAN DEFAULT false,
    "representative" BOOLEAN DEFAULT false,
    "highcouncil" BOOLEAN DEFAULT false,
    "guildmaster" BOOLEAN DEFAULT false,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_modification" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "post" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "published" TEXT NOT NULL,
    "modById" TEXT NOT NULL,

    CONSTRAINT "post_modification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_key" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "post_permission_postId_key" ON "post_permission"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "eso_userId_key" ON "eso"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ffxiv_userId_key" ON "ffxiv"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "swtor_userId_key" ON "swtor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "staff_userId_key" ON "staff"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_permission" ADD CONSTRAINT "post_permission_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eso" ADD CONSTRAINT "eso_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ffxiv" ADD CONSTRAINT "ffxiv_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swtor" ADD CONSTRAINT "swtor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_modification" ADD CONSTRAINT "post_modification_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_modification" ADD CONSTRAINT "post_modification_modById_fkey" FOREIGN KEY ("modById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
