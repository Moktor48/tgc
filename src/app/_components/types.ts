export interface Profile {
  searchUserId: string;
  officer: {
    eso: string | undefined;
    ffxiv: string | undefined;
    swtor: string | undefined;
  };
  perm: {
    id: string;
    userId: string;
    admin: boolean | null;
    specialist: boolean | null;
    representative: boolean | null;
    highcouncil: boolean | null;
    guildmaster: boolean | null;
  } | null;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
  } | null;
  userEso: {
    id: string;
    userId: string;
    rank: string;
    raid: boolean | null;
    raidlead: boolean | null;
    mentor: boolean | null;
  } | null;
  userFfxiv: {
    id: string;
    userId: string;
    rank: string;
    raid: boolean | null;
    raidlead: boolean | null;
    mentor: boolean | null;
  } | null;
  userSwtor: {
    id: string;
    userId: string;
    rank: string;
    raid: boolean | null;
    raidlead: boolean | null;
    mentor: boolean | null;
  } | null;
  userStaff: {
    id: string;
    userId: string;
    admin: boolean | null;
    specialist: boolean | null;
    representative: boolean | null;
    highcouncil: boolean | null;
    guildmaster: boolean | null;
  } | null;
}
