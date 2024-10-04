"use client";

import GitHubLogo from "@/public/github.svg"; // Your GitHub logo from public
import Logo from "@/public/logo.svg"; // Your SafeScan logo
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side with Logo and Title */}
        <div className="flex items-center">
          <Image
            src={Logo}
            alt="SafeScan Logo"
            width={40}
            height={40}
            className="mr-2 rounded-md"
          />
          <h1 className="text-2xl font-bold">SafeScan</h1>
        </div>

        {/* Right side with Author and Links */}
        <div className="flex items-center space-x-4 text-sm">
          <a
            href="https://jakmaz.com" // Replace with your actual portfolio URL
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            Jakub Mazur
          </a>

          {/* GitHub Link with GitHub Logo */}
          <a
            href="https://github.com/jakmaz/safe-scan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Image
              src={GitHubLogo}
              alt="GitHub"
              width={20}
              height={20}
              className="mr-1"
            />
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
