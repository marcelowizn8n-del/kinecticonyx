"use client";

import { useState } from "react";
import Link from "next/link";

export default function BiometriaPage() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background pb-28">
      {/* TopAppBar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-background">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-surface-highest overflow-hidden border border-outline-variant/20">
            <img
              alt="User athlete profile silhouette"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm0gfjFLj5VBuKB2UNNdeKbj9XpW0te4hEHIOdSD4QVn8kRvSttf9gHjKBuOAQKkG5q6iop-lXmUwrF49y-HMrCaYmI4XIy-54rUkRBktR2uERlP11jYxraE1c9S5zOGzzE1vc0CamG-IqtFl0id5egHSyPWI1BBS0t3fMx_Ah2qDSDixZx6zQEBD-YvmGuwVFn6vIWNvD9rXmXDW3a0vsem1s7YiHF6zn5O4IiqBwYEIl2XS_CJSxJIxZ6Ivds7Tg6J7EI7RU_55z"
            />
          </div>
          <h1 className="font-headline font-black text-xl italic text-primary">Performance Hub</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="text-on-surface opacity-70 hover:bg-surface-high transition-colors p-2 rounded-lg cursor-pointer"
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </nav>

      <main className="pt-20 pb-4 px-6 max-w-md mx-auto flex-1">
        {/* Header */}
        <header className="mb-8">
          <h2 className="font-headline font-bold text-3xl tracking-tight text-on-surface">
            Laboratório de Biometria
          </h2>
          <p className="font-body text-sm text-on-surface-variant uppercase tracking-widest mt-1 opacity-60">
            Biometric Progress Lab
          </p>
        </header>

        {/* Side-by-Side Comparison Container */}
        <section className="mb-10 relative">
          <div className="grid grid-cols-2 gap-2 bg-surface-low p-2 rounded-xl border border-outline-variant/10">
            {/* Before Photo */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
              <img
                alt="Before biometric photo"
                className="w-full h-full object-cover grayscale opacity-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwHAmPOmVoUGYbXuWn_RPrPd_lTYdVwstE6lPLvDhHgQvghiLyyzKQFYPSolBp43bx49mSRlyINXmRshwc0wAlF-KCdkV7qWvMxBs95FemBQoZhHQonI7v8DA2cTnYBdc1xhI6ScIVgW0RE-kB4-ezUiVypnj5gPn2_wu1_Z-jmHlHWKK-tC06CCxcrw5pEaW9XlA64EIY9fgviC66nu-euu8ZVDfFp521YI6151AKLjtVFA2hQ9-66c9QlPsoDk23G-u9e4O8oUnP"
              />
              <div className="absolute inset-0 bg-primary/5 pointer-events-none">
                {/* Technical Overlay SVG */}
                <svg
                  className="absolute inset-0 w-full h-full text-primary opacity-40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  viewBox="0 0 100 100"
                >
                  <path d="M50 10 L50 90 M30 30 L70 30 M25 50 L75 50 M40 85 L60 85"></path>
                  <circle cx="50" cy="20" r="5"></circle>
                </svg>
              </div>
              <div className="absolute top-3 left-3 bg-surface-container-lowest/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter">
                Day 01
              </div>
            </div>

            {/* After Photo */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
              <img
                alt="After biometric photo"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwyNPhWmEly4RtEI4CFNYDGTOlTUsabb4nl5eCbyHAqFjNDUCKYOdC7IvHoOG-A0w72IyB6SFxXF6ulSmxdK50A9j5mjIX63ViCH-n4Y4a5Qefp2lO1WLYIFnIv__EtJ0kCsQdROCG9fgQlOsG-ejKCUmapCTwfuYBpGnGHMWYoH6dd87P3cuNCPPQE9r0kbjm40mFl2eKxjLqj3MeR5yFInwQE_FXMSWXqlhgzYYR5A0tSrF9xQzCWFMpb1g986VI8oMJDQGO7jPj"
              />
              <div className="absolute inset-0 bg-primary/10 pointer-events-none">
                {/* Technical Overlay SVG - Enhanced Contour */}
                <svg
                  className="absolute inset-0 w-full h-full text-primary opacity-70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  viewBox="0 0 100 100"
                >
                  <path d="M50 10 L50 90 M28 28 L72 28 M22 48 L78 48 M38 88 L62 88"></path>
                  <circle cx="50" cy="18" r="4.5"></circle>
                  <path d="M35 30 Q50 25 65 30 M30 50 Q50 45 70 50" strokeDasharray="2 1"></path>
                </svg>
              </div>
              <div className="absolute top-3 right-3 bg-primary text-on-primary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter shadow-lg shadow-primary/20">
                Day 90
              </div>
            </div>
          </div>

          {/* Technical Scanner Line */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, transparent, #CCFF00, transparent)",
              height: "100%",
              width: "2px",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: 0.3,
            }}
          ></div>
        </section>

        {/* Metric Delta Bento Grid */}
        <section className="space-y-4">
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "1.5fr 1fr",
            }}
          >
            {/* Large Delta Card */}
            <div className="bg-surface-high p-6 rounded-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl">fitness_center</span>
              </div>
              <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant mb-2">
                Weight Comparison
              </p>
              <div className="flex items-baseline gap-2">
                <span className="font-headline font-bold text-4xl text-on-surface">82.4</span>
                <span className="font-body text-sm text-on-surface-variant">kg</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 px-2 py-1 bg-primary-container/10 rounded-md border border-primary/20">
                <span className="material-symbols-outlined text-sm text-primary">trending_down</span>
                <span className="font-body font-bold text-xs text-primary">-3.2kg</span>
              </div>
            </div>

            {/* Small Detail Card */}
            <div className="bg-surface-container-lowest p-5 rounded-xl flex flex-col justify-between border border-outline-variant/10">
              <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
                Fat %
              </p>
              <div>
                <div className="font-headline font-bold text-2xl text-on-surface">14.2%</div>
                <div className="font-body text-[10px] text-primary mt-1 font-bold">-2.8% Delta</div>
              </div>
            </div>
          </div>

          {/* Asymmetric Secondary Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 bg-surface-low p-4 rounded-xl">
              <p className="font-body text-[9px] font-semibold uppercase tracking-tighter text-on-surface-variant">
                Muscle
              </p>
              <div className="font-headline font-bold text-lg text-on-surface">+1.4kg</div>
            </div>
            <div className="col-span-2 bg-surface-high p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-body text-[9px] font-semibold uppercase tracking-tighter text-on-surface-variant">
                  Postural Score
                </p>
                <div className="font-headline font-bold text-lg text-primary">94 / 100</div>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-surface-variant relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent -rotate-45"></div>
                <span className="material-symbols-outlined text-xs text-primary">check</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Action */}
        <button className="w-full mt-8 bg-primary text-on-primary py-4 rounded-md font-headline font-extrabold text-sm uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform">
          <span>Exportar Relatório PDF</span>
          <span className="material-symbols-outlined text-sm">download</span>
        </button>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full h-20 flex justify-around items-center px-4 pb-safe bg-surface-low shadow-[0_-4px_40px_-5px_rgba(0,0,0,0.6)] z-50 rounded-t-xl">
        <div className="flex flex-col items-center justify-center text-on-surface opacity-40 space-y-1 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined">restaurant</span>
          <span className="font-body text-[10px] font-semibold uppercase tracking-widest">Fuel</span>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface opacity-40 space-y-1 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined">fitness_center</span>
          <span className="font-body text-[10px] font-semibold uppercase tracking-widest">Training</span>
        </div>
        <div className="flex flex-col items-center justify-center text-primary space-y-1 relative scale-95 duration-200">
          <span className="material-symbols-outlined">query_stats</span>
          <span className="font-body text-[10px] font-semibold uppercase tracking-widest">Progress</span>
          <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"></div>
        </div>
        <div className="flex flex-col items-center justify-center text-on-surface opacity-40 space-y-1 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined">analytics</span>
          <span className="font-body text-[10px] font-semibold uppercase tracking-widest">Insights</span>
        </div>
      </nav>
    </div>
  );
}
