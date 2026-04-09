"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";

export default function SubstituicaoPage() {
  const [selectedSwap, setSelectedSwap] = useState<string | null>(null);

  const equivalentOptions = [
    {
      id: 1,
      name: "Whole Eggs",
      quantity: "4 UNITS (LARGE)",
      protein: "28",
      carbs: "1.4",
      fats: "20"
    },
    {
      id: 2,
      name: "Extra Firm Tofu",
      quantity: "300G RAW",
      protein: "24",
      carbs: "6.0",
      fats: "12"
    },
    {
      id: 3,
      name: "Wild Salmon",
      quantity: "150G RAW",
      protein: "30",
      carbs: "0",
      fats: "9.5"
    },
  ];

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-[#131313] pb-24">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-4 bg-[#131313]/80 backdrop-blur-[16px] border-b border-[#444933] max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#CCFF00]">
              <span className="material-symbols-outlined text-[#283500] text-xl">restaurant</span>
            </div>
            <h1 className="text-base font-['Inter'] italic text-[#E5E2E1]">Performance Hub</h1>
          </div>
          <button className="flex h-10 w-10 items-center justify-center hover:bg-[#2A2A2A] transition-colors rounded-lg">
            <span className="material-symbols-outlined text-[#E5E2E1]">settings</span>
          </button>
        </header>

        {/* Main Content */}
        <div className="pt-16 px-5 flex-1">
          {/* Title Section */}
          <div className="mt-6 mb-8">
            <h1 className="text-4xl font-['Manrope'] font-normal text-[#E5E2E1] mb-1">
              Ecossistema de <span className="text-[#CCFF00] font-bold">Substituição</span>
            </h1>
            <p className="text-sm font-['Inter'] text-[#C4C9AC]">Clinical Precision Macro-Matching Engine</p>
          </div>

          {/* Base Food Anchor */}
          <div className="mb-8">
            <div className="rounded-lg p-5 border border-[#CCFF00]/30" style={{ background: "rgba(42, 42, 42, 0.4)", backdropFilter: "blur(16px)" }}>
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#CCFF00]/20 flex-shrink-0">
                  <span className="material-symbols-outlined text-[#CCFF00]">restaurant</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-['Inter'] text-[#C4C9AC] uppercase tracking-wider mb-1">BASE NUTRIENT SOURCE</p>
                  <h3 className="text-xl font-['Manrope'] font-bold text-[#E5E2E1] mb-1">Chicken Breast</h3>
                  <p className="text-sm font-['Inter'] text-[#C4C9AC]">100g | Grilled, Skinless</p>
                </div>
              </div>

              {/* Macro Grid */}
              <div className="grid grid-cols-6 gap-2">
                {/* Protein - col-span-4 */}
                <div className="col-span-4 rounded-lg p-3 border border-[#CCFF00]/30" style={{ background: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(10px)" }}>
                  <p className="text-xs font-['Inter'] text-[#C4C9AC] uppercase tracking-wider mb-1">Protein (G)</p>
                  <p className="text-2xl font-['Manrope'] font-bold text-[#CCFF00]">31 <span className="text-xs font-['Inter'] text-[#C4C9AC]">HIGH</span></p>
                </div>

                {/* Carbs - col-span-2 */}
                <div className="col-span-2 rounded-lg p-3 border border-[#444933]" style={{ background: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(10px)" }}>
                  <p className="text-xs font-['Inter'] text-[#C4C9AC] uppercase tracking-wider mb-1">Carbs</p>
                  <p className="text-lg font-['Manrope'] font-bold text-[#E5E2E1]">0.0g</p>
                </div>

                {/* Fats - col-span-2 */}
                <div className="col-span-2 rounded-lg p-3 border border-[#444933]" style={{ background: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(10px)" }}>
                  <p className="text-xs font-['Inter'] text-[#C4C9AC] uppercase tracking-wider mb-1">Fats</p>
                  <p className="text-lg font-['Manrope'] font-bold text-[#E5E2E1]">3.6g</p>
                </div>
              </div>
            </div>
          </div>

          {/* Equivalent Options Header */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs font-['Inter'] font-bold text-[#E5E2E1] uppercase tracking-wider">Equivalent Options</h2>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30">
                <span className="text-xs font-['Inter'] font-bold text-[#CCFF00]">Δ 0.05%</span>
              </span>
              <button className="flex h-8 w-8 items-center justify-center hover:bg-[#2A2A2A] transition-colors rounded-lg">
                <span className="material-symbols-outlined text-[#E5E2E1] text-base">tune</span>
              </button>
            </div>
          </div>

          {/* Substitute Cards */}
          <div className="space-y-3">
            {equivalentOptions.map((option) => (
              <div key={option.id} className="rounded-lg p-4 border border-[#444933]/50 hover:border-[#CCFF00]/30 transition-colors" style={{ background: "rgba(42, 42, 42, 0.4)", backdropFilter: "blur(16px)" }}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2A2A2A] border border-[#CCFF00]/20 flex-shrink-0">
                        <span className="text-xs font-['Inter'] font-bold text-[#CCFF00]">{option.id}</span>
                      </div>
                      <h3 className="text-base font-['Manrope'] font-bold text-[#E5E2E1]">{option.name}</h3>
                    </div>
                    <p className="text-xs font-['Inter'] text-[#C4C9AC] mb-2">{option.quantity}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-[#C4C9AC]">PROTEIN</p>
                        <p className="font-['Manrope'] font-bold text-[#CCFF00]">{option.protein}g</p>
                      </div>
                      <div>
                        <p className="text-[#C4C9AC]">CARBS</p>
                        <p className="font-['Manrope'] font-bold text-[#E5E2E1]">{option.carbs}g</p>
                      </div>
                      <div>
                        <p className="text-[#C4C9AC]">FATS</p>
                        <p className="font-['Manrope'] font-bold text-[#E5E2E1]">{option.fats}g</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSwap(option.id.toString())}
                    className="px-4 py-2 rounded-lg bg-[#CCFF00] text-[#283500] font-['Inter'] font-bold text-xs transition-transform hover:scale-105 active:scale-95 flex-shrink-0 whitespace-nowrap"
                  >
                    SWAP
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
}
