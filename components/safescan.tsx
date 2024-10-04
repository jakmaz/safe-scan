"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Textarea } from "@/components/ui/textarea";
import useRandomScores from "@/lib/hooks/useRandomScores";
import { BarChart2, Shield } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, XAxis } from "recharts";
import { useDebounce } from "use-debounce";

export default function SafeScan() {
  const [inputText, setInputText] = useState(""); // Track user input
  const [debouncedInputText] = useDebounce(inputText, 1000); // Debounce input text with a 1sec delay

  // Custom scores hook
  const scores = useRandomScores(debouncedInputText);

  const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <nav className="border-b p-4">
        <div className="container mx-auto flex items-center">
          <Shield className="mr-2" />
          <h1 className="text-2xl font-bold">SafeScan</h1>
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-8 mt-14">
        <section className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Protect Your Content with SafeScan
          </h2>
          <p className="text-xl mb-6">
            Instantly analyze your text for potential safety concerns and
            content policy violations.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2" /> Input Text
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter text to scan..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Text will be scanned after 1 second of inactivity
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="mr-2" /> Safety Scores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart
                  accessibilityLayer
                  data={scores}
                  layout="horizontal" // Changed to horizontal
                >
                  <XAxis
                    type="category"
                    dataKey="category" // Categories on X-axis
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
