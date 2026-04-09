'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  muscleGroup: string;
  icon: string;
  videoUrl?: string;
}

interface Workout {
  id: string;
  name: string;
  type: 'Força' | 'Cardio' | 'Misto';
  duration: string;
  days: string[];
  exercises: Exercise[];
  icon: string;
}

const MOCK_WORKOUTS: Workout[] = [
  {
    id: 'treino-a',
    name: 'Treino A: Membros Inferiores',
    type: 'Força',
    duration: '60-75 min',
    days: ['Seg', 'Qui'],
    icon: 'sports_gymnastics',
    exercises: [
      {
        name: 'Agachamento',
        sets: '4',
        reps: '8-12',
        rest: '2-3 min',
        muscleGroup: 'Glúteos',
        icon: 'fitness_center',
        videoUrl: 'https://www.youtube.com/embed/aclHkVaku9U',
      },
      {
        name: 'Leg Press',
        sets: '3',
        reps: '12-15',
        rest: '2 min',
        muscleGroup: 'Quadríceps',
        icon: 'fitness_center',
        videoUrl: 'https://www.youtube.com/embed/IZxyjW7MPJQ',
      },
      {
        name: 'Cadeira Extensora',
        sets: '3',
        reps: '12',
        rest: '90 seg',
        muscleGroup: 'Quadríceps',
        icon: 'chair',
      },
      {
        name: 'Cadeira Flexora',
        sets: '3',
        reps: '12',
        rest: '90 seg',
        muscleGroup: 'Isquiotibiais',
        icon: 'chair',
      },
      {
        name: 'Panturrilha',
        sets: '4',
        reps: '15-20',
        rest: '60 seg',
        muscleGroup: 'Panturrilha',
        icon: 'fitness_center',
      },
      {
        name: 'Stiff',
        sets: '3',
        reps: '10-12',
        rest: '2 min',
        muscleGroup: 'Isquiotibiais',
        icon: 'sports_gymnastics',
      },
    ],
  },
  {
    id: 'treino-b',
    name: 'Treino B: Membros Superiores',
    type: 'Força',
    duration: '75-90 min',
    days: ['Ter', 'Sex'],
    icon: 'sports_gymnastics',
    exercises: [
      {
        name: 'Supino Reto',
        sets: '4',
        reps: '8-12',
        rest: '2-3 min',
        muscleGroup: 'Peito',
        icon: 'fitness_center',
        videoUrl: 'https://www.youtube.com/embed/rT7DgCr-3pg',
      },
      {
        name: 'Remada Curvada',
        sets: '4',
        reps: '8-12',
        rest: '2-3 min',
        muscleGroup: 'Costas',
        icon: 'fitness_center',
        videoUrl: 'https://www.youtube.com/embed/kBWAon7ItDw',
      },
      {
        name: 'Desenvolvimento',
        sets: '3',
        reps: '10-12',
        rest: '2 min',
        muscleGroup: 'Ombro',
        icon: 'fitness_center',
        videoUrl: 'https://www.youtube.com/embed/qEwKCR5JCog',
      },
      {
        name: 'Puxada Frontal',
        sets: '3',
        reps: '10-12',
        rest: '90 seg',
        muscleGroup: 'Costas',
        icon: 'fitness_center',
      },
      {
        name: 'Rosca Direta',
        sets: '3',
        reps: '12',
        rest: '90 seg',
        muscleGroup: 'Bíceps',
        icon: 'sports_gymnastics',
      },
      {
        name: 'Tríceps Corda',
        sets: '3',
        reps: '12',
        rest: '90 seg',
        muscleGroup: 'Tríceps',
        icon: 'sports_gymnastics',
      },
    ],
  },
  {
    id: 'treino-c',
    name: 'Treino C: Cardio + Core',
    type: 'Misto',
    duration: '45-60 min',
    days: ['Qua'],
    icon: 'favorite',
    exercises: [
      {
        name: 'Esteira HIIT',
        sets: '1',
        reps: '20 min',
        rest: '-',
        muscleGroup: 'Cardio',
        icon: 'directions_run',
      },
      {
        name: 'Prancha',
        sets: '3',
        reps: '45 seg',
        rest: '60 seg',
        muscleGroup: 'Core',
        icon: 'sports_gymnastics',
      },
      {
        name: 'Abdominal Infra',
        sets: '3',
        reps: '15',
        rest: '60 seg',
        muscleGroup: 'Abdômen',
        icon: 'sports_gymnastics',
      },
      {
        name: 'Russian Twist',
        sets: '3',
        reps: '20',
        rest: '60 seg',
        muscleGroup: 'Oblíquo',
        icon: 'sports_gymnastics',
      },
      {
        name: 'Mountain Climber',
        sets: '3',
        reps: '30 seg',
        rest: '30 seg',
        muscleGroup: 'Core',
        icon: 'directions_run',
      },
      {
        name: 'Bike',
        sets: '1',
        reps: '15 min',
        rest: '-',
        muscleGroup: 'Cardio',
        icon: 'two_wheeler',
      },
    ],
  },
];

const DAYS_OF_WEEK = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const TODAY_INDEX = 0; // Monday for demo - change to actual day

interface VideoModalState {
  isOpen: boolean;
  exerciseName: string;
  videoUrl: string;
}

interface ToastState {
  isVisible: boolean;
  message: string;
}

export default function TreinoPage() {
  const pathname = usePathname();
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>('treino-a');
  const [completedSessions, setCompletedSessions] = useState(3);
  const [videoModal, setVideoModal] = useState<VideoModalState>({
    isOpen: false,
    exerciseName: '',
    videoUrl: '',
  });
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    message: '',
  });
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const showToast = (message: string) => {
    setToast({ isVisible: true, message });
    setTimeout(() => setToast({ isVisible: false, message: '' }), 3000);
  };

  const openVideoModal = (exerciseName: string, videoUrl: string) => {
    setVideoModal({ isOpen: true, exerciseName, videoUrl });
  };

  const closeVideoModal = () => {
    setVideoModal({ isOpen: false, exerciseName: '', videoUrl: '' });
  };

  const toggleExerciseComplete = (exerciseName: string) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(exerciseName)) {
      newCompleted.delete(exerciseName);
    } else {
      newCompleted.add(exerciseName);
    }
    setCompletedExercises(newCompleted);
  };

  const handleMarkWorkoutComplete = () => {
    if (completedSessions < 7) {
      setCompletedSessions(completedSessions + 1);
      showToast('Treino marcado como realizado!');
    }
  };

  const handleScheduleWorkout = () => {
    showToast('Agendamento em breve');
  };

  const getMuscleGroupColor = (muscleGroup: string): string => {
    const colors: Record<string, string> = {
      'Glúteos': 'bg-blue-500/20 text-blue-300',
      'Quadríceps': 'bg-blue-500/20 text-blue-300',
      'Isquiotibiais': 'bg-purple-500/20 text-purple-300',
      'Panturrilha': 'bg-cyan-500/20 text-cyan-300',
      'Peito': 'bg-red-500/20 text-red-300',
      'Costas': 'bg-emerald-500/20 text-emerald-300',
      'Ombro': 'bg-yellow-500/20 text-yellow-200',
      'Bíceps': 'bg-orange-500/20 text-orange-300',
      'Tríceps': 'bg-orange-500/20 text-orange-300',
      'Cardio': 'bg-primary/20 text-primary',
      'Core': 'bg-pink-500/20 text-pink-300',
      'Abdômen': 'bg-pink-500/20 text-pink-300',
      'Oblíquo': 'bg-pink-500/20 text-pink-300',
    };
    return colors[muscleGroup] || 'bg-surface-high text-on-surface';
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'Força':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/50';
      case 'Cardio':
        return 'bg-red-500/20 text-red-300 border border-red-500/50';
      case 'Misto':
        return 'bg-primary/20 text-primary border border-primary/50';
      default:
        return 'bg-surface-high text-on-surface';
    }
  };

  // Video Modal Component
  const VideoModal = () => {
    if (!videoModal.isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={closeVideoModal}
      >
        {/* Glassmorphism Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

        {/* Modal Content */}
        <div
          className="relative w-full max-w-2xl bg-surface-container rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-surface-high p-6 border-b border-on-surface-variant/10 flex items-center justify-between">
            <h2 className="text-xl font-headline font-bold text-on-surface">
              {videoModal.exerciseName}
            </h2>
            <button
              onClick={closeVideoModal}
              className="w-10 h-10 rounded-lg bg-on-surface-variant/20 hover:bg-on-surface-variant/30 transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-on-surface-variant">
                close
              </span>
            </button>
          </div>

          {/* Video Container */}
          <div className="relative w-full bg-black pt-[56.25%]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={videoModal.videoUrl}
              title={videoModal.exerciseName}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-on-surface-variant/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-headline font-bold text-on-surface">
                Prescrição de Treino
              </h1>
              <p className="text-sm text-on-surface-variant mt-1">
                Sua rotina semanal de treinamento personalizada
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-full">
                <span className="text-sm font-bold text-primary">
                  {completedSessions}/7 sessões
                </span>
              </div>
              <Link href="/dashboard" className="w-10 h-10 rounded-lg bg-surface-high hover:bg-surface-highest transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface">home</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
        {/* Weekly Overview */}
        <section className="mb-12">
          <h2 className="text-lg font-headline font-bold mb-4 text-on-surface">
            Semana de {new Date().toLocaleDateString('pt-BR', { weekday: 'long' })}
          </h2>
          <div className="grid grid-cols-7 gap-3">
            {DAYS_OF_WEEK.map((day, index) => {
              const workoutForDay = MOCK_WORKOUTS.find(w => w.days.includes(day));
              const isToday = index === TODAY_INDEX;

              return (
                <div
                  key={day}
                  className={`glass-card rounded-lg p-3 text-center transition-all ${
                    isToday
                      ? 'ring-2 ring-primary bg-primary/10'
                      : 'hover:bg-surface-high/50'
                  }`}
                >
                  <p className={`text-xs font-bold mb-2 ${isToday ? 'text-primary' : 'text-on-surface-variant'}`}>
                    {day}
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    {workoutForDay ? (
                      <>
                        <span className="material-symbols-outlined text-sm text-primary">
                          {workoutForDay.icon}
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Ativo
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-on-surface-variant">
                        Repouso
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Progress Indicator */}
        <section className="mb-12">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-headline font-bold text-on-surface">
                Progresso da Semana
              </h3>
              <span className="text-2xl font-headline font-bold text-primary">
                {Math.round((completedSessions / 7) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-surface-high rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-500"
                style={{ width: `${(completedSessions / 7) * 100}%` }}
              ></div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-headline font-bold text-primary">
                  {completedSessions}
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Sessões Completas
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-headline font-bold text-on-surface-variant">
                  {7 - completedSessions}
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Sessões Pendentes
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-headline font-bold text-on-surface-variant">
                  4
                </p>
                <p className="text-xs text-on-surface-variant mt-1">
                  Dias Restantes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Current Workout - Expanded */}
        <section className="mb-12">
          <h2 className="text-lg font-headline font-bold mb-4 text-primary">
            Treino de Hoje
          </h2>

          {MOCK_WORKOUTS.map((workout) => (
            <div key={workout.id} className="mb-6">
              {expandedWorkout === workout.id ? (
                // Expanded Workout Card
                <div className="glass-card-high rounded-2xl overflow-hidden">
                  {/* Header */}
                  <div
                    className="bg-gradient-to-r from-surface-high to-surface-container-high p-6 border-b border-on-surface-variant/10 cursor-pointer hover:bg-surface-highest transition-colors"
                    onClick={() => setExpandedWorkout(null)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary">
                            {workout.icon}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-headline font-bold text-on-surface">
                            {workout.name}
                          </h3>
                          <p className="text-sm text-on-surface-variant mt-1">
                            {workout.days.join(', ')}
                          </p>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant">
                        expand_less
                      </span>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-3 mt-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(workout.type)}`}>
                        {workout.type}
                      </span>
                      <span className="px-3 py-1 bg-on-surface-variant/20 text-on-surface-variant rounded-full text-xs font-bold">
                        ⏱ {workout.duration}
                      </span>
                    </div>
                  </div>

                  {/* Exercises List */}
                  <div className="p-6 space-y-4">
                    {workout.exercises.map((exercise, index) => {
                      const exerciseKey = `${workout.id}-${index}`;
                      const isCompleted = completedExercises.has(exerciseKey);

                      return (
                        <div
                          key={index}
                          className={`glass-card rounded-xl p-4 flex items-start gap-4 transition-all ${
                            isCompleted
                              ? 'bg-primary/10 border border-primary/30'
                              : 'hover:bg-surface-container/50'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-sm text-primary">
                              {exercise.icon}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-headline font-bold text-on-surface">
                                {exercise.name}
                              </h4>
                              {exercise.videoUrl && (
                                <button
                                  onClick={() =>
                                    openVideoModal(exercise.name, exercise.videoUrl!)
                                  }
                                  className="text-primary hover:text-primary-dark transition-colors flex-shrink-0"
                                  title="Ver demonstração de vídeo"
                                >
                                  <span className="material-symbols-outlined text-sm">
                                    play_circle
                                  </span>
                                </button>
                              )}
                            </div>
                            <div className="flex items-center gap-3 mt-2 flex-wrap">
                              <span className="text-xs bg-surface-high px-3 py-1 rounded-full text-on-surface-variant font-bold">
                                {exercise.sets} séries
                              </span>
                              <span className="text-xs bg-surface-high px-3 py-1 rounded-full text-on-surface-variant font-bold">
                                {exercise.reps} reps
                              </span>
                              <span className="text-xs bg-surface-high px-3 py-1 rounded-full text-on-surface-variant font-bold">
                                {exercise.rest} descanso
                              </span>
                              <span className={`text-xs px-3 py-1 rounded-full font-bold ${getMuscleGroupColor(exercise.muscleGroup)}`}>
                                {exercise.muscleGroup}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleExerciseComplete(exerciseKey)}
                            className={`flex-shrink-0 w-6 h-6 rounded border-2 transition-colors flex items-center justify-center ${
                              isCompleted
                                ? 'bg-primary border-primary'
                                : 'border-on-surface-variant/30 hover:border-primary'
                            }`}
                          >
                            {isCompleted && (
                              <span className="material-symbols-outlined text-xs text-on-primary">
                                check
                              </span>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Button */}
                  <div className="px-6 py-4 border-t border-on-surface-variant/10 flex gap-3">
                    <button
                      onClick={handleMarkWorkoutComplete}
                      className="flex-1 py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      <span className="material-symbols-outlined inline mr-2">
                        check_circle
                      </span>
                      Marcar como Realizado
                    </button>
                    <button
                      onClick={handleScheduleWorkout}
                      className="px-4 py-3 bg-surface-high text-on-surface font-bold rounded-lg hover:bg-surface-highest transition-colors"
                    >
                      <span className="material-symbols-outlined">
                        schedule
                      </span>
                    </button>
                  </div>
                </div>
              ) : (
                // Collapsed Workout Card
                <div
                  className="glass-card rounded-2xl p-6 cursor-pointer hover:bg-surface-container/50 transition-colors border border-on-surface-variant/10"
                  onClick={() => setExpandedWorkout(workout.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-surface-high flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-surface-variant">
                          {workout.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline font-bold text-on-surface">
                          {workout.name}
                        </h3>
                        <p className="text-sm text-on-surface-variant mt-1">
                          {workout.days.join(', ')} • {workout.exercises.length} exercícios
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant">
                      expand_more
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Upcoming Workouts */}
        <section className="mb-12">
          <h2 className="text-lg font-headline font-bold mb-4 text-on-surface">
            Próximos Treinos
          </h2>
          <div className="space-y-3">
            {MOCK_WORKOUTS.slice(1).map((workout) => (
              <div
                key={workout.id}
                className="glass-card rounded-lg p-4 flex items-center justify-between hover:bg-surface-container/30 transition-colors cursor-pointer"
                onClick={() => setExpandedWorkout(workout.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">
                    {workout.icon}
                  </span>
                  <div>
                    <p className="font-headline font-bold text-on-surface text-sm">
                      {workout.name}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {workout.days.join(', ')} • {workout.duration}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold ${getTypeColor(workout.type)}`}>
                  {workout.type}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-12">
          <h2 className="text-lg font-headline font-bold mb-4 text-on-surface">
            Dicas de Treino
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card rounded-xl p-4 text-center">
              <span className="material-symbols-outlined text-primary text-3xl block mb-2">
                local_fire_department
              </span>
              <p className="text-sm font-bold text-on-surface">
                Aquecimento
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                10-15 min antes
              </p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <span className="material-symbols-outlined text-primary text-3xl block mb-2">
                water_drop
              </span>
              <p className="text-sm font-bold text-on-surface">
                Hidratação
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                500ml durante
              </p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <span className="material-symbols-outlined text-primary text-3xl block mb-2">
                fitness_center
              </span>
              <p className="text-sm font-bold text-on-surface">
                Recuperação
              </p>
              <p className="text-xs text-on-surface-variant mt-1">
                Alongamento 5 min
              </p>
            </div>
          </div>
        </section>
      </main>

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
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <Link
            href="/pacientes"
            className={`flex items-center gap-2 font-bold transition-colors ${
              pathname === '/pacientes'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined">group</span>
            <span className="hidden sm:inline">Pacientes</span>
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
            <span className="hidden sm:inline">Financeiro</span>
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
            <span className="hidden sm:inline">Chat</span>
          </Link>
        </div>
      </nav>

      {/* Video Modal */}
      <VideoModal />

      {/* Toast Notification */}
      {toast.isVisible && (
        <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-40 bg-primary text-on-primary px-6 py-3 rounded-lg shadow-lg font-bold">
          {toast.message}
        </div>
      )}
    </div>
  );
}
