'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/AppContext';

interface FormData {
  // Personal Data
  fullName: string;
  cpf: string;
  birthDate: string;
  gender: 'M' | 'F' | 'Outro';
  email: string;
  phone: string;
  address: string;
  profession: string;
  maritalStatus: string;
  photo: File | null;

  // Anthropometric Data
  weight: number;
  height: number;
  waistCircumference: number;
  hipCircumference: number;
  armCircumference: number;
  thighCircumference: number;
  calfCircumference: number;
  bodyFatSkinfolds: number;
  bodyFatBioimpedance: number;
  muscleMass: number;
  waterPercentage: number;
  visceralFat: number;
  basalMetabolicRate: number;

  // Goal and History
  mainGoal: string;
  approachType: 'mathematical' | 'intuitive' | 'behavioral';
  healthHistory: string;
  allergies: string[];
  dietaryRestrictions: string[];
  physicalActivityLevel: string;
  sleepHours: number;

  // Exams
  uploadedExams: Array<{ file: File; type: string; date: string }>;

  // Financial Data
  monthlyValue: number;
  dueDay: number;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';

  // Plan and Consultations
  startDate: string;
  consultationFrequency: string;
  nextConsultation: string;
  professionalNotes: string;
}

interface TabConfig {
  id: string;
  label: string;
  icon: string;
}

const TABS: TabConfig[] = [
  { id: 'personal', label: 'Dados Pessoais', icon: 'person' },
  { id: 'anthropometric', label: 'Antropometria', icon: 'monitor_weight' },
  { id: 'goal', label: 'Objetivo e Histórico', icon: 'target' },
  { id: 'exams', label: 'Exames', icon: 'description' },
  { id: 'financial', label: 'Financeiro', icon: 'payments' },
  { id: 'plan', label: 'Plano e Consultas', icon: 'calendar_today' },
];

function NewPatientPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editPatientId = searchParams.get('edit');
  const { addPatient, updatePatient, getPatientById } = useApp();
  const [activeTab, setActiveTab] = useState<string>('personal');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showAvatarToast, setShowAvatarToast] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    cpf: '',
    birthDate: '',
    gender: 'M',
    email: '',
    phone: '',
    address: '',
    profession: '',
    maritalStatus: '',
    photo: null,
    weight: 0,
    height: 0,
    waistCircumference: 0,
    hipCircumference: 0,
    armCircumference: 0,
    thighCircumference: 0,
    calfCircumference: 0,
    bodyFatSkinfolds: 0,
    bodyFatBioimpedance: 0,
    muscleMass: 0,
    waterPercentage: 0,
    visceralFat: 0,
    basalMetabolicRate: 0,
    mainGoal: 'Saúde',
    approachType: 'mathematical',
    healthHistory: '',
    allergies: [],
    dietaryRestrictions: [],
    physicalActivityLevel: 'Leve',
    sleepHours: 7,
    uploadedExams: [],
    monthlyValue: 0,
    dueDay: 1,
    paymentMethod: 'PIX',
    paymentStatus: 'pending',
    startDate: new Date().toISOString().split('T')[0],
    consultationFrequency: 'Semanal',
    nextConsultation: '',
    professionalNotes: '',
  });

  // Load patient data if in edit mode
  useEffect(() => {
    if (editPatientId) {
      setIsEditMode(true);
      const patient = getPatientById(editPatientId);
      if (patient) {
        setFormData({
          fullName: patient.name || '',
          cpf: patient.cpf || '',
          birthDate: patient.birthDate || '',
          gender: patient.gender || 'M',
          email: patient.email || '',
          phone: patient.phone || '',
          address: patient.address || '',
          profession: patient.profession || '',
          maritalStatus: patient.maritalStatus || '',
          photo: null,
          weight: patient.weight || 0,
          height: patient.height || 0,
          waistCircumference: patient.waistCircumference || 0,
          hipCircumference: patient.hipCircumference || 0,
          armCircumference: patient.armCircumference || 0,
          thighCircumference: patient.thighCircumference || 0,
          calfCircumference: patient.calfCircumference || 0,
          bodyFatSkinfolds: (patient.bodyFat || 0) / 2,
          bodyFatBioimpedance: (patient.bodyFat || 0) / 2,
          muscleMass: patient.muscleMass || 0,
          waterPercentage: patient.waterPercentage || 0,
          visceralFat: patient.visceralFat || 0,
          basalMetabolicRate: patient.bmr || 1500,
          mainGoal: patient.goal || 'Saúde',
          approachType: (patient.dietType || 'mathematical') as 'mathematical' | 'intuitive' | 'behavioral',
          healthHistory: patient.healthHistory || '',
          allergies: patient.allergies || [],
          dietaryRestrictions: patient.restrictions || [],
          physicalActivityLevel:
            patient.activityLevel === 'sedentary' ? 'Sedentário' :
            patient.activityLevel === 'light' ? 'Leve' :
            patient.activityLevel === 'moderate' ? 'Moderado' :
            patient.activityLevel === 'intense' ? 'Intenso' :
            'Leve',
          sleepHours: patient.sleepHours || 7,
          uploadedExams: [],
          monthlyValue: patient.monthlyFee || 0,
          dueDay: 1,
          paymentMethod: 'PIX',
          paymentStatus: (patient.paymentStatus as 'paid' | 'pending' | 'overdue') || 'pending',
          startDate: patient.startDate || new Date().toISOString().split('T')[0],
          consultationFrequency:
            patient.consultationFrequency === 'weekly' ? 'Semanal' :
            patient.consultationFrequency === 'biweekly' ? 'Quinzenal' :
            patient.consultationFrequency === 'monthly' ? 'Mensal' :
            'Semanal',
          nextConsultation: patient.nextConsultation || '',
          professionalNotes: patient.notes || '',
        });
        // Load existing avatar if available
        if (patient.avatarUrl) {
          setAvatarPreview(patient.avatarUrl);
        }
      }
    }
  }, [editPatientId, getPatientById]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('Value') || name.includes('Hours') || name === 'dueDay'
        ? parseFloat(value) || 0
        : value,
    }));
  };

  const handleNumberInput = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value ? parseFloat(value) : 0,
    }));
  };

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      // Convert to base64 for preview and persistence
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    // Open file picker directly instead of showing toast
    fileInputRef.current?.click();
  };

  const getAvatarInitials = () => {
    return formData.fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleExamUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const examType = (document.getElementById('examType') as HTMLSelectElement)?.value || 'Outros';
      const examDate =
        (document.getElementById('examDate') as HTMLInputElement)?.value || new Date().toISOString().split('T')[0];

      setFormData((prev) => ({
        ...prev,
        uploadedExams: [...prev.uploadedExams, { file, type: examType, date: examDate }],
      }));
    }
  };

  const removeExam = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      uploadedExams: prev.uploadedExams.filter((_, i) => i !== index),
    }));
  };

  const toggleAllergy = (allergy: string) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy],
    }));
  };

  const toggleDietaryRestriction = (restriction: string) => {
    setFormData((prev) => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter((r) => r !== restriction)
        : [...prev.dietaryRestrictions, restriction],
    }));
  };

  const calculateIMC = () => {
    if (formData.height && formData.weight) {
      const heightM = formData.height / 100;
      return (formData.weight / (heightM * heightM)).toFixed(1);
    }
    return 'N/A';
  };

  const handleSave = async () => {
    if (!formData.fullName || !formData.email || !formData.weight || !formData.height) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const patientData = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      avatar: getAvatarInitials(),
      avatarUrl: avatarPreview || undefined,
      age: new Date().getFullYear() - new Date(formData.birthDate).getFullYear(),
      gender: formData.gender as 'M' | 'F',
      goal: formData.mainGoal,
      status: 'active' as const,
      paymentStatus: formData.paymentStatus,
      monthlyFee: formData.monthlyValue,
      nextConsultation: formData.nextConsultation || new Date().toISOString(),
      lastConsultation: new Date().toISOString(),
      adherence: 75,
      weight: formData.weight,
      height: formData.height,
      bodyFat: (formData.bodyFatSkinfolds + formData.bodyFatBioimpedance) / 2,
      dietType: formData.approachType,
      startDate: formData.startDate,
      notes: formData.professionalNotes,
      weightHistory: [{ date: new Date().toISOString(), value: formData.weight }],
      bodyFatHistory: [
        {
          date: new Date().toISOString(),
          value: (formData.bodyFatSkinfolds + formData.bodyFatBioimpedance) / 2,
        },
      ],
      muscleMass: formData.muscleMass,
      waterPercentage: formData.waterPercentage,
      visceralFat: formData.visceralFat,
      bmr: formData.basalMetabolicRate || 1500,
      cpf: formData.cpf || '',
      address: formData.address || '',
      profession: formData.profession || '',
      maritalStatus: formData.maritalStatus || '',
      birthDate: formData.birthDate,
      waistCircumference: formData.waistCircumference || 0,
      hipCircumference: formData.hipCircumference || 0,
      armCircumference: formData.armCircumference || 0,
      thighCircumference: formData.thighCircumference || 0,
      calfCircumference: formData.calfCircumference || 0,
      healthHistory: formData.healthHistory || '',
      allergies: Array.isArray(formData.allergies) ? formData.allergies : (formData.allergies ? String(formData.allergies).split(',').map((a: string) => a.trim()) : []),
      restrictions: formData.dietaryRestrictions || [],
      activityLevel: (formData.physicalActivityLevel === 'Sedentário' ? 'sedentary' : formData.physicalActivityLevel === 'Leve' ? 'light' : formData.physicalActivityLevel === 'Moderado' ? 'moderate' : formData.physicalActivityLevel === 'Intenso' ? 'intense' : 'moderate') as 'sedentary' | 'light' | 'moderate' | 'intense' | 'very_intense',
      sleepHours: formData.sleepHours || 7,
      consultationFrequency: (formData.consultationFrequency || 'biweekly') as 'weekly' | 'biweekly' | 'monthly',
    };

    if (isEditMode && editPatientId) {
      // Update existing patient
      updatePatient(editPatientId, patientData);
      router.push(`/pacientes/${editPatientId}`);
    } else {
      // Create new patient
      const newPatient = {
        id: `patient-${Date.now()}`,
        ...patientData,
      };
      addPatient(newPatient);
      router.push(`/pacientes/${newPatient.id}`);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background text-on-surface pb-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-on-surface-variant/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            href="/pacientes"
            className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm font-bold">Voltar</span>
          </Link>
          <h1 className="flex-1 text-xl font-headline font-bold">
            {isEditMode ? 'Editar Paciente' : 'Novo Paciente'}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-6 max-w-5xl mx-auto">
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
          {/* Personal Data Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
                <h2 className="text-lg font-headline font-bold mb-6 text-primary">
                  Informações Pessoais
                </h2>

                {/* Avatar Display with Camera Icon */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-on-surface-variant mb-3">
                    Avatar do Paciente
                  </label>
                  <div className="flex items-center gap-6">
                    {/* Avatar Circle */}
                    <div className="relative w-24 h-24">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary/60 border-3 border-primary flex items-center justify-center relative">
                        {avatarPreview ? (
                          <div className="w-full h-full rounded-full overflow-hidden">
                            <img
                              src={avatarPreview}
                              alt="Patient Avatar"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : formData.fullName ? (
                          <span className="text-2xl font-bold text-on-primary">
                            {getAvatarInitials()}
                          </span>
                        ) : (
                          <span className="material-symbols-outlined text-3xl text-on-primary">
                            person
                          </span>
                        )}
                      </div>
                      {/* Camera Icon Overlay */}
                      <button
                        onClick={handleAvatarClick}
                        className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary hover:bg-primary/90 border-2 border-background flex items-center justify-center transition-colors cursor-pointer"
                        title="Upload de avatar em breve"
                      >
                        <span className="material-symbols-outlined text-sm text-on-primary">
                          camera
                        </span>
                      </button>
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 border border-primary/30 text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined">upload</span>
                      Enviar Foto
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Avatar Upload Toast */}
                {showAvatarToast && (
                  <div className="mb-6 p-4 bg-primary/20 border border-primary/40 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <span className="material-symbols-outlined text-primary">
                      info
                    </span>
                    <span className="text-sm font-medium text-on-surface">
                      Upload de avatar em breve
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Ex: Ricardo Mendes"
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      CPF
                    </label>
                    <input
                      type="text"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      placeholder="000.000.000-00"
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Sexo
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="paciente@email.com"
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Telefone (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(11) 99999-9999"
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-on-surface-variant mb-2">
                    Endereço
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Rua, número, complemento, cidade, estado"
                    className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Profissão
                    </label>
                    <input
                      type="text"
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      placeholder="Ex: Engenheiro"
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Estado Civil
                    </label>
                    <select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="">Selecione</option>
                      <option value="Solteiro">Solteiro</option>
                      <option value="Casado">Casado</option>
                      <option value="Divorciado">Divorciado</option>
                      <option value="Viúvo">Viúvo</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Anthropometric Data Tab */}
          {activeTab === 'anthropometric' && (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
                <h2 className="text-lg font-headline font-bold mb-6 text-primary">
                  Dados Antropométricos
                </h2>

                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Peso Atual (kg) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.weight || ''}
                      onChange={(e) => handleNumberInput('weight', e.target.value)}
                      placeholder="0"
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Altura (cm) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.height || ''}
                      onChange={(e) => handleNumberInput('height', e.target.value)}
                      placeholder="0"
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      IMC (calculado)
                    </label>
                    <div className="w-full bg-surface-highest rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 flex items-center">
                      <span className="font-bold text-primary">{calculateIMC()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-highest rounded-xl p-4 mb-6">
                  <h3 className="font-bold text-on-surface mb-4">Circunferências (cm)</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-2">
                        Cintura
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.waistCircumference || ''}
                        onChange={(e) => handleNumberInput('waistCircumference', e.target.value)}
                        className="w-full bg-surface rounded-lg px-3 py-2 text-sm text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-2">
                        Quadril
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.hipCircumference || ''}
                        onChange={(e) => handleNumberInput('hipCircumference', e.target.value)}
                        className="w-full bg-surface rounded-lg px-3 py-2 text-sm text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-2">
                        Braço
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.armCircumference || ''}
                        onChange={(e) => handleNumberInput('armCircumference', e.target.value)}
                        className="w-full bg-surface rounded-lg px-3 py-2 text-sm text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-2">
                        Coxa
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.thighCircumference || ''}
                        onChange={(e) => handleNumberInput('thighCircumference', e.target.value)}
                        className="w-full bg-surface rounded-lg px-3 py-2 text-sm text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-2">
                        Panturrilha
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.calfCircumference || ''}
                        onChange={(e) => handleNumberInput('calfCircumference', e.target.value)}
                        className="w-full bg-surface rounded-lg px-3 py-2 text-sm text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-surface-highest rounded-xl p-4 mb-6">
                  <h3 className="font-bold text-on-surface mb-4">% Gordura Corporal</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-2">
                        Dobras Cutâneas (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.bodyFatSkinfolds || ''}
                        onChange={(e) => handleNumberInput('bodyFatSkinfolds', e.target.value)}
                        className="w-full bg-surface rounded-lg px-3 py-2 text-sm text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-2">
                        Bioimpedância (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.bodyFatBioimpedance || ''}
                        onChange={(e) => handleNumberInput('bodyFatBioimpedance', e.target.value)}
                        className="w-full bg-surface rounded-lg px-3 py-2 text-sm text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Massa Magra (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.muscleMass || ''}
                      onChange={(e) => handleNumberInput('muscleMass', e.target.value)}
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Água Corporal (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.waterPercentage || ''}
                      onChange={(e) => handleNumberInput('waterPercentage', e.target.value)}
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Gordura Visceral (1-20)
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="1"
                      max="20"
                      value={formData.visceralFat || ''}
                      onChange={(e) => handleNumberInput('visceralFat', e.target.value)}
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      TMB (kcal)
                    </label>
                    <input
                      type="number"
                      step="1"
                      value={formData.basalMetabolicRate || ''}
                      onChange={(e) => handleNumberInput('basalMetabolicRate', e.target.value)}
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Goal and History Tab */}
          {activeTab === 'goal' && (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
                <h2 className="text-lg font-headline font-bold mb-6 text-primary">
                  Objetivo e Histórico
                </h2>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Objetivo Principal
                    </label>
                    <select
                      name="mainGoal"
                      value={formData.mainGoal}
                      onChange={handleInputChange}
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="Emagrecimento">Emagrecimento</option>
                      <option value="Hipertrofia">Hipertrofia</option>
                      <option value="Saúde">Saúde</option>
                      <option value="Performance">Performance</option>
                      <option value="Manutenção">Manutenção</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Tipo de Abordagem
                    </label>
                    <div className="space-y-2">
                      {['mathematical', 'intuitive', 'behavioral'].map((type) => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="approachType"
                            value={type}
                            checked={formData.approachType === type}
                            onChange={handleInputChange}
                            className="w-4 h-4 accent-primary"
                          />
                          <span className="text-sm text-on-surface">
                            {type === 'mathematical'
                              ? 'Matemática'
                              : type === 'intuitive'
                                ? 'Intuitiva'
                                : 'Comportamental'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-on-surface-variant mb-2">
                    Histórico de Saúde
                  </label>
                  <textarea
                    name="healthHistory"
                    value={formData.healthHistory}
                    onChange={handleInputChange}
                    placeholder="Doenças, cirurgias, medicamentos..."
                    rows={4}
                    className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-on-surface-variant mb-2">
                    Restrições Alimentares
                  </label>
                  <div className="space-y-2">
                    {['Vegetariano', 'Vegano', 'Sem glúten', 'Sem lactose', 'Kosher', 'Halal'].map(
                      (restriction) => (
                        <label key={restriction} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.dietaryRestrictions.includes(restriction)}
                            onChange={() => toggleDietaryRestriction(restriction)}
                            className="w-4 h-4 rounded accent-primary"
                          />
                          <span className="text-sm text-on-surface">{restriction}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Atividade Física Atual
                    </label>
                    <select
                      name="physicalActivityLevel"
                      value={formData.physicalActivityLevel}
                      onChange={handleInputChange}
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="Sedentário">Sedentário</option>
                      <option value="Leve">Leve</option>
                      <option value="Moderado">Moderado</option>
                      <option value="Intenso">Intenso</option>
                      <option value="Muito intenso">Muito intenso</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Horas de Sono por Noite
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.sleepHours || ''}
                      onChange={(e) => handleNumberInput('sleepHours', e.target.value)}
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Exams Tab */}
          {activeTab === 'exams' && (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
                <h2 className="text-lg font-headline font-bold mb-6 text-primary">
                  Importar Exames
                </h2>

                <div className="mb-6">
                  <div className="border-2 border-dashed border-primary/40 rounded-xl p-8 text-center hover:bg-primary/5 transition-colors cursor-pointer mb-6">
                    <input
                      type="file"
                      id="examFile"
                      onChange={handleExamUpload}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                    <label htmlFor="examFile" className="cursor-pointer block">
                      <div className="flex flex-col items-center gap-3">
                        <span className="material-symbols-outlined text-3xl text-primary">
                          upload_file
                        </span>
                        <div>
                          <p className="text-on-surface font-bold">Clique para enviar ou arraste</p>
                          <p className="text-sm text-on-surface-variant">PDF ou Imagem (JPG, PNG)</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-bold text-on-surface-variant mb-2">
                        Tipo de Exame
                      </label>
                      <select
                        id="examType"
                        className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                      >
                        <option value="Hemograma">Hemograma</option>
                        <option value="Colesterol">Colesterol</option>
                        <option value="Glicemia">Glicemia</option>
                        <option value="Hormonal">Hormonal</option>
                        <option value="Bioimpedância">Bioimpedância</option>
                        <option value="Outros">Outros</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-on-surface-variant mb-2">
                        Data do Exame
                      </label>
                      <input
                        type="date"
                        id="examDate"
                        className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {formData.uploadedExams.length > 0 && (
                  <div>
                    <h3 className="font-bold text-on-surface mb-4">Exames Enviados</h3>
                    <div className="space-y-3">
                      {formData.uploadedExams.map((exam, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-4 bg-surface-highest rounded-lg"
                        >
                          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-primary">
                              {exam.file.type.includes('pdf') ? 'picture_as_pdf' : 'image'}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-on-surface truncate">{exam.file.name}</p>
                            <p className="text-xs text-on-surface-variant">
                              {exam.type} • {exam.date}
                            </p>
                          </div>
                          <button
                            onClick={() => removeExam(index)}
                            className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors flex-shrink-0"
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Financial Data Tab */}
          {activeTab === 'financial' && (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
                <h2 className="text-lg font-headline font-bold mb-6 text-primary">
                  Dados Financeiros
                </h2>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Valor Mensal (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="monthlyValue"
                      value={formData.monthlyValue || ''}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Dia de Vencimento
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="31"
                      name="dueDay"
                      value={formData.dueDay || ''}
                      onChange={handleInputChange}
                      placeholder="1"
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-on-surface-variant mb-3">
                    Forma de Pagamento
                  </label>
                  <div className="space-y-2">
                    {['PIX', 'Boleto', 'Cartão de crédito', 'Dinheiro'].map((method) => (
                      <label key={method} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="text-sm text-on-surface">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-3">
                    Status
                  </label>
                  <div className="space-y-2">
                    {['pending', 'paid', 'overdue'].map((status) => (
                      <label key={status} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentStatus"
                          value={status}
                          checked={formData.paymentStatus === status}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="text-sm text-on-surface">
                          {status === 'paid' ? 'Em dia' : status === 'pending' ? 'Pendente' : 'Inadimplente'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Plan and Consultations Tab */}
          {activeTab === 'plan' && (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 border border-on-surface-variant/10">
                <h2 className="text-lg font-headline font-bold mb-6 text-primary">
                  Plano e Consultas
                </h2>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Data de Início do Acompanhamento
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2">
                      Frequência de Consultas
                    </label>
                    <select
                      name="consultationFrequency"
                      value={formData.consultationFrequency}
                      onChange={handleInputChange}
                      className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="Semanal">Semanal</option>
                      <option value="Quinzenal">Quinzenal</option>
                      <option value="Mensal">Mensal</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-on-surface-variant mb-2">
                    Próxima Consulta
                  </label>
                  <input
                    type="date"
                    name="nextConsultation"
                    value={formData.nextConsultation}
                    onChange={handleInputChange}
                    className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-2">
                    Notas do Profissional
                  </label>
                  <textarea
                    name="professionalNotes"
                    value={formData.professionalNotes}
                    onChange={handleInputChange}
                    placeholder="Observações importantes sobre o paciente..."
                    rows={6}
                    className="w-full bg-surface rounded-lg px-4 py-3 text-on-surface border border-on-surface-variant/20 focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-4 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">check</span>
            {isEditMode ? 'Salvar Alterações' : 'Salvar Paciente'}
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-4 border border-primary/30 text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </main>
    </div>
  );
}

export default function NewPatientPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><span className="text-primary font-headline text-xl">Carregando...</span></div>}>
      <NewPatientPageInner />
    </Suspense>
  );
}
