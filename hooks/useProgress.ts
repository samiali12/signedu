"use client";
import { UserProgress } from "@/types/leaderboard";
import { getProgress, saveProgress } from "@/utils/leaderboard";
import { useCallback,useState } from "react";

const useProgress = () => {
    const [progress, setProgress] = useState(() => getProgress());

    const refresh = useCallback(() => {
        setProgress(getProgress());
    }, []);

    const updateName = useCallback((name: string) => {
        const p = getProgress();
        p.userName = name;
        saveProgress(p);
        setProgress({ ...p });
        // Sync to leaderboard
        fetch("/api/leaderboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(p),
        });
    }, []);

    const syncLeaderboard = useCallback((p: UserProgress) => {
        fetch("/api/leaderboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userName: p.userName,
                totalScore: p.totalScore,
                signsLearned: p.signsLearned,
                jamSignsSent: p.jamSignsSent,
            }),
        });
    }, []);

    return { progress, refresh, updateName, syncLeaderboard };
}

export default useProgress;