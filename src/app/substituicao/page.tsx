"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function SubstituicaoPage() {
  const baseFoodMacros = [
    { label: "Protein", value: "31g", col: 4 },
    { label: "Carbs", value: "0.0g", col: 2 },
    { label: "Fats", value: "3.6g", col: 2 },
  ];

  const equivalentOptions = [
    { name: "Whole Eggs", protein: "28g", quantity: "4 units" },
    { name: "Extra Firm Tofu", protein: "24g", quantity: "300g" },
    { name: "Wild Salmon", protein: "30g", quantity: "150g" },
  ];

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background pb-24">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-4 bg-background/80 backdrop-blur-lg border-b border-outline-variant max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-high">
              <span className="text-lg text-primary-container">M</span>
            </div>
            <h1 className="text-lg font-headline font-bold text-on-surface">Performance Hub</h1>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-high transition-colors">
            <span className="material-symbols-outlined text-on-surface">settings</span>
          </button>
        </header>

        {/* Main Content */}
        <div className="pt-16 px-5 flex-1">
          {/* Title Section */}
          <div className="mt-6 mb-8">
            <h1 className="text-2xl font-headline font-bold text-on-surface mb-2">
              Ecossistema de <span className="text-primary">Substituição</span>
            </h1>
            <p className="text-sm text-on-surface-variant">Clinical Precision Macro-Matching Engine</p>
          </div>

          {/* Base Food Anchor */}
          <div className="mb-8">
            <div className="relative mb-6">
              <div className="glass-card rounded-2xl p-5 border border-primary/20">
                {/* Gradient glow border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Base Food Anchor</p>
                      <h3 className="text-lg font-headline font-bold text-on-surface">Chicken Breast</h3>
                      <p className="text-sm text-on-surface-variant">100g</p>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/15 text-xs font-semibold text-primary">
                      BASELINE
                    </span>
                  </div>

                  {/* Asymmetric Macro Grid */}
                  <div className="grid grid-cols-6 gap-3 mt-4">
                    {/* Protein - col-span-4 */}
                    <div className="col-span-4 glass-input rounded-xl p-3 border border-primary/20">
                      <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Protein</p>
                      <p className="text-2xl font-headline font-bold text-primary">31g</p>
                    </div>

                    {/* Carbs - col-span-2 */}
                    <div className="col-span-2 glass-input rounded-xl p-3 border border-outline-variant/30">
                      <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Carbs</p>
                      <p className="text-xl font-headline font-bold text-on-surface">0.0g</p>
                    </div>

                    {/* Fats - col-span-2 */}
                    <div className="col-span-2 glass-input rounded-xl p-3 border border-outline-variant/30">
                      <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Fats</p>
                      <p className="text-xl font-headline font-bold text-on-surface">3.6g</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Equivalent Options Header */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-headline font-bold text-on-surface uppercase tracking-wider">Equivalent Options</h2>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/30">
              <span className="text-xs text-primary font-semibold">Δ 0.05%</span>
            </span>
          </div>

          {/* Substitute Cards */}
          <div className="space-y-3">
            {equivalentOptions.map((option, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-4 border border-outline-variant/30 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-headline font-bold text-on-surface mb-1">{option.name}</h3>
                    <div className="space-y-1">
                      <p className="text-sm text-on-surface-variant flex items-center gap-2">
                        <span className="text-primary font-semibold">{option.protein}</span>
                        <span>protein</span>
                      </p>
                      <p className="text-xs text-on-surface-variant">{option.quantity}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label font-bold text-sm transition-transform hover:scale-105 active:scale-95">
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
