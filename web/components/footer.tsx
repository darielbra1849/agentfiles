import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t border-[var(--border)] mt-auto">
			<div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
				<p className="font-mono text-xs text-[var(--muted)]">
					agentfiles &mdash; MIT License
				</p>
				<div className="flex items-center gap-6">
					<Link
						href="/docs"
						className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
					>
						Docs
					</Link>
					<Link
						href="/changelog"
						className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
					>
						Changelog
					</Link>
					<a
						href="https://github.com/Railly/obsidian-agent-skills"
						target="_blank"
						rel="noreferrer"
						className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
					>
						GitHub
					</a>
					<a
						href="https://railly.dev"
						target="_blank"
						rel="noreferrer"
						className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
					>
						Railly Hugo
					</a>
				</div>
			</div>
		</footer>
	);
}
