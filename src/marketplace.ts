import { execSync } from "child_process";
import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { requestUrl } from "obsidian";

const HOME = homedir();
const LOCK_PATH = join(HOME, ".agents", ".skill-lock.json");
const API_BASE = "https://skills.sh/api";

export interface MarketplaceSkill {
	id: string;
	skillId: string;
	name: string;
	source: string;
	installs: number;
	description?: string;
	content?: string;
	installed?: boolean;
}

export async function searchSkills(query: string): Promise<MarketplaceSkill[]> {
	if (query.length < 2) return [];
	try {
		const res = await requestUrl({
			url: `${API_BASE}/search?q=${encodeURIComponent(query)}&limit=30`,
		});
		const data = res.json;
		if (!data.skills) return [];
		const installed = getInstalledNames();
		return data.skills.map((s: { id: string; skillId: string; name: string; installs: number; source: string }) => ({
			...s,
			installed: installed.has(s.name),
		}));
	} catch { /* empty */
		return [];
	}
}

export async function fetchSkillContent(source: string, skillName: string): Promise<string | null> {
	try {
		const repoRes = await requestUrl({
			url: `https://api.github.com/repos/${source}`,
		});
		const defaultBranch = repoRes.json.default_branch || "main";

		const paths = [
			`skills/${skillName}/SKILL.md`,
			`${skillName}/SKILL.md`,
			`SKILL.md`,
		];

		for (const path of paths) {
			try {
				const contentRes = await requestUrl({
					url: `https://raw.githubusercontent.com/${source}/${defaultBranch}/${path}`,
				});
				if (contentRes.status === 200) return contentRes.text;
			} catch { /* empty */ }
		}
		return null;
	} catch { /* empty */
		return null;
	}
}

function buildPath(): string {
	const extra = [
		"/usr/local/bin",
		"/opt/homebrew/bin",
		join(HOME, ".local", "bin"),
		join(HOME, ".bun", "bin"),
	];
	const nvmDir = join(HOME, ".nvm", "versions", "node");
	try {
		for (const d of readdirSync(nvmDir)) {
			extra.push(join(nvmDir, d, "bin"));
		}
	} catch { /* empty */ }
	return [...extra, process.env.PATH || ""].join(":");
}

export function installSkill(source: string, agents: string[]): { success: boolean; output: string } {
	const agentFlag = agents.length > 0 ? `-a ${agents.join(" ")}` : "-a '*'";
	try {
		const out = execSync(`npx skills add ${source} ${agentFlag} -y`, {
			encoding: "utf-8",
			timeout: 60000,
			env: { ...process.env, PATH: buildPath(), NO_COLOR: "1" },
			stdio: ["pipe", "pipe", "pipe"],
		}).trim();
		return { success: true, output: out };
	} catch (e: unknown) { /* empty */
		return { success: false, output: e instanceof Error ? e.message : "Install failed" };
	}
}

function getInstalledNames(): Set<string> {
	const names = new Set<string>();
	if (!existsSync(LOCK_PATH)) return names;
	try {
		const data = JSON.parse(readFileSync(LOCK_PATH, "utf-8"));
		if (data.skills) {
			for (const name of Object.keys(data.skills)) {
				names.add(name);
			}
		}
	} catch { /* empty */ }
	return names;
}

export function formatInstalls(n: number): string {
	if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
	if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
	return String(n);
}
