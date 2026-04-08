'use client';

import { useApp } from '@/lib/AppContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const getAlertBorderColor = (type: string) => {
  switch (type) {
    case 'critical':
      return 'border-error/50';
    case 'warning':
      return 'border-warning/50';
    case 'success':
      return 'border-primary/50';
    case 'info':
      return 'border-info/50';
    default:
      return 'border-primary/20';
  }
};

const getAlertLabelColor = (type: string) => {
  switch (type) {
    case 'critical':
      return 'text-error';
    case 'warning':
      return 'text-warning';
    case 'success':
      return 'text-primary';
    case 'info':
      return 'text-info';
    default:
      return 'text-primary';
  }
};

const getAlertLabelText = (type: string) => {
  switch (type) {
    case 'critical':
      return 'CRÍTICO';
    case 'warning':
      return 'ALERTA';
    case 'success':
      return 'SUCESSO';
    case 'info':
      return 'INFO';
    default:
      return 'ALERTA';
  }
};

const getPaymentBadgeStyle = (status: string) => {
  switch (status) {
    case 'paid':
      return { bg: 'bg-primary/20', text: 'text-primary', label: 'Pago' };
    case 'pending':
      return { bg: 'bg-warning/20', text: 'text-warning', label: 'Pendente' };
    case 'overdue':
      return { bg: 'bg-error/20', text: 'text-error', label: 'Vencido' };
    default:
      return { bg: 'bg-primary/20', text: 'text-primary', label: 'Pago' };
  }
};

export default function DashboardPage() {
  const { patients, alerts, currentUser, getUnreadAlerts, getOverduePayments } = useApp();
  const pathname = usePathname();

  const unreadAlerts = getUnreadAlerts();
  const overduePayments = getOverduePayments();
  const activePatients = patients.filter((p) => p.status === 'active').length;
  const averageAdherence =
    patients.length > 0
      ? Math.round(
          patients.reduce((sum, p) => sum + p.adherence, 0) / patients.length
        )
      : 0;

  // Get initials for avatar
  const userInitials = currentUser
    ? currentUser.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()
    : 'KO';

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-on-surface-variant/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="text-on-primary font-bold text-sm">{userInitials}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-on-surface-variant">Bem-vindo,</span>
              <span className="text-base font-headline font-bold text-on-surface">
                {currentUser?.name}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="material-symbols-outlined text-2xl cursor-pointer hover:text-primary transition-colors">
                notifications
              </span>
              {unreadAlerts.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-error rounded-full flex items-center justify-center text-xs font-bold text-on-error">
                  {unreadAlerts.length}
                </span>
              )}
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
          {alerts.length > 0 ? (
            <div className="grid grid-cols-12 gap-6">
              {alerts.slice(0, 2).map((alert, index) => (
                <div
                  key={alert.id}
                  className={`${
                    index === 0 ? 'col-span-7' : 'col-span-5'
                  } glass-card rounded-2xl p-6 border-2 ${getAlertBorderColor(
                    alert.type
                  )}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span
                        className={`text-xs font-bold ${getAlertLabelColor(
                          alert.type
                        )} uppercase tracking-wider`}
                      >
                        {getAlertLabelText(alert.type)}
                      </span>
                      <h3 className="text-lg font-headline font-bold text-on-surface mt-1">
                        {alert.patientName}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-on-surface-variant mb-4">
                    {alert.message}
                  </p>
                  <button className="w-full py-2 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors">
                    Visualizar
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-8 text-center">
              <p className="text-on-surface-variant">Nenhum alerta no momento</p>
            </div>
          )}
        </section>

        {/* Quick Stats Section */}
        <section className="mb-12">
          <h2 className="text-xl font-headline font-bold mb-6 text-primary">
            Estatísticas Rápidas
          </h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Total de Pacientes
              </span>
              <p className="text-3xl font-headline font-bold text-primary mt-2">
                {patients.length}
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Pacientes Ativos
              </span>
              <p className="text-3xl font-headline font-bold text-primary mt-2">
                {activePatients}
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Pagamentos Vencidos
              </span>
              <p className="text-3xl font-headline font-bold text-error mt-2">
                {overduePayments.length}
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Aderência Média
              </span>
              <p className="text-3xl font-headline font-bold text-primary mt-2">
                {averageAdherence}%
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
            {patients.slice(0, 5).map((patient) => {
              const paymentBadge = getPaymentBadgeStyle(patient.paymentStatus);
              const borderColor = patient.paymentStatus === 'overdue' ? 'border-error/30' : '';

              return (
                <Link
                  key={patient.id}
                  href={`/pacientes/${patient.id}`}
                  className={`glass-card rounded-2xl p-6 flex items-center gap-6 border ${borderColor} hover:border-primary/40 transition-colors cursor-pointer`}
                >
                  <div
                    className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-on-surface"
                    style={{
                      backgroundColor:
                        patient.paymentStatus === 'overdue'
                          ? 'rgb(var(--color-error) / 0.2)'
                          : 'rgb(var(--color-primary) / 0.2)',
                      borderColor:
                        patient.paymentStatus === 'overdue'
                          ? 'rgb(var(--color-error) / 0.4)'
                          : 'rgb(var(--color-primary) / 0.4)',
                      borderWidth: '1px',
                    }}
                  >
                    {patient.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-headline font-bold text-on-surface">
                        {patient.name}
                      </h3>
                      <span
                        className={`px-3 py-1 ${paymentBadge.bg} ${paymentBadge.text} rounded-full text-xs font-bold`}
                      >
                        {paymentBadge.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-on-surface-variant">
                        Meta: {patient.goal}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex-1 h-2 bg-surface-highest rounded-full overflow-hidden">
                        <div
                          className={
                            patient.paymentStatus === 'overdue'
                              ? 'bg-error'
                              : 'bg-primary'
                          }
                          style={{ width: `${patient.adherence}%` }}
                        ></div>
                      </div>
                      <span
                        className={`text-sm font-bold ${
                          patient.paymentStatus === 'overdue'
                            ? 'text-error'
                            : 'text-primary'
                        }`}
                      >
                        {patient.adherence}%
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <Link
            href="/pacientes"
            className="mt-6 block w-full py-3 border border-primary/30 text-primary font-bold rounded-lg text-center hover:bg-primary/5 transition-colors"
          >
            Visualizar Todos
          </Link>
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
            className={`flex items-center gap-2 font-bold transition-colors ${
              pathname === '/dashboard'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/pacientes"
            className={`flex items-center gap-2 font-bold transition-colors ${
              pathname === '/pacientes'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">people</span>
            <span>Pacientes</span>
          </Link>
          <Link
            href="/financeiro"
            className={`flex items-center gap-2 font-bold transition-colors ${
              pathname === '/financeiro'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">payments</span>
            <span>Financeiro</span>
          </Link>
          <Link
            href="/chat"
            className={`flex items-center gap-2 font-bold transition-colors ${
              pathname === '/chat'
                ? 'text-primary border-b-2 border-primary'
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
