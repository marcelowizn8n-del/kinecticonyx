"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type FilterChip = "all" | "analyzing";

export default function BiometriaPage() {
  const pathname = usePathname();
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pb-24">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 backdrop-blur-[16px]" style={{ background: "rgba(19, 19, 19, 0.6)" }}>
        <div className="flex justify-between items-center px-6 h-16 w-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-highest overflow-hidden border border-outline-variant/20">
              <div className="w-full h-full bg-gradient-to-br from-primary/30 to-surface-high flex items-center justify-center text-xs font-bold text-on-surface">
                U
              </div>
            </div>
            <Link href="/dashboard" className="text-on-surface hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl">home</span>
            </Link>
            <h1 className="font-headline font-black text-base italic text-on-surface-variant">
              Performance Hub
            </h1>
          </div>
          <button className="text-on-surface hover:opacity-70 transition-opacity active:scale-90 duration-200">
            <span className="material-symbols-outlined text-xl">settings</span>
          </button>
        </div>
      </header>

      <main className="pt-20 pb-4 px-6 max-w-md mx-auto flex-1">
        {/* Title Section */}
        <header className="mb-8">
          <h2 className="font-headline font-black text-3xl tracking-tight text-on-surface mb-2">
            Laboratório de Biometria
          </h2>
          <p className="font-body text-xs text-on-surface-variant uppercase tracking-widest">
            BIOMETRIC PROGRESS LAB
          </p>
        </header>

        {/* Before/After Comparison */}
        <section className="mb-10">
          <div className="grid grid-cols-2 gap-3">
            {/* Day 01 */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #2A2A2A 0%, #1C1B1B 100%)" }}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-40">
                    person
                  </span>
                  <svg
                    className="w-16 h-16 text-primary-dark opacity-30"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <line x1="50%" y1="20%" x2="50%" y2="80%" />
                    <line x1="30%" y1="50%" x2="70%" y2="50%" />
                  </svg>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-surface-container-high/80 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-tight text-on-surface">
                DAY 01
              </div>
            </div>

            {/* Day 90 */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden group">
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #2A2A2A 0%, #1C1B1B 100%)" }}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-4xl text-primary opacity-60">
                    person
                  </span>
                  <svg
                    className="w-16 h-16 text-primary opacity-50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <line x1="50%" y1="20%" x2="50%" y2="80%" />
                    <line x1="30%" y1="50%" x2="70%" y2="50%" />
                  </svg>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-primary text-on-primary px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-tight shadow-lg" style={{ boxShadow: "0 4px 16px rgba(204, 255, 0, 0.2)" }}>
                DAY 90
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="space-y-4 mb-8">
          {/* Weight Comparison */}
          <div
            className="rounded-lg p-6 relative overflow-hidden"
            style={{ background: "rgba(53, 53, 52, 0.5)" }}
          >
            <p className="font-body text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">
              WEIGHT COMPARISON
            </p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-headline font-black text-4xl text-on-surface">
                82.4
              </span>
              <span className="font-body text-sm text-on-surface-variant">kg</span>
            </div>
            <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded" style={{ background: "rgba(204, 255, 0, 0.12)" }}>
              <span className="material-symbols-outlined text-sm" style={{ color: "#CCFF00" }}>
                trending_down
              </span>
              <span className="font-body font-bold text-xs" style={{ color: "#CCFF00" }}>
                -3.2kg
              </span>
            </div>
          </div>

          {/* Fat % */}
          <div
            className="rounded-lg p-6"
            style={{ background: "rgba(28, 27, 27, 0.5)" }}
          >
            <p className="font-body text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">
              FAT %
            </p>
            <div className="font-headline font-black text-3xl text-on-surface mb-2">
              14.2%
            </div>
            <div className="font-body text-xs font-bold" style={{ color: "#CCFF00" }}>
              -2.8% DELTA
            </div>
          </div>

          {/* Muscle & Postural Score */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className="rounded-lg p-6"
              style={{ background: "rgba(42, 42, 42, 0.5)" }}
            >
              <p className="font-body text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                MUSCLE
              </p>
              <div className="font-headline font-black text-2xl text-on-surface">
                +1.4kg
              </div>
            </div>

            <div
              className="rounded-lg p-6 flex flex-col justify-between"
              style={{ background: "rgba(53, 53, 52, 0.5)" }}
            >
              <p className="font-body text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                POSTURAL SCORE
              </p>
              <div className="flex items-baseline gap-1">
                <span className="font-headline font-black text-2xl text-primary">
                  94
                </span>
                <span className="font-body text-xs text-on-surface-variant">
                  / 100
                </span>
              </div>
              <div className="mt-3 w-10 h-10 rounded-full border-2 border-surface-variant relative flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 absolute"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "#CCFF00" }} />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Export Button */}
        <button onClick={() => showToast("Relatório exportado!")} className="w-full bg-primary text-on-primary py-4 rounded font-headline font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform mb-6">
          <span>EXPORTAR RELATÓRIO PDF</span>
          <span className="material-symbols-outlined text-base">download</span>
        </button>
      </main>

      {/* Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-0 w-full h-20 flex justify-around items-center px-4 pb-4 z-40 rounded-t-2xl"
        style={{ background: "rgba(19, 19, 19, 0.6)", backdropFilter: "blur(20px)" }}
      >
        <Link
          href="/dieta"
          className={`flex flex-col items-center justify-center transition-colors active:scale-90 duration-150 ${
            pathname === "/dieta"
              ? "text-primary font-bold"
              : "text-on-surface/50"
          }`}
        >
          <span
            className="material-symbols-outlined mb-1"
            style={
              pathname === "/dieta"
                ? { fontVariationSettings: "'FILL' 1" }
                : {}
            }
          >
            restaurant
          </span>
          <span className="font-body text-[10px] font-bold uppercase tracking-tight">
            FUEL
          </span>
        </Link>
        <Link
          href="/treino"
          className={`flex flex-col items-center justify-center transition-colors active:scale-90 duration-150 ${
            pathname === "/treino"
              ? "text-primary font-bold"
              : "text-on-surface/50"
          }`}
        >
          <span
            className="material-symbols-outlined mb-1"
            style={
              pathname === "/treino"
                ? { fontVariationSettings: "'FILL' 1" }
                : {}
            }
          >
            fitness_center
          </span>
          <span className="font-body text-[10px] font-bold uppercase tracking-tight">
            TRAINING
          </span>
        </Link>
        <Link
          href="/biometria"
          className={`flex flex-col items-center justify-center transition-colors active:scale-90 duration-150 ${
            pathname === "/biometria"
              ? "text-primary font-bold"
              : "text-on-surface/50"
          }`}
        >
          <span
            className="material-symbols-outlined mb-1"
            style={
              pathname === "/biometria"
                ? { fontVariationSettings: "'FILL' 1" }
                : {}
            }
          >
            query_stats
          </span>
          <span className="font-body text-[10px] font-bold uppercase tracking-tight">
            PROGRESS
          </span>
        </Link>
        <Link
          href="/alertas"
          className={`flex flex-col items-center justify-center transition-colors active:scale-90 duration-150 ${
            pathname === "/alertas"
              ? "text-primary font-bold"
              : "text-on-surface/50"
          }`}
        >
          <span
            className="material-symbols-outlined mb-1"
            style={
              pathname === "/alertas"
                ? { fontVariationSettings: "'FILL' 1" }
                : {}
            }
          >
            analytics
          </span>
          <span className="font-body text-[10px] font-bold uppercase tracking-tight">
            ALERTS
          </span>
        </Link>
      </nav>

      {toast && (
        <div className="fixed top-6 right-6 z-[100] px-6 py-3 rounded-lg text-sm font-bold" style={{ background: 'rgba(42,42,42,0.95)', backdropFilter: 'blur(16px)', color: '#CCFF00', border: '1px solid rgba(204,255,0,0.2)' }}>
          {toast}
        </div>
      )}
    </div>
  );
}
