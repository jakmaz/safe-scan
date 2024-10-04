import OpenAI from "openai";
import { useEffect, useState } from "react";
const openai = new OpenAI();

type Score = {
  category: string;
  score: number;
};

export default function useApiScores(inputText: string) {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    if (inputText) {
      const fetchScores = async () => {
        try {
          const moderation = await openai.moderations.create({
            model: "omni-moderation-latest",
            input: inputText,
          });

          console.log(moderation);
        } catch (error) {
          console.error("Error fetching scores:", error);
        }
      };

      fetchScores();
    }
  }, [inputText]);

  return scores;
}
