export const performanceData = [
  {
    specialist: {
      promote: 750,
      expected: 500,
      poor: 350,
      probation: 180,
    },
  },
  {
    junior: {
      promote: 1000,
      expected: 700,
      poor: 600,
      probation: 350,
    },
  },
  {
    officer: {
      promote: null,
      expected: 750,
      poor: 600,
      probation: 400,
    },
  },
  {
    senior: {
      promote: null,
      expected: 1000,
      poor: 750,
      probation: 500,
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
  13: "Community Officer",
  12: "Junior Officer",
  11: "Guild Specialist",
};
