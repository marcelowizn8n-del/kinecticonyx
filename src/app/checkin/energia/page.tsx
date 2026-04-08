"use client";

import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function CheckinEnergiaPage() {
  const [energy, setEnergy] = useState(8);
  const [hungerState, setHungerState] = useState("balanced");
  const [muscleRecovery, setMuscleRecovery] = useState("moderate");
  const [fatigueNotes, setFatigueNotes] = useState("");

  const hungerStates = ["HIGH_INTENSITY", "BALANCED", "SUPPRESSED"];
  const muscleRecoveryStates = ["Fresh", "Moderate", "Acute", "Severe"];

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background pb-24">
        {/* Background blur orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-4 bg-background/80 backdrop-blur-lg border-b border-outline-variant max-w-md mx-auto">
          <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-high transition-colors">
            <span className="material-symbols-outlined text-on-surface">close</span>
          </button>
          <h1 className="text-lg font-headline font-bold text-on-surface">Phase 01 / 04</h1>
          <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-high transition-colors">
            <span className="material-symbols-outlined text-on-surface">save</span>
          </button>
        </header>

        {/* Main Content */}
        <div className="relative pt-16 px-5 flex-1">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex gap-1">
              <div className="flex-1 h-1 rounded-full bg-primary" />
              <div className="flex-1 h-1 rounded-full bg-surface-high" />
              <div className="flex-1 h-1 rounded-full bg-surface-high" />
              <div className="flex-1 h-1 rounded-full bg-surface-high" />
            </div>
          </div>

          {/* Greeting */}
          <div className="mb-8">
            <h2 className="text-3xl font-headline font-bold text-on-surface mb-1">
              Good morning, <span className="text-primary">Victor</span>.
            </h2>
            <p className="text-lg text-on-surface-variant">How is your energy?</p>
          </div>

          {/* Performance Insight */}
          <div className="mb-8 glass-panel rounded-2xl p-5 border border-outline-variant/30">
            <div className="mb-4">
              <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-2">Performance Insight</p>
              <p className="text-lg font-headline font-bold text-on-surface">
                <span className="text-primary">+15%</span> surge in protein absorption
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 px-3 rounded-lg bg-primary text-on-primary font-label font-bold text-sm transition-transform hover:scale-105 active:scale-95">
                Confirmed
              </button>
              <button className="flex-1 py-2 px-3 rounded-lg bg-surface-high text-on-surface font-label font-bold text-sm transition-transform hover:scale-105 active:scale-95">
                Neutral
              </button>
            </div>
          </div>

          {/* Energy Slider */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-label font-semibold text-on-surface-variant uppercase tracking-wider">Energy Level</p>
              <span className="text-4xl font-headline font-bold text-primary">{energy}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={energy}
              onChange={(e) => setEnergy(parseInt(e.target.value))}
              className="w-full h-2 rounded-full bg-surface-high appearance-none accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-xs text-on-surface-variant mt-2">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          {/* Fatigue Notes */}
          <div className="mb-8">
            <label className="text-sm font-label font-semibold text-on-surface-variant uppercase tracking-wider block mb-3">
              Qualitative Feedback
            </label>
            <textarea
              value={fatigueNotes}
              onChange={(e) => setFatigueNotes(e.target.value)}
              placeholder="Describe any fatigue moments or energy dips..."
              className="w-full h-24 rounded-xl glass-input border border-outline-variant/30 p-3 text-on-surface placeholder-on-surface-variant/50 focus:border-primary/30 focus:outline-none resize-none"
            />
          </div>

          {/* Hunger State */}
          <div className="mb-8">
            <p className="text-sm font-label font-semibold text-on-surface-variant uppercase tracking-wider block mb-3">
              Hunger State
            </p>
            <div className="grid grid-cols-3 gap-2">
              {hungerStates.map((state) => (
                <button
                  key={state}
                  onClick={() => setHungerState(state.toLowerCase())}
                  className={`py-3 px-2 rounded-lg font-label font-semibold text-xs transition-all ${
                    hungerState === state.toLowerCase()
                      ? "bg-primary text-on-primary"
                      : "bg-surface-high text-on-surface hover:border-primary/30 border border-outline-variant/30"
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          {/* Muscle Recovery */}
          <div className="mb-8">
            <p className="text-sm font-label font-semibold text-on-surface-variant uppercase tracking-wider block mb-3">
              Muscle Recovery
            </p>
            <div className="grid grid-cols-2 gap-2">
              {muscleRecoveryStates.map((state) => (
                <button
                  key={state}
                  onClick={() => setMuscleRecovery(state.toLowerCase())}
                  className={`py-3 px-3 rounded-lg font-label font-semibold text-xs transition-all ${
                    muscleRecovery === state.toLowerCase()
                      ? "bg-primary text-on-primary"
                      : "bg-surface-high text-on-surface hover:border-primary/30 border border-outline-variant/30"
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-4">
            <button className="w-full py-4 px-5 rounded-xl bg-primary text-on-primary font-headline font-bold text-base transition-transform hover:scale-105 active:scale-95">
              NEXT: PHYSICAL METRICS
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
}
