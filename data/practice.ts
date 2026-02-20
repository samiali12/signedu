export const practice_sign = [
    {
        id: "hello",
        word: "Hello",
        instruction: "Open hand near your forehead, move outward like a salute.",
        emoji: "👋",
        // Detection: 4+ fingers extended
        detect: (landmarks: number[][]) => {
            const fingersUp = countFingersUp(landmarks);
            return fingersUp >= 4;
        },
    },
    {
        id: "one",
        word: "One",
        instruction: "Hold up only your index finger, keep others closed.",
        emoji: "☝️",
        // Detection: only index finger up
        detect: (landmarks: number[][]) => {
            const fingersUp = countFingersUp(landmarks);
            return fingersUp === 1;
        },
    },
    {
        id: "peace",
        word: "Peace / Two",
        instruction: "Hold up your index and middle fingers in a V shape.",
        emoji: "✌️",
        detect: (landmarks: number[][]) => {
            const fingersUp = countFingersUp(landmarks);
            return fingersUp === 2;
        },
    },
    {
        id: "three",
        word: "Three",
        instruction: "Hold up your index, middle, and ring fingers.",
        emoji: "🤟",
        detect: (landmarks: number[][]) => {
            const fingersUp = countFingersUp(landmarks);
            return fingersUp === 3;
        },
    },
    {
        id: "five",
        word: "Five",
        instruction: "Spread all five fingers open wide.",
        emoji: "🖐️",
        detect: (landmarks: number[][]) => {
            const fingersUp = countFingersUp(landmarks);
            return fingersUp === 5;
        },
    },
    {
        id: "fist",
        word: "Stop / No",
        instruction: "Close all fingers into a fist.",
        emoji: "✊",
        detect: (landmarks: number[][]) => {
            const fingersUp = countFingersUp(landmarks);
            return fingersUp === 0;
        },
    },
];

// Count how many fingers are extended based on landmark y-positions
export function countFingersUp(landmarks: number[][]): number {
    if (!landmarks || landmarks.length < 21) return -1;

    const fingerTips = [8, 12, 16, 20]; // index, middle, ring, pinky tips
    const fingerMids = [6, 10, 14, 18]; // their middle joints

    let count = 0;
    for (let i = 0; i < 4; i++) {
        if (landmarks[fingerTips[i]][1] < landmarks[fingerMids[i]][1]) count++;
    }
    // Thumb: compare x instead of y (horizontal extension)
    if (Math.abs(landmarks[4][0] - landmarks[2][0]) > 0.05) count++;

    return count;
}