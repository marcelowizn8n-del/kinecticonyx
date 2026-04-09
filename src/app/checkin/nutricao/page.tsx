"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default function CheckinNutricaoPage() {
  const router = useRouter();
  const [adherence, setAdherence] = useState(75);
  const [selectedFriction, setSelectedFriction] = useState("taste");
  const [toast, setToast] = useState<string | null>(null);
  const fileInputRefDifficult = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleClose = () => {
    router.push("/dashboard");
  };

  const handleBack = () => {
    router.push("/checkin/energia");
  };

  const handleContinueOrSave = () => {
    showToast("Check-in salvo!");
    setTimeout(() => router.push("/dashboard"), 1000);
  };

  const frictionPoints = [
    { id: "cravings", label: "CRAVINGS", icon: "restaurant" },
    { id: "social", label: "SOCIAL", icon: "group" },
    { id: "time", label: "TIME", icon: "schedule" },
    { id: "taste", label: "TASTE", icon: "lunch_dining" },
    { id: "other", label: "OTHER", icon: "more_horiz" },
  ];

  const handleDifficultMealUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Handle upload
      };
      reader.readAsDataURL(file);
    }
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (adherence / 100) * circumference;

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#131313] pb-24">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-4 bg-[#131313]/80 backdrop-blur-[16px] border-b border-[#444933] max-w-md mx-auto">
          <button onClick={handleClose} className="flex h-10 w-10 items-center justify-center hover:bg-[#2A2A2A] transition-colors rounded-lg">
            <span className="material-symbols-outlined text-[#E5E2E1]">close</span>
          </button>
          <h1 className="text-base font-['Inter'] font-bold text-[#E5E2E1]">Performance Check-in</h1>
          <button onClick={handleContinueOrSave} className="flex h-10 w-10 items-center justify-center bg-[#CCFF00] hover:bg-[#ABD600] transition-colors rounded-lg">
            <span className="material-symbols-outlined text-[#283500]">save</span>
          </button>
        </header>

        {/* Main Content */}
        <div className="pt-16 px-5 flex-1">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex gap-1 mb-3">
              <div className="flex-1 h-1 bg-[#CCFF00]" />
              <div className="flex-1 h-1 bg-[#CCFF00]" />
              <div className="flex-1 h-1 bg-[#2A2A2A]" />
              <div className="flex-1 h-1 bg-[#2A2A2A]" />
            </div>
            <p className="text-xs font-['Inter'] font-bold text-[#C4C9AC] uppercase tracking-wider">
              PHASE 02: NUTRITION
            </p>
          </div>

          {/* Section Title */}
          <div className="mb-8">
            <p className="text-xs font-['Inter'] font-bold text-[#CCFF00] uppercase tracking-wider mb-2">
              ADHERENCE METRICS
            </p>
            <h2 className="text-3xl font-['Manrope'] font-bold text-[#E5E2E1]">
              How was your adherence to the diet this week?
            </h2>
          </div>

          {/* Adherence Gauge */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              <svg width="192" height="192" viewBox="0 0 192 192" className="transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="45"
                  fill="none"
                  stroke="#2A2A2A"
                  strokeWidth="8"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="45"
                  fill="none"
                  stroke="#CCFF00"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-['Manrope'] font-bold text-[#CCFF00]">{adherence}</span>
                <span className="text-sm font-['Inter'] text-[#C4C9AC]">CONSISTENCY</span>
              </div>
            </div>

            {/* Adherence Slider */}
            <div className="w-full">
              <input
                type="range"
                min="0"
                max="100"
                value={adherence}
                onChange={(e) => setAdherence(parseInt(e.target.value))}
                className="w-full h-2 bg-[#2A2A2A] appearance-none accent-[#CCFF00] cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #CCFF00 0%, #CCFF00 ${adherence}%, #2A2A2A ${adherence}%, #2A2A2A 100%)`
                }}
              />
              <div className="flex justify-between text-xs font-['Inter'] text-[#C4C9AC] mt-3">
                <span>LOOSE</span>
                <span>CLINICAL PRECISION</span>
              </div>
            </div>
          </div>

          {/* Friction Points Section */}
          <div className="mb-8">
            <p className="text-xs font-['Inter'] font-bold text-[#E5E2E1] uppercase tracking-wider mb-2">
              IDENTIFY FRICTION POINTS
            </p>
            <p className="text-sm font-['Inter'] text-[#C4C9AC] mb-4">
              Adherence dropped below your 80% baseline. What were the main challenges?
            </p>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {frictionPoints.slice(0, 4).map((point) => (
                <button
                  key={point.id}
                  onClick={() => setSelectedFriction(point.id)}
                  className={`flex flex-col items-center gap-2 py-3 px-2 rounded-lg transition-all ${
                    selectedFriction === point.id
                      ? "bg-[#CCFF00] text-[#283500] border border-[#CCFF00]"
                      : "bg-[#1C1B1B] text-[#E5E2E1] border border-[#444933]"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">{point.icon}</span>
                  <span className="text-xs font-['Inter'] font-bold">{point.label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setSelectedFriction(frictionPoints[4].id)}
              className={`w-full flex flex-col items-center gap-2 py-3 px-2 rounded-lg transition-all ${
                selectedFriction === frictionPoints[4].id
                  ? "bg-[#CCFF00] text-[#283500] border border-[#CCFF00]"
                  : "bg-[#1C1B1B] text-[#E5E2E1] border border-[#444933]"
              }`}
            >
              <span className="material-symbols-outlined text-xl">{frictionPoints[4].icon}</span>
              <span className="text-xs font-['Inter'] font-bold">{frictionPoints[4].label}</span>
            </button>
          </div>

          {/* Favorite Meal Card */}
          <div className="mb-4 rounded-lg p-4 border border-[#444933]/50" style={{ background: "rgba(42, 42, 42, 0.4)", backdropFilter: "blur(16px)" }}>
            <p className="text-xs font-['Inter'] font-bold text-[#C4C9AC] uppercase tracking-wider mb-3">
              Favorite Meal
            </p>
            <div className="flex gap-3 items-center">
              <div className="w-16 h-16 rounded-lg bg-[#2A2A2A] flex items-center justify-center flex-shrink-0 border border-[#444933]">
                <span className="material-symbols-outlined text-[#CCFF00]">restaurant</span>
              </div>
              <div className="flex-1">
                <h3 className="font-['Manrope'] font-bold text-[#E5E2E1]">SALMON QUINOA BOWL</h3>
                <p className="text-xs font-['Inter'] text-[#C4C9AC]">Premium protein & whole grains</p>
              </div>
            </div>
          </div>

          {/* Difficult Meal Card */}
          <div className="mb-8 rounded-lg p-4 border border-[#444933]/50" style={{ background: "rgba(42, 42, 42, 0.4)", backdropFilter: "blur(16px)" }}>
            <p className="text-xs font-['Inter'] font-bold text-[#C4C9AC] uppercase tracking-wider mb-3">
              Difficult Meal
            </p>
            <div
              onClick={() => fileInputRefDifficult.current?.click()}
              className="border border-dashed border-[#444933] rounded-lg p-6 text-center cursor-pointer hover:border-[#CCFF00]/30 transition-colors bg-[#1C1B1B]/50"
            >
              <span className="material-symbols-outlined text-[#CCFF00] text-3xl block mb-2">
                add_photo_alternate
              </span>
              <p className="text-sm font-['Inter'] font-bold text-[#E5E2E1] mb-1">FLAG A STRUGGLE</p>
              <p className="text-xs font-['Inter'] text-[#C4C9AC]">Upload meal image for context</p>
            </div>
            <input
              ref={fileInputRefDifficult}
              type="file"
              accept="image/*"
              onChange={handleDifficultMealUpload}
              className="hidden"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-4">
            <button onClick={handleBack} className="flex-1 py-3 px-5 rounded-lg bg-[#1C1B1B] text-[#E5E2E1] font-['Inter'] font-bold text-sm transition-transform hover:scale-105 active:scale-95 border border-[#444933]">
              ← BACK
            </button>
            <button onClick={handleContinueOrSave} className="flex-1 py-3 px-5 rounded-lg bg-[#CCFF00] text-[#283500] font-['Inter'] font-bold text-sm transition-transform hover:scale-105 active:scale-95">
              CONTINUE CHECK-IN
            </button>
          </div>
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
