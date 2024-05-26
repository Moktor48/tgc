export const performanceData = [
  {
    specialist: {
      promote: 750,
      expected: 500,
      poor: 180,
      probation: 0,
    },
  },
  {
    junior: {
      promote: 1000,
      expected: 700,
      poor: 350,
      probation: 0,
    },
  },
  {
    officer: {
      promote: 99999,
      expected: 750,
      poor: 400,
      probation: 0,
    },
  },
  {
    senior: {
      promote: 99999,
      expected: 1000,
      poor: 500,
      probation: 0,
    },
  },
];

type RankCompare = Record<number, string>;
export const rankCompare: RankCompare = {
  19: "Guild Master",
  18: "High Council",
  17: "Council",
  16: "Senior Officer",
  14: "Senior Officer",
  // The above are "Senior Staff"
  13: "Community Officer", //officer
  12: "Junior Officer", //junior
  11: "Guild Specialist", //specialist
};

export const rankList: Record<string, string> = {
  "Guild Master": "senior",
  "High Council": "senior",
  Council: "senior",
  "Senior Officer": "senior",
  // The above are "Senior Staff"
  "Community Officer": "officer", //officer
  "Junior Officer": "junior", //junior
  "Guild Specialist": "specialist", //specialist
};
