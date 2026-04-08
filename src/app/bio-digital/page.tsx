"use client";

import { useState } from "react";
import Link from "next/link";

export default function BioDigitalPage() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background pb-24">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-background dark:bg-background flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30">
            <img
              alt="Patient Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUJ9ZjICuwKaq0JtfPIPMbDJi8U7p8d2ojJ_CSUqceqeqsx8npMkQtpVVVwtCm1vSkTgNbqXxdBOOut21vYuCzPmrF4U9o5mj_ESAx8QYPVbe5MP-lIleK0Zsur-pBf1MDLnDxFZzlMw0YKYxkoDfGS5MEjW4UNVMnl7TzHtczGF0qHOAVHyldQhFQEmhnpaScQyUhisBZR2znUvZmWml5qbXwarbX2259XwCbxlQEiuAJjlh9W51RFSXlaWrhc4n_uHKAJ0aH4Qej"
            />
          </div>
        </div>
        <h1 className="text-lg font-black tracking-widest text-primary uppercase font-headline">
          BIO-DIGITAL LAB
        </h1>
        <button
          className="hover:opacity-80 transition-opacity text-primary"
          onClick={() => setSettingsOpen(!settingsOpen)}
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      {/* Main Content Canvas */}
      <main className="relative pt-16 flex-1 grid-bg overflow-hidden">
        {/* 3D Digital Twin Visual Area */}
        <div className="relative w-full h-[530px] flex items-center justify-center">
          {/* Central Holographic Model */}
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10"></div>

            {/* Scanner Effect Lines */}
            <div className="absolute w-full h-[1px] bg-primary/30 top-1/3 animate-pulse shadow-[0_0_15px_#CCFF00]"></div>

            {/* Main Character Model (Placeholder for 3D Render) */}
            <div className="h-full w-full flex items-center justify-center mix-blend-screen">
              <div
                className="w-32 h-96 rounded-lg opacity-80"
                style={{
                  background:
                    "linear-gradient(135deg, #CCFF00 0%, #ABD600 50%, transparent 100%)",
                  filter: "grayscale(100%) brightness(1.25) contrast(1.25)",
                }}
              ></div>
            </div>
          </div>

          {/* Floating Glassmorphism Cards */}
          <div className="absolute top-12 left-6 glass-panel p-4 rounded-xl border border-white/5 shadow-2xl z-20 w-36">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">
              Body Fat
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-headline text-primary">14.2</span>
              <span className="text-xs font-bold text-primary/60">%</span>
            </div>
            <div className="w-full h-1 bg-surface-high mt-2 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[14.2%] shadow-[0_0_8px_#CCFF00]"></div>
            </div>
          </div>

          <div className="absolute bottom-20 right-6 glass-panel p-4 rounded-xl border border-white/5 shadow-2xl z-20 w-40">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">
              Muscle Mass
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-headline text-primary">72.8</span>
              <span className="text-xs font-bold text-primary/60">kg</span>
            </div>
            <p className="text-[10px] text-primary-fixed-dim mt-1 font-medium">+1.2kg this month</p>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-4 glass-panel p-3 rounded-full border border-white/5 shadow-2xl z-20 flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-sm mb-1">scale</span>
              <span className="text-xs font-bold text-on-surface">82.4</span>
            </div>
            <div className="w-px h-8 bg-outline-variant/30"></div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-gray-400 text-sm mb-1">height</span>
              <span className="text-xs font-bold text-on-surface">184</span>
            </div>
          </div>
        </div>

        {/* Metric Details Grid (Bento Style) */}
        <section className="px-6 space-y-4 -mt-8 relative z-30">
          <div className="grid grid-cols-2 gap-4">
            {/* Primary Macro Highlight */}
            <div className="col-span-2 bg-surface-low p-5 rounded-xl border border-outline-variant/10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-headline font-bold text-lg">Metabolic Health Score</h3>
                <span className="bg-primary text-on-primary px-2 py-0.5 rounded text-[10px] font-black uppercase">
                  Elite
                </span>
              </div>
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black font-headline">94</span>
                    <span className="text-sm text-on-surface-variant">/100</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    Your cellular recovery rate is 12% higher than the average for your age group.
                  </p>
                </div>
                <div className="w-20 h-20 relative flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-surface-highest"
                      cx="40"
                      cy="40"
                      fill="transparent"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <circle
                      className="text-primary"
                      cx="40"
                      cy="40"
                      fill="transparent"
                      r="36"
                      stroke="currentColor"
                      strokeDasharray="226"
                      strokeDashoffset="14"
                      strokeWidth="4"
                      style={{ filter: "drop-shadow(0 0 4px #CCFF00)" }}
                    ></circle>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center material-symbols-outlined text-primary">
                    bolt
                  </span>
                </div>
              </div>
            </div>

            {/* Secondary Stats */}
            <div className="bg-surface-high p-4 rounded-xl flex flex-col justify-between">
              <span className="material-symbols-outlined text-primary mb-2">water_drop</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-on-surface-variant">Hydration</p>
                <p className="text-xl font-bold">68%</p>
              </div>
            </div>
            <div className="bg-surface-high p-4 rounded-xl flex flex-col justify-between">
              <span className="material-symbols-outlined text-primary mb-2">vital_signs</span>
              <div>
                <p className="text-[10px] uppercase font-bold text-on-surface-variant">HRV</p>
                <p className="text-xl font-bold">72 ms</p>
              </div>
            </div>
          </div>

          {/* Performance Macro-Grid (Signature Component) */}
          <div className="bg-surface-low rounded-xl overflow-hidden flex h-24 border border-outline-variant/10">
            <div className="w-[60%] p-4 bg-surface-high/50 flex flex-col justify-between border-r border-outline-variant/10">
              <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">
                Protein Goal
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-primary">185</span>
                <span className="text-xs font-bold text-on-surface-variant">/ 210g</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="h-1/2 p-2 px-4 flex items-center justify-between border-b border-outline-variant/10">
                <span className="text-[10px] font-bold text-on-surface-variant">CARBS</span>
                <span className="text-xs font-black">240g</span>
              </div>
              <div className="h-1/2 p-2 px-4 flex items-center justify-between">
                <span className="text-[10px] font-bold text-on-surface-variant">FATS</span>
                <span className="text-xs font-black">65g</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Custom Bottom Nav for this page */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-20 pb-safe bg-background/80 backdrop-blur-xl z-50 rounded-t-xl shadow-[0_-4px_40px_-5px_rgba(0,0,0,0.6)]">
        <Link href="#" className="flex flex-col items-center justify-center text-gray-500 hover:text-primary/70 transition-colors">
          <span className="material-symbols-outlined">view_in_ar</span>
          <span className="font-body text-[10px] uppercase font-bold mt-1">Twin</span>
        </Link>
        <Link href="#" className="flex flex-col items-center justify-center text-primary scale-110">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            monitoring
          </span>
          <span className="font-body text-[10px] uppercase font-bold mt-1">Stats</span>
        </Link>
        <Link href="#" className="flex flex-col items-center justify-center text-gray-500 hover:text-primary/70 transition-colors">
          <span className="material-symbols-outlined">nutrition</span>
          <span className="font-body text-[10px] uppercase font-bold mt-1">Fuel</span>
        </Link>
        <Link href="#" className="flex flex-col items-center justify-center text-gray-500 hover:text-primary/70 transition-colors">
          <span className="material-symbols-outlined">person</span>
          <span className="font-body text-[10px] uppercase font-bold mt-1">Me</span>
        </Link>
      </nav>
    </div>
  );
}
