'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  nome: string;
  email: string;
  cargo: 'Nutricionista' | 'Treinador' | 'Recepcionista' | 'Admin';
  status: 'Ativo' | 'Inativo';
  pacientesAtribuidos: number;
  ultimoAcesso: string;
  avatar: string;
  isOnline: boolean;
}

const usuariosData: User[] = [
  {
    id: '1',
    nome: 'Dr. Caio Nutricionista',
    email: 'caio@healthplus.com',
    cargo: 'Admin',
    status: 'Ativo',
    pacientesAtribuidos: 45,
    ultimoAcesso: 'online agora',
    avatar: 'DC',
    isOnline: true,
  },
  {
    id: '2',
    nome: 'Dra. Isabelle Nutricionista',
    email: 'isabelle@healthplus.com',
    cargo: 'Nutricionista',
    status: 'Ativo',
    pacientesAtribuidos: 32,
    ultimoAcesso: 'hoje 14:00',
    avatar: 'IN',
    isOnline: false,
  },
  {
    id: '3',
    nome: 'Ricardo Treinador',
    email: 'ricardo@healthplus.com',
    cargo: 'Treinador',
    status: 'Ativo',
    pacientesAtribuidos: 28,
    ultimoAcesso: 'ontem',
    avatar: 'RT',
    isOnline: false,
  },
  {
    id: '4',
    nome: 'Ana Recepcionista',
    email: 'ana@healthplus.com',
    cargo: 'Recepcionista',
    status: 'Ativo',
    pacientesAtribuidos: 0,
    ultimoAcesso: 'hoje 09:00',
    avatar: 'AR',
    isOnline: false,
  },
];

interface ModalState {
  isOpen: boolean;
  formData: {
    nome: string;
    email: string;
    cargo: 'Nutricionista' | 'Treinador' | 'Recepcionista' | 'Admin';
    senha: string;
    permissoes: {
      gerenciarUsuarios: boolean;
      gerenciarTemplates: boolean;
      verRelatorios: boolean;
      gerenciarFinanceiro: boolean;
    };
  };
}

export default function UsuariosPage() {
  const pathname = usePathname();
  const [usuarios, setUsuarios] = useState<User[]>(usuariosData);
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    formData: {
      nome: '',
      email: '',
      cargo: 'Nutricionista',
      senha: '',
      permissoes: {
        gerenciarUsuarios: false,
        gerenciarTemplates: false,
        verRelatorios: false,
        gerenciarFinanceiro: false,
      },
    },
  });

  const totalUsuarios = usuarios.length;
  const usuariosAtivos = usuarios.filter((u) => u.status === 'Ativo').length;
  const ultimoAcessoRecente = usuarios
    .filter((u) => u.ultimoAcesso !== 'ontem')
    .length;

  const handleAddUser = () => {
    if (
      modal.formData.nome &&
      modal.formData.email &&
      modal.formData.senha
    ) {
      const newUser: User = {
        id: Math.random().toString(),
        nome: modal.formData.nome,
        email: modal.formData.email,
        cargo: modal.formData.cargo,
        status: 'Ativo',
        pacientesAtribuidos: 0,
        ultimoAcesso: 'agora',
        avatar: modal.formData.nome
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase(),
        isOnline: true,
      };
      setUsuarios([...usuarios, newUser]);
      setModal({
        isOpen: false,
        formData: {
          nome: '',
          email: '',
          cargo: 'Nutricionista',
          senha: '',
          permissoes: {
            gerenciarUsuarios: false,
            gerenciarTemplates: false,
            verRelatorios: false,
            gerenciarFinanceiro: false,
          },
        },
      });
    }
  };

  const handleDesativar = (id: string) => {
    setUsuarios(
      usuarios.map((u) =>
        u.id === id ? { ...u, status: 'Inativo' } : u
      )
    );
  };

  const handlePermissaoChange = (
    key: keyof ModalState['formData']['permissoes']
  ) => {
    setModal({
      ...modal,
      formData: {
        ...modal.formData,
        permissoes: {
          ...modal.formData.permissoes,
          [key]: !modal.formData.permissoes[key],
        },
      },
    });
  };

  const cargoColors: Record<string, string> = {
    Admin: 'bg-[#CCFF00]/10 text-[#CCFF00]',
    Nutricionista: 'bg-blue-500/10 text-blue-400',
    Treinador: 'bg-green-500/10 text-green-400',
    Recepcionista: 'bg-purple-500/10 text-purple-400',
  };

  return (
    <main className="min-h-screen pb-24" style={{ backgroundColor: '#131313' }}>
      {/* Header */}
      <div className="border-b border-[#353534] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-manrope text-3xl font-bold text-[#E5E2E1]">
              Usuários do Sistema
            </h1>
            <p className="text-sm text-[#C4C9AC] mt-1">
              Gerencie usuários e permissões
            </p>
          </div>
          <button
            onClick={() => setModal({ ...modal, isOpen: true })}
            className="glass-card-high px-6 py-2 rounded-lg font-medium text-[#131313] bg-[#CCFF00] hover:bg-[#D4FF1A] transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            Adicionar Usuário
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-lg p-4 border border-[#353534]">
          <p className="text-[#C4C9AC] text-sm font-medium">Total Usuários</p>
          <p className="text-[#CCFF00] font-manrope text-3xl font-bold mt-2">
            {totalUsuarios}
          </p>
        </div>
        <div className="glass-card rounded-lg p-4 border border-[#353534]">
          <p className="text-[#C4C9AC] text-sm font-medium">Usuários Ativos</p>
          <p className="text-[#CCFF00] font-manrope text-3xl font-bold mt-2">
            {usuariosAtivos}
          </p>
        </div>
        <div className="glass-card rounded-lg p-4 border border-[#353534]">
          <p className="text-[#C4C9AC] text-sm font-medium">Acessos Hoje</p>
          <p className="text-[#CCFF00] font-manrope text-3xl font-bold mt-2">
            {ultimoAcessoRecente}
          </p>
        </div>
      </div>

      {/* User List */}
      <div className="p-6">
        <div className="space-y-3">
          {usuarios.map((usuario) => (
            <div
              key={usuario.id}
              className="glass-card rounded-lg p-5 border border-[#353534] hover:border-[#2A2A2A] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Avatar */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm relative ${
                      usuario.cargo === 'Admin'
                        ? 'bg-[#CCFF00] text-[#131313]'
                        : 'bg-[#2A2A2A] text-[#CCFF00]'
                    }`}
                  >
                    {usuario.avatar}
                    {usuario.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border 2 border-[#131313]" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-manrope font-semibold text-[#E5E2E1]">
                      {usuario.nome}
                    </h3>
                    <p className="text-xs text-[#C4C9AC]">{usuario.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded font-medium ${
                          cargoColors[usuario.cargo]
                        }`}
                      >
                        {usuario.cargo}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded font-medium ${
                          usuario.status === 'Ativo'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-[#FFB4AB]/10 text-[#FFB4AB]'
                        }`}
                      >
                        {usuario.status}
                      </span>
                      <span className="text-xs text-[#C4C9AC]">
                        {usuario.ultimoAcesso}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Patients & Actions */}
                <div className="text-right">
                  <p className="text-lg font-bold text-[#CCFF00] font-manrope">
                    {usuario.pacientesAtribuidos}
                  </p>
                  <p className="text-xs text-[#C4C9AC] mb-3">pacientes</p>

                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-[#2A2A2A] transition-colors text-[#CCFF00]">
                      <span className="material-symbols-outlined text-lg">
                        edit
                      </span>
                    </button>
                    {usuario.status === 'Ativo' && (
                      <button
                        onClick={() => handleDesativar(usuario.id)}
                        className="p-2 rounded-lg hover:bg-[#FFB4AB]/20 transition-colors text-[#FFB4AB]"
                      >
                        <span className="material-symbols-outlined text-lg">
                          disable_on
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Section */}
      <div className="p-6 space-y-6">
        <div>
          <h2 className="font-manrope text-xl font-bold text-[#E5E2E1] mb-4">
            Consultas Realizadas por Usuário
          </h2>
          <div className="glass-card rounded-lg p-6 border border-[#353534]">
            <svg
              viewBox="0 0 400 200"
              className="w-full h-48"
            >
              {/* Bars */}
              {[
                { label: 'Caio', value: 45 },
                { label: 'Isabelle', value: 32 },
                { label: 'Ricardo', value: 28 },
                { label: 'Ana', value: 5 },
              ].map((item, idx) => (
                <g key={idx}>
                  <rect
                    x={20 + idx * 90}
                    y={150 - (item.value * 2)}
                    width={60}
                    height={item.value * 2}
                    fill="#CCFF00"
                    rx="4"
                  />
                  <text
                    x={50 + idx * 90}
                    y={175}
                    textAnchor="middle"
                    fill="#C4C9AC"
                    fontSize="12"
                  >
                    {item.label}
                  </text>
                  <text
                    x={50 + idx * 90}
                    y={140 - (item.value * 2)}
                    textAnchor="middle"
                    fill="#CCFF00"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {item.value}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div>
          <h2 className="font-manrope text-xl font-bold text-[#E5E2E1] mb-4">
            Pacientes por Usuário
          </h2>
          <div className="glass-card rounded-lg p-6 border border-[#353534]">
            <div className="space-y-3">
              {usuarios.map((u) => (
                <div key={u.id} className="flex items-center justify-between">
                  <span className="text-[#E5E2E1] font-medium">{u.nome}</span>
                  <div className="flex items-center gap-2 flex-1 ml-4">
                    <div className="flex-1 bg-[#2A2A2A] rounded-full h-2">
                      <div
                        className="bg-[#CCFF00] h-2 rounded-full"
                        style={{
                          width: `${(u.pacientesAtribuidos / 45) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-[#C4C9AC] text-sm min-w-10 text-right">
                      {u.pacientesAtribuidos}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Add User */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-lg border border-[#353534] max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="font-manrope text-2xl font-bold text-[#E5E2E1] mb-6">
              Adicionar Novo Usuário
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-[#E5E2E1] text-sm font-medium block mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={modal.formData.nome}
                  onChange={(e) =>
                    setModal({
                      ...modal,
                      formData: { ...modal.formData, nome: e.target.value },
                    })
                  }
                  className="w-full bg-[#2A2A2A] border border-[#353534] rounded-lg px-4 py-2 text-[#E5E2E1] placeholder-[#C4C9AC] focus:outline-none focus:border-[#CCFF00]"
                  placeholder="Nome completo"
                />
              </div>

              <div>
                <label className="text-[#E5E2E1] text-sm font-medium block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={modal.formData.email}
                  onChange={(e) =>
                    setModal({
                      ...modal,
                      formData: { ...modal.formData, email: e.target.value },
                    })
                  }
                  className="w-full bg-[#2A2A2A] border border-[#353534] rounded-lg px-4 py-2 text-[#E5E2E1] placeholder-[#C4C9AC] focus:outline-none focus:border-[#CCFF00]"
                  placeholder="email@healthplus.com"
                />
              </div>

              <div>
                <label className="text-[#E5E2E1] text-sm font-medium block mb-2">
                  Cargo
                </label>
                <select
                  value={modal.formData.cargo}
                  onChange={(e) =>
                    setModal({
                      ...modal,
                      formData: {
                        ...modal.formData,
                        cargo: e.target.value as any,
                      },
                    })
                  }
                  className="w-full bg-[#2A2A2A] border border-[#353534] rounded-lg px-4 py-2 text-[#E5E2E1] focus:outline-none focus:border-[#CCFF00]"
                >
                  <option value="Nutricionista">Nutricionista</option>
                  <option value="Treinador">Treinador</option>
                  <option value="Recepcionista">Recepcionista</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="text-[#E5E2E1] text-sm font-medium block mb-2">
                  Senha Temporária
                </label>
                <input
                  type="password"
                  value={modal.formData.senha}
                  onChange={(e) =>
                    setModal({
                      ...modal,
                      formData: { ...modal.formData, senha: e.target.value },
                    })
                  }
                  className="w-full bg-[#2A2A2A] border border-[#353534] rounded-lg px-4 py-2 text-[#E5E2E1] placeholder-[#C4C9AC] focus:outline-none focus:border-[#CCFF00]"
                  placeholder="Senha temporária"
                />
              </div>

              <div>
                <label className="text-[#E5E2E1] text-sm font-medium block mb-3">
                  Permissões
                </label>
                <div className="space-y-2">
                  {[
                    {
                      key: 'gerenciarUsuarios',
                      label: 'Gerenciar Usuários',
                    },
                    {
                      key: 'gerenciarTemplates',
                      label: 'Gerenciar Templates',
                    },
                    { key: 'verRelatorios', label: 'Ver Relatórios' },
                    {
                      key: 'gerenciarFinanceiro',
                      label: 'Gerenciar Financeiro',
                    },
                  ].map((perm) => (
                    <label
                      key={perm.key}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={
                          modal.formData.permissoes[
                            perm.key as keyof typeof modal.formData.permissoes
                          ]
                        }
                        onChange={() =>
                          handlePermissaoChange(
                            perm.key as keyof typeof modal.formData.permissoes
                          )
                        }
                        className="w-4 h-4 rounded cursor-pointer accent-[#CCFF00]"
                      />
                      <span className="text-[#E5E2E1] text-sm">
                        {perm.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() =>
                  setModal({
                    ...modal,
                    isOpen: false,
                    formData: {
                      nome: '',
                      email: '',
                      cargo: 'Nutricionista',
                      senha: '',
                      permissoes: {
                        gerenciarUsuarios: false,
                        gerenciarTemplates: false,
                        verRelatorios: false,
                        gerenciarFinanceiro: false,
                      },
                    },
                  })
                }
                className="flex-1 px-4 py-2 rounded-lg border border-[#353534] text-[#E5E2E1] hover:bg-[#2A2A2A] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddUser}
                className="flex-1 px-4 py-2 rounded-lg bg-[#CCFF00] text-[#131313] font-medium hover:bg-[#D4FF1A] transition-colors"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

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
