"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Bell,
  Cloud,
  Code2,
  Crown,
  Database,
  FileSearch,
  GitBranch,
  Lock,
  ScrollText,
  Server,
  Shield,
  Sparkles,
  TestTube2,
  Users,
} from "lucide-react";
import { ProgressBar } from "@/components/progress-bar";
import { Skill, calculateSkillProgress, calculateSkillRank, calculateSkillXp, getSkillStatus } from "@/lib/growth-data";

type SkillCardProps = {
  skill: Skill;
  compact?: boolean;
};

function statusClasses(status: string) {
  if (status === "Mạnh") return "bg-amber-300/18 text-amber-100 ring-1 ring-amber-300/30";
  if (status === "Tốt") return "bg-purple-400/18 text-purple-100 ring-1 ring-purple-300/30";
  if (status === "Đang học") return "bg-sky-400/18 text-sky-100 ring-1 ring-sky-300/30";
  return "bg-rose-500/20 text-rose-100 ring-1 ring-rose-400/25";
}

function tone(status: string) {
  if (status === "Mạnh") return "emerald";
  if (status === "Tốt") return "sky";
  if (status === "Đang học") return "amber";
  return "rose";
}

const skillIcons = {
  "ios-core": Code2,
  requirements: FileSearch,
  "basic-design": ScrollText,
  "detailed-design": GitBranch,
  "api-backend": Server,
  database: Database,
  "architecture-system-design": Crown,
  "aws-infra": Cloud,
  security: Lock,
  test: TestTube2,
  "release-operation": Bell,
  "team-leadership-communication": Users,
};

function glowClasses(progress: number) {
  if (progress >= 90) return "border-amber-300/55 shadow-[0_0_28px_rgba(245,158,11,0.2)]";
  if (progress >= 70) return "border-purple-300/45 shadow-[0_0_24px_rgba(168,85,247,0.18)]";
  if (progress >= 40) return "border-sky-300/40 shadow-[0_0_22px_rgba(96,165,250,0.16)]";
  return "border-slate-500/24";
}

export function SkillCard({ skill, compact = false }: SkillCardProps) {
  const progress = calculateSkillProgress(skill);
  const status = getSkillStatus(progress);
  const Icon = skillIcons[skill.id as keyof typeof skillIcons] ?? Shield;
  const skillLevel = Math.min(10, Math.floor(progress / 10));
  const rank = calculateSkillRank(progress);
  const xp = calculateSkillXp(skill);

  return (
    <Link
      href={`/skills/${skill.id}`}
      className={`group relative block overflow-hidden rounded-lg border bg-[#101826]/86 p-4 transition duration-300 hover:-translate-y-1 hover:scale-[1.015] ${glowClasses(progress)}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/7 via-transparent to-sky-400/8 opacity-80" />
      <div className="relative mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="grid h-14 w-14 shrink-0 place-items-center border border-amber-300/30 bg-slate-950/80 text-sky-100 shadow-[inset_0_0_18px_rgba(96,165,250,0.14)]"
            style={{ clipPath: "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%)" }}
          >
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-white">{skill.name}</h3>
            <p className="mt-1 text-xs font-semibold text-amber-100/80">Skill Lv.{skillLevel}/10 · {rank}</p>
          </div>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-200" />
      </div>
      {!compact && (
        <div className="relative mb-4">
          {!compact && (
            <p className="line-clamp-2 text-xs leading-5 text-slate-300">{skill.description}</p>
          )}
        </div>
      )}

      <div className="relative space-y-3">
        <div className="flex items-center justify-between">
          <span className={`rounded-md px-2 py-1 text-xs font-semibold ${statusClasses(status)}`}>{status}</span>
          <span className="text-sm font-bold tabular-nums text-amber-100">{progress}%</span>
        </div>
        <ProgressBar value={progress} tone={tone(status)} />
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
          <span>XP kỹ năng</span>
          <span className="tabular-nums text-cyan-100">{xp} XP</span>
        </div>
      </div>
    </Link>
  );
}
