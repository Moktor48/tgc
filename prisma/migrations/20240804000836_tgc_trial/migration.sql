/*
  Warnings:

  - You are about to alter the column `timestamp` on the `contents` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(6)` to `Timestamp(0)`.
  - The primary key for the `discord_message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `channel_id` on the `discord_message` table. All the data in the column will be lost.
  - The primary key for the `discord_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `eso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `eso` table. All the data in the column will be lost.
  - The primary key for the `eso_raid` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `difficulty` on the `eso_raid` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `eso_raid` table. All the data in the column will be lost.
  - You are about to drop the column `trial` on the `eso_raid` table. All the data in the column will be lost.
  - The primary key for the `ffxiv` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ffxiv` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `post_modification` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `post_modification` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `post_modification` table. All the data in the column will be lost.
  - You are about to drop the column `general` on the `post_permission` table. All the data in the column will be lost.
  - You are about to drop the column `member` on the `post_permission` table. All the data in the column will be lost.
  - The primary key for the `staff` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `staff` table. All the data in the column will be lost.
  - You are about to alter the column `gmember_id` on the `staff_duty` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `trainer_gmember_id` on the `staff_status_change` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `swtor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `swtor` table. All the data in the column will be lost.
  - Added the required column `channel_name` to the `discord_message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `discord_message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `eso_raid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `eso_raid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trial_name` to the `eso_raid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ori_content` to the `post_modification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ori_summary` to the `post_modification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ori_title` to the `post_modification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropForeignKey
ALTER TABLE `staff_duty` DROP FOREIGN KEY `fk_duty_to_task`;

-- DropForeignKey
ALTER TABLE `staff_duty` DROP FOREIGN KEY `fk_duty_to_user`;

-- AlterTable
ALTER TABLE `characters` MODIFY `misc_info` TEXT NULL;

-- AlterTable
ALTER TABLE `contents` MODIFY `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `discord_join_leave` MODIFY `timestamp` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `discord_message` DROP PRIMARY KEY,
    DROP COLUMN `channel_id`,
    ADD COLUMN `channel_name` VARCHAR(255) NOT NULL,
    ADD COLUMN `nickname` VARCHAR(255) NOT NULL,
    ADD COLUMN `old_content` TEXT NULL,
    MODIFY `message_uid` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `content` TEXT NOT NULL,
    MODIFY `timestamp` DATETIME(0) NOT NULL,
    ADD PRIMARY KEY (`message_uid`);

-- AlterTable
ALTER TABLE `discord_user` DROP PRIMARY KEY,
    MODIFY `gmember_id` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`gmember_id`);

-- AlterTable
ALTER TABLE `eso` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`userId`);

-- AlterTable
ALTER TABLE `eso_event` MODIFY `start_timestamp` DATETIME(0) NOT NULL,
    MODIFY `notes` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `eso_raid` DROP PRIMARY KEY,
    DROP COLUMN `difficulty`,
    DROP COLUMN `duration`,
    DROP COLUMN `trial`,
    ADD COLUMN `diff_option` VARCHAR(255) NOT NULL DEFAULT 'normal',
    ADD COLUMN `end_time` DATETIME(0) NOT NULL,
    ADD COLUMN `hard_mode` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `start_time` DATETIME(0) NOT NULL,
    ADD COLUMN `trial_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `veteran` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `raid_uid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`raid_uid`);

-- AlterTable
ALTER TABLE `events` MODIFY `date_time` DATETIME(0) NOT NULL,
    MODIFY `details` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `ffxiv` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`userId`);

-- AlterTable
ALTER TABLE `post` ALTER COLUMN `summary` DROP DEFAULT,
    MODIFY `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `post_modification` DROP COLUMN `content`,
    DROP COLUMN `summary`,
    DROP COLUMN `title`,
    ADD COLUMN `ori_content` TEXT NOT NULL,
    ADD COLUMN `ori_summary` TEXT NOT NULL,
    ADD COLUMN `ori_title` VARCHAR(191) NOT NULL,
    ALTER COLUMN `image` DROP DEFAULT,
    MODIFY `published` VARCHAR(191) NOT NULL DEFAULT 'Published by modById';

-- AlterTable
ALTER TABLE `post_permission` DROP COLUMN `general`,
    DROP COLUMN `member`,
    ADD COLUMN `tgc_guild` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `tgc_member` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `situation_disciplinary` MODIFY `timestamp` DATETIME(0) NOT NULL,
    MODIFY `report` TEXT NULL;

-- AlterTable
ALTER TABLE `situation_report` MODIFY `timestamp` DATETIME(0) NOT NULL,
    MODIFY `content` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `staff` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `juniorofficer` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `officer` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `seniorofficer` BOOLEAN NULL DEFAULT false,
    ADD PRIMARY KEY (`userId`);

-- AlterTable
ALTER TABLE `staff_admin` MODIFY `timestamp` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `staff_duty` ADD COLUMN `message_content` TEXT NULL,
    MODIFY `gmember_id` VARCHAR(45) NOT NULL,
    MODIFY `timestamp` DATETIME(0) NOT NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `staff_ff_swtor` MODIFY `timestamp` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `staff_point_chart` MODIFY `task_description` TEXT NULL;

-- AlterTable
ALTER TABLE `staff_point_log` MODIFY `timestamp` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `staff_status_change` MODIFY `trainer_gmember_id` INTEGER NULL,
    MODIFY `timestamp` DATETIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `swtor` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`userId`);

-- AlterTable
ALTER TABLE `voice_sessions` MODIFY `start_time` DATETIME(0) NULL,
    MODIFY `end_time` DATETIME(0) NULL,
    MODIFY `duration` FLOAT NULL;

-- CreateTable
CREATE TABLE `bug` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdById` VARCHAR(191) NOT NULL,

    INDEX `bug_createdById_fkey`(`createdById`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eso_trial_names` (
    `type` VARCHAR(255) NOT NULL,
    `trial_name` VARCHAR(255) NOT NULL,
    `difficulty_mod` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`trial_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eso_raid_attend` (
    `gmember_id` VARCHAR(191) NOT NULL,
    `raid_uid` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`gmember_id`, `raid_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `article` (
    `article_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `undertitle` VARCHAR(255) NOT NULL,
    `content` TEXT NULL,
    `cover_image_path` VARCHAR(255) NULL,
    `gmember_id` VARCHAR(191) NULL,
    `game_type` VARCHAR(50) NULL,
    `summary` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`article_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content_id` INTEGER NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `cover_image_path` VARCHAR(255) NULL,
    `game_type` VARCHAR(255) NULL,
    `summary` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `build` (
    `build_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `content` TEXT NULL,
    `cover_image_path` VARCHAR(255) NULL,
    `gmember_id` VARCHAR(191) NULL,
    `game_type` VARCHAR(50) NULL,
    `summary` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`build_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `builds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content_id` INTEGER NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` MEDIUMTEXT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `cover_image_path` VARCHAR(255) NULL,
    `game_type` VARCHAR(255) NULL,
    `summary` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guides` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content_id` INTEGER NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `cover_image_path` VARCHAR(255) NULL,
    `game_type` VARCHAR(255) NULL,
    `summary` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parse_records` (
    `parse_uid` INTEGER NOT NULL AUTO_INCREMENT,
    `gmember_id` VARCHAR(255) NOT NULL,
    `disc_nickname` VARCHAR(255) NULL,
    `char_name` VARCHAR(255) NOT NULL,
    `class` INTEGER NOT NULL,
    `damage` INTEGER NOT NULL,
    `timestamp` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `patch_number` INTEGER NOT NULL DEFAULT 42,

    PRIMARY KEY (`parse_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `velothi_waivers` (
    `gmember_id` VARCHAR(255) NOT NULL,
    `nickname` VARCHAR(255) NULL,
    `waiver` BOOLEAN NULL,
    `las` DECIMAL(10, 0) NULL,
    `special_class` INTEGER NULL,
    `uid` INTEGER NOT NULL AUTO_INCREMENT,
    `record_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `voice_time` (
    `conn_uid` BIGINT NOT NULL AUTO_INCREMENT,
    `gmember_id` VARCHAR(255) NOT NULL,
    `nick` VARCHAR(255) NOT NULL,
    `connection_time` TIME(6) NOT NULL,
    `new_channel` VARCHAR(255) NULL,
    `old_channel` VARCHAR(255) NULL,
    `n_users` TEXT NULL,
    `o_users` TEXT NULL,

    PRIMARY KEY (`conn_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mcmmo_cooldowns` (
    `user_id` INTEGER UNSIGNED NOT NULL,
    `taming` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `mining` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `woodcutting` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `repair` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `unarmed` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `herbalism` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `excavation` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `archery` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `swords` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `axes` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `acrobatics` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `blast_mining` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `chimaera_wing` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `crossbows` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `tridents` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `maces` INTEGER UNSIGNED NOT NULL DEFAULT 0,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mcmmo_experience` (
    `user_id` INTEGER UNSIGNED NOT NULL,
    `taming` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `mining` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `woodcutting` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `repair` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `unarmed` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `herbalism` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `excavation` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `archery` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `swords` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `axes` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `acrobatics` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `fishing` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `alchemy` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `crossbows` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `tridents` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `maces` INTEGER UNSIGNED NOT NULL DEFAULT 0,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mcmmo_huds` (
    `user_id` INTEGER UNSIGNED NOT NULL,
    `mobhealthbar` VARCHAR(50) NULL,
    `scoreboardtips` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mcmmo_skills` (
    `user_id` INTEGER UNSIGNED NOT NULL,
    `taming` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `mining` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `woodcutting` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `repair` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `unarmed` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `herbalism` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `excavation` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `archery` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `swords` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `axes` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `acrobatics` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `fishing` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `alchemy` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `crossbows` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `tridents` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `maces` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `total` INTEGER UNSIGNED NOT NULL DEFAULT 0,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mcmmo_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(40) NULL,
    `uuid` VARCHAR(36) NULL,
    `lastlogin` BIGINT NOT NULL,

    UNIQUE INDEX `uuid`(`uuid`),
    INDEX `user_index`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `minecraft_user` (
    `mc_uid` INTEGER NOT NULL AUTO_INCREMENT,
    `gmember_id` VARCHAR(255) NULL,
    `mc_name` VARCHAR(255) NOT NULL,
    `disc_name` VARCHAR(255) NULL,
    `IP` VARCHAR(255) NOT NULL,
    `secret_key` VARCHAR(255) NOT NULL,
    `total_play_seconds` BIGINT NOT NULL,
    `seconds_this_week` BIGINT NULL,
    `last_seen` VARCHAR(255) NULL,

    PRIMARY KEY (`mc_uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rewards` (
    `id` VARCHAR(255) NULL,
    `playTime` BIGINT NULL DEFAULT 0,
    `uses` BIGINT NULL DEFAULT -1,
    `votes` BIGINT NULL DEFAULT 0,
    `referredTo` TINYTEXT NULL,
    `join_notification` BOOLEAN NULL DEFAULT true,
    `live_notifications` BOOLEAN NULL DEFAULT true,
    `join_auto_claim` BOOLEAN NULL DEFAULT false,
    `exampleVoteRewardCollected` BIGINT NULL DEFAULT 0,
    `exampleVoteReward` BIGINT NULL DEFAULT -1,
    `exampleStreakRewardCollected` BIGINT NULL DEFAULT 0,
    `exampleStreakReward` BIGINT NULL DEFAULT 0,
    `exampleStreakRewardCurrentStreak` BIGINT NULL DEFAULT 0,
    `examplePurchasableRewardCollected` BIGINT NULL DEFAULT 0,
    `examplePurchasableReward` BIGINT NULL DEFAULT -1,
    `exampleAdventCalendarCollected` BIGINT NULL DEFAULT 0,
    `exampleAdventCalendar` VARCHAR(255) NULL DEFAULT '000000000000000000000000',
    `exampleTimeLimitedRewardCollected` BIGINT NULL DEFAULT 0,
    `exampleTimeLimitedReward` BIGINT NULL DEFAULT 0,
    `exampleRenewablePlayTimeRewardCollected` BIGINT NULL DEFAULT 0,
    `exampleRenewablePlayTimeReward` BIGINT NULL DEFAULT -1,
    `exampleOneTimeRewardCollected` BIGINT NULL DEFAULT 0,
    `exampleOneTimeReward` BIGINT NULL DEFAULT 0,
    `exampleStreakFixedRewardCollected` BIGINT NULL DEFAULT 0,
    `exampleStreakFixedRewardCurrentStreak` TINYTEXT NULL,
    `exampleStreakFixedReward` TINYTEXT NULL,
    `exampleTimeRewardCollected` BIGINT NULL DEFAULT 0,
    `exampleTimeReward` BIGINT NULL DEFAULT 1717181630076,
    `exampleTimeFixedRewardCollected` BIGINT NULL DEFAULT 0,
    `exampleTimeFixedReward` TINYTEXT NULL,
    `exampleRenewableVoteRewardCollected` BIGINT NULL DEFAULT 0,
    `exampleRenewableVoteReward` BIGINT NULL DEFAULT 0,
    `exampleStreakVoteRewardCollected` BIGINT NULL DEFAULT 0,
    `exampleStreakVoteRewardVotes` BIGINT NULL DEFAULT 0,
    `exampleStreakVoteReward` BIGINT NULL DEFAULT 1717181632255,
    `exampleStreakVoteRewardCurrentStreak` BIGINT NULL DEFAULT 0,
    `exampleRePurchasableRewardCollected` BIGINT NULL DEFAULT 0,
    `exampleRePurchasableReward` BIGINT NULL DEFAULT 1717181633048,
    `exampleReferralRewardCollected` BIGINT NULL DEFAULT 0,
    `exampleReferralReward` BIGINT NULL DEFAULT -1,
    `examplePlayTimeRewardCollected` BIGINT NULL DEFAULT 0,
    `examplePlayTimeReward` BIGINT NULL DEFAULT -1,
    `exampleRenewableReferralRewardCollected` BIGINT NULL DEFAULT 0,
    `exampleRenewableReferralReward` BIGINT NULL DEFAULT 0
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ban_list` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `player_name` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `player_name_UNIQUE`(`player_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `not_interested` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `player_name` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `player_name_UNIQUE`(`player_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `user_idx` ON `Session`(`userId`);

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `bug` ADD CONSTRAINT `bug_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `staff_duty` ADD CONSTRAINT `fk_duty_to_task` FOREIGN KEY (`duty_type`) REFERENCES `staff_point_chart`(`task_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `staff_duty` ADD CONSTRAINT `fk_duty_to_user` FOREIGN KEY (`gmember_id`) REFERENCES `discord_user`(`gmember_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `eso_raid` ADD CONSTRAINT `fk_raid_to_trial` FOREIGN KEY (`trial_name`) REFERENCES `eso_trial_names`(`trial_name`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `eso_raid` ADD CONSTRAINT `fk_raid_to_user` FOREIGN KEY (`gmember_id`) REFERENCES `discord_user`(`gmember_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- RedefineIndex
CREATE INDEX `fk_duty_to_task` ON `staff_duty`(`duty_type`);
DROP INDEX `idx_16603_fk_duty_to_task` ON `staff_duty`;
