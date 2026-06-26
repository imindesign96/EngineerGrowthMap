import { describe, expect, it } from "vitest";
import {
  Skill,
  applyProgressTargets,
  calculateLevel,
  calculateTodayXp,
  calculateTotalXp,
  createLevelPresetSkills,
  defaultSkills,
  getAchievements,
  getQuestBoard,
  getStreakStats,
  levelProgressPresets,
} from "./growth-data";

type ProgressBySkill = Record<string, number>;

function completeToProgress(skills: Skill[], progressBySkill: ProgressBySkill): Skill[] {
  return applyProgressTargets(skills, { skills: progressBySkill });
}

function profile(progressBySkill: ProgressBySkill): Skill[] {
  return completeToProgress(defaultSkills, progressBySkill);
}

function allSkillsAt(progress: number, overrides: ProgressBySkill = {}): Skill[] {
  return applyProgressTargets(defaultSkills, { all: progress, skills: overrides });
}

describe("calculateLevel", () => {
  it("starts at Lv.1 when no tasks are completed", () => {
    expect(calculateLevel(profile({})).level).toBe(1);
  });

  it("reaches Lv.2 when iOS fundamentals start progressing", () => {
    const level = calculateLevel(profile({ "ios-core": 30 }));

    expect(level.level).toBe(2);
    expect(level.title).toBe("Kỹ sư iOS Middle");
  });

  it("reaches Lv.3 for a broad middle baseline without senior-level design yet", () => {
    const level = calculateLevel(allSkillsAt(35, { "ios-core": 60 }));

    expect(level.level).toBe(3);
    expect(level.title).toBe("Middle vững");
  });

  it("does not reach Lv.4 when communication is still too weak", () => {
    const level = calculateLevel(
      allSkillsAt(55, {
        "ios-core": 75,
        "basic-design": 60,
        "detailed-design": 60,
        "architecture-system-design": 50,
        "team-leadership-communication": 20,
        "api-backend": 50,
        test: 50,
      }),
    );

    expect(level.level).toBe(3);
  });

  it("reaches Lv.4 when iOS, feature design, system design, API/test collaboration, and communication are ready", () => {
    const level = calculateLevel(
      allSkillsAt(55, {
        "ios-core": 75,
        "basic-design": 60,
        "detailed-design": 60,
        "architecture-system-design": 50,
        "team-leadership-communication": 35,
        "api-backend": 50,
        test: 50,
      }),
    );

    expect(level.level).toBe(4);
    expect(level.title).toBe("Kỹ sư iOS Senior");
  });

  it("does not reach Lv.5 without clear leadership even when full-cycle skills are broad", () => {
    const level = calculateLevel(
      allSkillsAt(68, {
        "ios-core": 82,
        "basic-design": 70,
        "detailed-design": 70,
        "architecture-system-design": 70,
        "team-leadership-communication": 45,
        "api-backend": 70,
        database: 70,
        "aws-infra": 70,
        security: 70,
        test: 70,
        "release-operation": 70,
      }),
    );

    expect(level.level).toBe(4);
  });

  it("reaches Lv.5 with full-cycle breadth and clear leadership", () => {
    const level = calculateLevel(
      allSkillsAt(68, {
        "ios-core": 82,
        "basic-design": 70,
        "detailed-design": 70,
        "architecture-system-design": 70,
        "team-leadership-communication": 60,
        "api-backend": 70,
        database: 70,
        "aws-infra": 70,
        security: 70,
        test: 70,
        "release-operation": 70,
      }),
    );

    expect(level.level).toBe(5);
    expect(level.title).toBe("Ứng viên trưởng nhóm kỹ thuật");
  });

  it("does not reach Lv.6 without requirements and release/operation ownership", () => {
    const level = calculateLevel(
      allSkillsAt(84, {
        "ios-core": 90,
        "basic-design": 82,
        "detailed-design": 82,
        "architecture-system-design": 82,
        "team-leadership-communication": 75,
        requirements: 60,
        "release-operation": 65,
      }),
    );

    expect(level.level).toBe(5);
  });

  it("reaches Lv.6 when discovery-to-operation ownership is strong", () => {
    const level = calculateLevel(
      allSkillsAt(84, {
        "ios-core": 90,
        "basic-design": 82,
        "detailed-design": 82,
        "architecture-system-design": 82,
        "team-leadership-communication": 75,
        requirements: 75,
        "release-operation": 80,
      }),
    );

    expect(level.level).toBe(6);
    expect(level.title).toBe("Kỹ sư Full Cycle");
  });

  it("progresses monotonically from Lv.1 to Lv.6 across representative profiles", () => {
    const levels = [1, 2, 3, 4, 5, 6].map((level) =>
      calculateLevel(createLevelPresetSkills(level as 1 | 2 | 3 | 4 | 5 | 6)).level,
    );

    expect(levels).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("keeps level button presets in sync with the level calculation", () => {
    const levels = Object.keys(levelProgressPresets).map((level) => Number(level));

    for (const level of levels) {
      const presetSkills = createLevelPresetSkills(level as 1 | 2 | 3 | 4 | 5 | 6);

      expect(calculateLevel(presetSkills).level).toBe(level);
    }
  });
});

describe("gamification helpers", () => {
  it("calculates XP from completed task difficulty", () => {
    const skills = createLevelPresetSkills(1);

    expect(calculateTotalXp(skills)).toBeGreaterThan(0);
  });

  it("builds quest board from the next available learning tasks", () => {
    const quests = getQuestBoard(defaultSkills);

    expect(quests.length).toBeGreaterThanOrEqual(2);
    expect(quests.some((quest) => quest.category === "Daily")).toBe(true);
    expect(quests.every((quest) => quest.rewardXp > 0)).toBe(true);
  });

  it("unlocks achievements from progress and learning logs", () => {
    const skills = createLevelPresetSkills(5);
    const logs = [{ id: "log-1", date: "2026-06-26", learned: "System design", relatedSkillId: "architecture-system-design", note: "" }];
    const achievements = getAchievements(skills, logs);

    expect(achievements.some((achievement) => achievement.id === "first-quest" && achievement.unlocked)).toBe(true);
    expect(achievements.some((achievement) => achievement.id === "ios-apprentice" && achievement.unlocked)).toBe(true);
  });

  it("calculates daily XP and streaks from daily logs", () => {
    const logs = [
      { id: "1", date: "2026-06-24", learned: "A", relatedSkillId: "ios-core", note: "" },
      { id: "2", date: "2026-06-25", learned: "B", relatedSkillId: "ios-core", note: "" },
      { id: "3", date: "2026-06-26", learned: "C", relatedSkillId: "ios-core", note: "" },
    ];

    expect(calculateTodayXp(logs, new Date("2026-06-26T12:00:00"))).toBe(80);
    expect(getStreakStats(logs, new Date("2026-06-26T12:00:00"))).toEqual({ currentStreak: 3, bestStreak: 3 });
  });
});
