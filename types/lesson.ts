export type SignType = {
  id: string;
  videoUrl?: string;
  word: string;
  description: string;
  quizOptions: string[];
  correctAnswer: string;
};

export type LessonType = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  signs: SignType[];
  level: string;
};