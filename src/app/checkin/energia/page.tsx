"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function CheckinEnergiaPage() {
  const router = useRouter();
  const [energy, setEnergy] = useState(8);
  const [hungerState, setHungerState] = useState("balanced_controlled");
  const [muscleRecovery, setMuscleRecovery] = useState("02_moderate");
  const [fatigueNotes, setFatigueNotes] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    showToast("Check-in salvo!");
    setTimeout(() => router.push("/dashboard"), 1000);
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#131313] pb-24">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-4 bg-[#131313]/80 backdrop-blur-[16px] border-b border-[#444933] max-w-md mx-auto">
          <button onClick={handleClose} className="flex h-10 w-10 items-center justify-center hover:bg-[#2A2A2A] transition-colors rounded-lg">
            <span className="material-symbols-outlined text-[#E5E2E1]">close</span>
          </button>
          <h1 className="text-base font-['Manrope'] font-bold text-[#E5E2E1]">PHASE 01 / 04</h1>
          <button onClick={handleSave} className="flex h-10 w-10 items-center justify-center bg-[#CCFF00] hover:bg-[#ABD600] transition-colors rounded-lg">
            <span className="material-symbols-outlined text-[#283500]">save</span>
          </button>
        </header>

        {/* Main Content */}
        <div className="relative pt-16 px-5 flex-1">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex gap-1">
              <div className="flex-1 h-1 bg-[#CCFF00]" />
              <div className="flex-1 h-1 bg-[#2A2A2A]" />
              <div className="flex-1 h-1 bg-[#2A2A2A]" />
              <div className="flex-1 h-1 bg-[#2A2A2A]" />
            </div>
          </div>

          {/* Greeting */}
          <div className="mb-8">
            <h2 className="text-5xl font-['Manrope'] font-bold text-[#E5E2E1] mb-2">
              Good morning, <span className="text-[#CCFF00]">Victor</span>.
            </h2>
            <p className="text-base font-['Inter'] text-[#C4C9AC]">How is your energy?</p>
          </div>

          {/* Performance Insight Card */}
          <div className="mb-8 rounded-lg p-5 border border-[#444933]/50" style={{ background: "rgba(42, 42, 42, 0.4)", backdropFilter: "blur(16px)" }}>
            <div className="mb-4 flex items-start gap-3">
              <span className="material-symbols-outlined text-[#CCFF00] flex-shrink-0">trending_up</span>
              <div className="flex-1">
                <p className="text-xs font-['Inter'] text-[#C4C9AC] uppercase tracking-wider mb-2">Performance Insight</p>
                <p className="text-sm font-['Inter'] text-[#E5E2E1]">
                  <span className="text-[#CCFF00] font-bold">15% surge</span> in protein absorption detected. Satiety levels expected to peak.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-3 px-4 rounded-lg bg-[#CCFF00] text-[#283500] font-['Inter'] font-bold text-xs transition-transform hover:scale-105 active:scale-95">
                CONFIRMED
              </button>
              <button className="flex-1 py-3 px-4 rounded-lg bg-[#2A2A2A] text-[#E5E2E1] font-['Inter'] font-bold text-xs transition-transform hover:scale-105 active:scale-95 border border-[#444933]">
                NEUTRAL
              </button>
            </div>
          </div>

          {/* Metabolic Energy */}
          <div className="mb-8">
            <p className="text-xs font-['Inter'] font-bold text-[#C4C9AC] uppercase tracking-wider mb-4">Metabolic Energy</p>
            <div className="flex items-end justify-between mb-4">
              <span className="text-5xl font-['Manrope'] font-bold text-[#CCFF00]">{String(energy).padStart(2, "0")}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={energy}
              onChange={(e) => setEnergy(parseInt(e.target.value))}
              className="w-full h-2 bg-[#2A2A2A] appearance-none accent-[#CCFF00] cursor-pointer"
              style={{
                background: `linear-gradient(to right, #CCFF00 0%, #CCFF00 ${(energy / 10) * 100}%, #2A2A2A ${(energy / 10) * 100}%, #2A2A2A 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-[#C4C9AC] mt-3">
              <span>MINIMAL</span>
              <span>OPTIMAL</span>
            </div>
          </div>

          {/* Specific Fatigue Moments */}
          <div className="mb-8">
            <label className="text-xs font-['Inter'] font-bold text-[#C4C9AC] uppercase tracking-wider block mb-3">
              Specific Fatigue Moments
            </label>
            <textarea
              value={fatigueNotes}
              onChange={(e) => setFatigueNotes(e.target.value)}
              placeholder="Input specific timeframes or triggers..."
              className="w-full h-24 rounded-lg p-3 text-[#E5E2E1] placeholder-[#C4C9AC]/40 focus:outline-none resize-none border border-[#444933]/50"
              style={{ background: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(10px)" }}
            />
          </div>

          {/* Daily Hunger */}
          <div className="mb-8">
            <p className="text-xs font-['Inter'] font-bold text-[#C4C9AC] uppercase tracking-wider block mb-3">
              Daily Hunger
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setHungerState("high_intensity")}
                className={`py-3 px-4 rounded-lg font-['Inter'] font-bold text-xs transition-all flex items-center justify-between ${
                  hungerState === "high_intensity"
                    ? "bg-[#CCFF00] text-[#283500]"
                    : "bg-[#1C1B1B] text-[#E5E2E1] border border-[#444933] hover:border-[#CCFF00]/30"
                }`}
              >
                <span>HIGH INTENSITY</span>
                <span className="material-symbols-outlined text-base">local_fire_department</span>
              </button>
              <button
                onClick={() => setHungerState("balanced_controlled")}
                className={`py-3 px-4 rounded-lg font-['Inter'] font-bold text-xs transition-all flex items-center justify-between ${
                  hungerState === "balanced_controlled"
                    ? "bg-[#CCFF00] text-[#283500]"
                    : "bg-[#1C1B1B] text-[#E5E2E1] border border-[#444933] hover:border-[#CCFF00]/30"
                }`}
              >
                <span>BALANCED / CONTROLLED</span>
                <span className="material-symbols-outlined text-base">scale</span>
              </button>
              <button
                onClick={() => setHungerState("suppressed")}
                className={`py-3 px-4 rounded-lg font-['Inter'] font-bold text-xs transition-all flex items-center justify-between ${
                  hungerState === "suppressed"
                    ? "bg-[#CCFF00] text-[#283500]"
                    : "bg-[#1C1B1B] text-[#E5E2E1] border border-[#444933] hover:border-[#CCFF00]/30"
                }`}
              >
                <span>SUPPRESSED</span>
                <span className="material-symbols-outlined text-base">sentiment_very_satisfied</span>
              </button>
            </div>
          </div>

          {/* Muscle Recovery */}
          <div className="mb-8">
            <p className="text-xs font-['Inter'] font-bold text-[#C4C9AC] uppercase tracking-wider block mb-3">
              Muscle Recovery
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "01_fresh", label: "01 FRESH" },
                { id: "02_moderate", label: "02 MODERATE" },
                { id: "03_acute", label: "03 ACUTE" },
                { id: "04_severe", label: "04 SEVERE" }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setMuscleRecovery(option.id)}
                  className={`py-3 px-3 rounded-lg font-['Inter'] font-bold text-xs transition-all ${
                    muscleRecovery === option.id
                      ? "bg-[#CCFF00] text-[#283500]"
                      : "bg-[#1C1B1B] text-[#E5E2E1] border border-[#444933] hover:border-[#CCFF00]/30"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="fixed bottom-24 left-0 right-0 max-w-md mx-auto h-1 bg-[#2A2A2A]">
          <div className="h-1 w-1/4 bg-[#CCFF00]" />
        </div>
      </div>

      <BottomNav />

      {toast && (
        <div className="fixed top-6 right-6 z-[100] px-6 py-3 rounded-lg text-sm font-bold" style={{ background: 'rgba(42,42,42,0.95)', backdropFilter: 'blur(16px)', color: '#CCFF00', border: '1px solid rgba(204,255,0,0.2)' }}>
          {toast}
        </div>
      )}
    </>
  );
}
