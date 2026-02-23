# 🤟 SignEdu — Multilingual Sign Language Learning Platform

DEMO link: https://www.loom.com/share/a73d0e97c81c476183b4106cb5a585c4
Medium Blog: https://medium.com/@samijameel100/i-built-a-sign-language-learning-web-based-app-during-lingo-dev-hackthons-6c3a36bc6818

Learn ASL (American Sign Language) in your native language. Real-time hand detection, interactive lessons, live sign jam rooms, and a global leaderboard. 

<img width="1366" height="1529" alt="signedu-home" src="https://github.com/user-attachments/assets/278436d1-1b40-4bcf-b7fe-b2714659f921" />
<img width="1366" height="1546" alt="sgnedu-practice" src="https://github.com/user-attachments/assets/f2910fc3-6592-4ef9-9cc3-d8de225361ae" />
<img width="1366" height="1239" alt="signedu-lobby" src="https://github.com/user-attachments/assets/bd6c3450-a842-4a48-81ed-b1a6aacd2fec" />
<img width="1366" height="1232" alt="signedu-jam" src="https://github.com/user-attachments/assets/df7e2e6a-d204-45e6-82f3-7946d4a0d012" />
<img width="1366" height="1244" alt="leaderboard" src="https://github.com/user-attachments/assets/f97dd73b-0c84-4afd-836d-db5abc8c9d66" />
<img width="1366" height="1693" alt="profile" src="https://github.com/user-attachments/assets/fde21477-1610-4985-81f1-f95488cb0669" />

---

## 📌 Table of Contents

- [What is SignEdu?](#what-is-signedu)
- [Why We Built This](#why-we-built-this)
- [Why Lingo.dev?](#why-lingodotdev)
- [Current Features](#current-features)
- [Tech Stack](#tech-stack)
- [Who Is This For?](#who-is-this-for)
- [How People Benefit](#how-people-benefit)
- [How It's Different](#how-its-different)
- [Future Roadmap](#future-roadmap)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [FAQ](#faq)

---

## What is SignEdu?

SignEdu is a web-based platform that teaches American Sign Language through interactive lessons, real-time webcam practice, and collaborative sign jam rooms — all fully localized to the learner’s native language.

The core idea is simple: learning sign language should never be limited to English. A student in Japan, a teacher in Spain, a parent in Saudi Arabia, or a learner in Brazil, Germany, France, Italy, China, Korea, India, or Pakistan can all learn ASL with explanations, feedback, and community features in their own language.

---

## Why We Built This

### The Problem

Over 70 million people worldwide use sign language as their main way to communicate. Yet most sign language learning resources are designed for English speakers and are often English-only.

This creates a real barrier:

A hearing parent in South Korea who wants to learn ASL for their deaf child has almost no resources in Korean.

An educator in Brazil trying to create an inclusive classroom has to work with materials in Portuguese.

A deaf student in Germany who wants to learn internationally recognized signs has no platform that speaks German.

A learner in Japan, France, Spain, Italy, China, India, Saudi Arabia, or Pakistan faces the same challenge in their own language.

Existing solutions like Duolingo do not support sign language. Current sign language apps rarely offer multilingual support and none provide real-time hand detection for practice feedback.

### Why We Built It for This Hackathon

The Lingo.dev hackathon made us rethink what it means to be global from day one for an edtech product. Many teams just translate buttons and ship it but we wanted to show that full-stack localization can change the whole experience and reach more people.

SignEdu is our answer. Every part of the app including the user interface lesson content quiz feedback jam sign feed profile page and leaderboard is fully localized. You can switch to Punjabi pa-PK English en Japanese ja Spanish es French fr German de Arabic ar Chinese zh Portuguese pt Korean ko Hindi hi or Italian it and the entire experience becomes natural in that language not just the labels.

---

## Why Lingo.dev?

This is the most important architectural decision we made, and it deserves a real answer.

### What if we built without Lingo.dev?

**Option A — Static JSON files:** We would have had to manually create and maintain separate JSON files for every language we support — Punjabi, English, Japanese, Spanish, French, German, Arabic, Chinese, Portuguese, Korean, Hindi, and Italian. Every time we added a lesson, a quiz option, a UI label, or a badge, all twelve files would need updating by hand. 

**Option B — Roll our own ML translation:** We could have called the OpenAI or Google Translate API directly for every string. But this comes with real problems: no translation memory (so "Thank You" gets translated differently in the lesson title vs the quiz option vs the feedback message), no brand voice consistency, no context awareness (a sign language app has domain-specific vocabulary that generic ML models handle poorly), and significant cost at scale.

Option C — Use another i18n library: Libraries like i18next or next-intl help organize locale files but do not generate translations automatically. You would still need to write every translated string or build a custom system to connect a translation API with caching, memory, and context handling for all twelve languages.

### Why Lingo.dev is the right fit

**1. JS SDK for real-time dynamic translation**
Our lessons, quiz questions, sign descriptions, and feedback messages are all dynamic — they depend on user state and change as the user progresses. The JS SDK handles this gracefully, translating dynamic strings on the fly without us needing to pre-register every possible string.

**2. Translation memory and consistency**
Words like Hello appear in lesson titles quiz options sign feeds and jam feedback. Lingo.dev ensures they are always translated the same way in all twelve languages Punjabi English Japanese Spanish French German Arabic Chinese Portuguese Korean Hindi and Italian which raw API calls cannot guarantee

**3. Context-aware translations**
Sign language uses domain specific vocabulary. Words like sign palm knuckle and gesture can mean different things depending on the context. Lingo.dev keeps the educational meaning accurate in every language. 

**4. Git-native localization workflow**
Every time we add a new lesson or UI string the CLI can create an automated pull request with updated locale files. This keeps development fast and prevents localization from becoming a bottleneck. 

**5. It works at every layer**
We use Lingo.dev for UI strings dynamic lesson content real-time jam sign translations and eventually email digests. No other solution handles all these layers in one system. 

Without Lingo.dev SignEdu would be an English only app with a few translated buttons. With Lingo.dev it is a truly multilingual platform where the entire experience from real-time sign recognition feedback to live collaborative rooms works in Punjabi English Japanese Spanish French German Arabic Chinese Portuguese Korean Hindi and Italian. 

---

## Who Is This For?

SignEdu has three main audiences

**1. Hearing family members of deaf or hard-of-hearing individuals
Parents siblings or partners who want to communicate better with a deaf family member. They want to learn real signs get feedback and practice and they may not speak English as their main language. SignEdu makes it easy for them to start. 

**2. Educators building inclusive classrooms
Teachers in schools or online programs who want to include sign language in an accessible curriculum. The lesson creation tools we are building let them adapt content for their students

**3. Curious learners and language enthusiasts
People who want to learn ASL as a skill. Sign language is growing in popularity online and in culture. The badges leaderboard and gamified lessons make learning fun and motivating

---

## How People Benefit

|User | How SignEdu Helps |
|---|---|
| Japanese parent of a deaf child | Learns ASL greetings and emotions with Japanese explanations — no English barrier |
| Spanish teacher | Creates lessons for students, tracks their progress on the leaderboard |
| Deaf learner in Germany | Practices internationally recognized ASL signs with German feedback |
| Arabic-speaking student | Joins a Sign Jam room with a classmate, sees sign translations in Arabic in real-time |
| Gamification-motivated learner | Earns badges, climbs the leaderboard, returns daily for the challenge |

---

## How It's Different

| Feature | SignEdu | Duolingo | Generic ASL Apps | Google Translate |
|---|---|---|---|---|
| Sign language learning | ✅ | ❌ | ✅ | ❌ |
| Multilingual (non-English UI) | ✅ | ✅ | ❌ | ✅ |
| Real-time webcam detection | ✅ | ❌ | Sometimes | ❌ |
| Live collaborative rooms | ✅ | ❌ | ❌ | ❌ |
| Auto-translate sign feed | ✅ | ❌ | ❌ | ❌ |
| Gamification + badges | ✅ | ✅ | ❌ | ❌ |
| Open / web-based | ✅ | ✅ | ❌ (usually app) | ✅ 

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/signedu.git
cd signedu

# Install dependencies
npm install

# Add environment variables (see below)
cp .env.example .env.local

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

Create a `.env.local` file in the root:

```env
# Lingo.dev
LINGODOTDEV_API_KEY=your_lingo_api_key

# Pusher (server-side)
PUSHER_APP_ID=your_pusher_app_id
PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
PUSHER_CLUSTER=your_pusher_cluster

# Pusher (client-side)
NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
NEXT_PUBLIC_PUSHER_CLUSTER=your_pusher_cluster
```

Get your keys:
- Lingo.dev: [lingo.dev/dashboard](https://lingo.dev)
- Pusher: [dashboard.pusher.com](https://dashboard.pusher.c

---

---

## FAQ

**Q: Does it work on mobile?**
MediaPipe JS works on modern mobile browsers but the UI is currently optimized for desktop. Mobile support is on the roadmap.

**Q: Is my webcam footage stored anywhere?**
No. All hand detection runs entirely in your browser using WebAssembly. No video data is ever sent to a server.

**Q: Why ASL and not BSL or other sign languages?**
ASL was chosen as the starting point because it has the most available reference material. The architecture supports adding other sign languages — it's a data and detection model problem, not a platform problem.

**Q: Does the leaderboard reset?**
The current leaderboard uses in-memory state on the server, so it resets on server restart. Persistent storage via a database is on the roadmap.

**Q: Can I contribute new signs or lessons?**
Not yet via UI, but you can add signs directly to `data/lessons.ts` and open a PR. A lesson creator tool is planned.

**Q: How accurate is the sign detection?**
The current detection uses finger-count heuristics based on MediaPipe landmarks. It is reliable for simple signs (numbers, hello, stop) but is not a full ASL classifier. Accuracy for complex signs with similar finger shapes (like B and N) is a known limitation.

---

## License

MIT — free to use, modify, and build on.

---

## Built With ❤️ for the Lingo.dev Hackathon

If you find it useful, star the repo and share it with someone who could benefit.


