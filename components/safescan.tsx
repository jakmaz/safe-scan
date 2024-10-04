"use client";

import {
  Card,
  CardContent,
  CardDescription,
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
import useApiScores from "@/lib/hooks/useApiScores";
import { BarChart2, TextSearch } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { useDebounce } from "use-debounce";

export default function SafeScan() {
  const [inputText, setInputText] = useState(""); // Track user input
  const [debouncedInputText] = useDebounce(inputText, 1000); // Debounce input text with a 1sec delay
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null); // Type the ref as HTMLTextAreaElement

  // Focus the textarea when the component mounts
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  // Use the custom random scores or api scores hook
  const { scores, flagged } = useApiScores(debouncedInputText);

  const chartConfig = {
    score: {
      label: "Score",
    },
  } satisfies ChartConfig;

  return (
    <main className="flex-grow container mx-auto mt-14">
      <section className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Protect Your Content with SafeScan
        </h2>
        <p className="text-xl mb-6">
          Instantly analyze your text for potential safety concerns and content
          policy violations.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TextSearch className="mr-2" /> Input Text
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              ref={textAreaRef} // Attach the ref to the Textarea
              placeholder="Enter text to scan..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="h-72"
            />
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Text will be scanned after 1 second of inactivity
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center gap-4">
            <CardTitle className="flex items-center">
              <BarChart2 className="mr-2" /> Violation Scores
            </CardTitle>
            {/* Display the flag warning */}
            {flagged && (
              <CardDescription>
                ⚠ This text was flagged as potentially harmful.
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={scores}
                layout="horizontal" // Changed to horizontal
              >
                <ChartTooltip content={<ChartTooltipContent />} />
                <XAxis
                  type="category"
                  dataKey="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  type="number"
                  domain={[0, 1]}
                  tickLine={false}
                  axisLine={false}
                  hide
                />
                <Bar dataKey="score" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
