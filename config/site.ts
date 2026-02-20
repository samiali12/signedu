export const siteConfig = {
  name: 'SignEdu',
  description:
    'AI-powered multilingual sign language platform with real-time feedback, lessons, and global collaboration.',
  url: 'https://signedu.com',
  ogImage: 'https://signedu.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/signedu',
    github: 'https://github.com/signedu',
    linkedin: 'https://linkedin.com/company/signedu',
  },
  nav: [
    {
      title: 'Features',
      href: '#features',
    },
    {
      title: 'How it works',
      href: '#how-it-works',
    },
    {
      title: 'Demo',
      href: '#demo',
    },
    {
      title: 'Testimonials',
      href: '#testimonials',
    },
  ],
  features: [
    {
      title: 'AI Sign Recognition',
      description:
        'Advanced AI technology recognizes and analyzes your sign language gestures in real-time with precision.',
      icon: 'Brain',
    },
    {
      title: 'Multilingual Support',
      description:
        'Learn sign language in multiple spoken languages. Break down barriers and connect globally.',
      icon: 'Languages',
    },
    {
      title: 'Real-time Feedback',
      description:
        'Get instant feedback on your signing accuracy and technique to improve faster.',
      icon: 'Zap',
    },
    {
      title: 'Gamified Lessons',
      description:
        'Engaging, interactive lessons that make learning fun and keep you motivated.',
      icon: 'Trophy',
    },
    {
      title: 'Community Learning',
      description:
        'Connect with learners worldwide, share progress, and learn together in a supportive community.',
      icon: 'Users',
    },
    {
      title: 'Global Collaboration',
      description:
        'Practice with native signers and collaborate on projects across borders.',
      icon: 'Globe',
    },
  ],
  howItWorks: [
    {
      step: 1,
      title: 'Learn',
      description:
        'Start with structured lessons covering basic to advanced sign language. Video tutorials guide you through each sign.',
    },
    {
      step: 2,
      title: 'Practice',
      description:
        'Use your camera to practice signs. Our AI provides real-time feedback on your accuracy and technique.',
    },
    {
      step: 3,
      title: 'Collaborate',
      description:
        'Join our global community. Practice with others, share your progress, and learn from native signers.',
    },
  ],
  testimonials: [
    {
      name: 'Sarah Johnson',
      role: 'Student',
      avatar: 'SJ',
      content:
        'SignEdu transformed how I learn sign language. The AI feedback is incredibly accurate, and I love practicing with the community!',
    },
    {
      name: 'Miguel Rodriguez',
      role: 'Teacher',
      avatar: 'MR',
      content:
        'As a sign language teacher, I recommend SignEdu to all my students. The multilingual support is a game-changer.',
    },
    {
      name: 'Aisha Patel',
      role: 'Professional',
      avatar: 'AP',
      content:
        'Learning sign language for my job was daunting until I found SignEdu. The gamified approach kept me engaged and motivated.',
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
