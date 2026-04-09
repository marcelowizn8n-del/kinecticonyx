'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/AppContext';

type PaymentFilter = 'todos' | 'pagos' | 'pendentes' | 'atrasados';

export default function FinanceiroPage() {
  const { patients, payments, getOverduePayments } = useApp();
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = useState<PaymentFilter>('todos');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Format money to Brazilian format
  const formatMoney = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Format date to DD/MM/YYYY
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Get current month payments
  const currentMonthPayments = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return payments.filter((p) => {
      const paymentDate = new Date(p.paidDate || p.dueDate);
      return paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear;
    });
  }, [payments]);

  // Calculate hero stats
  const monthlyRevenue = useMemo(() => {
    return currentMonthPayments
      .filter((p) => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0);
  }, [currentMonthPayments]);

  const paidCount = useMemo(() => {
    return currentMonthPayments.filter((p) => p.status === 'paid').length;
  }, [currentMonthPayments]);

  const overduePayments = useMemo(() => {
    return getOverduePayments();
  }, [getOverduePayments]);

  // Calculate monthly trend (simplified: comparing last month)
  const lastMonthRevenue = useMemo(() => {
    const now = new Date();
    const lastMonth = now.getMonth() - 1;
    const lastYear = lastMonth < 0 ? now.getFullYear() - 1 : now.getFullYear();
    const adjustedMonth = lastMonth < 0 ? 11 : lastMonth;

    return payments
      .filter((p) => {
        const paymentDate = new Date(p.paidDate || p.dueDate);
        return (
          p.status === 'paid' &&
          paymentDate.getMonth() === adjustedMonth &&
          paymentDate.getFullYear() === lastYear
        );
      })
      .reduce((sum, p) => sum + p.amount, 0);
  }, [payments]);

  const trendPercent = useMemo(() => {
    if (lastMonthRevenue === 0) return 0;
    return (((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100).toFixed(1);
  }, [monthlyRevenue, lastMonthRevenue]);

  // Filter payments based on active filter
  const filteredPayments = useMemo(() => {
    switch (activeFilter) {
      case 'pagos':
        return payments.filter((p) => p.status === 'paid');
      case 'pendentes':
        return payments.filter((p) => p.status === 'pending');
      case 'atrasados':
        return overduePayments;
      case 'todos':
      default:
        return payments;
    }
  }, [activeFilter, payments, overduePayments]);

  // Get avatar for patient
  const getPatientAvatar = (patientId: string): string => {
    const patient = patients.find((p) => p.id === patientId);
    return patient?.avatar || 'N/A';
  };

  // Get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-primary/20 text-primary';
      case 'pending':
        return 'bg-surface-high text-on-surface-variant';
      case 'overdue':
        return 'bg-error/20 text-error';
      default:
        return 'bg-surface-high text-on-surface';
    }
  };

  // Get card border class
  const getCardBorderClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'border-primary/30';
      case 'overdue':
        return 'border-error/30';
      default:
        return 'border-on-surface-variant/20';
    }
  };

  // Get status label
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'paid':
        return 'Pago';
      case 'pending':
        return 'Pendente';
      case 'overdue':
        return 'Atrasado';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#E5E2E1] flex flex-col">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#131313]/80 backdrop-blur-md border-b border-[#C4C9AC]/10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#CCFF00]/20 border border-[#CCFF00]/40 flex items-center justify-center">
              <span className="font-bold text-sm text-[#131313]">KO</span>
            </div>
            <h1 className="text-xl font-headline font-bold text-[#CCFF00]">
              KINĒTIC ONYX
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-2xl cursor-pointer hover:text-[#CCFF00] transition-colors">
              notifications
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-28 px-6 flex justify-center">
        <div className="w-full max-w-md">
          {/* Page Title */}
          <h1 className="text-3xl font-headline font-bold text-[#CCFF00] mb-2">
            Controle Financeiro
          </h1>
          <p className="text-[#C4C9AC] text-sm mb-8">
            Performance e Fluxo de Caixa
          </p>

          {/* Hero Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {/* Faturamento Mensal */}
            <div className="glass-card rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#CCFF00]/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="relative z-10">
                <p className="text-xs text-[#C4C9AC] font-bold uppercase tracking-wider mb-2">
                  Faturamento
                </p>
                <h3 className="text-lg font-headline font-bold text-[#CCFF00] mb-1">
                  {formatMoney(monthlyRevenue)}
                </h3>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#CCFF00]">
                    trending_up
                  </span>
                  <span className="text-xs font-bold text-[#CCFF00]">
                    +{trendPercent}%
                  </span>
                </div>
              </div>
            </div>

            {/* Recebidos */}
            <div className="glass-card rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#CCFF00]/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="relative z-10">
                <p className="text-xs text-[#C4C9AC] font-bold uppercase tracking-wider mb-2">
                  Recebidos
                </p>
                <h3 className="text-lg font-headline font-bold text-[#CCFF00] mb-1">
                  {paidCount}
                </h3>
                <p className="text-xs text-[#C4C9AC]">
                  pagamentos
                </p>
              </div>
            </div>

            {/* Inadimplentes */}
            <div className="glass-card rounded-xl p-4 relative overflow-hidden border border-[#FFB4AB]/30">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#FFB4AB]/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="relative z-10">
                <p className="text-xs text-[#FFB4AB] font-bold uppercase tracking-wider mb-2">
                  Atrasados
                </p>
                <h3 className="text-lg font-headline font-bold text-[#FFB4AB] mb-1">
                  {overduePayments.length}
                </h3>
                <p className="text-xs text-[#FFB4AB]">
                  pagamentos
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Revenue Chart */}
          <div className="glass-card rounded-2xl p-6 mb-8">
            <h2 className="text-sm font-headline font-bold text-[#E5E2E1] mb-6">
              Receita Mensal
            </h2>
            <svg className="w-full h-32" viewBox="0 0 300 100">
              <defs>
                <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#CCFF00" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline
                points="10,70 50,50 90,40 130,45 170,35 210,30 250,25 290,20"
                fill="none"
                stroke="#CCFF00"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <polygon
                points="10,70 50,50 90,40 130,45 170,35 210,30 250,25 290,20 290,100 10,100"
                fill="url(#revenueGradient)"
              />
            </svg>
            <div className="flex justify-between text-xs text-[#C4C9AC] mt-4 px-2">
              <span>Jan</span>
              <span>Fev</span>
              <span>Mar</span>
              <span>Abr</span>
              <span>Mai</span>
              <span>Jun</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button onClick={() => showToast("Cobranças enviadas para pacientes pendentes!")} className="py-3 bg-[#CCFF00] text-[#131313] font-bold rounded-lg hover:bg-[#CCFF00]/90 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">
                mail
              </span>
              <span className="text-sm">Enviar Cobrança</span>
            </button>
            <button onClick={() => showToast("Relatório gerado!")} className="py-3 bg-[#2A2A2A] text-[#E5E2E1] font-bold rounded-lg hover:bg-[#353534] transition-colors flex items-center justify-center gap-2 border border-[#C4C9AC]/20">
              <span className="material-symbols-outlined text-lg">
                assessment
              </span>
              <span className="text-sm">Gerar Relatório</span>
            </button>
          </div>

          {/* Payment Filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {(['todos', 'pagos', 'pendentes', 'atrasados'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#CCFF00] text-[#131313]'
                    : 'bg-[#2A2A2A] text-[#E5E2E1] hover:bg-[#353534]'
                }`}
              >
                {filter === 'todos'
                  ? 'Todos'
                  : filter === 'pagos'
                    ? 'Pagos'
                    : filter === 'pendentes'
                      ? 'Pendentes'
                      : 'Atrasados'}
              </button>
            ))}
          </div>

          {/* Patient Payment List */}
          <div className="space-y-3 mb-4">
            <h2 className="text-sm font-headline font-bold text-[#E5E2E1] mb-4">
              Pagamentos de Pacientes
            </h2>

            {filteredPayments.length === 0 ? (
              <div className="glass-card rounded-2xl p-8 text-center">
                <p className="text-[#C4C9AC]">
                  Nenhum pagamento encontrado
                </p>
              </div>
            ) : (
              filteredPayments.map((payment) => {
                const avatar = getPatientAvatar(payment.patientId);
                return (
                  <div
                    key={payment.id}
                    className={`glass-card rounded-2xl p-4 border-2 ${getCardBorderClass(payment.status)} flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-[#CCFF00]/20 border border-[#CCFF00]/40 flex items-center justify-center">
                        <span className="text-xs font-bold text-[#131313]">
                          {avatar}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-[#E5E2E1]">
                          {payment.patientName}
                        </h3>
                        <p className="text-xs text-[#C4C9AC]">
                          {formatMoney(payment.amount)}
                        </p>
                        <p className="text-xs text-[#C4C9AC]">
                          Vencimento: {formatDate(payment.dueDate)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${getStatusBadgeClass(payment.status)}`}
                      >
                        {getStatusLabel(payment.status)}
                      </span>
                      <button onClick={() => showToast(`Lembrete enviado para ${payment.patientName}!`)} className="text-xs text-[#CCFF00] hover:text-[#CCFF00]/80 transition-colors font-bold">
                        {payment.status === 'paid'
                          ? 'Recibo'
                          : 'Lembrete'}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#131313]/80 backdrop-blur-md border-t border-[#C4C9AC]/10">
        <div className="flex justify-center gap-8 h-20 px-6 max-w-md mx-auto w-full">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 transition-colors ${
              pathname === '/dashboard'
                ? 'text-[#CCFF00] border-b-2 border-[#CCFF00]'
                : 'text-[#C4C9AC] hover:text-[#E5E2E1]'
            }`}
          >
            <span className="material-symbols-outlined">home</span>
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link
            href="/pacientes"
            className={`flex items-center gap-2 transition-colors ${
              pathname === '/pacientes'
                ? 'text-[#CCFF00] border-b-2 border-[#CCFF00]'
                : 'text-[#C4C9AC] hover:text-[#E5E2E1]'
            }`}
          >
            <span className="material-symbols-outlined">people</span>
            <span className="text-sm">Pacientes</span>
          </Link>
          <Link
            href="/financeiro"
            className={`flex items-center gap-2 transition-colors ${
              pathname === '/financeiro'
                ? 'text-[#CCFF00] border-b-2 border-[#CCFF00]'
                : 'text-[#C4C9AC] hover:text-[#E5E2E1]'
            }`}
          >
            <span className="material-symbols-outlined">payments</span>
            <span className="text-sm">Financeiro</span>
          </Link>
          <Link
            href="/chat"
            className={`flex items-center gap-2 transition-colors ${
              pathname === '/chat'
                ? 'text-[#CCFF00] border-b-2 border-[#CCFF00]'
                : 'text-[#C4C9AC] hover:text-[#E5E2E1]'
            }`}
          >
            <span className="material-symbols-outlined">chat</span>
            <span className="text-sm">Chat</span>
          </Link>
        </div>
      </nav>

      {toast && (
        <div className="fixed top-6 right-6 z-[100] px-6 py-3 rounded-lg text-sm font-bold" style={{ background: 'rgba(42,42,42,0.95)', backdropFilter: 'blur(16px)', color: '#CCFF00', border: '1px solid rgba(204,255,0,0.2)' }}>
          {toast}
        </div>
      )}
    </div>
  );
}
