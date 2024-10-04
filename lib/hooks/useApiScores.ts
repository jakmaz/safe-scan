import { useEffect, useState } from "react";
import fetchApiScores from "../actions/openAiApi"; // Server function

const initialScores = [
  { category: "harassment", score: 0 },
  { category: "sexual", score: 0 },
  { category: "hate", score: 0 },
  { category: "illicit", score: 0 },
  { category: "self-harm", score: 0 },
  { category: "violence", score: 0 },
];

export default function useApiScores(inputText: string) {
  const [scores, setScores] = useState(initialScores); // To store the category scores
  const [flagged, setFlagged] = useState<boolean>(false); // To track if the input was flagged

  useEffect(() => {
    if (inputText) {
      const fetchScores = async () => {
        try {
          // Call the server function to get the moderation result
          const result = await fetchApiScores(inputText);

          // Update state with the scores and flagged status
          setScores(
            Object.entries(result.scores).map(([category, score]) => ({
              category,
              score,
            })),
          );
          setFlagged(result.flagged);
        } catch (error) {
          console.error("Error fetching scores:", error);
        }
      };

      fetchScores();
    } else {
      // Reset scores and flagged status if no inputText is provided
      setScores(initialScores);
      setFlagged(false);
    }
  }, [inputText]);

  return { scores, flagged };
}
