import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SafeScan - Content Moderation and Violation Detection",
  description:
    "SafeScan is an advanced text scanning app designed to detect potential violations and harmful content. Ensure your content complies with community standards and policies in real-time.",
  keywords: [
    "SafeScan",
    "content moderation",
    "text scanning",
    "content policy violations",
    "harmful content detection",
  ],
  authors: [{ name: "Jakub Mazur", url: "https://jakmaz.com" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
