"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ProgressBar } from "@/components/progress-bar";
import { calculateSkillProgress, getSkillStatus } from "@/lib/growth-data";
import { useGrowthStore } from "@/lib/use-growth-store";

const difficultyClasses = {
  easy: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-200",
  hard: "bg-rose-100 text-rose-800 dark:bg-rose-400/15 dark:text-rose-200",
};

const difficultyLabels = {
  easy: "Dễ",
  medium: "Trung bình",
  hard: "Khó",
};

export default function SkillDetailPage() {
  const params = useParams<{ skillId: string }>();
  const { skills, toggleTask } = useGrowthStore();
  const skill = skills.find((item) => item.id === params.skillId);

  if (!skill) notFound();

  const progress = calculateSkillProgress(skill);
  const status = getSkillStatus(progress);

  return (
    <AppShell>
      <div className="mb-5">
        <Link
          href="/"
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-black/10 bg-white/80 px-3 text-sm font-medium text-ink-700 hover:bg-white dark:border-white/10 dark:bg-white/8 dark:text-ink-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Tổng quan
        </Link>
      </div>

      <section className="grid gap-6 lg:grid-cols-[22rem_1fr]">
        <aside className="rounded-lg border border-black/10 bg-white/86 p-5 shadow-soft dark:border-white/10 dark:bg-white/8">
          <p className="text-sm font-medium text-ink-700 dark:text-ink-200">Chi tiết kỹ năng</p>
          <h1 className="mt-2 text-3xl font-bold">{skill.name}</h1>
          <p className="mt-4 text-sm leading-6 text-ink-700 dark:text-ink-200">{skill.description}</p>
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Tiến độ hiện tại</span>
              <span className="text-lg font-bold tabular-nums">{progress}%</span>
            </div>
            <ProgressBar value={progress} />
            <span className="inline-flex rounded-md bg-black/5 px-2 py-1 text-xs font-semibold dark:bg-white/10">
              {status}
            </span>
          </div>
        </aside>

        <div className="space-y-4">
          {skill.tasks.map((task) => (
            <label
              key={task.id}
              className="flex cursor-pointer gap-4 rounded-lg border border-black/10 bg-white/86 p-4 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-white/8 dark:hover:bg-white/12"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(skill.id, task.id)}
                className="sr-only"
              />
              <span className="mt-1 text-emerald-500">
                {task.completed ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className={`text-base font-semibold ${task.completed ? "line-through opacity-70" : ""}`}>
                    {task.title}
                  </span>
                  <span className={`rounded-md px-2 py-1 text-xs font-semibold ${difficultyClasses[task.difficulty]}`}>
                    {difficultyLabels[task.difficulty]}
                  </span>
                </span>
                <span className="mt-2 block text-sm leading-6 text-ink-700 dark:text-ink-200">{task.description}</span>
              </span>
            </label>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
