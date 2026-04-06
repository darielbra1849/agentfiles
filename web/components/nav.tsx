import Link from "next/link";

export function Nav() {
	return (
		<header className="fixed top-0 inset-x-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm">
			<div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
				<Link
					href="/"
					className="font-mono text-sm font-medium tracking-tight text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
				>
					agentfiles
				</Link>
				<nav className="flex items-center gap-6">
					<Link
						href="/docs"
						className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
					>
						Docs
					</Link>
					<Link
						href="/changelog"
						className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
					>
						Changelog
					</Link>
					<a
						href="https://github.com/Railly/obsidian-agent-skills"
						target="_blank"
						rel="noreferrer"
						className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
					>
						GitHub
					</a>
					<a
						href="obsidian://show-plugin?id=agentfiles"
						className="text-sm px-3 py-1.5 rounded-md bg-[var(--accent)] text-white font-medium hover:bg-violet-400 transition-colors"
					>
						Install
					</a>
				</nav>
			</div>
		</header>
	);
}
