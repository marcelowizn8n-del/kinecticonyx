'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useApp } from '@/lib/AppContext';

export default function PatientProfilePage() {
  const params = useParams();
  const pathname = usePathname();
  const { patients } = useApp();
  const patientId = params.id as string;

  const patient = useMemo(() => {
    return patients.find((p) => p.id === patientId);
  }, [patients, patientId]);

  if (!patient) {
    return (
      <div className="min-h-screen bg-background text-on-surface flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-on-surface-variant">Paciente não encontrado</p>
          <Link
            href="/pacientes"
            className="mt-6 inline-block px-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Voltar para Pacientes
          </Link>
        </div>
      </div>
    );
  }

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getDietTypeLabel = (type: string) => {
    switch (type) {
      case 'mathematical':
        return 'Abordagem Matemática';
      case 'intuitive':
        return 'Alimentação Intuitiva';
      case 'behavioral':
        return 'Abordagem Comportamental';
      default:
        return '';
    }
  };

  // Calculate weight loss
  const weightLoss =
    patient.weightHistory.length > 0
      ? patient.weightHistory[0].value - patient.weight
      : 0;

  // Calculate body fat loss
  const bodyFatLoss =
    patient.bodyFatHistory.length > 0
      ? patient.bodyFatHistory[0].value - patient.bodyFat
      : 0;

  // Format next consultation date
  const nextConsultationDate = new Date(patient.nextConsultation);
  const today = new Date();
  const diffTime = nextConsultationDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Fixed Header with Back Button */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-on-surface-variant/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/pacientes"
            className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-bold">Voltar</span>
          </Link>
          <div className="flex-1"></div>
          <button className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center hover:bg-primary/30 transition-colors">
            <span className="material-symbols-outlined text-primary">
              more_vert
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="glass-card rounded-2xl p-8 border border-on-surface-variant/10">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-headline font-bold text-primary">
                  {patient.avatar}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-3xl font-headline font-bold text-on-surface">
                    {patient.name}
                  </h1>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(
                      patient.status
                    )}`}
                  >
                    {getStatusLabel(patient.status)}
                  </span>
                </div>
                <p className="text-on-surface-variant mb-2">
                  {patient.age} anos • {patient.gender === 'M' ? 'Masculino' : 'Feminino'}
                </p>
                <p className="text-primary font-bold">{patient.goal}</p>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-surface-highest/50 rounded-lg p-4 text-center">
                <p className="text-sm text-on-surface-variant mb-1">Peso</p>
                <p className="text-2xl font-headline font-bold text-primary">
                  {patient.weight.toFixed(1)}
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  {weightLoss > 0 ? '-' : '+'}{Math.abs(weightLoss).toFixed(1)} kg
                </p>
              </div>
              <div className="bg-surface-highest/50 rounded-lg p-4 text-center">
                <p className="text-sm text-on-surface-variant mb-1">Gordura</p>
                <p className="text-2xl font-headline font-bold text-primary">
                  {patient.bodyFat.toFixed(1)}%
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  {bodyFatLoss > 0 ? '-' : '+'}{Math.abs(bodyFatLoss).toFixed(1)}%
                </p>
              </div>
              <div className="bg-surface-highest/50 rounded-lg p-4 text-center">
                <p className="text-sm text-on-surface-variant mb-1">Massa Magra</p>
                <p className="text-2xl font-headline font-bold text-primary">
                  {patient.muscleMass.toFixed(1)}
                </p>
                <p className="text-xs text-on-surface-variant mt-1">kg</p>
              </div>
              <div className="bg-surface-highest/50 rounded-lg p-4 text-center">
                <p className="text-sm text-on-surface-variant mb-1">TMB</p>
                <p className="text-2xl font-headline font-bold text-primary">
                  {patient.bmr}
                </p>
                <p className="text-xs text-on-surface-variant mt-1">kcal</p>
              </div>
            </div>
          </div>
        </section>

        {/* Evolution Charts */}
        <section className="mb-8">
          <h2 className="text-xl font-headline font-bold mb-4 text-primary">
            Evolução
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {/* Weight History Chart */}
            <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
              <h3 className="font-bold text-on-surface mb-4">Histórico de Peso</h3>
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 clinical-grid pointer-events-none"></div>
                <svg
                  className="w-full h-48 relative z-10"
                  viewBox="0 0 300 150"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Grid Lines */}
                  <line x1="30" y1="10" x2="30" y2="130" stroke="#444933" strokeWidth="1" />
                  <line x1="30" y1="130" x2="290" y2="130" stroke="#444933" strokeWidth="1" />

                  {/* Weight Line */}
                  <polyline
                    points={patient.weightHistory
                      .map((item, idx) => {
                        const x = 30 + (idx / (patient.weightHistory.length - 1)) * 260;
                        const minWeight = Math.min(...patient.weightHistory.map((w) => w.value));
                        const maxWeight = Math.max(...patient.weightHistory.map((w) => w.value));
                        const range = maxWeight - minWeight || 1;
                        const y = 130 - ((item.value - minWeight) / range) * 110;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                    fill="none"
                    stroke="#CCFF00"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                  />

                  {/* Points */}
                  {patient.weightHistory.map((item, idx) => {
                    const x = 30 + (idx / (patient.weightHistory.length - 1)) * 260;
                    const minWeight = Math.min(...patient.weightHistory.map((w) => w.value));
                    const maxWeight = Math.max(...patient.weightHistory.map((w) => w.value));
                    const range = maxWeight - minWeight || 1;
                    const y = 130 - ((item.value - minWeight) / range) * 110;
                    return (
                      <circle
                        key={idx}
                        cx={x}
                        cy={y}
                        r="3"
                        fill="#CCFF00"
                      />
                    );
                  })}
                </svg>
              </div>
              <div className="mt-4 pt-4 border-t border-on-surface-variant/10">
                <p className="text-xs text-on-surface-variant">
                  {patient.weightHistory.length > 0 &&
                    formatDate(patient.weightHistory[0].date)} →{' '}
                  {formatDate(patient.weight ? new Date().toISOString() : new Date().toISOString())}
                </p>
              </div>
            </div>

            {/* Body Fat History Chart */}
            <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
              <h3 className="font-bold text-on-surface mb-4">Histórico de Gordura Corporal</h3>
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 clinical-grid pointer-events-none"></div>
                <svg
                  className="w-full h-48 relative z-10"
                  viewBox="0 0 300 150"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Grid Lines */}
                  <line x1="30" y1="10" x2="30" y2="130" stroke="#444933" strokeWidth="1" />
                  <line x1="30" y1="130" x2="290" y2="130" stroke="#444933" strokeWidth="1" />

                  {/* Body Fat Line */}
                  <polyline
                    points={patient.bodyFatHistory
                      .map((item, idx) => {
                        const x = 30 + (idx / (patient.bodyFatHistory.length - 1)) * 260;
                        const minBF = Math.min(...patient.bodyFatHistory.map((bf) => bf.value));
                        const maxBF = Math.max(...patient.bodyFatHistory.map((bf) => bf.value));
                        const range = maxBF - minBF || 1;
                        const y = 130 - ((item.value - minBF) / range) * 110;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                    fill="none"
                    stroke="#C4C9AC"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                  />

                  {/* Points */}
                  {patient.bodyFatHistory.map((item, idx) => {
                    const x = 30 + (idx / (patient.bodyFatHistory.length - 1)) * 260;
                    const minBF = Math.min(...patient.bodyFatHistory.map((bf) => bf.value));
                    const maxBF = Math.max(...patient.bodyFatHistory.map((bf) => bf.value));
                    const range = maxBF - minBF || 1;
                    const y = 130 - ((item.value - minBF) / range) * 110;
                    return (
                      <circle
                        key={idx}
                        cx={x}
                        cy={y}
                        r="3"
                        fill="#C4C9AC"
                      />
                    );
                  })}
                </svg>
              </div>
              <div className="mt-4 pt-4 border-t border-on-surface-variant/10">
                <p className="text-xs text-on-surface-variant">
                  {patient.bodyFatHistory.length > 0 &&
                    formatDate(patient.bodyFatHistory[0].date)} →{' '}
                  {formatDate(new Date().toISOString())}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bioimpedance Data */}
        <section className="mb-8">
          <h2 className="text-xl font-headline font-bold mb-4 text-primary">
            Dados de Bioimpedância
          </h2>
          <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-surface-highest/50 rounded-lg p-4">
                <p className="text-xs text-on-surface-variant font-bold mb-2">
                  MASSA MAGRA
                </p>
                <p className="text-2xl font-headline font-bold text-primary">
                  {patient.muscleMass.toFixed(1)}
                </p>
                <p className="text-xs text-on-surface-variant mt-2">kg</p>
              </div>
              <div className="bg-surface-highest/50 rounded-lg p-4">
                <p className="text-xs text-on-surface-variant font-bold mb-2">
                  ÁGUA CORPORAL
                </p>
                <p className="text-2xl font-headline font-bold text-primary">
                  {patient.waterPercentage.toFixed(1)}
                </p>
                <p className="text-xs text-on-surface-variant mt-2">%</p>
              </div>
              <div className="bg-surface-highest/50 rounded-lg p-4">
                <p className="text-xs text-on-surface-variant font-bold mb-2">
                  GORDURA VISCERAL
                </p>
                <p className="text-2xl font-headline font-bold text-primary">
                  {patient.visceralFat}
                </p>
                <p className="text-xs text-on-surface-variant mt-2">nível</p>
              </div>
              <div className="bg-surface-highest/50 rounded-lg p-4">
                <p className="text-xs text-on-surface-variant font-bold mb-2">
                  IMC
                </p>
                <p className="text-2xl font-headline font-bold text-primary">
                  {(patient.weight / Math.pow(patient.height / 100, 2)).toFixed(1)}
                </p>
                <p className="text-xs text-on-surface-variant mt-2">kg/m²</p>
              </div>
            </div>
          </div>
        </section>

        {/* Current Diet Info */}
        <section className="mb-8">
          <h2 className="text-xl font-headline font-bold mb-4 text-primary">
            Dieta Atual
          </h2>
          <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-on-surface-variant font-bold uppercase mb-2">
                  Tipo de Abordagem
                </p>
                <p className="text-lg font-headline font-bold text-on-surface">
                  {getDietTypeLabel(patient.dietType)}
                </p>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-bold uppercase mb-2">
                  Início do Protocolo
                </p>
                <p className="text-lg font-headline font-bold text-on-surface">
                  {formatDate(patient.startDate)}
                </p>
              </div>
            </div>
            {patient.notes && (
              <div className="mt-4 pt-4 border-t border-on-surface-variant/10">
                <p className="text-xs text-on-surface-variant font-bold uppercase mb-2">
                  Observações
                </p>
                <p className="text-on-surface">{patient.notes}</p>
              </div>
            )}
          </div>
        </section>

        {/* Next Consultation */}
        <section className="mb-8">
          <h2 className="text-xl font-headline font-bold mb-4 text-primary">
            Próxima Consulta
          </h2>
          <div className="glass-card rounded-2xl p-6 border border-primary/20 bg-primary/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-on-surface-variant font-bold uppercase mb-1">
                  Data
                </p>
                <p className="text-2xl font-headline font-bold text-primary">
                  {formatDate(patient.nextConsultation)}
                </p>
                <p className="text-sm text-on-surface-variant mt-1">
                  {diffDays === 0
                    ? 'Hoje'
                    : diffDays === 1
                      ? 'Amanhã'
                      : `em ${diffDays} dias`}
                </p>
              </div>
              <button className="px-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined">notifications</span>
                <span>Lembrar</span>
              </button>
            </div>
          </div>
        </section>

        {/* Payment Status */}
        <section>
          <h2 className="text-xl font-headline font-bold mb-4 text-primary">
            Status de Pagamento
          </h2>
          <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-on-surface-variant font-bold uppercase mb-1">
                  Status Atual
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span
                    className={`px-4 py-2 rounded-lg font-bold text-sm ${getPaymentStatusColor(
                      patient.paymentStatus
                    )}`}
                  >
                    {getPaymentStatusLabel(patient.paymentStatus)}
                  </span>
                  <div>
                    <p className="text-on-surface-variant text-sm">
                      R$ {patient.monthlyFee.toLocaleString('pt-BR')} / mês
                    </p>
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 border border-primary/30 text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors">
                Ver Histórico
              </button>
            </div>
          </div>
        </section>
      </main>

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
              pathname === '/pacientes' || pathname.startsWith('/pacientes/')
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
