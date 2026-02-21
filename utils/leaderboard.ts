import { UserProgress } from "@/types/leaderboard";

const KEY = "signedu_progress";

export const getProgress = (): UserProgress => {
    if (typeof window === "undefined") return defaultProgress();
    try {
        const stored = localStorage.getItem(KEY);
        return stored ? JSON.parse(stored) : defaultProgress();
    } catch {
        return defaultProgress();
    }
}

export const saveProgress = (progress: UserProgress) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(progress));
}

export const addScore = (points: number) => {
    const p = getProgress();
    p.totalScore += points;
    p.lastActive = Date.now();
    p.badges = computeBadges(p);
    saveProgress(p);
    return p;
}

export const completeLesson = (lessonId: string, score: number, total: number) => {
    const p = getProgress();
    if (!p.lessonsCompleted.includes(lessonId)) {
        p.lessonsCompleted.push(lessonId);
    }
    p.signsLearned += score;
    p.totalScore += score * 10;
    p.lastActive = Date.now();
    p.badges = computeBadges(p);
    saveProgress(p);
    return p;
}

export const recordJamSign = () => {
    const p = getProgress();
    p.jamSignsSent += 1;
    p.totalScore += 5;
    p.lastActive = Date.now();
    p.badges = computeBadges(p);
    saveProgress(p);
    return p;
}

export const setUserName = (name: string) => {
    const p = getProgress();
    p.userName = name;
    saveProgress(p);
}

export const defaultProgress = (): UserProgress => {
    return {
        userName: "Guest",
        totalScore: 0,
        lessonsCompleted: [],
        signsLearned: 0,
        jamSignsSent: 0,
        badges: [],
        lastActive: Date.now(),
    };
}

export const computeBadges = (p: UserProgress): string[] => {
    const badges: string[] = [];
    if (p.signsLearned >= 1) badges.push("first_sign");
    if (p.signsLearned >= 10) badges.push("sign_rookie");
    if (p.signsLearned >= 25) badges.push("sign_pro");
    if (p.signsLearned >= 50) badges.push("sign_master");
    if (p.lessonsCompleted.length >= 1) badges.push("first_lesson");
    if (p.lessonsCompleted.length >= 3) badges.push("lesson_hat_trick");
    if (p.jamSignsSent >= 1) badges.push("jammer");
    if (p.jamSignsSent >= 20) badges.push("jam_master");
    if (p.totalScore >= 100) badges.push("century");
    if (p.totalScore >= 500) badges.push("legend");
    return badges;
}

export const timeAgo = (ts: number) => {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}