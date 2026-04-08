'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  TACO_DATABASE,
  searchFoods,
  getFoodsByCategory,
  categoryLabels,
  type FoodCategory,
  type FoodItem,
} from '@/lib/food-database';

export default function AlimentosPage() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'todos'>('todos');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foods, setFoods] = useState<FoodItem[]>(TACO_DATABASE);
  const [newFoodForm, setNewFoodForm] = useState({
    name: '',
    category: 'proteinas' as FoodCategory,
    portionLabel: '100g',
    portion: 100,
    image: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sodium: 0,
    sugar: 0,
    saturatedFat: 0,
    calcium: 0,
    iron: 0,
    vitaminC: 0,
    vitaminA: 0,
  });

  // Filter and search foods
  const filteredFoods = useMemo(() => {
    let result = foods;

    // Apply category filter
    if (selectedCategory !== 'todos') {
      result = result.filter(food => food.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const searchResults = searchFoods(searchQuery);
      result = result.filter(food => searchResults.some(sr => sr.id === food.id));
    }

    return result;
  }, [foods, selectedCategory, searchQuery]);

  // Get all available categories from current foods
  const availableCategories = useMemo(() => {
    const cats = new Set<FoodCategory>();
    foods.forEach((food) => cats.add(food.category));
    return Array.from(cats).sort();
  }, [foods]);

  const handleAddFood = () => {
    if (!newFoodForm.name.trim()) {
      alert('Nome do alimento é obrigatório');
      return;
    }

    const newFood: FoodItem = {
      id: `custom-${Date.now()}`,
      ...newFoodForm,
      custom: true,
    };

    setFoods([...foods, newFood]);
    setIsModalOpen(false);
    setNewFoodForm({
      name: '',
      category: 'proteinas' as FoodCategory,
      portionLabel: '100g',
      portion: 100,
      image: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sodium: 0,
      sugar: 0,
      saturatedFat: 0,
      calcium: 0,
      iron: 0,
      vitaminC: 0,
      vitaminA: 0,
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).style.display = 'none';
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-on-surface-variant/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="mb-6">
            <h1 className="text-3xl font-headline font-bold text-on-surface">
              Banco de Alimentos
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Base TACO + Alimentos Personalizados
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant material-symbols-outlined">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar alimento por nome..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-high/50 border border-on-surface-variant/20 rounded-2xl text-on-surface placeholder-on-surface-variant/60 focus:outline-none focus:border-primary/40 focus:bg-surface-high transition-colors"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                selectedCategory === 'todos'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-high/50 text-on-surface-variant hover:bg-surface-high'
              }`}
            >
              Todos
            </button>
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-high/50 text-on-surface-variant hover:bg-surface-high'
                }`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-56 pb-32 px-6 max-w-7xl mx-auto">
        {/* Food Count */}
        <div className="mb-6 text-sm text-on-surface-variant font-bold">
          {filteredFoods.length} alimento{filteredFoods.length !== 1 ? 's' : ''} encontrado{filteredFoods.length !== 1 ? 's' : ''}
        </div>

        {filteredFoods.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍎</div>
            <p className="text-on-surface-variant">Nenhum alimento encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFoods.map((food) => (
              <div
                key={food.id}
                className="glass-card rounded-xl overflow-hidden border border-on-surface-variant/10 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer group"
                onClick={() =>
                  setExpandedCardId(
                    expandedCardId === food.id ? null : food.id
                  )
                }
              >
                {/* Food Image */}
                <div className="relative h-32 bg-surface-high/50 overflow-hidden rounded-t-xl">
                  <img
                    src={food.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=200&h=200&fit=crop'}
                    alt={food.name}
                    onError={handleImageError}
                    className="w-full h-32 object-cover rounded-t-xl group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 rounded-t-xl hidden items-center justify-center bg-surface-high/80 backdrop-blur">
                    <span className="material-symbols-outlined text-3xl text-on-surface-variant">
                      restaurant
                    </span>
                  </div>
                </div>

                {/* Food Info */}
                <div className="p-4">
                  {/* Name */}
                  <h3 className="font-headline font-bold text-on-surface mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {food.name}
                  </h3>

                  {/* Portion Label */}
                  <p className="text-xs text-on-surface-variant mb-3">
                    {food.portionLabel}
                  </p>

                  {/* Quick Macro Row */}
                  <div className="flex gap-2 mb-3 text-xs font-bold">
                    <div className="flex-1 bg-surface-high/50 rounded-lg p-2 text-center">
                      <div className="text-primary">{food.protein.toFixed(1)}g</div>
                      <div className="text-on-surface-variant text-xs">Prot</div>
                    </div>
                    <div className="flex-1 bg-surface-high/50 rounded-lg p-2 text-center">
                      <div className="text-primary">{food.carbs.toFixed(1)}g</div>
                      <div className="text-on-surface-variant text-xs">Carbs</div>
                    </div>
                    <div className="flex-1 bg-surface-high/50 rounded-lg p-2 text-center">
                      <div className="text-primary">{food.fat.toFixed(1)}g</div>
                      <div className="text-on-surface-variant text-xs">Gord</div>
                    </div>
                    <div className="flex-1 bg-surface-high/50 rounded-lg p-2 text-center">
                      <div className="text-primary">{food.calories.toFixed(0)}</div>
                      <div className="text-on-surface-variant text-xs">kcal</div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold border border-primary/40">
                      {categoryLabels[food.category]}
                    </span>
                    {food.custom && (
                      <span className="inline-block px-2 py-1 bg-on-surface-variant/20 text-on-surface-variant rounded-full text-xs font-bold border border-on-surface-variant/40">
                        Custom
                      </span>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {expandedCardId === food.id && (
                    <div className="mt-4 pt-4 border-t border-on-surface-variant/20 space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-surface-high/50 rounded-lg p-3">
                          <div className="text-on-surface-variant text-xs mb-1">Fibra</div>
                          <div className="text-primary font-bold">
                            {food.fiber.toFixed(1)}g
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal for Adding New Food */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="glass-card-high rounded-3xl max-w-2xl w-full mx-6 max-h-[90vh] overflow-y-auto p-8 border border-on-surface-variant/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-headline font-bold text-on-surface">
                Adicionar Alimento
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full bg-surface-high/50 flex items-center justify-center hover:bg-surface-high transition-colors"
              >
                <span className="material-symbols-outlined text-on-surface">
                  close
                </span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-2">
                  Nome do Alimento
                </label>
                <input
                  type="text"
                  value={newFoodForm.name}
                  onChange={(e) =>
                    setNewFoodForm({ ...newFoodForm, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface-high/50 border border-on-surface-variant/20 rounded-xl text-on-surface placeholder-on-surface-variant/60 focus:outline-none focus:border-primary/40 transition-colors"
                  placeholder="Ex: Peito de Frango"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-2">
                  Categoria
                </label>
                <select
                  value={newFoodForm.category}
                  onChange={(e) =>
                    setNewFoodForm({
                      ...newFoodForm,
                      category: e.target.value as FoodCategory,
                    })
                  }
                  className="w-full px-4 py-3 bg-surface-high/50 border border-on-surface-variant/20 rounded-xl text-on-surface focus:outline-none focus:border-primary/40 transition-colors"
                >
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Portion */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-2">
                    Porção (gramas)
                  </label>
                  <input
                    type="number"
                    value={newFoodForm.portion}
                    onChange={(e) =>
                      setNewFoodForm({
                        ...newFoodForm,
                        portion: parseFloat(e.target.value) || 100,
                      })
                    }
                    className="w-full px-4 py-3 bg-surface-high/50 border border-on-surface-variant/20 rounded-xl text-on-surface placeholder-on-surface-variant/60 focus:outline-none focus:border-primary/40 transition-colors"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-2">
                    Label da Porção
                  </label>
                  <input
                    type="text"
                    value={newFoodForm.portionLabel}
                    onChange={(e) =>
                      setNewFoodForm({
                        ...newFoodForm,
                        portionLabel: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-surface-high/50 border border-on-surface-variant/20 rounded-xl text-on-surface placeholder-on-surface-variant/60 focus:outline-none focus:border-primary/40 transition-colors"
                    placeholder="100g"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-2">
                  URL da Imagem (opcional)
                </label>
                <input
                  type="text"
                  value={newFoodForm.image}
                  onChange={(e) =>
                    setNewFoodForm({ ...newFoodForm, image: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-surface-high/50 border border-on-surface-variant/20 rounded-xl text-on-surface placeholder-on-surface-variant/60 focus:outline-none focus:border-primary/40 transition-colors"
                  placeholder="https://..."
                />
              </div>

              {/* Nutritional Info Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { key: 'calories', label: 'Calorias', unit: 'kcal' },
                  { key: 'protein', label: 'Proteína', unit: 'g' },
                  { key: 'carbs', label: 'Carboidratos', unit: 'g' },
                  { key: 'fat', label: 'Gordura', unit: 'g' },
                  { key: 'fiber', label: 'Fibra', unit: 'g' },
                  { key: 'sodium', label: 'Sódio', unit: 'mg' },
                  { key: 'sugar', label: 'Açúcar', unit: 'g' },
                  { key: 'saturatedFat', label: 'Gordura Saturada', unit: 'g' },
                  { key: 'calcium', label: 'Cálcio', unit: 'mg' },
                  { key: 'iron', label: 'Ferro', unit: 'mg' },
                  { key: 'vitaminC', label: 'Vitamina C', unit: 'mg' },
                  { key: 'vitaminA', label: 'Vitamina A', unit: 'mcg' },
                ].map(({ key, label, unit }) => (
                  <div key={key}>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      {label} ({unit})
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={
                        newFoodForm[key as keyof typeof newFoodForm] || 0
                      }
                      onChange={(e) =>
                        setNewFoodForm({
                          ...newFoodForm,
                          [key]: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-4 py-3 bg-surface-high/50 border border-on-surface-variant/20 rounded-xl text-on-surface placeholder-on-surface-variant/60 focus:outline-none focus:border-primary/40 transition-colors"
                      placeholder="0"
                    />
                  </div>
                ))}
              </div>

              {/* Save Button */}
              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 bg-surface-high/50 hover:bg-surface-high text-on-surface rounded-xl font-bold transition-colors border border-on-surface-variant/20"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddFood}
                  className="flex-1 px-6 py-3 bg-primary hover:bg-primary-dark text-on-primary rounded-xl font-bold transition-colors neon-glow"
                >
                  Salvar Alimento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-32 right-6 group">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center font-headline font-bold text-lg hover:scale-110 transition-transform shadow-lg neon-glow"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-surface-highest/95 backdrop-blur px-4 py-2 rounded-lg whitespace-nowrap text-sm font-bold text-on-surface border border-primary/20">
            Adicionar Alimento
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-on-surface-variant/10">
        <div className="max-w-7xl mx-auto px-6 flex justify-start gap-8 h-20">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 transition-colors ${
              pathname === '/dashboard'
                ? 'text-primary border-b-2 border-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/pacientes"
            className={`flex items-center gap-2 transition-colors ${
              pathname === '/pacientes'
                ? 'text-primary border-b-2 border-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">people</span>
            <span>Pacientes</span>
          </Link>
          <Link
            href="/financeiro"
            className={`flex items-center gap-2 transition-colors ${
              pathname === '/financeiro'
                ? 'text-primary border-b-2 border-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">payments</span>
            <span>Financeiro</span>
          </Link>
          <Link
            href="/chat"
            className={`flex items-center gap-2 transition-colors ${
              pathname === '/chat'
                ? 'text-primary border-b-2 border-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">chat</span>
            <span>Chat</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
