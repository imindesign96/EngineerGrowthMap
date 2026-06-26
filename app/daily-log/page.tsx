"use client";

import { FormEvent, useMemo, useState } from "react";
import { CalendarDays, Trash2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useGrowthStore } from "@/lib/use-growth-store";

function today() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function DailyLogPage() {
  const { skills, logs, addLog, deleteLog } = useGrowthStore();
  const [date, setDate] = useState(today());
  const [learned, setLearned] = useState("");
  const [relatedSkillId, setRelatedSkillId] = useState("ios-core");
  const [note, setNote] = useState("");

  const skillNameById = useMemo(() => new Map(skills.map((skill) => [skill.id, skill.name])), [skills]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!learned.trim()) return;

    addLog({
      date,
      learned: learned.trim(),
      relatedSkillId,
      note: note.trim(),
    });
    setLearned("");
    setNote("");
  }

  return (
    <AppShell>
      <section className="grid gap-6 lg:grid-cols-[24rem_1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-black/10 bg-white/84 p-5 shadow-soft dark:border-white/10 dark:bg-white/8"
        >
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-sky-500" />
            <h1 className="text-xl font-bold">Nhật ký hằng ngày</h1>
          </div>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium">Ngày</span>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm dark:border-white/10 dark:bg-ink-900"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium">Hôm nay đã học gì</span>
              <input
                value={learned}
                onChange={(event) => setLearned(event.target.value)}
                placeholder="VD: Thiết kế retry policy cho refresh token"
                className="mt-2 h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm dark:border-white/10 dark:bg-ink-900"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium">Kỹ năng liên quan</span>
              <select
                value={relatedSkillId}
                onChange={(event) => setRelatedSkillId(event.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm dark:border-white/10 dark:bg-ink-900"
              >
                {skills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium">Ghi chú</span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={5}
                placeholder="Quyết định, insight, link hoặc bước tiếp theo"
                className="mt-2 w-full resize-none rounded-lg border border-black/10 bg-white px-3 py-3 text-sm dark:border-white/10 dark:bg-ink-900"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-5 h-11 w-full rounded-lg bg-ink-950 px-4 text-sm font-semibold text-white transition hover:bg-ink-800 dark:bg-white dark:text-ink-950"
          >
            Thêm nhật ký
          </button>
        </form>

        <div className="rounded-lg border border-black/10 bg-white/84 p-5 shadow-soft dark:border-white/10 dark:bg-white/8">
          <h2 className="text-xl font-bold">Lịch sử học tập</h2>
          <div className="mt-5 space-y-3">
            {logs.length === 0 ? (
              <div className="rounded-lg border border-dashed border-black/15 p-8 text-center text-sm text-ink-700 dark:border-white/15 dark:text-ink-200">
                Chưa có nhật ký nào. Ghi lại một tiến bộ nhỏ để bắt đầu hành trình.
              </div>
            ) : (
              logs.map((log) => (
                <article key={log.id} className="rounded-lg border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-ink-900">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-ink-700 dark:text-ink-200">{log.date}</p>
                      <h3 className="mt-1 font-semibold">{log.learned}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteLog(log.id)}
                      title="Xóa nhật ký"
                      className="grid h-9 w-9 place-items-center rounded-lg text-ink-700 transition hover:bg-rose-100 hover:text-rose-700 dark:text-ink-200 dark:hover:bg-rose-400/15 dark:hover:text-rose-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-3 inline-flex rounded-md bg-black/5 px-2 py-1 text-xs font-semibold dark:bg-white/10">
                    {skillNameById.get(log.relatedSkillId) ?? "Kỹ năng không xác định"}
                  </p>
                  {log.note && <p className="mt-3 text-sm leading-6 text-ink-700 dark:text-ink-200">{log.note}</p>}
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
