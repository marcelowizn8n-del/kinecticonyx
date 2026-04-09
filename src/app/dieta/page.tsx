"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { TACO_DATABASE, searchFoods, FoodItem, getFoodImage } from '@/lib/food-database';

type ApproachType = "matematica" | "intuitiva" | "comportamental";

interface Habit {
  id: string;
  name: string;
  days: boolean[];
}

interface IntuitiveGoal {
  id: string;
  title: string;
  icon: string;
  progress: number;
  target: number;
  unit: string;
}

export default function DietaPage() {
  const pathname = usePathname();
  const [selectedMeal, setSelectedMeal] = useState<"frango" | "peixe">("frango");
  const [approachType, setApproachType] = useState<ApproachType>("matematica");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showFoodSearch, setShowFoodSearch] = useState(false);
  const [foodQuery, setFoodQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [selectedMealIndex, setSelectedMealIndex] = useState<number | null>(null);
  const [habits, setHabits] = useState<Habit[]>([
    { id: "1", name: "Café da manhã antes das 9h", days: [true, true, true, false, true, true, false] },
    { id: "2", name: "5 porções de vegetais", days: [true, false, true, true, false, true, true] },
    { id: "3", name: "Sem ultraprocessados", days: [true, true, true, true, true, false, true] },
  ]);

  const intuitiveGoals: IntuitiveGoal[] = [
    { id: "1", title: "Beber 2L de água por dia", icon: "water_drop", progress: 1.5, target: 2, unit: "L" },
    { id: "2", title: "Aumentar consumo de frutas", icon: "nutrition", progress: 3, target: 5, unit: "porções" },
    { id: "3", title: "Reduzir carboidratos à noite", icon: "nights_stay", progress: 60, target: 100, unit: "%" },
    { id: "4", title: "Comer mais devagar", icon: "self_improvement", progress: 4, target: 5, unit: "pontos" },
  ];

  const toggleHabitDay = (habitId: string, dayIndex: number) => {
    setHabits(habits.map(h =>
      h.id === habitId
        ? { ...h, days: h.days.map((d, i) => i === dayIndex ? !d : d) }
        : h
    ));
  };

  const getProgressPercentage = (goal: IntuitiveGoal) => {
    return Math.min((goal.progress / goal.target) * 100, 100);
  };

  const handleFoodSearch = (query: string) => {
    setFoodQuery(query);
    if (query.trim()) {
      const results = searchFoods(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const dayLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

  return (
    <div className="min-h-screen bg-background text-on-background pb-32">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-lg">shield</span>
          </div>
          <div>
            <span className="text-[8px] font-label uppercase tracking-[0.2em] text-primary font-black italic neon-text-glow">
              PREMIUM
            </span>
            <h2 className="text-sm font-headline font-black tracking-tight text-on-surface">Your Protocol</h2>
          </div>
        </div>
        <button className="flex items-center justify-center w-10 h-10 hover:bg-white/5 rounded-md transition-colors">
          <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
        </button>
      </header>

      <main className="pt-20 px-6 max-w-6xl mx-auto">
        {/* Daily Protocol Header Section */}
        <section className="mb-12 mt-4">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="text-[8px] font-label uppercase tracking-[0.3em] text-on-surface-variant font-bold">
                DAILY PROTOCOL
              </span>
              <h1 className="text-5xl md:text-6xl font-headline font-black tracking-tighter mt-2 leading-tight">
                Performance Biometrics
              </h1>
            </div>
            <div className="text-right">
              <span className="block text-primary text-5xl font-headline font-black leading-none neon-text-glow">
                2.450
              </span>
              <span className="text-on-surface-variant font-label text-[9px] uppercase tracking-[0.2em] font-semibold mt-2">
                KCAL REMAINING
              </span>
            </div>
          </div>

          {/* Macro Grid - Asymmetric */}
          <div className="grid grid-cols-12 gap-4 mb-8">
            {/* Protein - 60% width */}
            <div className="col-span-12 md:col-span-7 glass-card p-8 flex flex-col justify-between min-h-[180px] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-30">
                <span className="material-symbols-outlined text-primary text-7xl select-none">
                  fitness_center
                </span>
              </div>
              <div className="relative z-10">
                <span className="font-label text-[8px] font-black text-primary tracking-[0.2em] uppercase">
                  PROTEÍNA
                </span>
                <div className="text-6xl font-headline font-black mt-3 tracking-tighter">
                  180<span className="text-2xl text-on-surface-variant font-medium ml-2">g</span>
                </div>
              </div>
              <div className="relative z-10">
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mt-6">
                  <div className="bg-primary h-full w-[75%] neon-glow transition-all duration-1000 ease-out"></div>
                </div>
                <div className="flex justify-between mt-3 font-label text-[9px] text-on-surface-variant uppercase tracking-[0.15em] font-bold">
                  <span>TARGET: 240G</span>
                  <span className="text-primary">75% OPTIMAL</span>
                </div>
              </div>
            </div>

            {/* Secondary Macros - 40% width */}
            <div className="col-span-12 md:col-span-5 grid grid-rows-2 gap-4">
              {/* Carbs */}
              <div className="glass-card-high p-6 flex justify-between items-center group transition-all hover:bg-white/5">
                <div>
                  <span className="font-label text-[8px] font-black text-on-surface-variant uppercase tracking-[0.2em]">
                    CARBO
                  </span>
                  <div className="text-4xl font-headline font-black mt-2">
                    240<span className="text-lg text-on-surface-variant ml-2 font-normal">g</span>
                  </div>
                </div>
                <div className="w-16 h-16 relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-white/5"
                      cx="32"
                      cy="32"
                      fill="transparent"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="3"
                    ></circle>
                    <circle
                      className="text-primary opacity-80"
                      cx="32"
                      cy="32"
                      fill="transparent"
                      r="28"
                      stroke="currentColor"
                      strokeDasharray="175.9"
                      strokeDashoffset="44"
                      strokeLinecap="round"
                      strokeWidth="3"
                    ></circle>
                  </svg>
                </div>
              </div>

              {/* Fats */}
              <div className="glass-card-high p-6 flex justify-between items-center group transition-all hover:bg-white/5">
                <div>
                  <span className="font-label text-[8px] font-black text-on-surface-variant uppercase tracking-[0.2em]">
                    GORDURA
                  </span>
                  <div className="text-4xl font-headline font-black mt-2">
                    65<span className="text-lg text-on-surface-variant ml-2 font-normal">g</span>
                  </div>
                </div>
                <div className="w-16 h-16 relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-white/5"
                      cx="32"
                      cy="32"
                      fill="transparent"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="3"
                    ></circle>
                    <circle
                      className="text-primary opacity-80"
                      cx="32"
                      cy="32"
                      fill="transparent"
                      r="28"
                      stroke="currentColor"
                      strokeDasharray="175.9"
                      strokeDashoffset="70"
                      strokeLinecap="round"
                      strokeWidth="3"
                    ></circle>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Próxima Refeição Section */}
        <section className="mb-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-headline font-black tracking-tight uppercase">Próxima Refeição</h2>
            <span className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 text-[8px] font-black uppercase tracking-[0.2em] rounded-md">
              Almoço • 13:00
            </span>
          </div>

          <div className="space-y-6">
            {/* Meal Card 1 - Selected */}
            <div
              className={`glass-card overflow-hidden group transition-all border-l-4 ${
                selectedMeal === "frango" ? "border-primary shadow-xl shadow-primary/10 bg-white/[0.03]" : "border-transparent bg-white/[0.015] hover:bg-white/[0.025]"
              }`}
            >
              <button
                onClick={() => setSelectedMeal("frango")}
                className="w-full text-left"
              >
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="w-full sm:w-48 h-40 sm:h-auto overflow-hidden bg-gradient-to-br from-surface-high to-surface-low flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop"
                      alt="Frango e Batata"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="material-symbols-outlined text-primary/30 text-6xl">restaurant</span></div>';
                      }}
                    />
                  </div>
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-headline font-black tracking-tight">
                          01. Frango e Batata
                        </h3>
                        {selectedMeal === "frango" && (
                          <span className="material-symbols-outlined text-primary neon-text-glow text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                            check_circle
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-on-surface-variant mb-4">Grilled chicken breast with sweet potato and greens</p>
                    </div>
                    <div className="flex gap-8">
                      <div>
                        <span className="block text-lg font-black text-on-surface">42g</span>
                        <span className="text-[8px] uppercase tracking-widest text-on-surface-variant font-bold">Protein</span>
                      </div>
                      <div>
                        <span className="block text-lg font-black text-on-surface">45g</span>
                        <span className="text-[8px] uppercase tracking-widest text-on-surface-variant font-bold">Carbs</span>
                      </div>
                      <div>
                        <span className="block text-lg font-black text-on-surface">8g</span>
                        <span className="text-[8px] uppercase tracking-widest text-on-surface-variant font-bold">Fats</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Meal Card 2 - Ghost/Dimmed */}
            <div
              className={`glass-card-high overflow-hidden group transition-all border-l-4 border-transparent ${
                selectedMeal === "peixe" ? "bg-white/[0.03] shadow-xl shadow-primary/10" : "bg-white/[0.01] hover:bg-white/[0.02]"
              }`}
            >
              <button
                onClick={() => setSelectedMeal("peixe")}
                className="w-full text-left"
              >
                <div className="flex flex-col sm:flex-row h-full">
                  <div className={`w-full sm:w-48 h-40 sm:h-auto overflow-hidden bg-gradient-to-br from-surface-high to-surface-low flex-shrink-0 transition-all ${
                    selectedMeal === "peixe" ? "opacity-100" : "grayscale opacity-40 group-hover:opacity-60 group-hover:grayscale-0"
                  }`}>
                    <img
                      src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop"
                      alt="Peixe e Arroz"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="material-symbols-outlined text-primary/20 text-6xl">lunch_dining</span></div>';
                      }}
                    />
                  </div>
                  <div className={`flex-1 p-8 flex flex-col justify-between transition-opacity ${
                    selectedMeal === "peixe" ? "opacity-100" : "opacity-50 group-hover:opacity-80"
                  }`}>
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-headline font-black tracking-tight">02. Peixe e Arroz</h3>
                        {selectedMeal === "peixe" && (
                          <span className="material-symbols-outlined text-primary neon-text-glow text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                            check_circle
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-on-surface-variant mb-4">Grilled fish with brown rice</p>
                    </div>
                    <div className="flex gap-8">
                      <div>
                        <span className="block text-lg font-black text-on-surface">38g</span>
                        <span className="text-[8px] uppercase tracking-widest text-on-surface-variant font-bold">Protein</span>
                      </div>
                      <div>
                        <span className="block text-lg font-black text-on-surface">35g</span>
                        <span className="text-[8px] uppercase tracking-widest text-on-surface-variant font-bold">Carbs</span>
                      </div>
                      <div>
                        <span className="block text-lg font-black text-on-surface">12g</span>
                        <span className="text-[8px] uppercase tracking-widest text-on-surface-variant font-bold">Fats</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Substituir Alimento Button */}
            <Link href="/substituicao">
              <button className="w-full flex items-center justify-center gap-3 py-5 glass-card text-primary font-black text-sm uppercase tracking-[0.2em] hover:bg-white/10 active:scale-[0.98] transition-all group">
                <span className="material-symbols-outlined text-xl group-hover:rotate-180 transition-transform duration-500">
                  swap_horiz
                </span>
                Substituir Alimento
              </button>
            </Link>
          </div>
        </section>

        {/* Programmed Session Card */}
        <section className="mb-12">
          <div className="glass-card p-8 relative overflow-hidden group bg-gradient-to-br from-white/[0.05] to-white/[0.01]">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-[80px] rounded-full -mr-20 -mt-20"></div>
            </div>
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-headline font-black tracking-tight mb-2">
                    Treino A: MEMBROS INFERIORES
                  </h3>
                  <span className="text-sm text-on-surface-variant font-label uppercase tracking-[0.15em]">
                    08 Exercícios • Lower Body Strength
                  </span>
                </div>
                <button className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors group/play">
                  <span className="material-symbols-outlined text-primary text-3xl group-hover/play:scale-110 transition-transform">
                    play_arrow
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Supplementation Section */}
        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-headline font-black tracking-tight uppercase">Suplementação</h2>
          <div className="space-y-3">
            {/* Creatina */}
            <div className="glass-card-high p-5 flex items-center justify-between group hover:bg-white/[0.05] transition-colors rounded-md">
              <div>
                <h4 className="text-sm font-black text-on-surface group-hover:text-primary transition-colors">
                  Creatina Monohidratada
                </h4>
                <p className="text-[9px] text-on-surface-variant font-medium mt-1">5g em jejum</p>
              </div>
              <span className="font-label text-[8px] bg-surface-container px-3 py-1.5 font-black rounded-md">
                08:00
              </span>
            </div>

            {/* Multivitamínico */}
            <div className="glass-card-high p-5 flex items-center justify-between group hover:bg-white/[0.05] transition-colors rounded-md">
              <div>
                <h4 className="text-sm font-black text-on-surface group-hover:text-primary transition-colors">
                  Multivitamínico
                </h4>
                <p className="text-[9px] text-on-surface-variant font-medium mt-1">1 cápsula c/ almoço</p>
              </div>
              <span className="font-label text-[8px] bg-surface-container px-3 py-1.5 font-black rounded-md">
                13:00
              </span>
            </div>

            {/* Ashwagandha - Primary accent */}
            <div className="glass-card-high p-5 flex items-center justify-between group hover:bg-white/[0.05] transition-colors rounded-md border-l-3 border-primary/50">
              <div>
                <h4 className="text-sm font-black text-on-surface group-hover:text-primary transition-colors">
                  Ashwagandha
                </h4>
                <p className="text-[9px] text-on-surface-variant font-medium mt-1">500mg pré-sono</p>
              </div>
              <span className="font-label text-[8px] bg-primary/10 text-primary px-3 py-1.5 font-black rounded-md">
                21:00
              </span>
            </div>
          </div>
        </section>

        {/* Spacer for bottom nav */}
        <div className="h-32"></div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-white/5 z-40">
        <div className="flex items-center justify-around max-w-6xl mx-auto">
          <Link
            href="/dashboard"
            className="flex-1 flex flex-col items-center justify-center py-4 text-on-surface-variant hover:text-on-surface transition-colors group"
          >
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">home</span>
            <span className="text-[8px] uppercase tracking-widest font-bold mt-1">HOME</span>
          </Link>
          <Link
            href="/dieta"
            className="flex-1 flex flex-col items-center justify-center py-4 text-primary group"
          >
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
              nutrition
            </span>
            <span className="text-[8px] uppercase tracking-widest font-bold mt-1">DIETA</span>
          </Link>
          <Link
            href="/treino"
            className="flex-1 flex flex-col items-center justify-center py-4 text-on-surface-variant hover:text-on-surface transition-colors group"
          >
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">fitness_center</span>
            <span className="text-[8px] uppercase tracking-widest font-bold mt-1">TREINO</span>
          </Link>
          <button className="flex-1 flex flex-col items-center justify-center py-4 text-on-surface-variant hover:text-on-surface transition-colors group">
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">person</span>
            <span className="text-[8px] uppercase tracking-widest font-bold mt-1">COACH</span>
          </button>
        </div>
      </nav>

      {/* Safe area spacer */}
      <div className="fixed bottom-0 left-0 w-full h-[env(safe-area-inset-bottom,20px)] bg-background z-[100]"></div>
    </div>
  );
}
