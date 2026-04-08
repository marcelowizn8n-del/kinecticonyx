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
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-20 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10 bg-gradient-to-br from-primary/40 to-surface-high flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">account_circle</span>
          </div>
          <div>
            <span className="text-xs font-label uppercase tracking-[0.2em] text-on-surface-variant font-bold">
              Paciente
            </span>
            <h2 className="text-lg font-headline font-black tracking-tight">Ricardo Mendes</h2>
          </div>
        </div>
        <button
          onClick={() => setShowTemplateModal(true)}
          className="flex items-center gap-2 px-4 py-2 glass-card-high text-primary hover:bg-white/10 transition-colors rounded-lg"
        >
          <span className="material-symbols-outlined text-lg">layers</span>
          <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Templates</span>
        </button>
      </header>

      <main className="pt-28 px-6 max-w-6xl mx-auto space-y-12">
        {/* Performance Biometrics Section */}
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
            {/* Protein Card */}
            <div className="col-span-12 md:col-span-7 glass-card p-8 flex flex-col justify-between min-h-[200px] relative overflow-hidden group">
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
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[75%] neon-glow transition-all duration-1000 ease-out"></div>
                </div>
                <div className="flex justify-between mt-3 font-label text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-bold">
                  <span>Meta: 240g</span>
                  <span className="text-primary">75% Ótimo</span>
                </div>
              </div>
            </div>

            {/* Secondary Macros */}
            <div className="col-span-12 md:col-span-5 grid grid-rows-2 gap-4">
              {/* Carbs */}
              <div className="glass-card-high p-6 flex justify-between items-center group transition-all hover:bg-white/5">
                <div>
                  <span className="font-label text-[10px] font-black text-on-background/60 uppercase tracking-widest">
                    Carboidratos
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

              {/* Fats */}
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

        {/* Tipo de Abordagem Selector */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-headline font-black tracking-tight uppercase mb-1">Tipo de Abordagem</h2>
            <p className="text-sm text-on-surface-variant">Escolha a estratégia de diet que melhor se adapta ao paciente</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Matemática */}
            <button
              onClick={() => setApproachType("matematica")}
              className={`glass-card p-6 text-left transition-all cursor-pointer border-2 ${
                approachType === "matematica"
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
                  : "border-transparent hover:bg-white/5"
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  approachType === "matematica" ? "bg-primary/20" : "bg-white/10"
                }`}>
                  <span className="material-symbols-outlined text-lg text-primary">calculate</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-headline font-black tracking-tight uppercase">Matemática</h3>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    Cálculo preciso de macros e calorias
                  </p>
                </div>
              </div>
              {approachType === "matematica" && (
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Selecionado
                </div>
              )}
            </button>

            {/* Intuitiva */}
            <button
              onClick={() => setApproachType("intuitiva")}
              className={`glass-card p-6 text-left transition-all cursor-pointer border-2 ${
                approachType === "intuitiva"
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
                  : "border-transparent hover:bg-white/5"
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  approachType === "intuitiva" ? "bg-primary/20" : "bg-white/10"
                }`}>
                  <span className="material-symbols-outlined text-lg text-primary">psychology</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-headline font-black tracking-tight uppercase">Intuitiva</h3>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    Metas semanais sem cálculos rígidos
                  </p>
                </div>
              </div>
              {approachType === "intuitiva" && (
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Selecionado
                </div>
              )}
            </button>

            {/* Comportamental */}
            <button
              onClick={() => setApproachType("comportamental")}
              className={`glass-card p-6 text-left transition-all cursor-pointer border-2 ${
                approachType === "comportamental"
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
                  : "border-transparent hover:bg-white/5"
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  approachType === "comportamental" ? "bg-primary/20" : "bg-white/10"
                }`}>
                  <span className="material-symbols-outlined text-lg text-primary">self_improvement</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-headline font-black tracking-tight uppercase">Comportamental</h3>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                    Hábitos e mudanças progressivas
                  </p>
                </div>
              </div>
              {approachType === "comportamental" && (
                <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Selecionado
                </div>
              )}
            </button>
          </div>
        </section>

        {/* Content based on Approach Type */}
        {approachType === "matematica" && (
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
                <div
                  className={`glass-card overflow-hidden group transition-all hover:translate-y-[-2px] hover:shadow-2xl border-l-[3px] w-full ${
                    selectedMeal === "frango" ? "border-primary shadow-xl shadow-primary/10" : "border-transparent"
                  }`}
                >
                  <button
                    onClick={() => setSelectedMeal("frango")}
                    className="w-full text-left"
                  >
                    <div className="flex flex-col sm:flex-row h-full">
                      <div className="w-full sm:w-56 h-48 sm:h-auto overflow-hidden bg-gradient-to-br from-surface-high to-surface-low">
                        <img
                          src="https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=300&fit=crop"
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
                            <span className="material-symbols-outlined text-primary neon-text-glow" style={{ fontVariationSettings: "'FILL' 1" }}>
                              check_circle
                            </span>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <img
                                src="https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=48&h=48&fit=crop"
                                alt="Frango"
                                className="w-12 h-12 rounded-lg object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="material-symbols-outlined text-primary/30">nutrition</span>';
                                }}
                              />
                              <div className="text-sm">
                                <p className="font-black text-white">Peito de Frango Grelhado</p>
                                <p className="text-xs text-on-surface-variant">150g • 165 kcal</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <img
                                src="https://images.unsplash.com/photo-1599599810694-b5ac4dd53c4d?w=48&h=48&fit=crop"
                                alt="Batata"
                                className="w-12 h-12 rounded-lg object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="material-symbols-outlined text-primary/30">nutrition</span>';
                                }}
                              />
                              <div className="text-sm">
                                <p className="font-black text-white">Batata Doce Assada</p>
                                <p className="text-xs text-on-surface-variant">200g • 172 kcal</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <img
                                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=48&h=48&fit=crop"
                                alt="Folhas"
                                className="w-12 h-12 rounded-lg object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="material-symbols-outlined text-primary/30">nutrition</span>';
                                }}
                              />
                              <div className="text-sm">
                                <p className="font-black text-white">Mix de Folhas Verdes</p>
                                <p className="text-xs text-on-surface-variant">100g • 20 kcal</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-8 mt-6 pt-6 border-t border-white/5">
                          <div>
                            <span className="block text-sm font-black text-white">42g</span>
                            <span className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold">
                              Proteína
                            </span>
                          </div>
                          <div>
                            <span className="block text-sm font-black text-white">45g</span>
                            <span className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold">
                              Carbos
                            </span>
                          </div>
                          <div>
                            <span className="block text-sm font-black text-white">8g</span>
                            <span className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold">
                              Gordura
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMealIndex(0);
                      setShowFoodSearch(true);
                      setFoodQuery('');
                      setSearchResults([]);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 border-t border-white/5 text-primary/60 hover:text-primary hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Adicionar Alimento
                  </button>
                </div>

                {/* Option 2: Ghost - Peixe e Arroz */}
                <div
                  className={`glass-card-high overflow-hidden group transition-all border-l-[3px] w-full ${
                    selectedMeal === "peixe" ? "border-primary shadow-xl shadow-primary/10 hover:bg-white/10" : "border-transparent hover:bg-white/5"
                  }`}
                >
                  <button
                    onClick={() => setSelectedMeal("peixe")}
                    className="w-full text-left"
                  >
                    <div className="flex flex-col sm:flex-row h-full">
                      <div className={`w-full sm:w-56 h-32 sm:h-auto overflow-hidden bg-gradient-to-br from-surface-high to-surface-low flex items-center justify-center transition-all ${
                        selectedMeal === "peixe" ? "opacity-100" : "grayscale opacity-40 group-hover:opacity-70 group-hover:grayscale-0"
                      }`}>
                        <img
                          src="https://images.unsplash.com/photo-1519708240471-33d11324e659?w=300&h=300&fit=crop"
                          alt="Peixe e Arroz"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="material-symbols-outlined text-primary/20 text-5xl">lunch_dining</span>';
                          }}
                        />
                      </div>
                      <div className={`flex-1 p-8 flex flex-col justify-between transition-opacity ${
                        selectedMeal === "peixe" ? "opacity-100" : "opacity-50 group-hover:opacity-100"
                      }`}>
                        <div>
                          <h3 className="text-lg font-headline font-black tracking-tight mb-3">02. Peixe e Arroz</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <img
                                src="https://images.unsplash.com/photo-1519708240471-33d11324e659?w=40&h=40&fit=crop"
                                alt="Peixe"
                                className="w-10 h-10 rounded-lg object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="material-symbols-outlined text-primary/30 text-lg">nutrition</span>';
                                }}
                              />
                              <div className="text-xs">
                                <p className="font-black text-white">Tilápia Grelhada</p>
                                <p className="text-on-surface-variant">160g • 128 kcal</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <img
                                src="https://images.unsplash.com/photo-1608958842386-f5baf7cf1c00?w=40&h=40&fit=crop"
                                alt="Arroz"
                                className="w-10 h-10 rounded-lg object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="material-symbols-outlined text-primary/30 text-lg">nutrition</span>';
                                }}
                              />
                              <div className="text-xs">
                                <p className="font-black text-white">Arroz Integral Cozido</p>
                                <p className="text-on-surface-variant">150g • 195 kcal</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-6 mt-4 font-label text-[10px] text-on-surface-variant font-black uppercase tracking-widest">
                          <span>38g P</span>
                          <span>35g C</span>
                          <span>12g G</span>
                        </div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMealIndex(1);
                      setShowFoodSearch(true);
                      setFoodQuery('');
                      setSearchResults([]);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 border-t border-white/5 text-primary/60 hover:text-primary hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Adicionar Alimento
                  </button>
                </div>

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

            {/* Secondary Column - Supplementation */}
            <div className="space-y-8">
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
        )}

        {approachType === "intuitiva" && (
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-headline font-black tracking-tight uppercase mb-2">Metas Semanais</h2>
              <p className="text-sm text-on-surface-variant">Acompanhe o progresso sem focar em números exatos</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {intuitiveGoals.map((goal) => (
                <div key={goal.id} className="glass-card p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-xl">{goal.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-headline font-black text-base tracking-tight">{goal.title}</h3>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-2xl font-headline font-black">{goal.progress}</span>
                        <span className="text-sm text-on-surface-variant">{goal.unit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full neon-glow transition-all duration-500 ease-out"
                        style={{ width: `${getProgressPercentage(goal)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-label text-on-surface-variant uppercase tracking-widest font-bold">
                      <span>Meta: {goal.target}{goal.unit}</span>
                      <span className="text-primary">{Math.round(getProgressPercentage(goal))}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Supplementation for Intuitiva */}
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary text-xl">pill</span>
                <h3 className="font-headline font-black text-lg tracking-tight uppercase">Suplementação</h3>
              </div>
              <div className="space-y-4">
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
              </div>
            </div>
          </section>
        )}

        {approachType === "comportamental" && (
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-headline font-black tracking-tight uppercase mb-2">Rastreador de Hábitos</h2>
              <p className="text-sm text-on-surface-variant">Acompanhe seus hábitos diários e construa uma rotina consistente</p>
            </div>

            <div className="space-y-6">
              {habits.map((habit) => (
                <div key={habit.id} className="glass-card p-6 space-y-4">
                  <h3 className="font-headline font-black text-base tracking-tight">{habit.name}</h3>

                  <div className="grid grid-cols-7 gap-2">
                    {dayLabels.map((day, index) => (
                      <button
                        key={index}
                        onClick={() => toggleHabitDay(habit.id, index)}
                        className={`aspect-square flex flex-col items-center justify-center rounded-lg transition-all text-xs font-label font-bold uppercase tracking-widest ${
                          habit.days[index]
                            ? "bg-primary/20 border-2 border-primary text-primary shadow-lg shadow-primary/20"
                            : "bg-white/5 border-2 border-transparent hover:bg-white/10 text-on-surface-variant"
                        }`}
                      >
                        <span className="text-[10px]">{day}</span>
                        {habit.days[index] && (
                          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                            check_circle
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-on-surface-variant font-label uppercase tracking-widest font-bold">
                      Semana
                    </span>
                    <span className="text-lg font-headline font-black text-primary">
                      {habit.days.filter(d => d).length}/7 dias
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Supplementation for Comportamental */}
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary text-xl">pill</span>
                <h3 className="font-headline font-black text-lg tracking-tight uppercase">Suplementação</h3>
              </div>
              <div className="space-y-4">
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
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Food Search Modal */}
      {showFoodSearch && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-headline font-black tracking-tight uppercase">Adicionar Alimento</h2>
              <button
                onClick={() => {
                  setShowFoodSearch(false);
                  setFoodQuery('');
                  setSearchResults([]);
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Pesquise um alimento (ex: frango, arroz, banana)..."
                value={foodQuery}
                onChange={(e) => handleFoodSearch(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-on-surface-variant focus:outline-none focus:border-primary focus:bg-white/10 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">
                search
              </span>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((food) => (
                  <button
                    key={food.id}
                    onClick={() => {
                      setShowFoodSearch(false);
                      setFoodQuery('');
                      setSearchResults([]);
                    }}
                    className="w-full flex items-center gap-4 p-4 glass-card-high rounded-lg hover:bg-white/10 transition-colors text-left group"
                  >
                    <img
                      src={food.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=100&h=100&fit=crop'}
                      alt={food.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="material-symbols-outlined text-primary/30 w-12 h-12 flex items-center justify-center">nutrition</span>';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-white group-hover:text-primary transition-colors truncate">
                        {food.name}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {food.portion} • {food.calories} kcal
                      </p>
                      <div className="flex gap-4 mt-1 text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
                        <span>{food.protein}g P</span>
                        <span>{food.carbs}g C</span>
                        <span>{food.fat}g G</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-primary/60 group-hover:text-primary transition-colors flex-shrink-0">
                      add_circle
                    </span>
                  </button>
                ))
              ) : foodQuery.trim() ? (
                <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl mb-2 opacity-50">search_off</span>
                  <p className="text-sm">Nenhum alimento encontrado</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl mb-2 opacity-50">nutrition</span>
                  <p className="text-sm">Digite para pesquisar alimentos</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-headline font-black tracking-tight uppercase">Templates de Dieta</h2>
              <button
                onClick={() => setShowTemplateModal(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4">
              {[
                { name: "Ganho de Massa", desc: "Abordagem matemática com foco em hiperealimentação controlada", type: "matematica" },
                { name: "Perda de Peso", desc: "Déficit calórico com metas semanais progressivas", type: "intuitiva" },
                { name: "Definição Muscular", desc: "Hábitos diários com foco em consistência", type: "comportamental" },
                { name: "Performance Atlética", desc: "Nutrição específica para treinos de alta intensidade", type: "matematica" },
                { name: "Metabolismo Basal", desc: "Abordagem intuitiva para manutenção da saúde", type: "intuitiva" },
              ].map((template, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setShowTemplateModal(false);
                  }}
                  className="w-full glass-card-high p-6 text-left hover:bg-white/10 transition-all group border-l-4 border-transparent hover:border-primary"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-headline font-black text-lg tracking-tight group-hover:text-primary transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-sm text-on-surface-variant mt-2">{template.desc}</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                      arrow_forward
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 px-4 pb-8 pt-4 bg-background/90 backdrop-blur-2xl border-t border-white/5 md:hidden">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center justify-center py-2 transition-all ${
              pathname === "/dashboard" ? "text-primary" : "text-on-background/40 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-2xl mb-1">dashboard</span>
            <span className="font-label text-[9px] uppercase tracking-widest font-bold">Dashboard</span>
          </Link>
          <Link
            href="/pacientes"
            className={`flex flex-col items-center justify-center py-2 transition-all ${
              pathname === "/pacientes" ? "text-primary" : "text-on-background/40 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-2xl mb-1">group</span>
            <span className="font-label text-[9px] uppercase tracking-widest font-bold">Pacientes</span>
          </Link>
          <Link
            href="/dieta"
            className="flex flex-col items-center justify-center text-primary py-2 px-6 bg-white/5 rounded-2xl relative"
          >
            <span className="material-symbols-outlined text-2xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>
              restaurant
            </span>
            <span className="font-label text-[9px] uppercase tracking-widest font-black">Dieta</span>
            <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full shadow-lg shadow-primary"></div>
          </Link>
          <Link
            href="/financeiro"
            className={`flex flex-col items-center justify-center py-2 transition-all ${
              pathname === "/financeiro" ? "text-primary" : "text-on-background/40 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-2xl mb-1">paid</span>
            <span className="font-label text-[9px] uppercase tracking-widest font-bold">Financeiro</span>
          </Link>
          <Link
            href="/chat"
            className={`flex flex-col items-center justify-center py-2 transition-all ${
              pathname === "/chat" ? "text-primary" : "text-on-background/40 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-2xl mb-1">chat_bubble</span>
            <span className="font-label text-[9px] uppercase tracking-widest font-bold">Chat</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
