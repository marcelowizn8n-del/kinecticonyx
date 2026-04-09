export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  avatar: string; // initials like "RM"
  avatarUrl?: string; // base64 or URL of uploaded photo
  age: number;
  gender: 'M' | 'F';
  goal: string; // ex: "Emagrecimento", "Hipertrofia", "Saúde"
  status: 'active' | 'inactive' | 'pending';
  paymentStatus: 'paid' | 'pending' | 'overdue';
  monthlyFee: number; // in BRL
  nextConsultation: string; // ISO date
  lastConsultation: string; // ISO date
  adherence: number; // 0-100
  weight: number; // current kg
  height: number; // cm
  bodyFat: number; // percentage
  dietType: 'mathematical' | 'intuitive' | 'behavioral';
  startDate: string; // ISO date
  notes: string;
  // Personal data
  address: string;
  profession: string;
  maritalStatus: string;
  birthDate: string; // ISO date
  // Circumferences (cm)
  waistCircumference: number;
  hipCircumference: number;
  armCircumference: number;
  thighCircumference: number;
  calfCircumference: number;
  // Health
  healthHistory: string;
  allergies: string[];
  restrictions: string[];
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'intense' | 'very_intense';
  sleepHours: number;
  consultationFrequency: 'weekly' | 'biweekly' | 'monthly';
  // Evolution data
  weightHistory: { date: string; value: number }[];
  bodyFatHistory: { date: string; value: number }[];
  // Bioimpedance
  muscleMass: number; // kg
  waterPercentage: number; // %
  visceralFat: number; // level 1-20
  bmr: number; // basal metabolic rate kcal
  // Optional extended data
  exams?: { id: string; type: string; date: string; status: string }[];
  paymentHistory?: { date: string; amount: number; status: 'paid' | 'pending' | 'overdue' }[];
  dietPlan?: { name: string; template: string; adherence: number; targetCalories: number };
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  time: string; // "08:00"
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  items: string[];
}

export interface DietTemplate {
  id: string;
  name: string;
  type: 'mathematical' | 'intuitive' | 'behavioral';
  targetCalories: number;
  meals: Meal[];
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string; // "8-12"
  rest: string; // "60s"
  muscleGroup: string;
}

export interface Workout {
  id: string;
  name: string; // "Treino A: Membros Inferiores"
  type: string; // "Força", "Cardio", "HIIT"
  exercises: Exercise[];
  duration: number; // minutes
  day: string; // "Segunda", "Terça", etc
}

export interface Payment {
  id: string;
  patientId: string;
  patientName: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  method?: 'pix' | 'boleto' | 'credit_card' | 'cash';
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'success' | 'info';
  title: string;
  message: string;
  patientId?: string;
  patientName?: string;
  date: string;
  read: boolean;
}

export interface WeeklyGoal {
  id: string;
  description: string; // "Beber 2L de água por dia"
  completed: boolean;
  category: 'hydration' | 'nutrition' | 'exercise' | 'behavior';
}
