"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { useDebounce } from "use-debounce";
import { Card, CardContent } from "./ui/card";

type Score = {
  category: string;
  score: number;
};

export default function SafeScan() {
  const [inputText, setInputText] = useState(""); // Track user input
  const [scores, setScores] = useState<Score[]>([]); // Track random scores
  const [debouncedInputText] = useDebounce(inputText, 1000); // Debounce input text with a 1sec delay

  // Function to generate random scores
  const generateRandomScores = () => {
    const randomScores: Score[] = [
      { category: "sexual", score: Math.random() },
      { category: "sexual/minors", score: Math.random() },
      { category: "harassment", score: Math.random() },
      { category: "harassment/threatening", score: Math.random() },
      { category: "hate", score: Math.random() },
      { category: "hate/threatening", score: Math.random() },
      { category: "illicit", score: Math.random() },
      { category: "illicit/violent", score: Math.random() },
      { category: "self-harm", score: Math.random() },
      { category: "self-harm/intent", score: Math.random() },
      { category: "self-harm/instructions", score: Math.random() },
      { category: "violence", score: Math.random() },
      { category: "violence/graphic", score: Math.random() },
    ];

    setScores(randomScores); // Update scores with random values
  };

  // Use useEffect to trigger random score generation after debouncing
  useEffect(() => {
    if (debouncedInputText) {
      generateRandomScores(); // Generate random scores once input is debounced
    }
  }, [debouncedInputText]); // Effect depends on debounced input

  const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col h-screen ">
      {/* Navbar */}
      <nav className="p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">SafeScan</h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          {/* Text Input Area */}
          <div className="flex flex-col">
            <Textarea
              className="flex-grow mb-4"
              placeholder="Enter text to scan..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)} // Update inputText on typing
            />
          </div>

          {/* Chart Area */}
          <Card>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart
                  accessibilityLayer
                  data={scores}
                  layout="vertical"
                  margin={{
                    left: -20,
                  }}
                >
                  <XAxis type="number" dataKey="score" domain={[0, 1]} hide />
                  <YAxis
                    dataKey="category"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <Bar dataKey="score" fill="hsl(var(--chart-1))" radius={5} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-2 text-center">
        <p className="text-sm">&copy; 2024 SafeScan. All rights reserved.</p>
      </footer>
    </div>
  );
}
