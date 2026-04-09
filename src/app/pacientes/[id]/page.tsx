'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';

const MOCK_PATIENT = {
  id: 'patient-ricardo',
  name: 'Ricardo Mendes',
  email: 'ricardo.mendes@email.com',
  phone: '(11) 98765-4321',
  avatar: 'RM',
  age: 32,
  gender: 'M' as const,
  goal: 'Emagrecimento',
  status: 'active' as const,
  paymentStatus: 'paid' as const,
  monthlyFee: 450,
  nextConsultation: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  lastConsultation: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  adherence: 82,
  weight: 88.5,
  height: 178,
  bodyFat: 24.3,
  dietType: 'mathematical' as const,
  startDate: '2024-01-15',
  notes: 'Paciente muito dedicado. Ótima aderência ao protocolo. Progressão consistente nos últimos 3 meses.',
  weightHistory: [
    { date: '2024-01-15', value: 95.0 },
    { date: '2024-02-15', value: 92.5 },
    { date: '2024-03-15', value: 90.2 },
    { date: '2024-04-01', value: 89.0 },
    { date: '2024-04-08', value: 88.5 },
  ],
  bodyFatHistory: [
    { date: '2024-01-15', value: 28.5 },
    { date: '2024-02-15', value: 27.2 },
    { date: '2024-03-15', value: 25.8 },
    { date: '2024-04-01', value: 24.8 },
    { date: '2024-04-08', value: 24.3 },
  ],
  muscleMass: 66.4,
  waterPercentage: 62.1,
  visceralFat: 8,
  bmr: 1680,
  birthDate: '1992-03-15',
  cpf: '123.456.789-00',
  address: 'Rua das Flores, 123, Apt 45, São Paulo - SP',
  profession: 'Engenheiro de Software',
  maritalStatus: 'Casado',
  waistCircumference: 85.2,
  hipCircumference: 98.5,
  armCircumference: 30.2,
  thighCircumference: 55.3,
  calfCircumference: 38.1,
  physicalActivityLevel: 'Moderado',
  sleepHours: 7.5,
  consultationFrequency: 'Semanal',
  paymentMethod: 'PIX',
  dueDay: 15,
  exams: [
    { id: '1', type: 'Hemograma', date: '2024-04-01', status: 'OK' },
    { id: '2', type: 'Colesterol', date: '2024-04-01', status: 'OK' },
    { id: '3', type: 'Glicemia', date: '2024-03-15', status: 'OK' },
  ],
  paymentHistory: [
    { date: '2024-04-15', amount: 450, status: 'paid' as const },
    { date: '2024-03-15', amount: 450, status: 'paid' as const },
    { date: '2024-02-15', amount: 450, status: 'paid' as const },
  ],
  dietPlan: {
    name: 'Dieta Personalizada - Macros',
    template: 'Matemática',
    adherence: 82,
    targetCalories: 2100,
  },
};

interface TabConfig {
  id: string;
  label: string;
  icon: string;
}

const TABS: TabConfig[] = [
  { id: 'overview', label: 'Visão Geral', icon: 'dashboard' },
  { id: 'personal', label: 'Dados Pessoais', icon: 'person' },
  { id: 'anthropometric', label: 'Antropometria', icon: 'monitor_weight' },
  { id: 'diet', label: 'Dieta', icon: 'restaurant' },
  { id: 'exams', label: 'Exames', icon: 'description' },
  { id: 'financial', label: 'Financeiro', icon: 'payments' },
];

// SVG Body Visualization Component
function BodyVisualization({
  weight,
  height,
  bodyFat,
  waist,
  hip,
  arm,
  thigh,
  weightAdjustment,
}: {
  weight: number;
  height: number;
  bodyFat: number;
  waist: number;
  hip: number;
  arm: number;
  thigh: number;
  weightAdjustment: number;
}) {
  const adjustedWeight = weight + weightAdjustment;
  const scale = adjustedWeight / weight;

  // Color based on body fat percentage
  let fatColor = '#CCFF00'; // Green - healthy
  if (bodyFat > 25) fatColor = '#FFD700'; // Yellow - moderate
  if (bodyFat > 30) fatColor = '#FF7043'; // Red - high

  return (
    <svg viewBox="0 0 200 400" className="w-full h-96">
      {/* Head */}
      <circle cx="100" cy="40" r="20" fill={fatColor} opacity="0.9" />

      {/* Neck */}
      <rect x="95" y="58" width="10" height="15" fill={fatColor} opacity="0.85" />

      {/* Torso - Main body */}
      <path
        d={`M 70 75 Q 65 120 68 180 Q 100 190 132 180 Q 135 120 130 75 Z`}
        fill={fatColor}
        opacity="0.8"
      />

      {/* Arms */}
      <g>
        {/* Left Arm */}
        <ellipse cx="45" cy="110" rx={8 * scale} ry="35" fill={fatColor} opacity="0.75" />
        {/* Right Arm */}
        <ellipse cx="155" cy="110" rx={8 * scale} ry="35" fill={fatColor} opacity="0.75" />
      </g>

      {/* Legs */}
      <g>
        {/* Left Leg */}
        <rect x="80" y="180" width={16 * scale} height="90" rx="8" fill={fatColor} opacity="0.8" />
        {/* Right Leg */}
        <rect x="104" y="180" width={16 * scale} height="90" rx="8" fill={fatColor} opacity="0.8" />
      </g>

      {/* Measurement Labels */}
      <text
        x="50"
        y="120"
        fontSize="11"
        fill="#E5E2E1"
        textAnchor="middle"
        className="font-bold"
      >
        {arm.toFixed(0)}cm
      </text>
      <text
        x="100"
        y="160"
        fontSize="11"
        fill="#E5E2E1"
        textAnchor="middle"
        className="font-bold"
      >
        {waist.toFixed(0)}cm
      </text>
      <text
        x="100"
        y="280"
        fontSize="11"
        fill="#E5E2E1"
        textAnchor="middle"
        className="font-bold"
      >
        {thigh.toFixed(0)}cm
      </text>
    </svg>
  );
}

export default function PatientProfilePage() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const { patients } = useApp();
  const patientId = params.id as string;
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [weightAdjustment, setWeightAdjustment] = useState<number>(0);

  const patient = useMemo(() => {
    const found = patients.find((p) => p.id === patientId);
    return found || MOCK_PATIENT;
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

  const weightLoss =
    patient.weightHistory.length > 0 ? patient.weightHistory[0].value - patient.weight : 0;

  const bodyFatLoss =
    patient.bodyFatHistory.length > 0 ? patient.bodyFatHistory[0].value - patient.bodyFat : 0;

  const nextConsultationDate = new Date(patient.nextConsultation);
  const today = new Date();
  const diffTime = nextConsultationDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-on-surface-variant/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/pacientes"
            className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-bold">Voltar</span>
          </Link>
          <h1 className="flex-1 text-xl font-headline font-bold">{patient.name}</h1>
          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/pacientes/novo?edit=${patientId}`)}
              className="px-4 py-2 border border-primary/30 text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-2 text-sm"
            >
              <span className="material-symbols-outlined text-lg">edit</span>
              Editar
            </button>
            <button className="px-4 py-2 bg-primary/20 border border-primary/40 text-primary font-bold rounded-lg hover:bg-primary/30 transition-colors flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-lg">restaurant_menu</span>
              Prescrever
            </button>
            <button className="px-4 py-2 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-lg">event</span>
              Agendar
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="glass-card rounded-2xl p-8 border border-on-surface-variant/10">
            <div className="flex items-start gap-8 mb-6">
              <div className="w-32 h-32 rounded-full bg-accent flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-5xl font-headline font-bold text-background">
                  {patient.avatar}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h2 className="text-2xl font-headline font-bold text-on-surface">
                    {patient.name}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(patient.status)}`}>
                    {getStatusLabel(patient.status)}
                  </span>
                </div>
                <p className="text-on-surface-variant mb-2">
                  {patient.age} anos • {patient.gender === 'M' ? 'Masculino' : 'Feminino'}
                </p>
                <p className="text-primary font-bold">{patient.goal}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-5 gap-4">
              <div className="bg-surface-highest/50 rounded-lg p-4 text-center">
                <p className="text-xs text-on-surface-variant mb-1 font-bold">PESO</p>
                <p className="text-2xl font-headline font-bold text-primary">
                  {patient.weight.toFixed(1)}
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  {weightLoss > 0 ? '-' : '+'}{Math.abs(weightLoss).toFixed(1)} kg
                </p>
              </div>
              <div className="bg-surface-highest/50 rounded-lg p-4 text-center">
                <p className="text-xs text-on-surface-variant mb-1 font-bold">GORDURA</p>
                <p className="text-2xl font-headline font-bold text-primary">
                  {patient.bodyFat.toFixed(1)}%
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  {bodyFatLoss > 0 ? '-' : '+'}{Math.abs(bodyFatLoss).toFixed(1)}%
                </p>
              </div>
              <div className="bg-surface-highest/50 rounded-lg p-4 text-center">
                <p className="text-xs text-on-surface-variant mb-1 font-bold">MASSA MAGRA</p>
                <p className="text-2xl font-headline font-bold text-primary">
                  {patient.muscleMass.toFixed(1)}
                </p>
                <p className="text-xs text-on-surface-variant mt-1">kg</p>
              </div>
              <div className="bg-surface-highest/50 rounded-lg p-4 text-center">
                <p className="text-xs text-on-surface-variant mb-1 font-bold">TMB</p>
                <p className="text-2xl font-headline font-bold text-primary">
                  {patient.bmr}
                </p>
                <p className="text-xs text-on-surface-variant mt-1">kcal</p>
              </div>
              <div className="bg-surface-highest/50 rounded-lg p-4 text-center">
                <p className="text-xs text-on-surface-variant mb-1 font-bold">IMC</p>
                <p className="text-2xl font-headline font-bold text-primary">
                  {(patient.weight / Math.pow(patient.height / 100, 2)).toFixed(1)}
                </p>
                <p className="text-xs text-on-surface-variant mt-1">kg/m²</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-on-surface-variant/10 overflow-x-auto">
          <div className="flex gap-1 min-w-min">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-primary border-primary'
                    : 'text-on-surface-variant border-transparent hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-12">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Evolution Charts */}
              <div className="grid grid-cols-2 gap-6">
                {/* Weight History Chart */}
                <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
                  <h3 className="font-bold text-on-surface mb-4">Histórico de Peso</h3>
                  <div className="relative overflow-hidden">
                    <svg
                      className="w-full h-48"
                      viewBox="0 0 300 150"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <line x1="30" y1="10" x2="30" y2="130" stroke="#444933" strokeWidth="1" />
                      <line x1="30" y1="130" x2="290" y2="130" stroke="#444933" strokeWidth="1" />
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
                      {patient.weightHistory.map((item, idx) => {
                        const x = 30 + (idx / (patient.weightHistory.length - 1)) * 260;
                        const minWeight = Math.min(...patient.weightHistory.map((w) => w.value));
                        const maxWeight = Math.max(...patient.weightHistory.map((w) => w.value));
                        const range = maxWeight - minWeight || 1;
                        const y = 130 - ((item.value - minWeight) / range) * 110;
                        return <circle key={idx} cx={x} cy={y} r="3" fill="#CCFF00" />;
                      })}
                    </svg>
                  </div>
                  <div className="mt-4 pt-4 border-t border-on-surface-variant/10">
                    <p className="text-xs text-on-surface-variant">
                      {patient.weightHistory.length > 0 &&
                        formatDate(patient.weightHistory[0].date)}{' '}
                      → {formatDate(new Date().toISOString())}
                    </p>
                  </div>
                </div>

                {/* Body Fat History Chart */}
                <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
                  <h3 className="font-bold text-on-surface mb-4">Histórico de Gordura Corporal</h3>
                  <div className="relative overflow-hidden">
                    <svg
                      className="w-full h-48"
                      viewBox="0 0 300 150"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <line x1="30" y1="10" x2="30" y2="130" stroke="#444933" strokeWidth="1" />
                      <line x1="30" y1="130" x2="290" y2="130" stroke="#444933" strokeWidth="1" />
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
                      {patient.bodyFatHistory.map((item, idx) => {
                        const x = 30 + (idx / (patient.bodyFatHistory.length - 1)) * 260;
                        const minBF = Math.min(...patient.bodyFatHistory.map((bf) => bf.value));
                        const maxBF = Math.max(...patient.bodyFatHistory.map((bf) => bf.value));
                        const range = maxBF - minBF || 1;
                        const y = 130 - ((item.value - minBF) / range) * 110;
                        return <circle key={idx} cx={x} cy={y} r="3" fill="#C4C9AC" />;
                      })}
                    </svg>
                  </div>
                  <div className="mt-4 pt-4 border-t border-on-surface-variant/10">
                    <p className="text-xs text-on-surface-variant">
                      {patient.bodyFatHistory.length > 0 &&
                        formatDate(patient.bodyFatHistory[0].date)}{' '}
                      → {formatDate(new Date().toISOString())}
                    </p>
                  </div>
                </div>
              </div>

              {/* Last Consultation & Next Consultation */}
              <div className="grid grid-cols-2 gap-6">
                <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
                  <h3 className="font-bold text-on-surface mb-4">Última Consulta</h3>
                  <p className="text-sm text-on-surface-variant mb-2">Data:</p>
                  <p className="text-lg font-headline font-bold text-primary mb-4">
                    {formatDate(patient.lastConsultation)}
                  </p>
                  <p className="text-sm text-on-surface">{patient.notes}</p>
                </div>

                <div className="glass-card rounded-2xl p-6 border border-primary/20 bg-primary/5">
                  <h3 className="font-bold text-on-surface mb-4">Próxima Consulta</h3>
                  <p className="text-2xl font-headline font-bold text-primary mb-2">
                    {formatDate(patient.nextConsultation)}
                  </p>
                  <p className="text-sm text-on-surface-variant mb-4">
                    {diffDays === 0
                      ? 'Hoje'
                      : diffDays === 1
                        ? 'Amanhã'
                        : `em ${diffDays} dias`}
                  </p>
                  <button className="w-full px-4 py-2 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">notifications</span>
                    <span>Lembrar</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Personal Data Tab */}
          {activeTab === 'personal' && (
            <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">
                    Email
                  </p>
                  <p className="text-on-surface">{patient.email}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">
                    Telefone
                  </p>
                  <p className="text-on-surface">{patient.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">
                    CPF
                  </p>
                  <p className="text-on-surface">{patient.cpf}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">
                    Data de Nascimento
                  </p>
                  <p className="text-on-surface">{formatDate(patient.birthDate)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">
                    Profissão
                  </p>
                  <p className="text-on-surface">{patient.profession}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">
                    Estado Civil
                  </p>
                  <p className="text-on-surface">{patient.maritalStatus}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">
                  Endereço
                </p>
                <p className="text-on-surface">{patient.address}</p>
              </div>
            </div>
          )}

          {/* Anthropometric Tab */}
          {activeTab === 'anthropometric' && (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
                <h3 className="font-bold text-on-surface mb-6">Visualização do Corpo</h3>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <BodyVisualization
                      weight={patient.weight}
                      height={patient.height}
                      bodyFat={patient.bodyFat}
                      waist={patient.waistCircumference}
                      hip={patient.hipCircumference}
                      arm={patient.armCircumference}
                      thigh={patient.thighCircumference}
                      weightAdjustment={weightAdjustment}
                    />
                  </div>

                  <div className="col-span-2">
                    <div className="bg-surface-highest rounded-xl p-6 mb-6">
                      <h4 className="font-bold text-on-surface mb-4">Simular Ajuste de Peso</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setWeightAdjustment(Math.max(-5, weightAdjustment - 1))}
                            className="px-3 py-2 bg-error text-on-primary font-bold rounded-lg hover:bg-error/90 transition-colors"
                          >
                            -1kg
                          </button>
                          <div className="flex-1">
                            <input
                              type="range"
                              min="-5"
                              max="5"
                              step="0.5"
                              value={weightAdjustment}
                              onChange={(e) => setWeightAdjustment(parseFloat(e.target.value))}
                              className="w-full accent-primary"
                            />
                          </div>
                          <button
                            onClick={() => setWeightAdjustment(Math.min(5, weightAdjustment + 1))}
                            className="px-3 py-2 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors"
                          >
                            +1kg
                          </button>
                        </div>
                        <p className="text-center text-sm text-on-surface-variant">
                          Simulação: {weightAdjustment > 0 ? '+' : ''}{weightAdjustment.toFixed(1)} kg
                          (Total: {(patient.weight + weightAdjustment).toFixed(1)} kg)
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-surface-highest rounded-lg p-4">
                        <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">
                          Cintura
                        </p>
                        <p className="text-2xl font-headline font-bold text-primary">
                          {patient.waistCircumference.toFixed(1)}
                        </p>
                        <p className="text-xs text-on-surface-variant mt-1">cm</p>
                      </div>
                      <div className="bg-surface-highest rounded-lg p-4">
                        <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">
                          Quadril
                        </p>
                        <p className="text-2xl font-headline font-bold text-primary">
                          {patient.hipCircumference.toFixed(1)}
                        </p>
                        <p className="text-xs text-on-surface-variant mt-1">cm</p>
                      </div>
                      <div className="bg-surface-highest rounded-lg p-4">
                        <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">
                          Braço
                        </p>
                        <p className="text-2xl font-headline font-bold text-primary">
                          {patient.armCircumference.toFixed(1)}
                        </p>
                        <p className="text-xs text-on-surface-variant mt-1">cm</p>
                      </div>
                      <div className="bg-surface-highest rounded-lg p-4">
                        <p className="text-xs font-bold text-on-surface-variant uppercase mb-2">
                          Coxa
                        </p>
                        <p className="text-2xl font-headline font-bold text-primary">
                          {patient.thighCircumference.toFixed(1)}
                        </p>
                        <p className="text-xs text-on-surface-variant mt-1">cm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
                <h3 className="font-bold text-on-surface mb-6">Dados de Bioimpedância</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-surface-highest/50 rounded-lg p-4">
                    <p className="text-xs text-on-surface-variant font-bold mb-2">MASSA MAGRA</p>
                    <p className="text-2xl font-headline font-bold text-primary">
                      {patient.muscleMass.toFixed(1)}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-2">kg</p>
                  </div>
                  <div className="bg-surface-highest/50 rounded-lg p-4">
                    <p className="text-xs text-on-surface-variant font-bold mb-2">ÁGUA CORPORAL</p>
                    <p className="text-2xl font-headline font-bold text-primary">
                      {patient.waterPercentage.toFixed(1)}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-2">%</p>
                  </div>
                  <div className="bg-surface-highest/50 rounded-lg p-4">
                    <p className="text-xs text-on-surface-variant font-bold mb-2">GORDURA VISCERAL</p>
                    <p className="text-2xl font-headline font-bold text-primary">
                      {patient.visceralFat}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-2">nível</p>
                  </div>
                  <div className="bg-surface-highest/50 rounded-lg p-4">
                    <p className="text-xs text-on-surface-variant font-bold mb-2">IMC</p>
                    <p className="text-2xl font-headline font-bold text-primary">
                      {(patient.weight / Math.pow(patient.height / 100, 2)).toFixed(1)}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-2">kg/m²</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Diet Tab */}
          {activeTab === 'diet' && (
            <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-xs text-on-surface-variant font-bold uppercase mb-2">
                    Plano Atual
                  </p>
                  <p className="text-lg font-headline font-bold text-on-surface">
                    {patient.dietPlan?.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant font-bold uppercase mb-2">
                    Tipo de Abordagem
                  </p>
                  <p className="text-lg font-headline font-bold text-on-surface">
                    {getDietTypeLabel(patient.dietType)}
                  </p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-surface-highest rounded-lg">
                <p className="text-xs text-on-surface-variant font-bold uppercase mb-3">
                  Aderência
                </p>
                <div className="w-full bg-surface rounded-full h-3 overflow-hidden mb-2">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${patient.dietPlan?.adherence}%` }}
                  />
                </div>
                <p className="text-sm font-bold text-primary">{patient.dietPlan?.adherence}%</p>
              </div>

              <div className="mb-6">
                <p className="text-xs text-on-surface-variant font-bold uppercase mb-2">
                  Calorias Alvo
                </p>
                <p className="text-2xl font-headline font-bold text-primary">
                  {patient.dietPlan?.targetCalories}
                </p>
                <p className="text-sm text-on-surface-variant">kcal/dia</p>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">edit</span>
                  Modificar Dieta
                </button>
                <button className="flex-1 px-6 py-3 border border-primary/30 text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors">
                  Ver Detalhes
                </button>
              </div>
            </div>
          )}

          {/* Exams Tab */}
          {activeTab === 'exams' && (
            <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
              <div className="mb-6">
                <button className="px-6 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined">upload</span>
                  Enviar Novo Exame
                </button>
              </div>

              <div className="space-y-3">
                {patient.exams?.map((exam) => (
                  <div key={exam.id} className="flex items-center gap-4 p-4 bg-surface-highest rounded-lg">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary">description</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-on-surface">{exam.type}</p>
                      <p className="text-xs text-on-surface-variant">{formatDate(exam.date)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary">
                        {exam.status}
                      </span>
                      <button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors">
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Financial Tab */}
          {activeTab === 'financial' && (
            <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
              <div className="mb-6">
                <p className="text-xs text-on-surface-variant font-bold uppercase mb-2">
                  Status Atual
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-4 py-2 rounded-lg font-bold text-sm ${getPaymentStatusColor(patient.paymentStatus)}`}>
                    {getPaymentStatusLabel(patient.paymentStatus)}
                  </span>
                  <div>
                    <p className="text-on-surface-variant text-sm">
                      R$ {patient.monthlyFee.toLocaleString('pt-BR')} / mês
                    </p>
                  </div>
                </div>
                <button className="px-6 py-2 border border-primary/30 text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors">
                  Enviar Lembrete
                </button>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-on-surface mb-4">Histórico de Pagamentos</h3>
                <div className="space-y-2">
                  {patient.paymentHistory?.map((payment, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-surface-highest rounded-lg">
                      <div>
                        <p className="text-sm font-bold text-on-surface">{formatDate(payment.date)}</p>
                        <p className="text-xs text-on-surface-variant">
                          R$ {payment.amount.toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPaymentStatusColor(payment.status)}`}>
                        {getPaymentStatusLabel(payment.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
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
              pathname.includes('/pacientes')
                ? 'text-primary border-b-2 border-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">people</span>
            <span>Pacientes</span>
          </Link>
          <Link
            href="/dieta"
            className={`flex items-center gap-2 transition-colors ${
              pathname === '/dieta'
                ? 'text-primary border-b-2 border-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">restaurant_menu</span>
            <span>Dieta</span>
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
            href="/mais"
            className={`flex items-center gap-2 transition-colors ${
              pathname === '/mais'
                ? 'text-primary border-b-2 border-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">more_horiz</span>
            <span>Mais</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
