'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FinanceiroPage() {
  const [activeNav, setActiveNav] = useState('training');

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-on-surface-variant/10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="text-on-primary font-bold text-sm">VH</span>
            </div>
            <h1 className="text-xl font-headline font-bold text-primary">
              KINĒTIC ONYX
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-2xl cursor-pointer hover:text-primary transition-colors">
              notifications
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-28 px-6 flex justify-center">
        <div className="w-full max-w-md">
          {/* Page Title */}
          <h1 className="text-3xl font-headline font-bold text-primary mb-2">
            Controle Financeiro
          </h1>
          <p className="text-on-surface-variant text-sm mb-8">
            Performance e Fluxo de Caixa
          </p>

          {/* Hero Card */}
          <div className="glass-card rounded-2xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <span className="text-sm text-on-surface-variant font-bold uppercase tracking-wider">
                Total Monthly Billing
              </span>
              <div className="text-4xl font-headline font-bold text-primary mt-3">
                R$ 12.450,00
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="material-symbols-outlined text-sm text-primary">
                  trending_up
                </span>
                <span className="text-sm font-bold text-primary">
                  +12.5%
                </span>
              </div>
            </div>
          </div>

          {/* Monthly Revenue Chart */}
          <div className="glass-card rounded-2xl p-6 mb-8">
            <h2 className="text-sm font-headline font-bold text-on-surface mb-6">
              Monthly Revenue
            </h2>
            <svg className="w-full h-32" viewBox="0 0 300 100">
              {/* Gradient fill area */}
              <defs>
                <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#CCFF00" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Line */}
              <polyline
                points="10,70 50,50 90,40 130,45 170,35 210,30 250,25 290,20"
                fill="none"
                stroke="#CCFF00"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              {/* Filled area */}
              <polygon
                points="10,70 50,50 90,40 130,45 170,35 210,30 250,25 290,20 290,100 10,100"
                fill="url(#revenueGradient)"
              />
            </svg>
            <div className="flex justify-between text-xs text-on-surface-variant mt-4 px-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">
                mail
              </span>
              <span className="text-sm">Send Invoice</span>
            </button>
            <button className="py-3 bg-surface-high text-on-surface font-bold rounded-lg hover:bg-surface-highest transition-colors flex items-center justify-center gap-2 border border-on-surface-variant/20">
              <span className="material-symbols-outlined text-lg">
                manage_accounts
              </span>
              <span className="text-sm">Subscriptions</span>
            </button>
          </div>

          {/* Patient Payment Status */}
          <div className="space-y-3">
            <h2 className="text-sm font-headline font-bold text-on-surface mb-4">
              Patient Payment Status
            </h2>

            {/* Fernando Vaz - Paid */}
            <div className="glass-card rounded-2xl p-4 border-2 border-primary/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40"></div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface">
                    Fernando Vaz
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    R$ 850,00
                  </p>
                </div>
              </div>
              <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-bold">
                Paid
              </span>
            </div>

            {/* Mariana Costa - Pending */}
            <div className="glass-card rounded-2xl p-4 border-2 border-on-surface-variant/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-on-surface-variant/20 border border-on-surface-variant/40"></div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface">
                    Mariana Costa
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    R$ 1.200,00
                  </p>
                </div>
              </div>
              <span className="px-2 py-1 bg-surface-high text-on-surface-variant rounded text-xs font-bold">
                Pending
              </span>
            </div>

            {/* Ricardo Mendes - Overdue */}
            <div className="glass-card rounded-2xl p-4 border-2 border-error/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-error/20 border border-error/40"></div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface">
                    Ricardo Mendes
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    R$ 650,00
                  </p>
                </div>
              </div>
              <span className="px-2 py-1 bg-error/20 text-error rounded text-xs font-bold">
                Overdue
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-on-surface-variant/10">
        <div className="flex justify-center gap-8 h-20 px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">home</span>
            <span className="text-sm">Home</span>
          </Link>
          <Link
            href="/dieta"
            className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">restaurant</span>
            <span className="text-sm">Nutrition</span>
          </Link>
          <button
            onClick={() => setActiveNav('training')}
            className={`flex items-center gap-2 transition-colors ${
              activeNav === 'training'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">fitness_center</span>
            <span className="text-sm">Training</span>
          </button>
          <Link
            href="/chat"
            className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">people</span>
            <span className="text-sm">Community</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
