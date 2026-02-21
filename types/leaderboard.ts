export type LeaderboardEntry = {
  name: string;
  score: number;
  signsLearned: number;
  jamSignsSent: number;
  lastActive: number;
};

export type UserProgress = {
  userName: string;
  totalScore: number;
  lessonsCompleted: string[];
  signsLearned: number;
  jamSignsSent: number;
  badges: string[];
  lastActive: number;
};