import { useEffect, useState } from "react";

type Score = {
  category: string;
  score: number;
};

export default function useRandomScores(inputText: string) {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    if (inputText) {
      const randomScores: Score[] = [
        { category: "sexual", score: Math.random() },
        { category: "harassment", score: Math.random() },
        { category: "hate", score: Math.random() },
        { category: "illicit", score: Math.random() },
        { category: "self-harm", score: Math.random() },
        { category: "violence", score: Math.random() },
      ];

      setScores(randomScores);
    }
  }, [inputText]);

  return scores;
}
