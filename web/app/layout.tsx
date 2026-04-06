import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Agentfiles — AI Skills Manager for Obsidian",
	description:
		"Browse, create, and manage AI agent skills across Claude Code, Cursor, Codex, Windsurf, and 10+ coding agents — all inside Obsidian.",
	openGraph: {
		title: "Agentfiles",
		description:
			"Browse, create, and manage AI agent skills across Claude Code, Cursor, Codex, Windsurf, and 10+ coding agents.",
		url: "https://agentfiles.dev",
		siteName: "Agentfiles",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Agentfiles",
		description:
			"Browse, create, and manage AI agent skills across Claude Code, Cursor, Codex, Windsurf, and 10+ coding agents.",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
				{children}
			</body>
		</html>
	);
}
