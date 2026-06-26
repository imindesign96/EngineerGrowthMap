"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Target } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ProgressBar } from "@/components/progress-bar";
import {
  calculateSkillProgress,
  getNextRecommendedTask,
  getRoadmapSkills,
  getWeakestSkills,
} from "@/lib/growth-data";
import { useGrowthStore } from "@/lib/use-growth-store";

export default function RoadmapPage() {
  const { skills } = useGrowthStore();
  const orderedSkills = getRoadmapSkills(skills);
  const weakestSkills = getWeakestSkills(skills).slice(0, 5);
  const nextTask = getNextRecommendedTask(skills);

  return (
    <AppShell>
      <section className="grid gap-6 lg:grid-cols-[1fr_24rem]">
        <div className="rounded-lg border border-black/10 bg-white/84 p-5 shadow-soft dark:border-white/10 dark:bg-white/8">
          <h1 className="text-2xl font-bold">Thứ tự học đề xuất</h1>
          <div className="mt-6 space-y-3">
            {orderedSkills.map((skill, index) => {
              const progress = calculateSkillProgress(skill);

              return (
                <Link
                  href={`/skills/${skill.id}`}
                  key={skill.id}
                  className="grid gap-4 rounded-lg border border-black/10 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-soft dark:border-white/10 dark:bg-ink-900 sm:grid-cols-[3rem_1fr_4rem] sm:items-center"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-ink-950 text-sm font-bold text-white dark:bg-white dark:text-ink-950">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block font-semibold">{skill.name}</span>
                    <span className="mt-2 block">
                      <ProgressBar value={progress} />
                    </span>
                  </span>
                  <span className="font-semibold tabular-nums sm:text-right">{progress}%</span>
                </Link>
              );
            })}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-lg border border-black/10 bg-white/84 p-5 shadow-sm dark:border-white/10 dark:bg-white/8">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-emerald-500" />
              <h2 className="text-sm font-semibold">Nhiệm vụ đề xuất tiếp theo</h2>
            </div>
            {nextTask ? (
              <Link href={`/skills/${nextTask.skill.id}`} className="mt-4 block rounded-lg bg-black/5 p-4 dark:bg-white/8">
                <p className="text-xs font-semibold text-ink-700 dark:text-ink-200">{nextTask.skill.name}</p>
                <p className="mt-1 font-semibold">{nextTask.task.title}</p>
                <p className="mt-2 text-sm leading-6 text-ink-700 dark:text-ink-200">{nextTask.task.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                  Mở kỹ năng <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ) : (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-100 p-4 text-sm font-semibold text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200">
                <CheckCircle2 className="h-5 w-5" />
                Tất cả nhiệm vụ trong lộ trình đã hoàn thành.
              </div>
            )}
          </div>

          <div className="rounded-lg border border-black/10 bg-white/84 p-5 shadow-sm dark:border-white/10 dark:bg-white/8">
            <h2 className="text-sm font-semibold">Kỹ năng yếu nhất trước</h2>
            <div className="mt-4 space-y-3">
              {weakestSkills.map((skill) => {
                const progress = calculateSkillProgress(skill);
                return (
                  <Link href={`/skills/${skill.id}`} key={skill.id} className="block rounded-lg bg-black/5 p-3 dark:bg-white/8">
                    <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="font-semibold tabular-nums">{progress}%</span>
                    </div>
                    <ProgressBar value={progress} tone={progress < 25 ? "rose" : "amber"} />
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
