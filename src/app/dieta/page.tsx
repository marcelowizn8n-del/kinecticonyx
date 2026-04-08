"use client";

import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function DietaPage() {
  const [selectedMeal, setSelectedMeal] = useState<"frango" | "peixe">("frango");

  return (
    <div className="min-h-screen bg-background text-on-background pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-20 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          {/* Profile Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10 bg-gradient-to-br from-primary/40 to-surface-high flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">account_circle</span>
          </div>
          <span className="text-xl font-extrabold italic text-primary tracking-widest font-headline neon-text-glow uppercase">
            Premium
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-on-background/60">notifications</span>
          </button>
        </div>
      </header>

      <main className="pt-28 px-6 max-w-5xl mx-auto space-y-12">
        {/* Performance Macro-Grid */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-primary/60 font-label text-[10px] uppercase tracking-[0.3em] font-bold">
                Daily Protocol
              </span>
              <h1 className="text-4xl md:text-5xl font-headline font-black tracking-tighter mt-1">
                Performance Biometrics
              </h1>
            </div>
            <div className="text-right">
              <span className="block text-primary text-4xl font-headline font-black leading-none neon-text-glow">
                2.450
              </span>
              <span className="text-on-surface-variant font-label text-[10px] uppercase tracking-widest font-semibold">
                kcal remaining
              </span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            {/* Protein (Primary Focus) */}
            <div className="col-span-12 md:col-span-7 glass-card p-8 flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                <span className="material-symbols-outlined text-primary/20 text-6xl select-none">
                  fitness_center
                </span>
              </div>
              <div className="relative z-10">
                <span className="font-label text-xs font-black text-primary tracking-widest uppercase">
                  Proteína
                </span>
                <div className="text-6xl font-headline font-black mt-2 tracking-tighter">
                  180<span className="text-xl text-on-surface-variant font-medium ml-1">g</span>
                </div>
              </div>
              <div className="relative z-10">
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[75%] neon-glow transition-all duration-1000 ease-out"></div>
                </div>
                <div className="flex justify-between mt-3 font-label text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-bold">
                  <span>Target: 240g</span>
                  <span className="text-primary">75% Optimal</span>
                </div>
              </div>
            </div>

            {/* Secondary Macros */}
            <div className="col-span-12 md:col-span-5 grid grid-rows-2 gap-4">
              <div className="glass-card-high p-6 flex justify-between items-center group transition-all hover:bg-white/5">
                <div>
                  <span className="font-label text-[10px] font-black text-on-background/60 uppercase tracking-widest">
                    Carbo
                  </span>
                  <div className="text-3xl font-headline font-black mt-1">
                    240<span className="text-sm text-on-surface-variant ml-1 font-normal uppercase tracking-normal">g</span>
                  </div>
                </div>
                <div className="w-14 h-14 relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-white/5"
                      cx="28"
                      cy="28"
                      fill="transparent"
                      r="24"
                      stroke="currentColor"
                      strokeWidth="3"
                    ></circle>
                    <circle
                      className="text-primary opacity-80"
                      cx="28"
                      cy="28"
                      fill="transparent"
                      r="24"
                      stroke="currentColor"
                      strokeDasharray="150.8"
                      strokeDashoffset="36"
                      strokeLinecap="round"
                      strokeWidth="3"
                    ></circle>
                  </svg>
                </div>
              </div>
              <div className="glass-card-high p-6 flex justify-between items-center group transition-all hover:bg-white/5">
                <div>
                  <span className="font-label text-[10px] font-black text-on-background/60 uppercase tracking-widest">
                    Gordura
                  </span>
                  <div className="text-3xl font-headline font-black mt-1">
                    65<span className="text-sm text-on-surface-variant ml-1 font-normal uppercase tracking-normal">g</span>
                  </div>
                </div>
                <div className="w-14 h-14 relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-white/5"
                      cx="28"
                      cy="28"
                      fill="transparent"
                      r="24"
                      stroke="currentColor"
                      strokeWidth="3"
                    ></circle>
                    <circle
                      className="text-primary opacity-80"
                      cx="28"
                      cy="28"
                      fill="transparent"
                      r="24"
                      stroke="currentColor"
                      strokeDasharray="150.8"
                      strokeDashoffset="60"
                      strokeLinecap="round"
                      strokeWidth="3"
                    ></circle>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nutrition and Workout Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Meal Selection */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-headline font-black tracking-tight uppercase">Próxima Refeição</h2>
              <span className="bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                Almoço • 13:00
              </span>
            </div>
            <div className="space-y-6">
              {/* Option 1: Selected - Frango e Batata */}
              <button
                onClick={() => setSelectedMeal("frango")}
                className={`glass-card overflow-hidden group cursor-pointer transition-all hover:translate-y-[-2px] hover:shadow-2xl border-l-[3px] w-full text-left ${
                  selectedMeal === "frango" ? "border-primary shadow-xl shadow-primary/10" : "border-transparent"
                }`}
              >
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="w-full sm:w-56 h-48 sm:h-auto overflow-hidden bg-gradient-to-br from-surface-high to-surface-low">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary/30 text-6xl">
                        restaurant
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-headline font-black tracking-tight">
                          01. Frango e Batata
                        </h3>
                        <span className="material-symbols-outlined text-primary neon-text-glow" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check_circle
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant mt-3 font-body leading-relaxed opacity-80">
                        150g peito de frango grelhado + 200g batata doce assada + mix de folhas verdes.
                      </p>
                    </div>
                    <div className="flex gap-8 mt-6 pt-6 border-t border-white/5">
                      <div>
                        <span className="block text-sm font-black text-white">42g</span>
                        <span className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold">
                          Protein
                        </span>
                      </div>
                      <div>
                        <span className="block text-sm font-black text-white">45g</span>
                        <span className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold">
                          Carbs
                        </span>
                      </div>
                      <div>
                        <span className="block text-sm font-black text-white">8g</span>
                        <span className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold">
                          Fats
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Option 2: Ghost - Peixe e Arroz */}
              <button
                onClick={() => setSelectedMeal("peixe")}
                className={`glass-card-high overflow-hidden group cursor-pointer transition-all border-l-[3px] w-full text-left ${
                  selectedMeal === "peixe" ? "border-primary shadow-xl shadow-primary/10 hover:bg-white/10" : "border-transparent hover:bg-white/5"
                }`}
              >
                <div className="flex flex-col sm:flex-row h-full">
                  <div className={`w-full sm:w-56 h-32 sm:h-auto overflow-hidden bg-gradient-to-br from-surface-high to-surface-low flex items-center justify-center transition-all ${
                    selectedMeal === "peixe" ? "opacity-100" : "grayscale opacity-40 group-hover:opacity-70 group-hover:grayscale-0"
                  }`}>
                    <span className="material-symbols-outlined text-primary/20 text-5xl">
                      lunch_dining
                    </span>
                  </div>
                  <div className={`flex-1 p-8 flex flex-col justify-between transition-opacity ${
                    selectedMeal === "peixe" ? "opacity-100" : "opacity-50 group-hover:opacity-100"
                  }`}>
                    <div>
                      <h3 className="text-lg font-headline font-black tracking-tight">02. Peixe e Arroz</h3>
                      <p className="text-xs text-on-surface-variant mt-2 font-body font-medium">
                        160g Tilápia grelhada + 150g Arroz Integral.
                      </p>
                    </div>
                    <div className="flex gap-6 mt-4 font-label text-[10px] text-on-surface-variant font-black uppercase tracking-widest">
                      <span>38g P</span>
                      <span>35g C</span>
                      <span>12g G</span>
                    </div>
                  </div>
                </div>
              </button>

              {/* Replacement Action */}
              <Link href="/substituicao">
                <button className="w-full flex items-center justify-center gap-3 py-5 glass-card-high text-primary font-black text-xs uppercase tracking-[0.25em] hover:bg-white/10 active:scale-[0.99] transition-all group">
                  <span className="material-symbols-outlined text-lg group-hover:rotate-180 transition-transform duration-500">
                    swap_horiz
                  </span>
                  Substituir Alimento
                </button>
              </Link>
            </div>
          </div>

          {/* Secondary Column */}
          <div className="space-y-10">
            {/* Training Session */}
            <div className="glass-card p-8 flex flex-col justify-between h-80 group relative overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br from-primary/20 to-transparent"></div>
              <div className="relative z-10">
                <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                  Programmed Session
                </span>
                <h3 className="text-3xl font-headline font-black mt-4 leading-[1.1] tracking-tighter uppercase">
                  Treino A:<br />
                  <span className="text-on-background/70">Membros Inferiores</span>
                </h3>
              </div>
              <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/5">
                <div>
                  <span className="block text-2xl font-black">08</span>
                  <span className="text-[9px] uppercase text-on-surface-variant tracking-[0.2em] font-bold">
                    Exercícios
                  </span>
                </div>
                <button className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all">
                  <span className="material-symbols-outlined font-black text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_arrow
                  </span>
                </button>
              </div>
            </div>

            {/* Supplementation Protocol */}
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary text-xl">pill</span>
                <h3 className="font-headline font-black text-lg tracking-tight uppercase">Suplementação</h3>
              </div>
              <div className="space-y-4">
                {/* Creatina */}
                <div className="flex items-center justify-between p-4 glass-card-high rounded-xl group hover:bg-white/5 transition-colors">
                  <div>
                    <span className="block text-xs font-black text-white group-hover:text-primary transition-colors">
                      Creatina Monohidratada
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-medium mt-1">5g em jejum</span>
                  </div>
                  <span className="font-label text-[10px] bg-white/5 px-3 py-1 font-black rounded-lg">
                    08:00
                  </span>
                </div>

                {/* Multivitamínico */}
                <div className="flex items-center justify-between p-4 glass-card-high rounded-xl group hover:bg-white/5 transition-colors">
                  <div>
                    <span className="block text-xs font-black text-white group-hover:text-primary transition-colors">
                      Multivitamínico
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-medium mt-1">
                      1 cápsula c/ almoço
                    </span>
                  </div>
                  <span className="font-label text-[10px] bg-white/5 px-3 py-1 font-black rounded-lg">
                    13:00
                  </span>
                </div>

                {/* Ashwagandha */}
                <div className="flex items-center justify-between p-4 glass-card-high rounded-xl border-l-2 border-primary/40 group hover:bg-white/5 transition-colors">
                  <div>
                    <span className="block text-xs font-black text-white group-hover:text-primary transition-colors">
                      Ashwagandha
                    </span>
                    <span className="text-[10px] text-on-surface-variant font-medium mt-1">500mg pré-sono</span>
                  </div>
                  <span className="font-label text-[10px] bg-primary/10 text-primary px-3 py-1 font-black rounded-lg">
                    21:00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* BottomNavBar - Mobile only */}
      <nav className="fixed bottom-0 left-0 w-full z-50 px-4 pb-8 pt-4 bg-background/90 backdrop-blur-2xl border-t border-white/5 md:hidden">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          <a
            className="flex flex-col items-center justify-center text-on-background/40 hover:text-white transition-all py-2"
            href="/"
          >
            <span className="material-symbols-outlined text-2xl mb-1">home</span>
            <span className="font-label text-[9px] uppercase tracking-widest font-bold">Home</span>
          </a>
          <a className="flex flex-col items-center justify-center text-primary py-2 px-6 bg-white/5 rounded-2xl relative" href="/dieta">
            <span className="material-symbols-outlined text-2xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
              restaurant
            </span>
            <span className="font-label text-[9px] uppercase tracking-widest font-black">Dieta</span>
            <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full shadow-lg shadow-primary"></div>
          </a>
          <a
            className="flex flex-col items-center justify-center text-on-background/40 hover:text-white transition-all py-2"
            href="/treino"
          >
            <span className="material-symbols-outlined text-2xl mb-1">fitness_center</span>
            <span className="font-label text-[9px] uppercase tracking-widest font-bold">Treino</span>
          </a>
          <a
            className="flex flex-col items-center justify-center text-on-background/40 hover:text-white transition-all py-2"
            href="/coach"
          >
            <span className="material-symbols-outlined text-2xl mb-1">chat_bubble</span>
            <span className="font-label text-[9px] uppercase tracking-widest font-bold">Coach</span>
          </a>
        </div>
      </nav>

      {/* Desktop Navigation Cluster */}
      <div className="hidden md:flex fixed top-6 right-8 z-[60] gap-8 glass-card py-2 px-6 rounded-full items-center">
        <a
          className="text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant hover:text-primary transition-colors"
          href="#"
        >
          Insights
        </a>
        <a
          className="text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant hover:text-primary transition-colors"
          href="#"
        >
          Bio-Stats
        </a>
        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
        <a
          className="text-[10px] uppercase tracking-[0.2em] font-black text-on-surface-variant hover:text-primary transition-colors"
          href="#"
        >
          Protocol
        </a>
      </div>
    </div>
  );
}
