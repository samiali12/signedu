export const countFingers = (lm: number[][]): number => {
  if (!lm || lm.length < 21) return -1;
  const tips = [8, 12, 16, 20];
  const mids = [6, 10, 14, 18];
  let count = 0;
  for (let i = 0; i < 4; i++) {
    if (lm[tips[i]][1] < lm[mids[i]][1]) count++;
  }
  if (Math.abs(lm[4][0] - lm[2][0]) > 0.05) count++;
  return count;
};

export const generateRoomId = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const generateGuestName = () => {
  const adjectives = ["Swift", "Brave", "Calm", "Bright", "Kind"];
  const nouns = ["Signer", "Learner", "Wizard", "Coder", "Hand"];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}`;
};
