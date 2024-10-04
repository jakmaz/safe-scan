import { useEffect, useState } from "react";

type Score = {
  category: string;
  score: number;
};

export default function useRandomScores(inputText: string) {
  const [scores, setScores] = useState<Score[]>([]);
  const [flagged, setFlagged] = useState<boolean>(false); // Add flag state

  useEffect(() => {
    if (inputText) {
      // Decide whether to generate high or low scores
      const generateHighScores = Math.random() < 0.5; // 50% chance to generate high or low scores

      const randomScores: Score[] = [
        {
          category: "sexual",
          score: generateHighScores
            ? Math.random() * 0.5 + 0.5
            : Math.random() * 0.3,
        },
        {
          category: "harassment",
          score: generateHighScores
            ? Math.random() * 0.5 + 0.5
            : Math.random() * 0.3,
        },
        {
          category: "hate",
          score: generateHighScores
            ? Math.random() * 0.5 + 0.5
            : Math.random() * 0.3,
        },
        {
          category: "illicit",
          score: generateHighScores
            ? Math.random() * 0.5 + 0.5
            : Math.random() * 0.3,
        },
        {
          category: "self-harm",
          score: generateHighScores
            ? Math.random() * 0.5 + 0.5
            : Math.random() * 0.3,
        },
        {
          category: "violence",
          score: generateHighScores
            ? Math.random() * 0.5 + 0.5
            : Math.random() * 0.3,
        },
      ];

      // If any of the scores are high, set flagged to true
      const isFlagged = randomScores.some((score) => score.score > 0.7);
      setFlagged(isFlagged);

      setScores(randomScores);
    }
  }, [inputText]);

  return { scores, flagged }; // Return both scores and flagged status
}
