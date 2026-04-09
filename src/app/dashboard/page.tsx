'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useMemo } from 'react';

// Mock user data
const CURRENT_USER = {
  id: '1',
  name: 'Dr. Maria Silva',
  email: 'maria.silva@healthplus.com',
};

// Mock alerts data
const INITIAL_ALERTS = [
  {
    id: '1',
    type: 'error',
    title: 'Pagamento pendente',
    description: 'Ricardo Mendes - R$ 850,00 vencido há 5 dias',
    action: 'Enviar Cobrança',
    dismissed: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Reagendamento solicitado',
    description: 'Mariana Costa deseja remarcar consulta de 10/04',
    action: 'Ver Detalhes',
    dismissed: false,
  },
  {
    id: '3',
    type: 'success',
    title: 'Nova mensagem',
    description: 'João Silva enviou resultados de exames',
    action: 'Ver',
    dismissed: false,
  },
  {
    id: '4',
    type: 'info',
    title: 'Lembrete',
    description: '3 consultas amanhã sem confirmação',
    action: 'Enviar Confirmação',
    dismissed: false,
  },
];

// Mock appointments data
const WEEK_APPOINTMENTS = [
  // Monday (Seg) 07/04
  { id: '1', day: 0, startTime: '09:00', endTime: '10:00', patientName: 'Ricardo Mendes', type: 'Retorno', status: 'confirmed' },
  { id: '2', day: 0, startTime: '10:00', endTime: '11:00', patientName: 'Fernanda Costa', type: 'Primeira Consulta', status: 'pending' },
  { id: '3', day: 0, startTime: '14:00', endTime: '15:00', patientName: 'Pedro Silva', type: 'Acompanhamento', status: 'confirmed' },

  // Tuesday (Ter) 08/04
  { id: '4', day: 1, startTime: '08:00', endTime: '09:00', patientName: 'Ana Santos', type: 'Acompanhamento', status: 'confirmed' },
  { id: '5', day: 1, startTime: '11:00', endTime: '12:00', patientName: 'Carlos Oliveira', type: 'Retorno', status: 'pending' },
  { id: '6', day: 1, startTime: '15:00', endTime: '16:00', patientName: 'Juliana Martins', type: 'Acompanhamento', status: 'confirmed' },

  // Wednesday (Qua) 09/04
  { id: '7', day: 2, startTime: '09:30', endTime: '10:30', patientName: 'Mariana Costa', type: 'Primeira Consulta', status: 'confirmed' },
  { id: '8', day: 2, startTime: '13:00', endTime: '14:00', patientName: 'Roberto Dias', type: 'Acompanhamento', status: 'pending' },

  // Thursday (Qui) 10/04
  { id: '9', day: 3, startTime: '10:00', endTime: '11:00', patientName: 'João Silva', type: 'Retorno', status: 'confirmed' },
  { id: '10', day: 3, startTime: '16:00', endTime: '17:00', patientName: 'Patricia Gomes', type: 'Acompanhamento', status: 'confirmed' },

  // Friday (Sex) 11/04
  { id: '11', day: 4, startTime: '09:00', endTime: '10:00', patientName: 'Lucas Ferreira', type: 'Primeira Consulta', status: 'pending' },
  { id: '12', day: 4, startTime: '11:00', endTime: '12:00', patientName: 'Beatriz Santos', type: 'Acompanhamento', status: 'confirmed' },
];

// Mock recent patients
const RECENT_PATIENTS = [
  { id: 'p1', name: 'Ricardo Mendes', lastConsultation: '04/04/2026', adherence: 85, paymentStatus: 'paid' },
  { id: 'p2', name: 'Mariana Costa', lastConsultation: '02/04/2026', adherence: 92, paymentStatus: 'pending' },
  { id: 'p3', name: 'João Silva', lastConsultation: '05/04/2026', adherence: 78, paymentStatus: 'paid' },
  { id: 'p4', name: 'Ana Santos', lastConsultation: '03/04/2026', adherence: 88, paymentStatus: 'overdue' },
  { id: 'p5', name: 'Carlos Oliveira', lastConsultation: '01/04/2026', adherence: 76, paymentStatus: 'paid' },
];

// Alert color mappings
const alertColors = {
  error: { bg: 'bg-error/10', border: 'border-error/30', label: 'text-error', icon: 'payment' },
  warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', label: 'text-yellow-400', icon: 'schedule' },
  success: { bg: 'bg-green-500/10', border: 'border-green-500/30', label: 'text-green-400', icon: 'mail' },
  info: { bg: 'bg-blue-400/10', border: 'border-blue-400/30', label: 'text-blue-400', icon: 'notifications' },
};

// Appointment type colors
const appointmentTypeColors = {
  'Retorno': 'bg-primary/20 text-primary',
  'Primeira Consulta': 'bg-blue-500/20 text-blue-400',
  'Acompanhamento': 'bg-purple-500/20 text-purple-400',
};

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function getPaymentStatusColor(status: string) {
  switch(status) {
    case 'paid': return { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Pago' };
    case 'pending': return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Pendente' };
    case 'overdue': return { bg: 'bg-error/20', text: 'text-error', label: 'Vencido' };
    default: return { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'N/A' };
  }
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function getWeekDates(weekOffset: number = 0) {
  const startDate = new Date(2026, 3, 7); // April 7, 2026 (Monday)
  startDate.setDate(startDate.getDate() + weekOffset * 7);

  const dates = [];
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

  for (let i = 0; i < 5; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push({
      day: days[i],
      date: date.getDate(),
      fullDate: date.toLocaleDateString('pt-BR'),
    });
  }

  return dates;
}

export default function DashboardPage() {
  const pathname = usePathname();
  const [weekOffset, setWeekOffset] = useState(0);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [unreadAlerts, setUnreadAlerts] = useState(4);

  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);
  const weekStartDate = weekDates[0].date;
  const weekEndDate = weekDates[4].date;

  const dismissAlert = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, dismissed: true } : a));
    setUnreadAlerts(Math.max(0, unreadAlerts - 1));
  };

  const visibleAlerts = alerts.filter(a => !a.dismissed);
  const pendingAppointments = WEEK_APPOINTMENTS.filter(a => a.status === 'pending').length;

  // Time slots for the agenda (08:00 to 18:00)
  const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = 8 + i;
    return `${String(hour).padStart(2, '0')}:00`;
  });

  return (
    <div className="min-h-screen bg-background text-on-surface pb-24">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-on-surface-variant/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="text-on-primary font-bold text-sm">{getInitials(CURRENT_USER.name)}</span>
            </div>
            <div>
              <p className="text-sm text-on-surface-variant">Bem-vindo, Dr(a).</p>
              <p className="text-base font-headline font-bold text-on-surface">{CURRENT_USER.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer hover:opacity-75 transition-opacity">
              <span className="material-symbols-outlined text-2xl">notifications</span>
              {unreadAlerts > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error rounded-full flex items-center justify-center text-xs font-bold text-on-error">
                  {unreadAlerts}
                </span>
              )}
            </div>
            <Link href="/configuracoes" className="hover:opacity-75 transition-opacity">
              <span className="material-symbols-outlined text-2xl">settings</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-7xl mx-auto">
        {/* ALERTAS IMPORTANTES */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-headline font-bold text-primary">
              Alertas Importantes
            </h2>
            {visibleAlerts.length > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-on-surface-variant">
                  {visibleAlerts.length} {visibleAlerts.length === 1 ? 'aviso' : 'avisos'} pendentes
                </span>
                <Link href="/alertas" className="text-primary text-sm font-bold hover:opacity-75">
                  Ver todos →
                </Link>
              </div>
            )}
          </div>

          {visibleAlerts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {visibleAlerts.map((alert) => {
                const colors = alertColors[alert.type as keyof typeof alertColors];
                return (
                  <div
                    key={alert.id}
                    className={`glass-card rounded-xl p-4 border ${colors.border} relative group hover:border-primary/50 transition-colors`}
                  >
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary"
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                    <div className={`${colors.bg} rounded-lg p-3 mb-3 w-fit`}>
                      <span className="material-symbols-outlined text-lg">{colors.icon}</span>
                    </div>
                    <h3 className="font-headline font-bold text-sm text-on-surface mb-1">
                      {alert.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant mb-3">
                      {alert.description}
                    </p>
                    <button className={`w-full py-2 px-3 ${colors.bg} ${colors.label} rounded-lg text-xs font-bold hover:opacity-75 transition-opacity`}>
                      {alert.action}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="glass-card rounded-xl p-8 text-center border border-on-surface-variant/10">
              <p className="text-on-surface-variant">Nenhum alerta pendente. Tudo em dia!</p>
            </div>
          )}
        </section>

        {/* AGENDA DA SEMANA - MAIN FEATURE */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-headline font-bold text-primary">Agenda da Semana</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setWeekOffset(Math.max(-52, weekOffset - 1))}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <span className="text-sm font-bold text-on-surface-variant whitespace-nowrap">
                {weekStartDate < 10 ? '0' : ''}{weekStartDate} - {weekEndDate < 10 ? '0' : ''}{weekEndDate} Abril 2026
              </span>
              <button
                onClick={() => setWeekOffset(Math.min(52, weekOffset + 1))}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Desktop Agenda View - Full Week Grid */}
          <div className="hidden lg:block glass-card rounded-xl border border-on-surface-variant/10 overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Header with days */}
                <div className="grid grid-cols-6 bg-surface-high/50 border-b border-on-surface-variant/10">
                  <div className="p-4 border-r border-on-surface-variant/10">
                    <p className="text-xs text-on-surface-variant font-bold">HORA</p>
                  </div>
                  {weekDates.map((d, idx) => (
                    <div key={idx} className={`p-4 text-center border-r border-on-surface-variant/10 ${idx === 4 ? 'border-r-0' : ''}`}>
                      <p className="text-sm font-headline font-bold text-primary">{d.day}</p>
                      <p className="text-xs text-on-surface-variant">{d.date}/04</p>
                    </div>
                  ))}
                </div>

                {/* Time slots */}
                {timeSlots.map((time, timeIdx) => (
                  <div key={timeIdx} className="grid grid-cols-6 border-b border-on-surface-variant/10 hover:bg-primary/5 transition-colors">
                    <div className="p-4 border-r border-on-surface-variant/10 bg-surface/20">
                      <p className="text-xs font-bold text-on-surface-variant">{time}</p>
                    </div>
                    {weekDates.map((_, dayIdx) => {
                      const dayAppointments = WEEK_APPOINTMENTS.filter(
                        a => a.day === dayIdx && timeToMinutes(a.startTime) === timeToMinutes(time)
                      );
                      return (
                        <div
                          key={dayIdx}
                          className={`p-3 border-r border-on-surface-variant/10 ${dayIdx === 4 ? 'border-r-0' : ''}`}
                        >
                          {dayAppointments.map((apt) => (
                            <Link
                              key={apt.id}
                              href={`/pacientes/p${apt.id}`}
                              className="block mb-2 p-2 bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-colors group cursor-pointer"
                            >
                              <p className="text-xs font-bold text-primary group-hover:text-primary">{apt.startTime} - {apt.endTime}</p>
                              <p className="text-xs text-on-surface font-semibold truncate">{apt.patientName}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-xs px-2 py-0.5 rounded ${appointmentTypeColors[apt.type as keyof typeof appointmentTypeColors]}`}>
                                  {apt.type}
                                </span>
                                <span className={`w-2 h-2 rounded-full ${apt.status === 'confirmed' ? 'bg-green-400' : apt.status === 'pending' ? 'bg-yellow-400' : 'bg-error'}`}></span>
                              </div>
                            </Link>
                          ))}
                          {dayAppointments.length === 0 && (
                            <button className="w-full h-12 rounded-lg border border-dashed border-on-surface-variant/30 text-xs text-on-surface-variant hover:border-primary/50 hover:text-primary transition-colors">
                              Agendar
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Agenda View - List Format */}
          <div className="lg:hidden space-y-4">
            {weekDates.slice(0, 2).map((d, idx) => {
              const dayAppointments = WEEK_APPOINTMENTS.filter(a => a.day === idx);
              return (
                <div key={idx} className="glass-card rounded-xl p-4 border border-on-surface-variant/10">
                  <h3 className="font-headline font-bold text-primary mb-3">{d.day}, {d.date}/04</h3>
                  <div className="space-y-2">
                    {dayAppointments.length > 0 ? (
                      dayAppointments.map((apt) => (
                        <Link
                          key={apt.id}
                          href={`/pacientes/p${apt.id}`}
                          className="block p-3 bg-surface-high/50 rounded-lg border border-on-surface-variant/10 hover:border-primary/30 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-bold text-on-surface">{apt.startTime} - {apt.endTime}</p>
                              <p className="text-xs text-on-surface-variant">{apt.patientName}</p>
                              <span className={`inline-block text-xs mt-1 px-2 py-1 rounded ${appointmentTypeColors[apt.type as keyof typeof appointmentTypeColors]}`}>
                                {apt.type}
                              </span>
                            </div>
                            <span className={`w-3 h-3 rounded-full flex-shrink-0 ${apt.status === 'confirmed' ? 'bg-green-400' : apt.status === 'pending' ? 'bg-yellow-400' : 'bg-error'}`}></span>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-xs text-on-surface-variant text-center py-4">Nenhuma consulta agendada</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex gap-3">
            <button className="flex-1 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">mail</span>
              Enviar confirmação para todos {pendingAppointments > 0 && `(${pendingAppointments})`}
            </button>
          </div>
        </section>

        {/* QUICK STATS */}
        <section className="mb-10">
          <h2 className="text-xl font-headline font-bold text-primary mb-4">Estatísticas Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card rounded-xl p-6 border border-on-surface-variant/10">
              <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wide mb-2">Pacientes Ativos</p>
              <p className="text-3xl font-headline font-bold text-primary">8</p>
            </div>
            <div className="glass-card rounded-xl p-6 border border-on-surface-variant/10">
              <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wide mb-2">Consultas Esta Semana</p>
              <p className="text-3xl font-headline font-bold text-primary">12</p>
            </div>
            <div className="glass-card rounded-xl p-6 border border-on-surface-variant/10">
              <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wide mb-2">Pagamentos Pendentes</p>
              <p className="text-3xl font-headline font-bold text-error">3</p>
            </div>
            <div className="glass-card rounded-xl p-6 border border-on-surface-variant/10">
              <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wide mb-2">Taxa de Aderência</p>
              <p className="text-3xl font-headline font-bold text-primary">74%</p>
            </div>
          </div>
        </section>

        {/* PACIENTES RECENTES */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-headline font-bold text-primary">Pacientes Recentes</h2>
            <Link href="/pacientes" className="text-primary text-sm font-bold hover:opacity-75">
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {RECENT_PATIENTS.map((patient) => {
              const paymentStatus = getPaymentStatusColor(patient.paymentStatus);
              return (
                <Link
                  key={patient.id}
                  href={`/pacientes/${patient.id}`}
                  className="glass-card rounded-xl p-4 border border-on-surface-variant/10 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-on-primary">{getInitials(patient.name)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-on-surface truncate">{patient.name}</p>
                      <p className="text-xs text-on-surface-variant">{patient.lastConsultation}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-on-surface-variant mb-1">Aderência</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-surface-high rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${patient.adherence}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-primary">{patient.adherence}%</span>
                      </div>
                    </div>
                    <div>
                      <span className={`inline-block text-xs px-2 py-1 rounded font-bold ${paymentStatus.bg} ${paymentStatus.text}`}>
                        {paymentStatus.label}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* AÇÕES RÁPIDAS */}
        <section className="mb-10">
          <h2 className="text-xl font-headline font-bold text-primary mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link
              href="/pacientes/novo"
              className="glass-card rounded-xl p-6 border border-on-surface-variant/10 hover:border-primary/30 hover:bg-primary/5 transition-colors flex flex-col items-center justify-center text-center gap-2"
            >
              <span className="material-symbols-outlined text-3xl text-primary">person_add</span>
              <p className="text-sm font-bold text-on-surface">Novo Paciente</p>
            </Link>

            <Link
              href="/alimentos"
              className="glass-card rounded-xl p-6 border border-on-surface-variant/10 hover:border-primary/30 hover:bg-primary/5 transition-colors flex flex-col items-center justify-center text-center gap-2"
            >
              <span className="material-symbols-outlined text-3xl text-primary">restaurant</span>
              <p className="text-sm font-bold text-on-surface">Banco de Alimentos</p>
            </Link>

            <Link
              href="/templates"
              className="glass-card rounded-xl p-6 border border-on-surface-variant/10 hover:border-primary/30 hover:bg-primary/5 transition-colors flex flex-col items-center justify-center text-center gap-2"
            >
              <span className="material-symbols-outlined text-3xl text-primary">description</span>
              <p className="text-sm font-bold text-on-surface">Templates de Dieta</p>
            </Link>

            <Link
              href="/financeiro"
              className="glass-card rounded-xl p-6 border border-on-surface-variant/10 hover:border-primary/30 hover:bg-primary/5 transition-colors flex flex-col items-center justify-center text-center gap-2"
            >
              <span className="material-symbols-outlined text-3xl text-primary">payments</span>
              <p className="text-sm font-bold text-on-surface">Controle Financeiro</p>
            </Link>

            <Link
              href="/treino"
              className="glass-card rounded-xl p-6 border border-on-surface-variant/10 hover:border-primary/30 hover:bg-primary/5 transition-colors flex flex-col items-center justify-center text-center gap-2"
            >
              <span className="material-symbols-outlined text-3xl text-primary">fitness_center</span>
              <p className="text-sm font-bold text-on-surface">Prescrever Treino</p>
            </Link>

            <Link
              href="/usuarios"
              className="glass-card rounded-xl p-6 border border-on-surface-variant/10 hover:border-primary/30 hover:bg-primary/5 transition-colors flex flex-col items-center justify-center text-center gap-2"
            >
              <span className="material-symbols-outlined text-3xl text-primary">group</span>
              <p className="text-sm font-bold text-on-surface">Usuários do Sistema</p>
            </Link>
          </div>
        </section>
      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-on-surface-variant/10">
        <div className="max-w-7xl mx-auto px-6 flex justify-start gap-8 h-20">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 font-bold transition-colors border-b-2 ${
              pathname === '/dashboard'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant border-transparent hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <Link
            href="/pacientes"
            className={`flex items-center gap-2 font-bold transition-colors border-b-2 ${
              pathname === '/pacientes'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant border-transparent hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">people</span>
            <span className="hidden sm:inline">Pacientes</span>
          </Link>
          <Link
            href="/dieta"
            className={`flex items-center gap-2 font-bold transition-colors border-b-2 ${
              pathname === '/dieta'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant border-transparent hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">restaurant</span>
            <span className="hidden sm:inline">Dieta</span>
          </Link>
          <Link
            href="/financeiro"
            className={`flex items-center gap-2 font-bold transition-colors border-b-2 ${
              pathname === '/financeiro'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant border-transparent hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">payments</span>
            <span className="hidden sm:inline">Financeiro</span>
          </Link>
          <Link
            href="/mais"
            className={`flex items-center gap-2 font-bold transition-colors border-b-2 ${
              pathname === '/mais'
                ? 'text-primary border-primary'
                : 'text-on-surface-variant border-transparent hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">more_horiz</span>
            <span className="hidden sm:inline">Mais</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
