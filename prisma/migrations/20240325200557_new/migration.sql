-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_userId_key`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    UNIQUE INDEX `Session_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'guest',
    `tgc_guild_member` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_name_key`(`name`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `summary` TEXT NOT NULL DEFAULT 'None',
    `content` TEXT NOT NULL,
    `image` VARCHAR(255) NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdById` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_permission` (
    `id` VARCHAR(191) NOT NULL,
    `postId` VARCHAR(191) NOT NULL,
    `guild_public` BOOLEAN NOT NULL DEFAULT false,
    `general` BOOLEAN NOT NULL DEFAULT false,
    `member` BOOLEAN NOT NULL DEFAULT false,
    `eso` BOOLEAN NOT NULL DEFAULT false,
    `ffxiv` BOOLEAN NOT NULL DEFAULT false,
    `swtor` BOOLEAN NOT NULL DEFAULT false,
    `staff` BOOLEAN NOT NULL DEFAULT false,
    `officer` BOOLEAN NOT NULL DEFAULT false,
    `raid` BOOLEAN NOT NULL DEFAULT false,
    `beginner` BOOLEAN NOT NULL DEFAULT false,
    `intermediate` BOOLEAN NOT NULL DEFAULT false,
    `advanced` BOOLEAN NOT NULL DEFAULT false,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `type` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `post_permission_postId_key`(`postId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post_modification` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `summary` TEXT NOT NULL DEFAULT 'None',
    `content` TEXT NOT NULL,
    `image` TEXT NULL DEFAULT 'None',
    `postId` VARCHAR(191) NOT NULL,
    `published` VARCHAR(191) NOT NULL,
    `modById` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `post_modification_postId_key`(`postId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eso` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `rank` VARCHAR(191) NOT NULL DEFAULT 'none',
    `raid` BOOLEAN NULL DEFAULT false,
    `raidlead` BOOLEAN NULL DEFAULT false,
    `mentor` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `eso_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ffxiv` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `rank` VARCHAR(191) NOT NULL DEFAULT 'none',
    `raid` BOOLEAN NULL DEFAULT false,
    `raidlead` BOOLEAN NULL DEFAULT false,
    `mentor` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `ffxiv_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `swtor` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `rank` VARCHAR(191) NOT NULL DEFAULT 'none',
    `raid` BOOLEAN NULL DEFAULT false,
    `raidlead` BOOLEAN NULL DEFAULT false,
    `mentor` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `swtor_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `admin` BOOLEAN NULL DEFAULT false,
    `specialist` BOOLEAN NULL DEFAULT false,
    `representative` BOOLEAN NULL DEFAULT false,
    `highcouncil` BOOLEAN NULL DEFAULT false,
    `guildmaster` BOOLEAN NULL DEFAULT false,

    UNIQUE INDEX `staff_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `discord_user` (
    `gmember_id` VARCHAR(191) NOT NULL,
    `disc_nickname` VARCHAR(255) NOT NULL,
    `ingame_name` VARCHAR(255) NOT NULL,
    `highest_rank_role` INTEGER NOT NULL,

    PRIMARY KEY (`gmember_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff_point_chart` (
    `task_id` INTEGER NOT NULL,
    `task_name` VARCHAR(255) NOT NULL,
    `point_value` INTEGER NOT NULL,
    `task_description` VARCHAR(191) NULL,

    PRIMARY KEY (`task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff_duty` (
    `duty_uid` INTEGER NOT NULL AUTO_INCREMENT,
    `gmember_id` VARCHAR(191) NOT NULL,
    `duty_type` INTEGER NOT NULL,
    `timestamp` TIMESTAMP(6) NOT NULL,
    `target` INTEGER NULL,
    `eso_target_user` VARCHAR(255) NULL,
    `description` VARCHAR(191) NULL,

    INDEX `idx_16603_fk_duty_to_task`(`duty_type`),
    PRIMARY KEY (`duty_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_names` (
    `guild_id` INTEGER NOT NULL,
    `guild_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`guild_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff_admin` (
    `task_uid` INTEGER NOT NULL AUTO_INCREMENT,
    `gmember_id` VARCHAR(191) NOT NULL,
    `duty_type` INTEGER NOT NULL,
    `timestamp` TIMESTAMP(6) NOT NULL,
    `action_target` INTEGER NULL,

    PRIMARY KEY (`task_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff_point_log` (
    `uid` INTEGER NOT NULL AUTO_INCREMENT,
    `gmember_id` VARCHAR(191) NOT NULL,
    `cnt_points` INTEGER NOT NULL,
    `timestamp` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `characters` (
    `character_uid` INTEGER NOT NULL AUTO_INCREMENT,
    `gmember_id` VARCHAR(191) NOT NULL,
    `char_name` VARCHAR(255) NOT NULL,
    `class_name` VARCHAR(255) NULL,
    `fact_id` INTEGER NULL,
    `game_id` INTEGER NOT NULL,
    `misc_info` VARCHAR(191) NULL,
    `trial_parse` INTEGER NULL,

    PRIMARY KEY (`character_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audiences` (
    `audience_id` INTEGER NOT NULL AUTO_INCREMENT,
    `audience_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`audience_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `build_audience_mapping` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `build_id` INTEGER NULL,
    `audience_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `content_access` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content_id` INTEGER NULL,
    `rank_role` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `content_types` (
    `type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contents` (
    `content_id` INTEGER NOT NULL AUTO_INCREMENT,
    `gmember_id` VARCHAR(191) NULL,
    `timestamp` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `type_id` INTEGER NULL,

    PRIMARY KEY (`content_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `discord_aliases` (
    `gmember_id` VARCHAR(191) NOT NULL,
    `alias_uid` INTEGER NOT NULL AUTO_INCREMENT,
    `alias_nickname` VARCHAR(255) NULL,
    `alias_disc_name` VARCHAR(255) NULL,

    PRIMARY KEY (`alias_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `discord_join_leave` (
    `action_uid` INTEGER NOT NULL AUTO_INCREMENT,
    `gmember_id` VARCHAR(191) NOT NULL,
    `action` INTEGER NOT NULL,
    `timestamp` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`action_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `discord_message` (
    `message_uid` INTEGER NOT NULL,
    `gmember_id` VARCHAR(191) NOT NULL,
    `channel_id` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `timestamp` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`message_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eso_event` (
    `event_uid` INTEGER NOT NULL AUTO_INCREMENT,
    `gmember_id` VARCHAR(191) NOT NULL,
    `event_type` VARCHAR(255) NOT NULL,
    `attendee_cnt` INTEGER NOT NULL,
    `duration` INTEGER NOT NULL,
    `revenue` INTEGER NOT NULL,
    `start_timestamp` TIMESTAMP(6) NOT NULL,
    `notes` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`event_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eso_event_unqiue` (
    `event_uid` INTEGER NOT NULL,
    `attendee_num` INTEGER NOT NULL AUTO_INCREMENT,
    `gmember_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`attendee_num`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eso_raid` (
    `gmember_id` VARCHAR(191) NOT NULL,
    `trial` INTEGER NOT NULL,
    `difficulty` INTEGER NOT NULL,
    `clears` INTEGER NOT NULL,
    `wipes` INTEGER NOT NULL,
    `duration` INTEGER NOT NULL,
    `raid_uid` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`raid_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eso_raid_unique` (
    `raid_uid` INTEGER NOT NULL,
    `attendee_num` INTEGER NOT NULL AUTO_INCREMENT,
    `gmember_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`attendee_num`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eso_user` (
    `gmember_id` VARCHAR(191) NOT NULL,
    `eso_id` VARCHAR(255) NOT NULL,
    `tier_tank` INTEGER NULL,
    `tier_healer` INTEGER NULL,
    `tier_dps` INTEGER NULL,
    `parse` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`eso_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_signups` (
    `event_id` INTEGER NOT NULL,
    `gmember_id` VARCHAR(191) NOT NULL,
    `role` INTEGER NULL,
    `parse` INTEGER NOT NULL,
    `signup_uid` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`signup_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events` (
    `event_id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_type` VARCHAR(255) NOT NULL,
    `date_time` TIMESTAMP(6) NOT NULL,
    `duration` INTEGER NOT NULL,
    `game` VARCHAR(255) NOT NULL,
    `details` VARCHAR(191) NOT NULL,
    `gmember_id` VARCHAR(191) NOT NULL,
    `repeat_event` BOOLEAN NULL,
    `req_tank` INTEGER NULL,
    `req_heal` INTEGER NULL,
    `req_dps` INTEGER NULL,
    `req_parse` INTEGER NULL,

    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guide_audience_mapping` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guide_id` INTEGER NULL,
    `audience_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rank_role_mapping` (
    `rank_role_id` INTEGER NOT NULL,
    `rank_role` VARCHAR(60) NULL,

    PRIMARY KEY (`rank_role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `situation_disciplinary` (
    `action_uid` INTEGER NOT NULL AUTO_INCREMENT,
    `gmember_id` VARCHAR(191) NOT NULL,
    `punish_type` INTEGER NOT NULL,
    `probation_weeks` INTEGER NULL,
    `timestamp` TIMESTAMP(6) NOT NULL,
    `report` VARCHAR(191) NULL,

    PRIMARY KEY (`action_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `situation_report` (
    `report_uid` INTEGER NOT NULL AUTO_INCREMENT,
    `action_uid` INTEGER NULL,
    `timestamp` TIMESTAMP(6) NOT NULL,
    `gmember_id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`report_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff_ff_swtor` (
    `task_uid` INTEGER NOT NULL AUTO_INCREMENT,
    `gmember_id` VARCHAR(191) NOT NULL,
    `timestamp` TIMESTAMP(6) NOT NULL,
    `duty_id` INTEGER NOT NULL,

    PRIMARY KEY (`task_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff_status_change` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `status_update` INTEGER NOT NULL,
    `training_type` INTEGER NULL,
    `trainer_gmember_id` VARCHAR(191) NULL,
    `timestamp` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `voice_sessions` (
    `voice_session_id` VARCHAR(100) NOT NULL,
    `gmember_id` VARCHAR(45) NULL,
    `channel_id` VARCHAR(45) NULL,
    `start_time` TIMESTAMP(6) NULL,
    `end_time` TIMESTAMP(6) NULL,
    `duration` DOUBLE NULL,

    PRIMARY KEY (`voice_session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_permission` ADD CONSTRAINT `post_permission_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_modification` ADD CONSTRAINT `post_modification_modById_fkey` FOREIGN KEY (`modById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_modification` ADD CONSTRAINT `post_modification_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eso` ADD CONSTRAINT `eso_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ffxiv` ADD CONSTRAINT `ffxiv_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `swtor` ADD CONSTRAINT `swtor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `staff` ADD CONSTRAINT `staff_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `staff_duty` ADD CONSTRAINT `fk_duty_to_task` FOREIGN KEY (`duty_type`) REFERENCES `staff_point_chart`(`task_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `staff_duty` ADD CONSTRAINT `fk_duty_to_user` FOREIGN KEY (`gmember_id`) REFERENCES `discord_user`(`gmember_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
