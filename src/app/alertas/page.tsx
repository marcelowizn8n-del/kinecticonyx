'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AlertasPage() {
  const [activeNav, setActiveNav] = useState('Alerts');

  return (
    <div className="min-h-screen bg-background text-on-surface flex">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-on-surface-variant/10">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-headline font-bold text-primary">
            KINĒTIC ONYX
          </h1>
          <nav className="flex items-center gap-8">
            <Link href="/dashboard" className="text-on-surface hover:text-primary transition-colors font-bold">
              Dashboard
            </Link>
            <Link href="/alertas" className="text-on-surface hover:text-primary transition-colors font-bold">
              Clients
            </Link>
            <Link href="/biometria" className="text-on-surface hover:text-primary transition-colors font-bold">
              Analytics
            </Link>
            <Link href="/dieta" className="text-on-surface hover:text-primary transition-colors font-bold">
              Protocol
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-2xl cursor-pointer hover:text-primary transition-colors">
              notifications
            </span>
            <span className="material-symbols-outlined text-2xl cursor-pointer hover:text-primary transition-colors">
              settings
            </span>
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="text-on-primary font-bold text-sm">VH</span>
            </div>
          </div>
        </div>
      </header>

      {/* Left Sidebar */}
      <aside className="fixed left-0 top-20 bottom-0 w-64 bg-background/95 backdrop-blur-sm border-r border-on-surface-variant/10 pt-6 overflow-y-auto">
        {/* Profile Card */}
        <div className="px-6 mb-8">
          <div className="glass-card rounded-2xl p-6 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-3">
              <span className="text-on-primary font-bold">VH</span>
            </div>
            <h3 className="text-center font-headline font-bold text-on-surface">
              Dr. Victor High-End
            </h3>
            <p className="text-center text-xs text-primary font-bold mt-2 uppercase tracking-wider">
              Elite Clinical Tier
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 space-y-2">
          {['Overview', 'Biometrics', 'Nutrition', 'Recovery', 'Alerts', 'Reports'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-colors ${
                activeNav === item
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-high'
              }`}
            >
              <span className="material-symbols-outlined text-xl">
                {item === 'Overview' && 'dashboard'}
                {item === 'Biometrics' && 'monitor_heart'}
                {item === 'Nutrition' && 'restaurant'}
                {item === 'Recovery' && 'bedtime'}
                {item === 'Alerts' && 'notifications_active'}
                {item === 'Reports' && 'assessment'}
              </span>
              {item}
            </button>
          ))}
        </nav>

        {/* Add New Client Button */}
        <div className="px-6 mt-8 absolute bottom-6 left-0 right-0">
          <Link href="/pacientes/novo">
            <button className="w-full py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">add</span>
              Add New Client
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-24 pb-8 px-8 flex-1 max-w-6xl">
        {/* Page Title */}
        <h1 className="text-3xl font-headline font-bold text-primary mb-8">
          Central de Alertas Críticos
        </h1>

        {/* Stats Bento Grid */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          {/* Health Distribution Chart */}
          <div className="col-span-8 glass-card rounded-2xl p-8">
            <h2 className="text-lg font-headline font-bold text-on-surface mb-6">
              Health Distribution
            </h2>
            <div className="flex items-end gap-3 justify-center h-48">
              {[
                { label: 'A', value: 85, color: 'bg-primary' },
                { label: 'B', value: 72, color: 'bg-on-surface-variant' },
                { label: 'C', value: 65, color: 'bg-on-surface-variant' },
                { label: 'D', value: 58, color: 'bg-on-surface-variant' },
                { label: 'E', value: 45, color: 'bg-on-surface-variant' },
                { label: 'F', value: 90, color: 'bg-primary' },
                { label: 'G', value: 70, color: 'bg-on-surface-variant' },
              ].map((bar) => (
                <div
                  key={bar.label}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className={`w-8 ${bar.color} rounded-t transition-colors hover:opacity-80`}
                    style={{ height: `${bar.value * 1.5}px` }}
                  ></div>
                  <span className="text-xs text-on-surface-variant font-bold">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Alerts */}
          <div className="col-span-4 col-start-9 glass-card rounded-2xl p-8">
            <h2 className="text-sm text-on-surface-variant font-bold uppercase tracking-wider mb-2">
              Active Alerts
            </h2>
            <div className="text-4xl font-headline font-bold text-primary mb-2">
              12
            </div>
            <p className="text-sm text-on-surface-variant">
              <span className="text-error font-bold">+2</span> today
            </p>
          </div>

          {/* Intervention Rate */}
          <div className="col-span-4 col-start-9 glass-card rounded-2xl p-8">
            <h2 className="text-sm text-on-surface-variant font-bold uppercase tracking-wider mb-2">
              Intervention Rate
            </h2>
            <div className="text-4xl font-headline font-bold text-primary mb-2">
              94%
            </div>
            <p className="text-sm text-on-surface-variant">
              Optimal
            </p>
          </div>
        </div>

        {/* High-Priority Interventions */}
        <section className="mb-12">
          <h2 className="text-xl font-headline font-bold text-on-surface mb-6">
            High-Priority Interventions
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {/* Valentina Rossi */}
            <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/20">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40"></div>
                <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-bold">
                  Clinical
                </span>
              </div>
              <h3 className="font-headline font-bold text-on-surface mb-1">
                Valentina Rossi
              </h3>
              <p className="text-sm text-on-surface-variant mb-4">
                Low Adherence
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-surface-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-xs font-bold text-on-surface-variant">3/4</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-primary text-on-primary font-bold rounded-lg text-sm hover:bg-primary/90 transition-colors">
                  Update Protocol
                </button>
                <button className="flex-1 py-2 bg-surface-high text-on-surface font-bold rounded-lg text-sm hover:bg-surface-highest transition-colors">
                  Message
                </button>
              </div>
            </div>

            {/* Marcus Thorne */}
            <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/20">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/40"></div>
                <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs font-bold">
                  Athlete
                </span>
              </div>
              <h3 className="font-headline font-bold text-on-surface mb-1">
                Marcus Thorne
              </h3>
              <p className="text-sm text-on-surface-variant mb-4">
                Evolution Plateau
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-surface-highest rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500" style={{ width: '50%' }}></div>
                  </div>
                  <span className="text-xs font-bold text-on-surface-variant">2/4</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-primary text-on-primary font-bold rounded-lg text-sm hover:bg-primary/90 transition-colors">
                  Update Protocol
                </button>
                <button className="flex-1 py-2 bg-surface-high text-on-surface font-bold rounded-lg text-sm hover:bg-surface-highest transition-colors">
                  Message
                </button>
              </div>
            </div>

            {/* Elena Fischer */}
            <div className="glass-card rounded-2xl p-6 border border-error/30">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-error/20 border border-error/40"></div>
                <span className="px-2 py-1 bg-error/20 text-error rounded text-xs font-bold">
                  Critical
                </span>
              </div>
              <h3 className="font-headline font-bold text-on-surface mb-1">
                Elena Fischer
              </h3>
              <p className="text-sm text-on-surface-variant mb-4">
                High Churn Risk
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-surface-highest rounded-full overflow-hidden">
                    <div className="h-full bg-error" style={{ width: '100%' }}></div>
                  </div>
                  <span className="text-xs font-bold text-error">4/4</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-primary text-on-primary font-bold rounded-lg text-sm hover:bg-primary/90 transition-colors">
                  Update Protocol
                </button>
                <button className="flex-1 py-2 bg-surface-high text-on-surface font-bold rounded-lg text-sm hover:bg-surface-highest transition-colors">
                  Message
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Protocol Distribution */}
        <section>
          <h2 className="text-xl font-headline font-bold text-on-surface mb-6">
            Protocol Distribution
          </h2>
          <div className="glass-card rounded-2xl p-8">
            <div className="grid grid-cols-8 grid-rows-2 gap-4">
              {[
                { color: 'bg-primary', opacity: 100 },
                { color: 'bg-on-surface-variant', opacity: 100 },
                { color: 'bg-orange-500', opacity: 80 },
                { color: 'bg-primary', opacity: 60 },
                { color: 'bg-error', opacity: 100 },
                { color: 'bg-on-surface-variant', opacity: 60 },
                { color: 'bg-primary', opacity: 40 },
                { color: 'bg-on-surface-variant', opacity: 80 },
                { color: 'bg-orange-500', opacity: 60 },
                { color: 'bg-primary', opacity: 80 },
                { color: 'bg-on-surface-variant', opacity: 40 },
                { color: 'bg-error', opacity: 60 },
                { color: 'bg-primary', opacity: 100 },
                { color: 'bg-orange-500', opacity: 40 },
                { color: 'bg-on-surface-variant', opacity: 100 },
                { color: 'bg-primary', opacity: 20 },
              ].map((square, idx) => (
                <div
                  key={idx}
                  className={`${square.color} rounded-lg h-20 transition-opacity hover:opacity-100`}
                  style={{ opacity: square.opacity / 100 }}
                ></div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
