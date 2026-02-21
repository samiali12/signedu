export type JamMessage = {
  user: string;
  sign: string;
  emoji: string;
  translatedSign: string;
  timestamp: Date;
};

export type DetectedSign = {
  word: string;
  emoji: string;
  detect: (lm: number[][]) => boolean;
};