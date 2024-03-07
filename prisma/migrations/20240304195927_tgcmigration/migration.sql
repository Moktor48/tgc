-- CreateTable
CREATE TABLE "article" (
    "article_id" BIGSERIAL NOT NULL,
    "title" VARCHAR(255),
    "undertitle" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "cover_image_path" VARCHAR(255),
    "gmember_id" BIGINT,
    "game_type" VARCHAR(50),
    "summary" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "idx_16392_primary" PRIMARY KEY ("article_id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "content_id" INTEGER,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cover_image_path" VARCHAR(255),
    "game_type" VARCHAR(255),
    "summary" TEXT,

    CONSTRAINT "idx_16400_primary" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audiences" (
    "audience_id" SERIAL NOT NULL,
    "audience_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "idx_16408_primary" PRIMARY KEY ("audience_id")
);

-- CreateTable
CREATE TABLE "build" (
    "build_id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT,
    "cover_image_path" VARCHAR(255),
    "gmember_id" BIGINT,
    "game_type" VARCHAR(50),
    "summary" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "idx_16447_primary" PRIMARY KEY ("build_id")
);

-- CreateTable
CREATE TABLE "build_audience_mapping" (
    "id" SERIAL NOT NULL,
    "build_id" INTEGER,
    "audience_id" INTEGER,

    CONSTRAINT "idx_16455_primary" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "builds" (
    "id" SERIAL NOT NULL,
    "content_id" INTEGER,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cover_image_path" VARCHAR(255),
    "game_type" VARCHAR(255),
    "summary" TEXT,

    CONSTRAINT "idx_16460_primary" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "characters" (
    "character_uid" SERIAL NOT NULL,
    "gmember_id" INTEGER NOT NULL,
    "char_name" VARCHAR(255) NOT NULL,
    "class_name" VARCHAR(255),
    "fact_id" INTEGER,
    "game_id" INTEGER NOT NULL,
    "misc_info" TEXT,
    "trial_parse" INTEGER,

    CONSTRAINT "idx_16468_primary" PRIMARY KEY ("character_uid")
);

-- CreateTable
CREATE TABLE "content_access" (
    "id" SERIAL NOT NULL,
    "content_id" INTEGER,
    "rank_role" VARCHAR(255),

    CONSTRAINT "idx_16475_primary" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_types" (
    "type_id" SERIAL NOT NULL,
    "type_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "idx_16480_primary" PRIMARY KEY ("type_id")
);

-- CreateTable
CREATE TABLE "contents" (
    "content_id" SERIAL NOT NULL,
    "gmember_id" BIGINT,
    "timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type_id" INTEGER,

    CONSTRAINT "idx_16485_primary" PRIMARY KEY ("content_id")
);

-- CreateTable
CREATE TABLE "discord_aliases" (
    "gmember_id" INTEGER NOT NULL,
    "alias_uid" SERIAL NOT NULL,
    "alias_nickname" VARCHAR(255),
    "alias_disc_name" VARCHAR(255),

    CONSTRAINT "idx_16491_primary" PRIMARY KEY ("alias_uid")
);

-- CreateTable
CREATE TABLE "discord_join_leave" (
    "action_uid" SERIAL NOT NULL,
    "gmember_id" INTEGER NOT NULL,
    "action" INTEGER NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "idx_16498_primary" PRIMARY KEY ("action_uid")
);

-- CreateTable
CREATE TABLE "discord_message" (
    "message_uid" INTEGER NOT NULL,
    "gmember_id" INTEGER NOT NULL,
    "channel_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "idx_16502_primary" PRIMARY KEY ("message_uid")
);

-- CreateTable
CREATE TABLE "discord_user" (
    "gmember_id" BIGINT NOT NULL,
    "disc_nickname" VARCHAR(255) NOT NULL,
    "ingame_name" VARCHAR(255) NOT NULL,
    "highest_rank_role" INTEGER NOT NULL,

    CONSTRAINT "idx_16507_primary" PRIMARY KEY ("gmember_id")
);

-- CreateTable
CREATE TABLE "eso_event" (
    "event_uid" SERIAL NOT NULL,
    "gmember_id" INTEGER NOT NULL,
    "event_type" VARCHAR(255) NOT NULL,
    "attendee_cnt" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "revenue" INTEGER NOT NULL,
    "start_timestamp" TIMESTAMPTZ(6) NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "idx_16513_primary" PRIMARY KEY ("event_uid")
);

-- CreateTable
CREATE TABLE "eso_event_unqiue" (
    "event_uid" INTEGER NOT NULL,
    "attendee_num" SERIAL NOT NULL,
    "gmember_id" INTEGER NOT NULL,

    CONSTRAINT "idx_16520_primary" PRIMARY KEY ("attendee_num")
);

-- CreateTable
CREATE TABLE "eso_raid" (
    "gmember_id" INTEGER NOT NULL,
    "trial" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "clears" INTEGER NOT NULL,
    "wipes" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "raid_uid" SERIAL NOT NULL,

    CONSTRAINT "idx_16530_primary" PRIMARY KEY ("raid_uid")
);

-- CreateTable
CREATE TABLE "eso_raid_unique" (
    "raid_uid" INTEGER NOT NULL,
    "attendee_num" SERIAL NOT NULL,
    "gmember_id" INTEGER NOT NULL,

    CONSTRAINT "idx_16535_primary" PRIMARY KEY ("attendee_num")
);

-- CreateTable
CREATE TABLE "eso_user" (
    "gmember_id" INTEGER NOT NULL,
    "eso_id" VARCHAR(255) NOT NULL,
    "tier_tank" INTEGER,
    "tier_healer" INTEGER,
    "tier_dps" INTEGER,
    "parse" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "idx_16539_primary" PRIMARY KEY ("eso_id")
);

-- CreateTable
CREATE TABLE "event_signups" (
    "event_id" INTEGER NOT NULL,
    "gmember_id" INTEGER NOT NULL,
    "role" INTEGER,
    "parse" INTEGER NOT NULL,
    "signup_uid" SERIAL NOT NULL,

    CONSTRAINT "idx_16544_primary" PRIMARY KEY ("signup_uid")
);

-- CreateTable
CREATE TABLE "events" (
    "event_id" SERIAL NOT NULL,
    "event_type" VARCHAR(255) NOT NULL,
    "date_time" TIMESTAMPTZ(6) NOT NULL,
    "duration" INTEGER NOT NULL,
    "game" VARCHAR(255) NOT NULL,
    "details" TEXT NOT NULL,
    "gmember_id" INTEGER NOT NULL,
    "repeat_event" BOOLEAN,
    "req_tank" INTEGER,
    "req_heal" INTEGER,
    "req_dps" INTEGER,
    "req_parse" INTEGER,

    CONSTRAINT "idx_16549_primary" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "guide_audience_mapping" (
    "id" SERIAL NOT NULL,
    "guide_id" INTEGER,
    "audience_id" INTEGER,

    CONSTRAINT "idx_16562_primary" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guides" (
    "id" SERIAL NOT NULL,
    "content_id" INTEGER,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cover_image_path" VARCHAR(255),
    "game_type" VARCHAR(255),
    "summary" TEXT,

    CONSTRAINT "idx_16567_primary" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guild_names" (
    "guild_id" INTEGER NOT NULL,
    "guild_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "idx_16574_primary" PRIMARY KEY ("guild_id")
);

-- CreateTable
CREATE TABLE "rank_role_mapping" (
    "rank_role_id" INTEGER NOT NULL,
    "rank_role" VARCHAR(60),

    CONSTRAINT "idx_16580_primary" PRIMARY KEY ("rank_role_id")
);

-- CreateTable
CREATE TABLE "situation_disciplinary" (
    "action_uid" SERIAL NOT NULL,
    "gmember_id" INTEGER NOT NULL,
    "punish_type" INTEGER NOT NULL,
    "probation_weeks" INTEGER,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "report" TEXT,

    CONSTRAINT "idx_16584_primary" PRIMARY KEY ("action_uid")
);

-- CreateTable
CREATE TABLE "situation_report" (
    "report_uid" SERIAL NOT NULL,
    "action_uid" INTEGER,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "gmember_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "idx_16591_primary" PRIMARY KEY ("report_uid")
);

-- CreateTable
CREATE TABLE "staff_admin" (
    "task_uid" SERIAL NOT NULL,
    "gmember_id" INTEGER NOT NULL,
    "duty_type" INTEGER NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "action_target" INTEGER,

    CONSTRAINT "idx_16598_primary" PRIMARY KEY ("task_uid")
);

-- CreateTable
CREATE TABLE "staff_duty" (
    "duty_uid" SERIAL NOT NULL,
    "gmember_id" VARCHAR(45) NOT NULL,
    "duty_type" INTEGER NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "target" INTEGER,
    "eso_target_user" VARCHAR(255),
    "description" TEXT,

    CONSTRAINT "idx_16603_primary" PRIMARY KEY ("duty_uid")
);

-- CreateTable
CREATE TABLE "staff_ff_swtor" (
    "task_uid" SERIAL NOT NULL,
    "gmember_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "duty_id" INTEGER NOT NULL,

    CONSTRAINT "idx_16610_primary" PRIMARY KEY ("task_uid")
);

-- CreateTable
CREATE TABLE "staff_point_chart" (
    "task_id" INTEGER NOT NULL,
    "task_name" VARCHAR(255) NOT NULL,
    "point_value" INTEGER NOT NULL,
    "task_description" TEXT,

    CONSTRAINT "idx_16614_primary" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "staff_point_log" (
    "uid" SERIAL NOT NULL,
    "gmember_id" INTEGER NOT NULL,
    "cnt_points" INTEGER NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "idx_16620_primary" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "staff_status_change" (
    "transaction_id" SERIAL NOT NULL,
    "status_update" INTEGER NOT NULL,
    "training_type" INTEGER,
    "trainer_gmember_id" INTEGER,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "idx_16625_primary" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "voice_sessions" (
    "voice_session_id" VARCHAR(100) NOT NULL,
    "gmember_id" VARCHAR(45),
    "channel_id" VARCHAR(45),
    "start_time" TIMESTAMPTZ(6),
    "end_time" TIMESTAMPTZ(6),
    "duration" DOUBLE PRECISION,

    CONSTRAINT "idx_16629_primary" PRIMARY KEY ("voice_session_id")
);

-- CreateIndex
CREATE INDEX "idx_16603_fk_duty_to_task" ON "staff_duty"("duty_type");

-- AddForeignKey
ALTER TABLE "staff_duty" ADD CONSTRAINT "fk_duty_to_task" FOREIGN KEY ("duty_type") REFERENCES "staff_point_chart"("task_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
