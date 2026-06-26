"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CalendarDays, Map, RotateCcw, Sparkles } from "lucide-react";
import { useGrowthStore } from "@/lib/use-growth-store";

const navItems = [
  { href: "/", label: "Tổng quan", icon: BarChart3 },
  { href: "/roadmap", label: "Lộ trình", icon: Map },
  { href: "/daily-log", label: "Nhật ký", icon: CalendarDays },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { resetDemoData } = useGrowthStore();

  return (
    <div className="min-h-screen text-ink-100">
      <header className="sticky top-0 z-30 border-b border-amber-400/20 bg-[#070b14]/86 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-amber-300/50 bg-[#101826] text-amber-200 shadow-[0_0_26px_rgba(245,158,11,0.22)]">
              <Sparkles className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-lg font-bold uppercase tracking-wide rpg-gold-text">Engineer Growth Map</span>
              <span className="block text-xs text-slate-300">Từ Middle lên Senior / Trưởng nhóm kỹ thuật</span>
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex h-11 items-center gap-2 rounded-md border px-4 text-sm font-semibold transition hover:-translate-y-0.5 ${
                    isActive
                      ? "border-amber-300/70 bg-amber-300/12 text-amber-100 shadow-[0_0_22px_rgba(245,158,11,0.2)]"
                      : "border-slate-500/25 bg-[#101826]/72 text-slate-300 hover:border-sky-300/45 hover:bg-sky-300/10"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => {
                resetDemoData();
                window.location.reload();
              }}
              title="Đặt lại dữ liệu cục bộ"
              className="grid h-11 w-11 place-items-center rounded-md border border-amber-300/30 bg-[#101826]/72 text-amber-100 transition hover:-translate-y-0.5 hover:border-amber-300/70 hover:bg-amber-300/10"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
