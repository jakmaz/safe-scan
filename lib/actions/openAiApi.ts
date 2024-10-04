"use server";

import OpenAI from "openai";

export default async function fetchApiScores(inputText: string) {
  const openAiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const moderation = await openAiClient.moderations.create({
    model: "omni-moderation-latest",
    input: inputText,
  });

  const result = moderation.results[0]; // Extract the first result (assuming single input)

  // Filter out subcategories (categories that contain a "/")
  const filteredScores = Object.fromEntries(
    Object.entries(result.category_scores).filter(
      ([category]) => !category.includes("/"),
    ),
  );

  // Return the flagged status and filtered category scores
  return {
    flagged: result.flagged,
    scores: filteredScores,
  };
}
