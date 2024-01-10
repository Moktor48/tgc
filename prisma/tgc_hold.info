// TGC models
// BUILD(build_id, title, content, cover_image_path, gmember_id, game_type, summary, created_at)
model BUILD {

    title String
    content String
    cover_image_path String
    gmember_id Int
    game_type String
    summary String
    created_at DateTime @default(now())
    updated_at DateTime @updatedAt
    build_id Int @id
}

// BUILD_AUDIENCES(id, build_id, audience)
model BUILD_AUDIENCES {
    id Int @id @default(autoincrement())
    build_id Int
    audience String
}
// CHARACTERS(character_uid, gmember_id, char_name, class_name, fact_id, game_id, misc_info, trial_parse) 
model CHARACTERS {
    character_uid Int @id @default(autoincrement())
    gmember_id Int
    char_name String
    class_name String
    fact_id Int
    game_id Int
    misc_info String
    trial_parse String
}
// DISCORD_JOIN_LEAVE(action_uid, action, timestamp, gmember_id)
model DISCORD_JOIN_LEAVE {
    action_uid Int @id @default(autoincrement())
    action String
    timestamp DateTime
    gmember_id Int
}
// DISCORD_MESSAGE(message_uid, gmember_id, channel_id, content, timestamp)
model DISCORD_MESSAGE {
    message_uid Int @id @default(autoincrement())
    gmember_id Int
    channel_id String
    content String
    timestamp DateTime
}
// DISCORD_USER(gmember_id, disc_nickname, ingame_name, highest_rank_role) 
model DISCORD_USER {
    gmember_id Int @id
    disc_nickname String
    ingame_name String
    highest_rank_role String
}
// ESO_EVENT(event_uid, gmember_id, event_type, attendee_cnt, duration, revenue, start_stimestamp, notes)
model ESO_EVENT {
    event_uid Int @id @default(autoincrement())
    gmember_id Int
    event_type String
    attendee_cnt Int
    duration Int
    revenue Int
    start_timestamp DateTime
    notes String
}
// ESO_EVENT_UNIQUE(event_uid, attendee_num, gmember_id) 
model ESO_EVENT_UNIQUE {
    event_uid Int @id
    attendee_num Int
    gmember_id Int
}
// ESO_MESSAGE(eso_id, content, guild_id, timestamp, officer_chat) 
model ESO_MESSAGE {
    eso_id Int @id @default(autoincrement())
    content String
    guild_id Int
    timestamp DateTime
    officer_chat Boolean
}
// ESO_RAID(gmember_id, trial, difficulty, clears, wipes, duration, raid_uid)
model ESO_RAID {
    gmember_id Int @id
    trial String
    difficulty String
    clears Int
    wipes Int
    duration Int
    raid_uid Int
}
// ESO_RAID_UNIQUE(raid_uid, attendee_num, gmember_id) 
model ESO_RAID_UNIQUE {
    raid_uid Int @id
    attendee_num Int
    gmember_id Int
}
// ESO_USER(gmember_id, eso_id, tier_tank, tier_healer, tier_dps)
model ESO_USER {
    gmember_id Int @id
    eso_id Int
    tier_tank String
    tier_healer String
    tier_dps String
}
// FACTIONS(faction_id, faction_name, game_id)
model FACTIONS {
    faction_id Int @id @default(autoincrement())
    faction_name String
    game_id Int
}
// GAMES(game_id, game_name)
model GAMES {
    game_id Int @id @default(autoincrement())
    game_name String
}
// GUIDE(guide_id, title, content, gmember_id, created_at, cover_image_path, game_type, summary)
model GUIDE {
    guide_id Int @id @default(autoincrement())
    title String
    content String
    gmember_id Int
    created_at DateTime @default(now())
    updated_at DateTime @updatedAt
    cover_image_path String
    game_type String
    summary String
}
// GUIDE_AUDIENCES(id, guide_id, audience)
model GUIDE_AUDIENCES {
    id Int @id @default(autoincrement())
    guide_id Int
    audience String
}
// GUILD_NAMES(guild_id, guild_name)
model GUILD_NAMES {
    guild_id Int @id @default(autoincrement())
    guild_name String
}
// RANK_ROLE_MAPPING(rank_role_id, rank_role)
model RANK_ROLE_MAPPING {
    rank_role_id Int @id @default(autoincrement())
    rank_role String
}
// SITUATION_DISCIPLINARY(action_uid, gmember_id, punish_type, probation_weeks, timestamp, report) 
model SITUATION_DISCIPLINARY {
    action_uid Int @id @default(autoincrement())
    gmember_id Int
    punish_type String
    probation_weeks Int
    timestamp DateTime
    report String
}

// SITUATION_REPORT(report_uid, action_uid, timestamp, gmember_id, content)
model SITUATION_REPORT {
    report_uid Int @id @default(autoincrement())
    action_uid Int
    timestamp DateTime
    gmember_id Int
    content String
}
// STAFF_ADMIN(task_uid, gmember_id, duty_type, timestamp, action_target)
model STAFF_ADMIN {
    task_uid Int @id @default(autoincrement())
    gmember_id Int
    duty_type String
    timestamp DateTime
    action_target String
}
// STAFF_DUTY(duty_uid, gmember_id, duty_type, timestamp, target, eso_target_user)
model STAFF_DUTY {
    duty_uid Int @id @default(autoincrement())
    gmember_id Int
    duty_type String
    timestamp DateTime
    target String
    eso_target_user Int
}
// STAFF_FF_SWTOR(task_uid, gmember_id, timetamp, duty_id)
model STAFF_FF_SWTOR {
    task_uid Int @id @default(autoincrement())
    gmember_id Int
    timestamp DateTime
    duty_id Int
}
// STAFF_POINT_CHART(task_id, task_name, point_value, task_description)
model STAFF_POINT_CHART {
    task_id Int @id @default(autoincrement())
    task_name String
    point_value Int
    task_description String
}
// STAFF_POINT_LOG(uid, gmember_id, cnt_points, timestamp)
model STAFF_POINT_LOG {
    uid Int @id @default(autoincrement())
    gmember_id Int
    cnt_points Int
    timestamp DateTime
}
// STAFF_STATUS_CHANGE(transaction_id, status_update, training_type, trainer_gmember_id, timestamp) 
model STAFF_STATUS_CHANGE {
    transaction_id Int @id @default(autoincrement())
    status_update String
    training_type String
    trainer_gmember_id Int
    timestamp DateTime
}
// VOICE_SESSIONS(voice_session_id, gmember_id, channel_id, start_time, end_time, duration)
model VOICE_SESSIONS {
    voice_session_id Int @id @default(autoincrement())
    gmember_id Int
    channel_id String
    start_time DateTime
    end_time DateTime
    duration Int
}
