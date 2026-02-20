export type Lesson = {
  id: string;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  emoji: string;
  signs: Sign[];
};

export type Sign = {
  id: string;
  word: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  quizOptions: string[];
  correctAnswer: string;
};

export const LESSONS: Lesson[] = [
  {
    id: "greetings",
    title: "Greetings",
    description: "Learn essential greeting signs used every day.",
    level: "Beginner",
    emoji: "👋",
    signs: [
      {
        id: "hello",
        word: "Hello",
        description: "Open hand near forehead, move outward like a salute.",
        videoUrl: "",
        quizOptions: ["Hello", "Goodbye", "Thank You", "Please"],
        correctAnswer: "Hello",
      },
      {
        id: "thankyou",
        word: "Thank You",
        description: "Flat hand starts at chin and moves forward and down.",
        videoUrl: "",
        quizOptions: ["Sorry", "Thank You", "Hello", "Yes"],
        correctAnswer: "Thank You",
      },
      {
        id: "please",
        word: "Please",
        description: "Flat hand on chest, move in a circular motion.",
        videoUrl: "",
        quizOptions: ["No", "Please", "Help", "Stop"],
        correctAnswer: "Please",
      },
    ],
  },
  {
    id: "numbers",
    title: "Numbers 1–10",
    description: "Count from one to ten using ASL hand shapes.",
    level: "Beginner",
    emoji: "🔢",
    signs: [
      {
        id: "one",
        word: "One",
        description: "Hold up your index finger with other fingers closed.",
        videoUrl: "",
        quizOptions: ["One", "Two", "Three", "Four"],
        correctAnswer: "One",
      },
      {
        id: "two",
        word: "Two",
        description: "Hold up your index and middle fingers in a V shape.",
        videoUrl: "",
        quizOptions: ["Five", "Six", "Two", "Nine"],
        correctAnswer: "Two",
      },
      {
        id: "five",
        word: "Five",
        description: "Spread all five fingers open wide.",
        videoUrl: "",
        quizOptions: ["Five", "Three", "Eight", "Ten"],
        correctAnswer: "Five",
      },
    ],
  },
  {
    id: "emotions",
    title: "Emotions",
    description: "Express feelings and emotions in ASL.",
    level: "Intermediate",
    emoji: "😊",
    signs: [
      {
        id: "happy",
        word: "Happy",
        description: "Flat hand brushes upward on chest twice in a circular motion.",
        videoUrl: "",
        quizOptions: ["Sad", "Angry", "Happy", "Scared"],
        correctAnswer: "Happy",
      },
      {
        id: "sad",
        word: "Sad",
        description: "Both open hands in front of face, move downward slowly.",
        videoUrl: "",
        quizOptions: ["Happy", "Sad", "Excited", "Bored"],
        correctAnswer: "Sad",
      },
    ],
  },
];