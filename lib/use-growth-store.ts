"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DailyLog,
  LevelNumber,
  LearningTask,
  Skill,
  calculateLevel,
  createLevelPresetSkills,
  defaultLogs,
  defaultProfile,
  defaultSkills,
  storageKeys,
} from "@/lib/growth-data";

type Profile = typeof defaultProfile;

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function mergeSkillsWithDefaults(savedSkills: Skill[]): Skill[] {
  const savedSkillById = new Map(savedSkills.map((skill) => [skill.id, skill]));

  return defaultSkills.map((defaultSkill) => {
    const savedSkill = savedSkillById.get(defaultSkill.id);
    if (!savedSkill) return defaultSkill;

    const savedTaskById = new Map(savedSkill.tasks.map((task) => [task.id, task]));

    return {
      ...defaultSkill,
      tasks: defaultSkill.tasks.map((defaultTask) => ({
        ...defaultTask,
        completed: savedTaskById.get(defaultTask.id)?.completed ?? defaultTask.completed,
      })),
    };
  });
}

export function useGrowthStore() {
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [logs, setLogs] = useState<DailyLog[]>(defaultLogs);
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setSkills(mergeSkillsWithDefaults(readJson(storageKeys.skills, defaultSkills)));
    setLogs(readJson(storageKeys.logs, defaultLogs));
    setProfile(readJson(storageKeys.profile, defaultProfile));
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) window.localStorage.setItem(storageKeys.skills, JSON.stringify(skills));
  }, [isReady, skills]);

  useEffect(() => {
    if (isReady) window.localStorage.setItem(storageKeys.logs, JSON.stringify(logs));
  }, [isReady, logs]);

  useEffect(() => {
    if (isReady) window.localStorage.setItem(storageKeys.profile, JSON.stringify(profile));
  }, [isReady, profile]);

  const level = useMemo(() => calculateLevel(skills), [skills]);

  function toggleTask(skillId: string, taskId: string) {
    setSkills((currentSkills) =>
      currentSkills.map((skill) => {
        if (skill.id !== skillId) return skill;

        return {
          ...skill,
          tasks: skill.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          ),
        };
      }),
    );
  }

  function updateTask(skillId: string, taskId: string, patch: Partial<LearningTask>) {
    setSkills((currentSkills) =>
      currentSkills.map((skill) => {
        if (skill.id !== skillId) return skill;

        return {
          ...skill,
          tasks: skill.tasks.map((task) => (task.id === taskId ? { ...task, ...patch } : task)),
        };
      }),
    );
  }

  function addLog(log: Omit<DailyLog, "id">) {
    setLogs((currentLogs) => [{ ...log, id: crypto.randomUUID() }, ...currentLogs]);
  }

  function deleteLog(logId: string) {
    setLogs((currentLogs) => currentLogs.filter((log) => log.id !== logId));
  }

  function resetDemoData() {
    setSkills(defaultSkills);
    setLogs(defaultLogs);
    setProfile(defaultProfile);
  }

  function applyLevelPreset(level: LevelNumber) {
    setSkills((currentSkills) => createLevelPresetSkills(level, mergeSkillsWithDefaults(currentSkills)));
  }

  return {
    skills,
    logs,
    profile,
    level,
    isReady,
    setProfile,
    toggleTask,
    updateTask,
    addLog,
    deleteLog,
    resetDemoData,
    applyLevelPreset,
  };
}
