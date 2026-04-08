'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/AppContext';

export default function PacientesPage() {
  const { patients } = useApp();
  const pathname = usePathname();
  const [filter, setFilter] = useState<'Todos' | 'Ativos' | 'Pendentes' | 'Inativos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = useMemo(() => {
    let result = patients;

    // Apply status filter
    if (filter === 'Ativos') {
      result = result.filter((p) => p.status === 'active');
    } else if (filter === 'Pendentes') {
      result = result.filter((p) => p.status === 'pending');
    } else if (filter === 'Inativos') {
      result = result.filter((p) => p.status === 'inactive');
    }

    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  }, [patients, filter, searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-primary/20 text-primary border border-primary/40';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40';
      case 'inactive':
        return 'bg-on-surface-variant/20 text-on-surface-variant border border-on-surface-variant/40';
      default:
        return '';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'pending':
        return 'Pendente';
      case 'inactive':
        return 'Inativo';
      default:
        return '';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-primary/20 text-primary';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'overdue':
        return 'bg-error/20 text-error';
      default:
        return '';
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pago';
      case 'pending':
        return 'Pendente';
      case 'overdue':
        return 'Atrasado';
      default:
        return '';
    }
  };

  const formatNextConsultation = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Atrasada';
    if (diffDays === 0) return 'Hoje';
    if (diffDays === 1) return 'Amanhã';
    return `${diffDays} dias`;
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-on-surface-variant/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-headline font-bold text-on-surface">
                Pacientes
              </h1>
              <p className="text-sm text-on-surface-variant mt-1">
                {filteredPatients.length} paciente{filteredPatients.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center hover:bg-primary/30 transition-colors">
              <span className="material-symbols-outlined text-primary">
                notifications
              </span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant material-symbols-outlined">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar paciente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-high/50 border border-on-surface-variant/20 rounded-2xl text-on-surface placeholder-on-surface-variant/60 focus:outline-none focus:border-primary/40 focus:bg-surface-high transition-colors"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4">
            {(['Todos', 'Ativos', 'Pendentes', 'Inativos'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                  filter === tab
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-high/50 text-on-surface-variant hover:bg-surface-high'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-56 pb-32 px-6 max-w-7xl mx-auto">
        {filteredPatients.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-on-surface-variant">Nenhum paciente encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <Link
                key={patient.id}
                href={`/pacientes/${patient.id}`}
                className="glass-card rounded-2xl p-6 border border-on-surface-variant/10 hover:border-primary/30 hover:bg-primary/5 transition-all group cursor-pointer"
              >
                {/* Patient Avatar and Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center group-hover:border-primary transition-colors">
                      <span className="text-sm font-headline font-bold text-primary">
                        {patient.avatar}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-on-surface group-hover:text-primary transition-colors">
                        {patient.name}
                      </h3>
                      <p className="text-xs text-on-surface-variant">
                        {patient.goal}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(
                      patient.status
                    )}`}
                  >
                    {getStatusLabel(patient.status)}
                  </span>
                </div>

                {/* Adherence Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-on-surface-variant font-bold">
                      Aderência
                    </span>
                    <span className="text-xs font-bold text-primary">
                      {patient.adherence}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-surface-highest rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${patient.adherence}%` }}
                    ></div>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant font-bold">
                    Pagamento
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getPaymentStatusColor(
                      patient.paymentStatus
                    )}`}
                  >
                    {getPaymentStatusLabel(patient.paymentStatus)}
                  </span>
                </div>

                {/* Next Consultation */}
                <div className="pt-4 border-t border-on-surface-variant/10">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="material-symbols-outlined text-sm text-on-surface-variant">
                      calendar_today
                    </span>
                    <span className="text-on-surface-variant">
                      Próxima consulta:{' '}
                      <span className="text-primary font-bold">
                        {formatNextConsultation(patient.nextConsultation)}
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-32 right-6 group">
        <button className="w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center font-headline font-bold text-lg hover:scale-110 transition-transform shadow-lg neon-glow">
          <span className="material-symbols-outlined">add</span>
        </button>
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-surface-highest/95 backdrop-blur px-4 py-2 rounded-lg whitespace-nowrap text-sm font-bold text-on-surface border border-primary/20">
            Adicionar Paciente
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
