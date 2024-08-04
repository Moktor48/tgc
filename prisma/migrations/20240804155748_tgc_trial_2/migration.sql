-- CreateTable
CREATE TABLE `member_link` (
    `userId` VARCHAR(191) NOT NULL,
    `discordId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `discordId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `member_link` ADD CONSTRAINT `member_link_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_link` ADD CONSTRAINT `member_link_discordId_fkey` FOREIGN KEY (`discordId`) REFERENCES `discord_user`(`gmember_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
