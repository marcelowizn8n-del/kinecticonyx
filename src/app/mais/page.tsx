'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavLink {
  label: string;
  path: string;
  icon: string;
}

interface NavSection {
  titulo: string;
  links: NavLink[];
}

const navSections: NavSection[] = [
  {
    titulo: 'Gestão',
    links: [
      {
        label: 'Usuários do Sistema',
        path: '/usuarios',
        icon: 'group',
      },
      {
        label: 'Templates de Cardápio',
        path: '/templates',
        icon: 'description',
      },
      {
        label: 'Banco de Alimentos',
        path: '/alimentos',
        icon: 'restaurant',
      },
    ],
  },
  {
    titulo: 'Financeiro',
    links: [
      {
        label: 'Controle Financeiro',
        path: '/financeiro',
        icon: 'payments',
      },
      {
        label: 'Relatórios',
        path: '#',
        icon: 'assessment',
      },
    ],
  },
  {
    titulo: 'Configurações',
    links: [
      {
        label: 'Perfil',
        path: '#',
        icon: 'person',
      },
      {
        label: 'Notificações',
        path: '#',
        icon: 'notifications',
      },
      {
        label: 'Sobre o App',
        path: '#',
        icon: 'info',
      },
      {
        label: 'Sair',
        path: '/login',
        icon: 'logout',
      },
    ],
  },
];

export default function MaisPage() {
  const pathname = usePathname();

  return (
    <main className="min-h-screen pb-24" style={{ backgroundColor: '#131313' }}>
      {/* Header */}
      <div className="border-b border-[#353534] p-6">
        <h1 className="font-manrope text-3xl font-bold text-[#E5E2E1]">
          Menu
        </h1>
        <p className="text-sm text-[#C4C9AC] mt-1">
          Mais opções e configurações
        </p>
      </div>

      {/* Navigation Sections */}
      <div className="p-6 space-y-6">
        {navSections.map((section) => (
          <div key={section.titulo}>
            <h2 className="font-manrope font-semibold text-[#E5E2E1] text-sm uppercase tracking-wider mb-3 px-2 text-[#C4C9AC]">
              {section.titulo}
            </h2>
            <div className="space-y-2">
              {section.links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`glass-card rounded-lg p-4 border transition-all flex items-center gap-4 group ${
                    pathname === link.path
                      ? 'border-[#CCFF00] bg-[#CCFF00]/5'
                      : 'border-[#353534] hover:border-[#2A2A2A]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-2xl transition-colors ${
                      pathname === link.path
                        ? 'text-[#CCFF00]'
                        : 'text-[#C4C9AC] group-hover:text-[#CCFF00]'
                    }`}
                  >
                    {link.icon}
                  </span>
                  <span
                    className={`font-medium transition-colors ${
                      pathname === link.path
                        ? 'text-[#CCFF00]'
                        : 'text-[#E5E2E1] group-hover:text-[#CCFF00]'
                    }`}
                  >
                    {link.label}
                  </span>
                  {pathname === link.path && (
                    <span className="material-symbols-outlined text-lg text-[#CCFF00] ml-auto">
                      check_circle
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* App Version */}
      <div className="fixed bottom-24 left-0 right-0 flex justify-center pb-6">
        <div className="glass-card rounded-lg border border-[#353534] px-6 py-3">
          <p className="text-xs text-[#C4C9AC] font-medium text-center">
            Kinetic Onyx v1.0
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-[#353534] glass-card">
        <div className="flex items-center justify-around">
          {[
            { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
            { label: 'Pacientes', path: '/pacientes', icon: 'group' },
            { label: 'Dieta', path: '/dieta', icon: 'restaurant_menu' },
            { label: 'Financeiro', path: '/financeiro', icon: 'payments' },
            { label: 'Mais', path: '/mais', icon: 'more_horiz' },
          ].map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-[#CCFF00]' : 'text-[#C4C9AC]'
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {item.icon}
                </span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
