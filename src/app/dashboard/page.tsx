'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const CURRENT_USER = {
  name: 'Victor High-End',
  initials: 'VH',
};

const PREDICTIVE_ALERTS = [
  {
    id: '1',
    type: 'critical',
    badge: 'ATENÇÃO CRÍTICA',
    patientId: '#4921',
    patientName: 'João Silva',
    title: 'Queda de 15% na adesão',
    description: 'Monitoramento em tempo real detectou redução significativa no engajamento. Intervenção recomendada.',
    action: 'INTERVIR AGORA ⚡',
  },
  {
    id: '2',
    type: 'success',
    badge: 'EVOLUÇÃO ACELERADA',
    patientName: 'Mariana Costa',
    metric: '-2.4%',
    metricLabel: 'Gordura Corporal (30d)',
    description: 'Aderência de 94% ao protocolo trimestral. Mantém meta de redução.',
    action: 'REVISAR',
  },
];

const BIOMETRIC_DATA = [
  { month: 'Jan', weight: 82, fat: 28 },
  { month: 'Fev', weight: 80, fat: 27 },
  { month: 'Mar', weight: 78, fat: 26 },
  { month: 'Abr', weight: 76, fat: 24 },
];

const ATHLETES = [
  {
    id: '1',
    position: '1º',
    name: 'Ricardo Mendes',
    adherence: 88,
    status: 'PAGO',
    action: 'Ajustar Plano',
  },
  {
    id: '2',
    position: '2º',
    name: 'Mariana Costa',
    adherence: 94,
    status: 'PAGO',
    action: 'Check-in em 2d',
  },
  {
    id: '3',
    position: '3º',
    name: 'João Silva',
    adherence: 78,
    status: 'PENDENTE',
    action: 'Nova Dieta',
  },
];

export default function DashboardPage() {
  const pathname = usePathname();
  const [timePeriod, setTimePeriod] = useState('3MESES');

  const generateBiometricSVG = () => {
    const width = 300;
    const height = 150;
    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const maxWeight = 85;
    const minWeight = 75;
    const weightRange = maxWeight - minWeight;

    const points = BIOMETRIC_DATA.map((data, i) => {
      const x = padding + (i / (BIOMETRIC_DATA.length - 1)) * chartWidth;
      const y = padding + ((maxWeight - data.weight) / weightRange) * chartHeight;
      return `${x},${y}`;
    });

    const fatPoints = BIOMETRIC_DATA.map((data, i) => {
      const x = padding + (i / (BIOMETRIC_DATA.length - 1)) * chartWidth;
      const maxFat = 30;
      const minFat = 20;
      const fatRange = maxFat - minFat;
      const y = padding + ((maxFat - data.fat) / fatRange) * chartHeight;
      return `${x},${y}`;
    });

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-32">
        <defs>
          <linearGradient id="weightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#CCFF00', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#CCFF00', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <polyline points={points.join(' ')} fill="url(#weightGradient)" stroke="#CCFF00" strokeWidth="2" />
        <polyline
          points={fatPoints.join(' ')}
          fill="none"
          stroke="#C4C9AC"
          strokeWidth="2"
          strokeDasharray="4,4"
        />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#E5E2E1] pb-32 lg:pb-0">
      {/* MOBILE HEADER */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#131313]/95 backdrop-blur-lg pt-safe px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#2A2A2A] flex items-center justify-center border border-[#CCFF00]/20">
              <span className="text-[#CCFF00] font-bold text-sm">V</span>
            </div>
            <div>
              <p className="text-xs text-[#A8A6A5] uppercase tracking-wide">Bem-vindo, DR.</p>
              <p className="text-base font-semibold text-[#E5E2E1]">{CURRENT_USER.name}</p>
            </div>
          </div>
          <div className="relative">
            <button className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#353534] transition-colors">
              <span className="material-symbols-outlined text-[#E5E2E1]">notifications</span>
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-600 rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      {/* DESKTOP TOP NAV */}
      <header className="hidden lg:flex fixed top-0 left-0 right-0 z-50 bg-[#131313]/95 backdrop-blur-lg px-8 py-4 items-center justify-between border-b border-[#2A2A2A]">
        <div className="text-lg font-bold text-[#CCFF00] tracking-wider">KINĒTIC ONYX</div>
        <nav className="flex gap-8">
          <button className="text-[#CCFF00] font-medium text-sm">Dashboard</button>
          <button className="text-[#A8A6A5] hover:text-[#E5E2E1] font-medium text-sm transition-colors">Clients</button>
          <button className="text-[#A8A6A5] hover:text-[#E5E2E1] font-medium text-sm transition-colors">Analytics</button>
          <button className="text-[#A8A6A5] hover:text-[#E5E2E1] font-medium text-sm transition-colors">Protocol</button>
        </nav>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#353534]">
            <span className="material-symbols-outlined text-[#E5E2E1]">notifications</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-[#2A2A2A] flex items-center justify-center hover:bg-[#353534]">
            <span className="material-symbols-outlined text-[#E5E2E1]">settings</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-[#CCFF00] flex items-center justify-center">
            <span className="text-[#131313] font-bold text-sm">VH</span>
          </div>
        </div>
      </header>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex fixed left-0 top-20 bottom-0 w-80 bg-[#1C1B1B] border-r border-[#2A2A2A] flex-col p-8">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-[#A8A6A5] font-semibold mb-2">Performance Lead</p>
          <div className="px-3 py-2 bg-[#CCFF00]/10 rounded-lg border border-[#CCFF00]/30 inline-block">
            <span className="text-xs font-bold text-[#CCFF00]">ELITE CLINICAL TIER</span>
          </div>
        </div>

        <nav className="space-y-1 flex-1">
          {[
            { label: 'Overview', icon: 'dashboard' },
            { label: 'Biometrics', icon: 'favorite' },
            { label: 'Nutrition', icon: 'restaurant' },
            { label: 'Recovery', icon: 'health_and_safety' },
            { label: 'Alerts', icon: 'notifications_active' },
            { label: 'Reports', icon: 'assessment' },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#E5E2E1] hover:bg-[#2A2A2A] transition-colors text-sm font-medium"
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="lg:ml-80 pt-20 lg:pt-24 px-6 lg:px-8">
        {/* ALERTAS PREDITIVOS */}
        <section className="mb-20 lg:mb-24">
          <div className="mb-2">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#E5E2E1] mb-2" style={{ fontFamily: 'Manrope' }}>
              Alertas Preditivos
            </h2>
            <div className="flex items-center gap-3">
              <p className="text-sm text-[#A8A6A5]">Sinais vitais e adesão do ecossistema.</p>
              <span className="px-3 py-1 bg-[#CCFF00]/20 text-[#CCFF00] text-xs font-bold rounded-full border border-[#CCFF00]/40">
                REAL-TIME DATA
              </span>
            </div>
          </div>

          <div className="space-y-4 mt-8">
            {PREDICTIVE_ALERTS.map((alert) => (
              <div
                key={alert.id}
                className="p-6 rounded-lg border border-[#2A2A2A] bg-[#1C1B1B]/40 backdrop-blur-[15px]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full border ${
                          alert.type === 'critical'
                            ? 'bg-red-600/20 text-red-400 border-red-600/40'
                            : 'bg-[#CCFF00]/20 text-[#CCFF00] border-[#CCFF00]/40'
                        }`}
                      >
                        {alert.badge}
                      </span>
                      {alert.patientId && (
                        <span className="text-xs text-[#A8A6A5]">{alert.patientId}</span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-[#E5E2E1] mb-1">
                      {alert.patientName}
                      {alert.title && `: ${alert.title}`}
                    </h3>

                    {alert.metric && (
                      <p className="text-3xl font-bold text-[#CCFF00] mb-2">
                        {alert.metric} <span className="text-sm text-[#A8A6A5]">{alert.metricLabel}</span>
                      </p>
                    )}

                    <p className="text-sm text-[#A8A6A5] mb-4">{alert.description}</p>

                    <button
                      className={`text-sm font-bold transition-opacity hover:opacity-80 ${
                        alert.type === 'critical'
                          ? 'text-red-400'
                          : 'text-[#CCFF00]'
                      }`}
                    >
                      {alert.action}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ANÁLISE BIOMÉTRICA */}
        <section className="mb-20 lg:mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#E5E2E1]" style={{ fontFamily: 'Manrope' }}>
              Análise Biométrica
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setTimePeriod('3MESES')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  timePeriod === '3MESES'
                    ? 'bg-[#CCFF00] text-[#131313]'
                    : 'bg-[#2A2A2A] text-[#A8A6A5] hover:text-[#E5E2E1]'
                }`}
              >
                3 MESES
              </button>
              <button
                onClick={() => setTimePeriod('6MESES')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  timePeriod === '6MESES'
                    ? 'bg-[#CCFF00] text-[#131313]'
                    : 'bg-[#2A2A2A] text-[#A8A6A5] hover:text-[#E5E2E1]'
                }`}
              >
                6 MESES
              </button>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-[#2A2A2A] bg-[#1C1B1B]/40 backdrop-blur-[15px]">
            <div className="relative">{generateBiometricSVG()}</div>

            <div className="flex gap-8 justify-center mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#CCFF00] rounded-full"></div>
                <span className="text-[#A8A6A5]">PESO (KG)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 border-t-2 border-dashed border-[#C4C9AC]"></div>
                <span className="text-[#A8A6A5]">% GORDURA</span>
              </div>
            </div>
          </div>
        </section>

        {/* ATLETAS ATIVOS */}
        <section className="mb-20 lg:mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#E5E2E1]" style={{ fontFamily: 'Manrope' }}>
              Atletas Ativos
            </h2>
            <button className="w-10 h-10 rounded-lg bg-[#2A2A2A] hover:bg-[#353534] flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[#CCFF00]">search</span>
            </button>
          </div>

          <div className="space-y-4">
            {ATHLETES.map((athlete) => (
              <div
                key={athlete.id}
                className="p-6 rounded-lg border border-[#2A2A2A] bg-[#1C1B1B]/40 backdrop-blur-[15px] flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-[#2A2A2A] flex items-center justify-center border border-[#CCFF00]/30">
                      <span className="text-[#E5E2E1] font-bold">M</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#CCFF00] rounded-full flex items-center justify-center">
                      <span className="text-[#131313] text-xs font-bold">{athlete.position}</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="font-bold text-[#E5E2E1] mb-2">{athlete.name}</p>
                    <div className="w-full bg-[#2A2A2A] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#CCFF00] h-full"
                        style={{ width: `${athlete.adherence}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-[#A8A6A5] mt-1">{athlete.adherence}% Aderência</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full ${
                      athlete.status === 'PAGO'
                        ? 'bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/40'
                        : 'bg-red-600/20 text-red-400 border border-red-600/40'
                    }`}
                  >
                    {athlete.status}
                  </span>
                  <p className="text-xs text-[#A8A6A5] whitespace-nowrap hidden sm:block">{athlete.action}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 rounded-lg bg-[#CCFF00] text-[#131313] font-bold hover:bg-[#CCFF00]/90 transition-colors text-sm">
            VISUALIZAR TODOS →
          </button>

          <button className="fixed bottom-24 lg:bottom-8 right-6 w-16 h-16 rounded-full bg-[#CCFF00] text-[#131313] flex items-center justify-center font-bold text-2xl hover:bg-[#CCFF00]/90 transition-colors shadow-lg">
            +
          </button>
        </section>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#131313]/95 backdrop-blur-lg border-t border-[#2A2A2A] pb-safe">
        <div className="flex justify-around items-center h-20">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              pathname === '/dashboard'
                ? 'text-[#CCFF00]'
                : 'text-[#A8A6A5] hover:text-[#E5E2E1]'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">home</span>
            <span className="text-xs font-semibold">DASHBOARD</span>
          </Link>
          <Link
            href="/diet"
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              pathname === '/diet'
                ? 'text-[#CCFF00]'
                : 'text-[#A8A6A5] hover:text-[#E5E2E1]'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">restaurant</span>
            <span className="text-xs font-semibold">DIETA</span>
          </Link>
          <Link
            href="/training"
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              pathname === '/training'
                ? 'text-[#CCFF00]'
                : 'text-[#A8A6A5] hover:text-[#E5E2E1]'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">fitness_center</span>
            <span className="text-xs font-semibold">TREINO</span>
          </Link>
          <Link
            href="/chat"
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              pathname === '/chat'
                ? 'text-[#CCFF00]'
                : 'text-[#A8A6A5] hover:text-[#E5E2E1]'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">chat</span>
            <span className="text-xs font-semibold">CHAT</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
