'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [timePeriod, setTimePeriod] = useState<'3M' | '6M'>('6M');
  const [focusedMetric, setFocusedMetric] = useState('82.4 KG');

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-on-surface-variant/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="text-on-primary font-bold">VH</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-on-surface-variant">Bem-vindo,</span>
              <span className="text-base font-headline font-bold text-on-surface">
                Dr. Victor High-End
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="material-symbols-outlined text-2xl cursor-pointer hover:text-primary transition-colors">
                notifications
              </span>
              <span className="absolute top-0 right-0 w-3 h-3 bg-error rounded-full"></span>
            </div>
            <span className="px-3 py-1 bg-primary/20 border border-primary/40 rounded-full text-xs font-bold text-primary">
              PREMIUM
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
        {/* Alertas Preditivos Section */}
        <section className="mb-12">
          <h2 className="text-xl font-headline font-bold mb-6 text-primary">
            Alertas Preditivos
          </h2>
          <div className="grid grid-cols-12 gap-6">
            {/* Critical Alert */}
            <div className="col-span-7 glass-card rounded-2xl p-6 border-2 border-error/50">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs font-bold text-error uppercase tracking-wider">
                    CRÍTICO
                  </span>
                  <h3 className="text-lg font-headline font-bold text-on-surface mt-1">
                    João Silva
                  </h3>
                </div>
                <span className="px-2 py-1 bg-error-container rounded text-xs font-bold text-error">
                  -15%
                </span>
              </div>
              <p className="text-sm text-on-surface-variant mb-4">
                Aderência ao protocolo reduzida significativamente
              </p>
              <button className="w-full py-2 bg-error text-on-error font-bold rounded-lg hover:bg-error/90 transition-colors">
                Intervir Agora
              </button>
            </div>

            {/* Positive Evolution */}
            <div className="col-span-5 glass-card rounded-2xl p-6 border border-primary/20">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                EVOLUÇÃO
              </span>
              <h3 className="text-lg font-headline font-bold text-on-surface mt-1">
                Mariana Costa
              </h3>
              <p className="text-sm text-on-surface-variant mt-2">
                Redução de gordura corporal
              </p>
              <p className="text-2xl font-headline font-bold text-primary mt-3">
                -2.4%
              </p>
            </div>
          </div>
        </section>

        {/* Análise Biométrica Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-headline font-bold text-primary">
              Análise Biométrica
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setTimePeriod('3M')}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                  timePeriod === '3M'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-high text-on-surface hover:bg-surface-highest'
                }`}
              >
                3M
              </button>
              <button
                onClick={() => setTimePeriod('6M')}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                  timePeriod === '6M'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-high text-on-surface hover:bg-surface-highest'
                }`}
              >
                6M
              </button>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 clinical-grid pointer-events-none"></div>

            {/* SVG Chart */}
            <svg className="w-full h-64 relative z-10" viewBox="0 0 600 200">
              {/* Weight Line (solid) */}
              <polyline
                points="20,140 80,130 140,120 200,115 260,110 320,108 380,105 440,102 500,100 560,98"
                fill="none"
                stroke="#CCFF00"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              />
              {/* Body Fat Line (dashed) */}
              <polyline
                points="20,100 80,98 140,96 200,94 260,92 320,91 380,89 440,88 500,87 560,85"
                fill="none"
                stroke="#C4C9AC"
                strokeWidth="2"
                strokeDasharray="5,5"
                vectorEffect="non-scaling-stroke"
              />
              {/* Axes */}
              <line x1="20" y1="150" x2="560" y2="150" stroke="#444933" strokeWidth="1" />
              <line x1="20" y1="60" x2="20" y2="150" stroke="#444933" strokeWidth="1" />
            </svg>

            {/* Focused Metric Overlay */}
            <div className="absolute bottom-8 right-8 bg-surface-highest/80 backdrop-blur px-6 py-4 rounded-xl border border-primary/20">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider">
                Peso Focado
              </span>
              <p className="text-2xl font-headline font-bold text-primary mt-1">
                {focusedMetric}
              </p>
            </div>
          </div>
        </section>

        {/* Atletas Ativos Section */}
        <section className="mb-12">
          <h2 className="text-xl font-headline font-bold mb-6 text-primary">
            Atletas Ativos
          </h2>
          <div className="space-y-4">
            {/* Ricardo Mendes */}
            <div className="glass-card rounded-2xl p-6 flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-headline font-bold text-on-surface">
                    Ricardo Mendes
                  </h3>
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold">
                    Pago
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-surface-highest rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: '88%' }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-primary">88%</span>
                </div>
              </div>
            </div>

            {/* Carla Antunes */}
            <div className="glass-card rounded-2xl p-6 flex items-center gap-6 border border-error/30">
              <div className="w-12 h-12 rounded-full bg-error/20 border border-error/40 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-headline font-bold text-on-surface">
                    Carla Antunes
                  </h3>
                  <span className="px-3 py-1 bg-error/20 text-error rounded-full text-xs font-bold">
                    Pendente
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-surface-highest rounded-full overflow-hidden">
                    <div
                      className="h-full bg-error"
                      style={{ width: '42%' }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-error">42%</span>
                </div>
              </div>
            </div>

            {/* Fernando Vaz */}
            <div className="glass-card rounded-2xl p-6 flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-headline font-bold text-on-surface">
                    Fernando Vaz
                  </h3>
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold">
                    Pago
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-surface-highest rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-primary">75%</span>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full py-3 border border-primary/30 text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors">
            Visualizar Todos
          </button>
        </section>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-32 right-6 group">
        <button className="w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center font-headline font-bold text-lg hover:scale-110 transition-transform shadow-lg">
          <span className="material-symbols-outlined">add</span>
        </button>
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-surface-highest/95 backdrop-blur px-4 py-2 rounded-lg whitespace-nowrap text-sm font-bold text-on-surface border border-primary/20">
            Novo Check-in
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-on-surface-variant/10">
        <div className="max-w-7xl mx-auto px-6 flex justify-start gap-8 h-20">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-primary border-b-2 border-primary font-bold"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/dieta"
            className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">restaurant</span>
            <span>Dieta</span>
          </Link>
          <Link
            href="/treino"
            className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">fitness_center</span>
            <span>Treino</span>
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">chat</span>
            <span>Chat</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
