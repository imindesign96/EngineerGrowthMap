"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import {
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Flame,
  Gauge,
  Gem,
  Lock,
  Medal,
  Route,
  ShieldCheck,
  Sparkles,
  Store,
  Swords,
  Trophy,
  UsersRound,
  Zap,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ProgressBar } from "@/components/progress-bar";
import { SkillCard } from "@/components/skill-card";
import {
  Achievement,
  Quest,
  Skill,
  calculateAverageProgress,
  calculateSkillProgress,
  calculateTodayXp,
  calculateTotalXp,
  calculateWeeklyStudyHours,
  careerStages,
  getAchievements,
  getQuestBoard,
  skillTreePath,
} from "@/lib/growth-data";
import { useGrowthStore } from "@/lib/use-growth-store";
import level1Image from "@/lib/images/level-1.png";
import level2Image from "@/lib/images/level-2.png";
import level3Image from "@/lib/images/level-3.png";
import level4Image from "@/lib/images/level-4.png";
import level5Image from "@/lib/images/level-5.png";
import level6Image from "@/lib/images/level-6.png";

const levelCharacterImages: Record<number, StaticImageData> = {
  1: level1Image,
  2: level2Image,
  3: level3Image,
  4: level4Image,
  5: level5Image,
  6: level6Image,
};

const nextXpByLevel: Record<number, number> = {
  1: 100,
  2: 250,
  3: 500,
  4: 1200,
  5: 3000,
  6: 10000,
};

const floorXpByLevel: Record<number, number> = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 1200,
  6: 3000,
};

export default function DashboardPage() {
  const { skills, logs, profile, level, applyLevelPreset } = useGrowthStore();
  const [viewMode, setViewMode] = useState<"cards" | "tree">("cards");
  const average = calculateAverageProgress(skills);
  const strongSkills = skills.filter((skill) => calculateSkillProgress(skill) >= 80).length;
  const weakSkills = skills.filter((skill) => calculateSkillProgress(skill) < 25).length;
  const presetLevels = [1, 2, 3, 4, 5, 6] as const;
  const characterImage = levelCharacterImages[level.level] ?? level1Image;
  const nextXp = nextXpByLevel[level.level] ?? 10000;
  const totalXp = calculateTotalXp(skills);
  const floorXp = floorXpByLevel[level.level] ?? 0;
  const currentXp = level.level === 6 ? Math.min(nextXp, totalXp) : Math.max(0, Math.min(nextXp - floorXp - 1, totalXp - floorXp));
  const xpTarget = level.level === 6 ? nextXp : nextXp - floorXp;
  const sortedSkills = [...skills].sort((a, b) => calculateSkillProgress(b) - calculateSkillProgress(a));
  const strengths = sortedSkills.slice(0, 2);
  const weaknesses = [...skills].sort((a, b) => calculateSkillProgress(a) - calculateSkillProgress(b)).slice(0, 2);
  const quests = getQuestBoard(skills);
  const achievements = getAchievements(skills, logs);
  const unlockedAchievements = achievements.filter((achievement) => achievement.unlocked).length;
  const todayXp = calculateTodayXp(logs);
  const weeklyHours = calculateWeeklyStudyHours(logs);
  const weeklyGoal = 20;

  return (
    <AppShell>
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="rpg-panel rounded-lg p-5 sm:p-6">
          <div className="relative mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">RPG Progression</p>
              <h2 className="mt-1 text-xl font-black text-white">Bản đồ kỹ năng kỹ sư</h2>
            </div>
            <div className="inline-grid grid-cols-2 rounded-lg border border-slate-500/25 bg-black/24 p-1 text-sm font-bold">
              <button
                type="button"
                onClick={() => setViewMode("cards")}
                className={`rounded-md px-4 py-2 transition ${viewMode === "cards" ? "bg-cyan-300/18 text-cyan-100 shadow-[0_0_18px_rgba(79,209,197,0.18)]" : "text-slate-400 hover:text-white"}`}
              >
                Card View
              </button>
              <button
                type="button"
                onClick={() => setViewMode("tree")}
                className={`rounded-md px-4 py-2 transition ${viewMode === "tree" ? "bg-purple-400/18 text-purple-100 shadow-[0_0_18px_rgba(168,85,247,0.18)]" : "text-slate-400 hover:text-white"}`}
              >
                Skill Tree
              </button>
            </div>
          </div>

          {viewMode === "cards" ? (
            <>
              <div className="grid gap-6 xl:grid-cols-[1fr_21rem_1fr] xl:items-center">
                <div className="order-2 grid gap-4 sm:grid-cols-2 xl:order-1 xl:grid-cols-1">
                  {skills.slice(0, 3).map((skill) => (
                    <SkillCard key={skill.id} skill={skill} compact />
                  ))}
                </div>

                <div className="relative order-1 mx-auto flex min-h-[34rem] w-full max-w-sm items-center justify-center xl:order-2">
              <div className="absolute inset-0 rounded-full border border-amber-300/16" />
              <div className="absolute inset-8 rounded-full border border-sky-300/12" />
              <div className="rpg-panel relative w-full overflow-hidden rounded-lg p-5 text-center">
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sky-400/16 to-transparent" />
                <div className="absolute bottom-20 left-1/2 h-28 w-56 -translate-x-1/2 rounded-full rpg-magic-circle opacity-80" />
                <div className="relative mx-auto mb-3 inline-flex items-center gap-2 rounded-md border border-cyan-300/40 bg-cyan-300/12 px-4 py-1 text-xs font-bold uppercase tracking-widest text-cyan-100 shadow-[0_0_24px_rgba(79,209,197,0.18)]">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
                  Nhân vật hiện tại
                </div>
                <div className="relative mx-auto mb-4 grid h-56 w-56 place-items-center overflow-visible sm:h-64 sm:w-64">
                  <Image
                    src={characterImage}
                    alt={`Nhân vật đại diện ${level.title}`}
                    className="relative z-10 h-full w-full object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.48)]"
                    priority
                    sizes="208px"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
                <p className="relative text-sm font-medium text-slate-300">{profile.title}</p>
                <h1 className="relative mt-1 text-3xl font-black uppercase tracking-wide rpg-gold-text">{profile.name}</h1>
                <div className="relative mt-4 inline-flex items-center gap-2 rounded-md border border-amber-300/40 bg-amber-300/12 px-4 py-2 text-sm font-bold text-amber-100 shadow-[0_0_22px_rgba(245,158,11,0.16)]">
                  <Award className="h-4 w-4" />
                  Lv.{level.level} {level.title}
                </div>
                <div className="relative mt-4 grid grid-cols-[3.5rem_1fr_3.5rem] items-center gap-2 text-sm">
                  <span className="rounded-md border border-amber-300/25 bg-black/20 px-2 py-1 font-bold text-amber-100">Lv.{level.level}</span>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
                        <span>XP</span>
                      <span className="font-semibold tabular-nums text-amber-100">{currentXp} / {xpTarget}</span>
                      </div>
                    <ProgressBar value={(currentXp / xpTarget) * 100} tone="amber" />
                  </div>
                  <span className="rounded-md border border-sky-300/25 bg-black/20 px-2 py-1 font-bold text-sky-100">
                    Lv.{Math.min(6, level.level + 1)}
                  </span>
                </div>
                <p className="relative mx-auto mt-4 max-w-xs text-sm leading-6 text-slate-300">{level.description}</p>
                <div className="relative mt-5 grid gap-3 text-left sm:grid-cols-2">
                  <div className="rounded-md border border-emerald-300/20 bg-emerald-300/8 p-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-200">Strengths</p>
                    <div className="mt-2 space-y-1 text-xs text-slate-300">
                      {strengths.map((skill) => (
                        <p key={skill.id} className="flex justify-between gap-2">
                          <span className="truncate">{skill.name}</span>
                          <span className="font-bold text-emerald-100">{calculateSkillProgress(skill)}%</span>
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-md border border-rose-300/20 bg-rose-500/8 p-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-rose-200">Weaknesses</p>
                    <div className="mt-2 space-y-1 text-xs text-slate-300">
                      {weaknesses.map((skill) => (
                        <p key={skill.id} className="flex justify-between gap-2">
                          <span className="truncate">{skill.name}</span>
                          <span className="font-bold text-rose-100">{calculateSkillProgress(skill)}%</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative mt-5 space-y-2 text-left">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Tiến độ kỹ năng trung bình</span>
                    <span className="font-bold tabular-nums text-amber-100">{average}%</span>
                  </div>
                  <ProgressBar value={average} tone="emerald" />
                </div>
              </div>
            </div>

                <div className="order-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  {skills.slice(3, 6).map((skill) => (
                    <SkillCard key={skill.id} skill={skill} compact />
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {skills.slice(6).map((skill) => (
                  <SkillCard key={skill.id} skill={skill} compact />
                ))}
              </div>
            </>
          ) : (
            <SkillTreeView skills={skills} />
          )}

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <MotivationCard icon={Zap} label="XP hôm nay" value={`${todayXp} XP`} tone="cyan" />
            <MotivationCard icon={Flame} label="Weekly Goal" value={`${Math.min(weeklyGoal, weeklyHours)} / ${weeklyGoal}h`} tone="amber" progress={(weeklyHours / weeklyGoal) * 100} />
            <MotivationCard icon={Medal} label="Achievement" value={`${unlockedAchievements} / ${achievements.length}`} tone="purple" progress={(unlockedAchievements / achievements.length) * 100} />
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
            <QuestBoard quests={quests} />
            <AchievementShowcase achievements={achievements} />
          </div>

          <CareerRoadmap currentLevel={level.level} />
        </div>

        <aside className="space-y-4">
          <div className="rpg-panel rounded-lg p-5">
            <div className="flex items-center gap-3">
              <Gauge className="h-5 w-5 text-cyan-200" />
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-100">Tóm tắt phát triển</h2>
            </div>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-md border border-white/8 bg-black/20 p-3">
                <dt className="text-xs text-slate-300">Trung bình</dt>
                <dd className="mt-1 text-3xl font-black rpg-gold-text">{average}%</dd>
              </div>
              <div className="rounded-md border border-white/8 bg-black/20 p-3">
                <dt className="text-xs text-slate-300">Mạnh</dt>
                <dd className="mt-1 text-3xl font-black text-cyan-100">{strongSkills}</dd>
              </div>
              <div className="rounded-md border border-white/8 bg-black/20 p-3">
                <dt className="text-xs text-slate-300">Yếu</dt>
                <dd className="mt-1 text-3xl font-black text-rose-100">{weakSkills}</dd>
              </div>
            </dl>
          </div>

          <div className="rpg-panel rounded-lg p-5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-sky-200" />
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-100">Quy tắc lên cấp</h2>
            </div>
            <div className="mt-4 space-y-4 text-sm leading-6 text-slate-300">
              <p><span className="font-bold text-cyan-200">Lv.4+</span> cần iOS Core vững, thiết kế được feature lớn, hiểu System Design ở mức feature, biết review kỹ thuật và phối hợp tốt với Backend/QA/PM.</p>
              <p><span className="font-bold text-amber-200">Lv.5+</span> cần năng lực full-cycle rộng hơn qua API, DB, hạ tầng, bảo mật, kiểm thử, vận hành; đồng thời có Communication/Leadership rõ để dẫn dắt delivery và mentor member.</p>
              <p><span className="font-bold text-purple-200">Lv.6</span> là mức làm chủ delivery từ yêu cầu đến vận hành, điều phối nhiều bên, chuẩn hóa cách làm và chủ động xử lý rủi ro production.</p>
            </div>
          </div>

          <div className="rpg-panel overflow-hidden rounded-lg p-5">
            <div className="absolute bottom-0 right-0 h-40 w-28 bg-gradient-to-tl from-purple-500/25 to-transparent" />
            <h2 className="relative text-sm font-bold uppercase tracking-wide text-amber-100">Backdoor kiểm thử max level</h2>
            <p className="relative mt-2 text-sm leading-6 text-slate-300">
              Bấm một level để tick checklist gần mức tối đa của level đó. Hệ thống vẫn tự tính lại phần trăm và level như khi tick tay.
            </p>
            <div className="relative mt-4 grid grid-cols-3 gap-2">
              {presetLevels.map((presetLevel) => (
                <button
                  key={presetLevel}
                  type="button"
                  onClick={() => applyLevelPreset(presetLevel)}
                  className={`h-10 rounded-md border text-sm font-bold transition hover:-translate-y-0.5 ${
                    level.level === presetLevel
                      ? "border-amber-300 bg-amber-300/80 text-slate-950 shadow-[0_0_22px_rgba(245,158,11,0.36)]"
                      : "border-slate-500/35 bg-slate-950/42 text-slate-300 hover:border-purple-300/60 hover:bg-purple-400/14"
                  }`}
                >
                  Lv.{presetLevel}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </section>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 hidden justify-center px-4 pb-3 lg:flex">
        <div className="pointer-events-auto grid w-full max-w-4xl grid-cols-5 items-center rounded-t-2xl border border-amber-300/24 bg-[#070b14]/88 px-4 py-2 shadow-[0_-18px_55px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          {[
            { label: "Nhiệm vụ", icon: BookOpen, badge: "3" },
            { label: "Thành tích", icon: Trophy },
            { label: "Bắt đầu hành trình", icon: Sparkles, active: true },
            { label: "Bạn đồng hành", icon: UsersRound },
            { label: "Cửa hàng", icon: Store, badge: "!" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className={`relative flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs font-semibold transition ${
                  item.active
                    ? "text-cyan-100"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                }`}
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-full border ${
                    item.active
                      ? "border-cyan-300/60 bg-cyan-300/16 shadow-[0_0_28px_rgba(96,165,250,0.28)]"
                      : "border-amber-300/18 bg-black/20"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="absolute right-4 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-black text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

function MotivationCard({
  icon: Icon,
  label,
  value,
  tone,
  progress,
}: {
  icon: typeof Zap;
  label: string;
  value: string;
  tone: "cyan" | "amber" | "purple";
  progress?: number;
}) {
  const toneClasses = {
    cyan: "border-cyan-300/25 bg-cyan-300/8 text-cyan-100",
    amber: "border-amber-300/25 bg-amber-300/8 text-amber-100",
    purple: "border-purple-300/25 bg-purple-400/8 text-purple-100",
  };
  const progressTone = tone === "amber" ? "amber" : tone === "purple" ? "sky" : "emerald";

  return (
    <div className={`rounded-lg border p-4 ${toneClasses[tone]}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
          <p className="mt-1 text-2xl font-black tabular-nums">{value}</p>
        </div>
        <span className="grid h-12 w-12 place-items-center rounded-full border border-current/25 bg-black/24 shadow-[0_0_22px_rgba(255,255,255,0.08)]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      {typeof progress === "number" && (
        <div className="mt-4">
          <ProgressBar value={Math.min(100, progress)} tone={progressTone} />
        </div>
      )}
    </div>
  );
}

function SkillTreeView({ skills }: { skills: Skill[] }) {
  const byId = new Map(skills.map((skill) => [skill.id, skill]));

  return (
    <div className="relative overflow-hidden rounded-lg border border-purple-300/20 bg-black/20 p-5">
      <div className="absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/70 via-purple-400/50 to-amber-300/70 md:block" />
      <div className="relative grid gap-4 md:grid-cols-2">
        {skillTreePath.map((skillId, index) => {
          const skill = byId.get(skillId);
          if (!skill) return null;
          const progress = calculateSkillProgress(skill);
          const unlocked = index === 0 || calculateSkillProgress(byId.get(skillTreePath[index - 1])!) >= 25;
          const isRight = index % 2 === 1;

          return (
            <div key={skill.id} className={`relative ${isRight ? "md:translate-y-10" : ""}`}>
              <a
                href={`/skills/${skill.id}`}
                className={`group block rounded-lg border p-4 transition hover:-translate-y-1 hover:scale-[1.01] ${
                  unlocked
                    ? "border-cyan-300/30 bg-[#101826]/90 shadow-[0_0_26px_rgba(79,209,197,0.12)]"
                    : "border-slate-600/25 bg-slate-950/70 opacity-60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center border ${
                      progress >= 80
                        ? "border-amber-300/70 bg-amber-300/14 text-amber-100"
                        : progress >= 50
                          ? "border-purple-300/60 bg-purple-400/14 text-purple-100"
                          : unlocked
                            ? "border-cyan-300/50 bg-cyan-300/12 text-cyan-100"
                            : "border-slate-500/35 bg-black/30 text-slate-400"
                    }`}
                    style={{ clipPath: "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0 50%)" }}
                  >
                    {unlocked ? <Swords className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-bold text-white">{skill.name}</h3>
                      <span className="text-sm font-black tabular-nums text-amber-100">{progress}%</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{skill.description}</p>
                    <div className="mt-3">
                      <ProgressBar value={progress} tone={progress >= 80 ? "amber" : progress >= 50 ? "sky" : "rose"} />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuestBoard({ quests }: { quests: Quest[] }) {
  const categoryClasses: Record<Quest["category"], string> = {
    Daily: "border-cyan-300/25 bg-cyan-300/8 text-cyan-100",
    Weekly: "border-purple-300/25 bg-purple-400/8 text-purple-100",
    Epic: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  };

  return (
    <div className="rounded-lg border border-cyan-300/18 bg-[#101826]/72 p-4">
      <div className="flex items-center gap-3">
        <Route className="h-5 w-5 text-cyan-200" />
        <h2 className="text-sm font-black uppercase tracking-wide text-white">Quest Board</h2>
      </div>
      <div className="mt-4 grid gap-3">
        {quests.map((quest) => (
          <a
            key={quest.id}
            href={`/skills/${quest.skillId}`}
            className="rounded-lg border border-slate-500/18 bg-black/22 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-cyan-300/8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className={`rounded-md border px-2 py-1 text-xs font-black ${categoryClasses[quest.category]}`}>{quest.category}</span>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-amber-100">
                <Gem className="h-3.5 w-3.5" />
                +{quest.rewardXp} XP · {quest.rewardCoins} coins
              </span>
            </div>
            <h3 className="mt-3 font-bold text-white">{quest.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300">{quest.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

function AchievementShowcase({ achievements }: { achievements: Achievement[] }) {
  const rarityClasses: Record<Achievement["rarity"], string> = {
    Common: "border-slate-400/24 bg-slate-300/8 text-slate-200",
    Rare: "border-cyan-300/35 bg-cyan-300/10 text-cyan-100",
    Epic: "border-purple-300/40 bg-purple-400/12 text-purple-100",
    Legendary: "border-amber-300/50 bg-amber-300/12 text-amber-100 shadow-[0_0_24px_rgba(245,158,11,0.14)]",
  };

  return (
    <div className="rounded-lg border border-amber-300/18 bg-[#101826]/72 p-4">
      <div className="flex items-center gap-3">
        <Trophy className="h-5 w-5 text-amber-200" />
        <h2 className="text-sm font-black uppercase tracking-wide text-white">Achievement</h2>
      </div>
      <div className="mt-4 grid gap-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`rounded-lg border p-3 transition ${rarityClasses[achievement.rarity]} ${achievement.unlocked ? "" : "opacity-45 grayscale"}`}
          >
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-current/25 bg-black/20">
                {achievement.unlocked ? <CheckCircle2 className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-white">{achievement.title}</h3>
                  <span className="rounded bg-black/24 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide">{achievement.rarity}</span>
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-300">{achievement.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CareerRoadmap({ currentLevel }: { currentLevel: number }) {
  return (
    <div className="mt-5 rounded-lg border border-sky-300/18 bg-black/22 p-4">
      <div className="flex items-center gap-3">
        <CalendarDays className="h-5 w-5 text-sky-200" />
        <h2 className="text-sm font-black uppercase tracking-wide text-white">Career Roadmap</h2>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
        {careerStages.map((stage, index) => {
          const stageLevel = index + 1;
          const active = stageLevel === currentLevel;
          const reached = stageLevel < currentLevel;

          return (
            <div
              key={stage}
              className={`rounded-lg border p-3 text-center transition ${
                active
                  ? "border-amber-300/70 bg-amber-300/14 text-amber-100 shadow-[0_0_22px_rgba(245,158,11,0.16)]"
                  : reached
                    ? "border-cyan-300/35 bg-cyan-300/8 text-cyan-100"
                    : "border-slate-600/24 bg-slate-950/45 text-slate-500 blur-[0.2px]"
              }`}
            >
              <p className="text-xs font-black uppercase tracking-wide">Lv.{stageLevel}</p>
              <p className="mt-1 text-sm font-bold">{stage}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
