export type Permissions = {
  eso: boolean;
  ffxiv: boolean;
  swtor: boolean;
  tgc_guild: boolean;
  staff: boolean;
  raid: boolean;
  officer: boolean;
  guild_public: boolean;
  tgc_member: boolean;
  beginner: boolean;
  intermediate: boolean;
  advanced: boolean;
  type: string;
  published: boolean;
};

export type DisplayType = {
  summary: string;
  title: string;
  id: string;
  content: string;
  createdBy: {
    id: string;
    name: string;
  };
  permissions: Permissions | null;
} | null;

export type GuildMember = {
  avatar: string | null;
  communication_disabled_until: string | null;
  flags: number;
  joined_at: string;
  nick: string;
  pending: boolean;
  premium_since: string | null;
  roles: string[];
  unusual_dm_activity_until: string | null;
  user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string | null;
    accent_color: string | null;
    global_name: string;
    avatar_decoration_data: string | null;
    banner_color: string | null;
    clan: string | null;
  };
  mute: boolean;
  deaf: boolean;
  bio: string;
  banner: string | null;
};

export type RoleMapping = Record<string, string>;

export type PubPost = {
  title: string;
  id: string;
  createdBy: {
    name: string;
    id: string;
  };
  permissions: {
    eso: boolean;
    swtor: boolean;
    ffxiv: boolean;
    tgc_guild: boolean;
  } | null;
};

export type Guild = {
  eso: boolean;
  swtor: boolean;
  ffxiv: boolean;
  tgc_guild: boolean;
  type: string;
};
