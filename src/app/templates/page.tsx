'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  portion: string;
}

interface Refeicao {
  id: string;
  nome: string;
  tempo: string;
  alimentos: FoodItem[];
}

interface Template {
  id: string;
  nome: string;
  tipo: 'Matemático' | 'Intuitivo' | 'Comportamental';
  caloriaAlvo: number;
  refeicoes: Refeicao[];
  pacientesUsando: number;
  expandido?: boolean;
}

const mockTemplates: Template[] = [
  {
    id: '1',
    nome: 'Emagrecimento 1800 kcal',
    tipo: 'Matemático',
    caloriaAlvo: 1800,
    pacientesUsando: 12,
    refeicoes: [
      {
        id: '1-1',
        nome: 'Café da Manhã',
        tempo: '07:00',
        alimentos: [
          {
            id: 'f1',
            name: 'Ovos mexidos (2)',
            calories: 140,
            protein: 12,
            carbs: 1,
            fat: 10,
            portion: '2 unidades',
          },
          {
            id: 'f2',
            name: 'Pão integral',
            calories: 120,
            protein: 4,
            carbs: 20,
            fat: 2,
            portion: '1 fatia',
          },
          {
            id: 'f3',
            name: 'Banana',
            calories: 90,
            protein: 1,
            carbs: 23,
            fat: 0,
            portion: '1 média',
          },
        ],
      },
      {
        id: '1-2',
        nome: 'Lanche da Tarde',
        tempo: '15:00',
        alimentos: [
          {
            id: 'f4',
            name: 'Iogurte grego',
            calories: 120,
            protein: 15,
            carbs: 8,
            fat: 3,
            portion: '150g',
          },
          {
            id: 'f5',
            name: 'Granola',
            calories: 150,
            protein: 5,
            carbs: 20,
            fat: 6,
            portion: '30g',
          },
        ],
      },
      {
        id: '1-3',
        nome: 'Almoço',
        tempo: '12:00',
        alimentos: [
          {
            id: 'f6',
            name: 'Peito de frango',
            calories: 165,
            protein: 31,
            carbs: 0,
            fat: 3.6,
            portion: '100g',
          },
          {
            id: 'f7',
            name: 'Arroz integral',
            calories: 111,
            protein: 2.6,
            carbs: 23,
            fat: 0.9,
            portion: '100g',
          },
          {
            id: 'f8',
            name: 'Brócolis',
            calories: 34,
            protein: 3.7,
            carbs: 7,
            fat: 0.4,
            portion: '100g',
          },
        ],
      },
      {
        id: '1-4',
        nome: 'Jantar',
        tempo: '19:00',
        alimentos: [
          {
            id: 'f9',
            name: 'Salmão',
            calories: 280,
            protein: 25,
            carbs: 0,
            fat: 20,
            portion: '100g',
          },
          {
            id: 'f10',
            name: 'Batata-doce',
            calories: 103,
            protein: 1.6,
            carbs: 24,
            fat: 0.1,
            portion: '100g',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    nome: 'Hipertrofia 3000 kcal',
    tipo: 'Matemático',
    caloriaAlvo: 3000,
    pacientesUsando: 8,
    refeicoes: [
      {
        id: '2-1',
        nome: 'Café da Manhã',
        tempo: '07:00',
        alimentos: [
          {
            id: 'f11',
            name: 'Ovos mexidos (4)',
            calories: 280,
            protein: 24,
            carbs: 2,
            fat: 20,
            portion: '4 unidades',
          },
          {
            id: 'f12',
            name: 'Aveia',
            calories: 150,
            protein: 5,
            carbs: 27,
            fat: 3,
            portion: '50g',
          },
          {
            id: 'f13',
            name: 'Mel',
            calories: 60,
            protein: 0,
            carbs: 17,
            fat: 0,
            portion: '1 colher',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    nome: 'Intuitivo - Reeducação',
    tipo: 'Intuitivo',
    caloriaAlvo: 2200,
    pacientesUsando: 15,
    refeicoes: [
      {
        id: '3-1',
        nome: 'Refeição Principal',
        tempo: '12:00',
        alimentos: [
          {
            id: 'f14',
            name: 'Proteína variada',
            calories: 200,
            protein: 30,
            carbs: 0,
            fat: 8,
            portion: 'à vontade',
          },
          {
            id: 'f15',
            name: 'Carboidrato integral',
            calories: 150,
            protein: 4,
            carbs: 30,
            fat: 1,
            portion: 'mão cheia',
          },
          {
            id: 'f16',
            name: 'Vegetais',
            calories: 50,
            protein: 3,
            carbs: 10,
            fat: 0,
            portion: 'sem limite',
          },
        ],
      },
    ],
  },
  {
    id: '4',
    nome: 'Comportamental - Flexível',
    tipo: 'Comportamental',
    caloriaAlvo: 2000,
    pacientesUsando: 6,
    refeicoes: [
      {
        id: '4-1',
        nome: 'Café da Manhã',
        tempo: '08:00',
        alimentos: [
          {
            id: 'f17',
            name: 'Alimentos proteicos',
            calories: 200,
            protein: 20,
            carbs: 10,
            fat: 8,
            portion: 'porção razoável',
          },
        ],
      },
    ],
  },
  {
    id: '5',
    nome: 'Manutenção 2500 kcal',
    tipo: 'Matemático',
    caloriaAlvo: 2500,
    pacientesUsando: 10,
    refeicoes: [
      {
        id: '5-1',
        nome: 'Refeições Variadas',
        tempo: 'conforme necessário',
        alimentos: [
          {
            id: 'f18',
            name: 'Alimentos balanceados',
            calories: 2500,
            protein: 125,
            carbs: 300,
            fat: 80,
            portion: 'balanceado',
          },
        ],
      },
    ],
  },
];

const tipoColors: Record<string, string> = {
  Matemático: 'bg-blue-500/10 text-blue-400',
  Intuitivo: 'bg-green-500/10 text-green-400',
  Comportamental: 'bg-purple-500/10 text-purple-400',
};

export default function TemplatesPage() {
  const pathname = usePathname();
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [filtroTipo, setFiltroTipo] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [novoTemplate, setNovoTemplate] = useState({
    nome: '',
    tipo: 'Matemático' as const,
    caloriaAlvo: 2000,
  });

  const templatesFiltrados = templates.filter((t) => {
    const matchTipo = !filtroTipo || t.tipo === filtroTipo;
    const matchSearch = !searchTerm || t.nome.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTipo && matchSearch;
  });

  const calcularMacrosDia = (template: Template) => {
    let totalProtein = 0,
      totalCarbs = 0,
      totalFat = 0;
    template.refeicoes.forEach((ref) => {
      ref.alimentos.forEach((alim) => {
        totalProtein += alim.protein;
        totalCarbs += alim.carbs;
        totalFat += alim.fat;
      });
    });
    return { protein: totalProtein, carbs: totalCarbs, fat: totalFat };
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
  };

  const handleDuplicateTemplate = (id: string) => {
    const original = templates.find((t) => t.id === id);
    if (original) {
      const duplicate: Template = {
        ...original,
        id: Math.random().toString(),
        nome: `${original.nome} (Cópia)`,
      };
      setTemplates([...templates, duplicate]);
    }
  };

  const handleAddTemplate = () => {
    if (novoTemplate.nome) {
      const newTemplate: Template = {
        id: Math.random().toString(),
        nome: novoTemplate.nome,
        tipo: novoTemplate.tipo,
        caloriaAlvo: novoTemplate.caloriaAlvo,
        pacientesUsando: 0,
        refeicoes: [],
      };
      setTemplates([...templates, newTemplate]);
      setModalOpen(false);
      setNovoTemplate({
        nome: '',
        tipo: 'Matemático',
        caloriaAlvo: 2000,
      });
    }
  };

  return (
    <main className="min-h-screen pb-24" style={{ backgroundColor: '#131313' }}>
      {/* Header */}
      <div className="border-b border-[#353534] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-manrope text-3xl font-bold text-[#E5E2E1]">
              Templates de Cardápio
            </h1>
            <p className="text-sm text-[#C4C9AC] mt-1">
              Gerencie planos alimentares
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="glass-card-high px-6 py-2 rounded-lg font-medium text-[#131313] bg-[#CCFF00] hover:bg-[#D4FF1A] transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            Criar Novo Template
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFiltroTipo('')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filtroTipo === ''
                ? 'bg-[#CCFF00] text-[#131313]'
                : 'glass-card border border-[#353534] text-[#E5E2E1] hover:border-[#2A2A2A]'
            }`}
          >
            Todos
          </button>
          {['Matemático', 'Intuitivo', 'Comportamental'].map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltroTipo(tipo)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                filtroTipo === tipo
                  ? 'bg-[#CCFF00] text-[#131313]'
                  : 'glass-card border border-[#353534] text-[#E5E2E1] hover:border-[#2A2A2A]'
              }`}
            >
              {tipo}
            </button>
          ))}
        </div>

        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-3 text-[#C4C9AC]">
            search
          </span>
          <input
            type="text"
            placeholder="Buscar template por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#2A2A2A] border border-[#353534] rounded-lg px-4 py-2 pl-10 text-[#E5E2E1] placeholder-[#C4C9AC] focus:outline-none focus:border-[#CCFF00]"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="p-6 space-y-4">
        {templatesFiltrados.length === 0 ? (
          <div className="glass-card rounded-lg p-8 border border-[#353534] text-center">
            <span className="material-symbols-outlined text-4xl text-[#C4C9AC] block mb-2">
              description
            </span>
            <p className="text-[#C4C9AC]">Nenhum template encontrado</p>
          </div>
        ) : (
          templatesFiltrados.map((template) => (
            <div
              key={template.id}
              className="glass-card rounded-lg border border-[#353534] overflow-hidden"
            >
              {/* Card Header */}
              <div
                className="p-5 border-b border-[#353534] cursor-pointer hover:bg-[#2A2A2A]/50 transition-colors"
                onClick={() =>
                  setExpandedId(expandedId === template.id ? null : template.id)
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-manrope font-semibold text-[#E5E2E1] text-lg">
                        {template.nome}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded font-medium ${
                          tipoColors[template.tipo]
                        }`}
                      >
                        {template.tipo}
                      </span>
                    </div>
                    <p className="text-sm text-[#C4C9AC]">
                      {template.refeicoes.length} refeições •{' '}
                      {template.caloriaAlvo} kcal •{' '}
                      {template.pacientesUsando} pacientes
                    </p>
                  </div>

                  <span className="material-symbols-outlined text-[#C4C9AC]">
                    {expandedId === template.id ? 'expand_less' : 'expand_more'}
                  </span>
                </div>

                {/* Preview de Refeições */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {template.refeicoes.map((ref) => (
                    <span
                      key={ref.id}
                      className="text-xs bg-[#2A2A2A] text-[#CCFF00] px-2 py-1 rounded"
                    >
                      {ref.nome}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedId === template.id && (
                <div className="p-5 space-y-6 bg-[#1C1B1B]/50">
                  {/* Refeições */}
                  <div>
                    <h4 className="font-manrope font-semibold text-[#E5E2E1] mb-4">
                      Detalhes das Refeições
                    </h4>
                    <div className="space-y-4">
                      {template.refeicoes.map((ref) => (
                        <div
                          key={ref.id}
                          className="bg-[#2A2A2A] rounded-lg p-4 border border-[#353534]"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h5 className="font-medium text-[#E5E2E1]">
                                {ref.nome}
                              </h5>
                              <p className="text-xs text-[#C4C9AC]">{ref.tempo}</p>
                            </div>
                            <span className="text-sm text-[#CCFF00] font-semibold">
                              {ref.alimentos.reduce((sum, a) => sum + a.calories, 0)}{' '}
                              kcal
                            </span>
                          </div>

                          {/* Alimentos */}
                          <div className="space-y-2">
                            {ref.alimentos.map((alim) => (
                              <div
                                key={alim.id}
                                className="flex items-center justify-between text-sm bg-[#353534]/50 p-2 rounded"
                              >
                                <div>
                                  <p className="text-[#E5E2E1]">{alim.name}</p>
                                  <p className="text-xs text-[#C4C9AC]">
                                    {alim.portion}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-[#CCFF00] font-medium">
                                    {alim.calories} kcal
                                  </p>
                                  <p className="text-xs text-[#C4C9AC]">
                                    P:{Math.round(alim.protein)}g C:
                                    {Math.round(alim.carbs)}g F:{Math.round(alim.fat)}g
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resumo Diário */}
                  <div>
                    <h4 className="font-manrope font-semibold text-[#E5E2E1] mb-3">
                      Resumo Macronutrientes
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {(() => {
                        const macros = calcularMacrosDia(template);
                        return [
                          {
                            label: 'Proteína',
                            value: Math.round(macros.protein),
                            unit: 'g',
                            color: 'text-red-400',
                          },
                          {
                            label: 'Carboidratos',
                            value: Math.round(macros.carbs),
                            unit: 'g',
                            color: 'text-blue-400',
                          },
                          {
                            label: 'Gordura',
                            value: Math.round(macros.fat),
                            unit: 'g',
                            color: 'text-yellow-400',
                          },
                        ].map((macro) => (
                          <div
                            key={macro.label}
                            className="bg-[#2A2A2A] rounded-lg p-4 border border-[#353534]"
                          >
                            <p className="text-xs text-[#C4C9AC] mb-2">
                              {macro.label}
                            </p>
                            <p className={`font-manrope text-2xl font-bold ${macro.color}`}>
                              {macro.value}
                              <span className="text-sm ml-1">{macro.unit}</span>
                            </p>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {/* Card Footer - Actions */}
              <div className="p-4 border-t border-[#353534] flex gap-2 bg-[#1C1B1B]">
                <button className="flex-1 px-3 py-2 rounded-lg bg-[#CCFF00] text-[#131313] font-medium hover:bg-[#D4FF1A] transition-colors text-sm flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">
                    add_circle
                  </span>
                  Usar para Paciente
                </button>
                <button className="px-3 py-2 rounded-lg border border-[#353534] text-[#CCFF00] hover:bg-[#2A2A2A] transition-colors">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button
                  onClick={() => handleDuplicateTemplate(template.id)}
                  className="px-3 py-2 rounded-lg border border-[#353534] text-[#CCFF00] hover:bg-[#2A2A2A] transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    content_copy
                  </span>
                </button>
                <button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="px-3 py-2 rounded-lg border border-[#353534] text-[#FFB4AB] hover:bg-[#FFB4AB]/10 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal - Criar Novo Template */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-lg border border-[#353534] max-w-md w-full p-6">
            <h2 className="font-manrope text-2xl font-bold text-[#E5E2E1] mb-6">
              Criar Novo Template
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-[#E5E2E1] text-sm font-medium block mb-2">
                  Nome do Template
                </label>
                <input
                  type="text"
                  value={novoTemplate.nome}
                  onChange={(e) =>
                    setNovoTemplate({
                      ...novoTemplate,
                      nome: e.target.value,
                    })
                  }
                  className="w-full bg-[#2A2A2A] border border-[#353534] rounded-lg px-4 py-2 text-[#E5E2E1] placeholder-[#C4C9AC] focus:outline-none focus:border-[#CCFF00]"
                  placeholder="Ex: Emagrecimento 1800 kcal"
                />
              </div>

              <div>
                <label className="text-[#E5E2E1] text-sm font-medium block mb-2">
                  Tipo de Template
                </label>
                <select
                  value={novoTemplate.tipo}
                  onChange={(e) =>
                    setNovoTemplate({
                      ...novoTemplate,
                      tipo: e.target.value as any,
                    })
                  }
                  className="w-full bg-[#2A2A2A] border border-[#353534] rounded-lg px-4 py-2 text-[#E5E2E1] focus:outline-none focus:border-[#CCFF00]"
                >
                  <option value="Matemático">Matemático</option>
                  <option value="Intuitivo">Intuitivo</option>
                  <option value="Comportamental">Comportamental</option>
                </select>
              </div>

              <div>
                <label className="text-[#E5E2E1] text-sm font-medium block mb-2">
                  Calorias Alvo
                </label>
                <input
                  type="number"
                  value={novoTemplate.caloriaAlvo}
                  onChange={(e) =>
                    setNovoTemplate({
                      ...novoTemplate,
                      caloriaAlvo: Number(e.target.value),
                    })
                  }
                  className="w-full bg-[#2A2A2A] border border-[#353534] rounded-lg px-4 py-2 text-[#E5E2E1] placeholder-[#C4C9AC] focus:outline-none focus:border-[#CCFF00]"
                  placeholder="2000"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-[#353534] text-[#E5E2E1] hover:bg-[#2A2A2A] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddTemplate}
                className="flex-1 px-4 py-2 rounded-lg bg-[#CCFF00] text-[#131313] font-medium hover:bg-[#D4FF1A] transition-colors"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-[#353534] glass-card">
        <div className="flex items-center justify-around">
          {[
            { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
            { label: 'Pacientes', path: '/pacientes', icon: 'group' },
            { label: 'Dieta', path: '/dieta', icon: 'restaurant_menu' },
            { label: 'Financeiro', path: '/financeiro', icon: 'payments' },
            { label: 'Mais', path: '/mais', icon: 'more_horiz' },
          ].map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-[#CCFF00]' : 'text-[#C4C9AC]'
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {item.icon}
                </span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
