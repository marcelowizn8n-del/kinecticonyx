"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Elaborate wireframe SVG component for 3D human body mesh
function BioDigitalWireframe({ scanLinePosition }: { scanLinePosition: number }) {
  return (
    <svg
      viewBox="0 0 200 500"
      className="w-32 h-80 md:w-64 md:h-[600px] mx-auto"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Platform/scan base circle */}
      <defs>
        <filter id="wireframeGlow">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Holographic platform circles */}
      <circle
        cx="100"
        cy="480"
        r="60"
        fill="none"
        stroke="#CCFF00"
        strokeWidth="0.5"
        opacity="0.15"
      />
      <circle
        cx="100"
        cy="480"
        r="45"
        fill="none"
        stroke="#CCFF00"
        strokeWidth="0.4"
        opacity="0.25"
      />
      <circle
        cx="100"
        cy="480"
        r="30"
        fill="none"
        stroke="#CCFF00"
        strokeWidth="0.3"
        opacity="0.35"
      />

      {/* HEAD STRUCTURE - spherical mesh */}
      <ellipse cx="100" cy="70" rx="28" ry="32" fill="none" stroke="#CCFF00" strokeWidth="0.6" opacity="0.2" />
      {/* Head wireframe grid */}
      <path d="M 72 45 Q 75 35 100 32 Q 125 35 128 45" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.22" />
      <path d="M 70 55 Q 72 50 100 48 Q 128 50 130 55" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.22" />
      <path d="M 68 70 Q 70 65 100 63 Q 130 65 132 70" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.22" />
      <path d="M 70 85 Q 72 82 100 80 Q 128 82 130 85" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.22" />
      {/* Head contour - brighter */}
      <ellipse cx="100" cy="70" rx="28" ry="32" fill="none" stroke="#CCFF00" strokeWidth="1.2" opacity="0.4" />

      {/* JAW/CHIN definition */}
      <path d="M 75 95 Q 100 110 125 95" fill="none" stroke="#CCFF00" strokeWidth="0.8" opacity="0.3" />

      {/* NECK */}
      <path d="M 90 102 L 88 135" fill="none" stroke="#CCFF00" strokeWidth="0.7" opacity="0.2" />
      <path d="M 110 102 L 112 135" fill="none" stroke="#CCFF00" strokeWidth="0.7" opacity="0.2" />
      <path d="M 95 110 L 93 135" fill="none" stroke="#CCFF00" strokeWidth="0.6" opacity="0.15" />
      <path d="M 105 110 L 107 135" fill="none" stroke="#CCFF00" strokeWidth="0.6" opacity="0.15" />
      <path d="M 88 135 Q 100 138 112 135" fill="none" stroke="#CCFF00" strokeWidth="0.8" opacity="0.3" />

      {/* SHOULDER/TRAPEZIUS - contour */}
      <path d="M 88 135 L 60 155" fill="none" stroke="#CCFF00" strokeWidth="1.0" opacity="0.35" />
      <path d="M 112 135 L 140 155" fill="none" stroke="#CCFF00" strokeWidth="1.0" opacity="0.35" />

      {/* RIBCAGE - major structure */}
      <ellipse cx="100" cy="200" rx="32" ry="55" fill="none" stroke="#CCFF00" strokeWidth="1.1" opacity="0.38" />
      {/* Rib cage detail mesh */}
      <path d="M 70 165 Q 85 160 100 159 Q 115 160 130 165" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.18" />
      <path d="M 68 180 Q 85 175 100 174 Q 115 175 132 180" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.18" />
      <path d="M 66 200 Q 85 195 100 194 Q 115 195 134 200" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.18" />
      <path d="M 68 220 Q 85 217 100 216 Q 115 217 132 220" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.18" />
      <path d="M 70 240 Q 85 238 100 237 Q 115 238 130 240" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.18" />
      {/* Vertical rib structures */}
      <path d="M 75 165 L 72 245" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.16" />
      <path d="M 85 162 L 82 248" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.16" />
      <path d="M 115 162 L 118 248" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.16" />
      <path d="M 125 165 L 128 245" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.16" />

      {/* UPPER ARM - LEFT */}
      <path d="M 60 155 L 35 220" fill="none" stroke="#CCFF00" strokeWidth="0.9" opacity="0.3" />
      <path d="M 62 160 L 38 225" fill="none" stroke="#CCFF00" strokeWidth="0.8" opacity="0.25" />
      {/* Forearm LEFT */}
      <path d="M 35 220 L 25 310" fill="none" stroke="#CCFF00" strokeWidth="0.8" opacity="0.25" />
      <path d="M 38 225 L 28 315" fill="none" stroke="#CCFF00" strokeWidth="0.7" opacity="0.2" />
      {/* Hand LEFT */}
      <path d="M 25 310 L 15 330" fill="none" stroke="#CCFF00" strokeWidth="0.6" opacity="0.18" />
      <path d="M 28 315 L 18 335" fill="none" stroke="#CCFF00" strokeWidth="0.6" opacity="0.18" />

      {/* UPPER ARM - RIGHT */}
      <path d="M 140 155 L 165 220" fill="none" stroke="#CCFF00" strokeWidth="0.9" opacity="0.3" />
      <path d="M 138 160 L 162 225" fill="none" stroke="#CCFF00" strokeWidth="0.8" opacity="0.25" />
      {/* Forearm RIGHT */}
      <path d="M 165 220 L 175 310" fill="none" stroke="#CCFF00" strokeWidth="0.8" opacity="0.25" />
      <path d="M 162 225 L 172 315" fill="none" stroke="#CCFF00" strokeWidth="0.7" opacity="0.2" />
      {/* Hand RIGHT */}
      <path d="M 175 310 L 185 330" fill="none" stroke="#CCFF00" strokeWidth="0.6" opacity="0.18" />
      <path d="M 172 315 L 182 335" fill="none" stroke="#CCFF00" strokeWidth="0.6" opacity="0.18" />

      {/* ABDOMINAL region */}
      <ellipse cx="100" cy="270" rx="30" ry="40" fill="none" stroke="#CCFF00" strokeWidth="1.0" opacity="0.32" />
      {/* Abdominal mesh lines */}
      <path d="M 72 250 Q 85 245 100 244 Q 115 245 128 250" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.15" />
      <path d="M 70 270 Q 85 267 100 266 Q 115 267 130 270" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.15" />
      <path d="M 72 290 Q 85 288 100 287 Q 115 288 128 290" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.15" />

      {/* PELVIS */}
      <path d="M 75 295 L 70 330" fill="none" stroke="#CCFF00" strokeWidth="0.8" opacity="0.25" />
      <path d="M 125 295 L 130 330" fill="none" stroke="#CCFF00" strokeWidth="0.8" opacity="0.25" />
      <path d="M 70 330 Q 100 335 130 330" fill="none" stroke="#CCFF00" strokeWidth="0.9" opacity="0.3" />
      <ellipse cx="100" cy="320" rx="28" ry="20" fill="none" stroke="#CCFF00" strokeWidth="0.7" opacity="0.22" />

      {/* THIGH - LEFT */}
      <path d="M 75 330 L 70 420" fill="none" stroke="#CCFF00" strokeWidth="1.0" opacity="0.3" />
      <path d="M 82 332 L 77 422" fill="none" stroke="#CCFF00" strokeWidth="0.8" opacity="0.25" />
      {/* Thigh mesh left */}
      <path d="M 73 350 Q 80 348 88 347" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.15" />
      <path d="M 72 375 Q 80 373 89 372" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.15" />
      <path d="M 71 400 Q 80 398 90 397" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.15" />

      {/* CALF - LEFT */}
      <path d="M 70 420 L 68 475" fill="none" stroke="#CCFF00" strokeWidth="0.9" opacity="0.25" />
      <path d="M 77 422 L 75 477" fill="none" stroke="#CCFF00" strokeWidth="0.8" opacity="0.22" />

      {/* FOOT - LEFT */}
      <path d="M 68 475 L 58 485" fill="none" stroke="#CCFF00" strokeWidth="0.7" opacity="0.2" />
      <path d="M 75 477 L 65 487" fill="none" stroke="#CCFF00" strokeWidth="0.6" opacity="0.18" />

      {/* THIGH - RIGHT */}
      <path d="M 125 330 L 130 420" fill="none" stroke="#CCFF00" strokeWidth="1.0" opacity="0.3" />
      <path d="M 118 332 L 123 422" fill="none" stroke="#CCFF00" strokeWidth="0.8" opacity="0.25" />
      {/* Thigh mesh right */}
      <path d="M 127 350 Q 120 348 112 347" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.15" />
      <path d="M 128 375 Q 120 373 111 372" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.15" />
      <path d="M 129 400 Q 120 398 110 397" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.15" />

      {/* CALF - RIGHT */}
      <path d="M 130 420 L 132 475" fill="none" stroke="#CCFF00" strokeWidth="0.9" opacity="0.25" />
      <path d="M 123 422 L 125 477" fill="none" stroke="#CCFF00" strokeWidth="0.8" opacity="0.22" />

      {/* FOOT - RIGHT */}
      <path d="M 132 475 L 142 485" fill="none" stroke="#CCFF00" strokeWidth="0.7" opacity="0.2" />
      <path d="M 125 477 L 135 487" fill="none" stroke="#CCFF00" strokeWidth="0.6" opacity="0.18" />

      {/* SPINE/CENTRAL AXIS - contoured bright */}
      <path d="M 100 70 L 100 100 L 100 140 L 100 180 L 100 230 L 100 280 L 100 320 L 100 370" fill="none" stroke="#CCFF00" strokeWidth="1.4" opacity="0.45" filter="url(#wireframeGlow)" />

      {/* Additional mesh detail layers for anatomical accuracy */}
      {/* Chest cross-hatching */}
      <path d="M 75 175 Q 100 170 125 175" fill="none" stroke="#CCFF00" strokeWidth="0.4" opacity="0.12" />
      <path d="M 78 195 Q 100 190 122 195" fill="none" stroke="#CCFF00" strokeWidth="0.4" opacity="0.12" />
      <path d="M 80 215 Q 100 210 120 215" fill="none" stroke="#CCFF00" strokeWidth="0.4" opacity="0.12" />

      {/* Shoulder topology */}
      <path d="M 65 145 Q 70 140 75 140" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.16" />
      <path d="M 135 145 Q 130 140 125 140" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.16" />
      <path d="M 62 158 Q 68 153 80 150" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.16" />
      <path d="M 138 158 Q 132 153 120 150" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.16" />

      {/* Arm segment divisions */}
      <path d="M 35 240 L 37 250" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.14" />
      <path d="M 38 265 L 40 275" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.14" />
      <path d="M 165 240 L 163 250" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.14" />
      <path d="M 162 265 L 160 275" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.14" />

      {/* Wrist detail */}
      <circle cx="25" cy="310" r="2" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.18" />
      <circle cx="175" cy="310" r="2" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.18" />

      {/* Leg mesh divisions */}
      <path d="M 72 355 L 75 365" fill="none" stroke="#CCFF00" strokeWidth="0.4" opacity="0.13" />
      <path d="M 78 370 L 80 380" fill="none" stroke="#CCFF00" strokeWidth="0.4" opacity="0.13" />
      <path d="M 128 355 L 125 365" fill="none" stroke="#CCFF00" strokeWidth="0.4" opacity="0.13" />
      <path d="M 122 370 L 120 380" fill="none" stroke="#CCFF00" strokeWidth="0.4" opacity="0.13" />

      {/* Knee structure */}
      <ellipse cx="73" cy="425" rx="3" ry="5" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.2" />
      <ellipse cx="127" cy="425" rx="3" ry="5" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.2" />

      {/* Ankle/foot topology */}
      <path d="M 68 470 L 65 480" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.15" />
      <path d="M 132 470 L 135 480" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.15" />

      {/* Pelvic region additional structure */}
      <path d="M 80 310 Q 90 308 100 310" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.16" />
      <path d="M 100 310 Q 110 308 120 310" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.16" />
      <path d="M 78 325 Q 100 320 122 325" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.16" />

      {/* Core musculature layers */}
      <path d="M 95 200 L 105 200" fill="none" stroke="#CCFF00" strokeWidth="0.4" opacity="0.14" />
      <path d="M 93 230 L 107 230" fill="none" stroke="#CCFF00" strokeWidth="0.4" opacity="0.14" />
      <path d="M 94 260 L 106 260" fill="none" stroke="#CCFF00" strokeWidth="0.4" opacity="0.14" />

      {/* Facial contour mesh */}
      <path d="M 80 60 Q 100 55 120 60" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.18" />
      <path d="M 78 75 Q 100 72 122 75" fill="none" stroke="#CCFF00" strokeWidth="0.5" opacity="0.18" />

      {/* Breathing/expansion indicator paths */}
      <path d="M 68 185 L 65 190" fill="none" stroke="#CCFF00" strokeWidth="0.4" opacity="0.13" />
      <path d="M 132 185 L 135 190" fill="none" stroke="#CCFF00" strokeWidth="0.4" opacity="0.13" />

      {/* Scanning line animation */}
      <line
        x1="50"
        y1={scanLinePosition}
        x2="150"
        y2={scanLinePosition}
        stroke="#CCFF00"
        strokeWidth="1.5"
        opacity="0.8"
        filter="url(#wireframeGlow)"
      />
    </svg>
  );
}

export default function BioDigitalPage() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [scanLinePosition, setScanLinePosition] = useState(100);
  const pathname = usePathname();

  // Animated scan line
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLinePosition((prev) => {
        if (prev >= 500) return 50;
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Mobile view
  const mobileView = (
    <div className="min-h-screen flex flex-col bg-surface pb-24 md:hidden">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-high border border-outline-variant/30">
            <img
              alt="Patient Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUJ9ZjICuwKaq0JtfPIPMbDJi8U7p8d2ojJ_CSUqceqeqsx8npMkQtpVVVwtCm1vSkTgNbqXxdBOOut21vYuCzPmrF4U9o5mj_ESAx8QYPVbe5MP-lIleK0Zsur-pBf1MDLnDxFZzlMw0YKYxkoDfGS5MEjW4UNVMnl7TzHtczGF0qHOAVHyldQhFQEmhnpaScQyUhisBZR2znUvZmWml5qbXwarbX2259XwCbxlQEiuAJjlh9W51RFSXlaWrhc4n_uHKAJ0aH4Qej"
            />
          </div>
        </div>
        <h1 className="text-xs font-black tracking-widest text-primary uppercase font-headline">
          BIO-DIGITAL LAB
        </h1>
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="hover:opacity-80 transition-opacity text-on-surface text-xl">
            <span className="material-symbols-outlined">home</span>
          </Link>
          <button
            className="hover:opacity-80 transition-opacity text-primary text-xl"
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="relative pt-16 flex-1 overflow-y-auto">
        {/* 3D Wireframe Body Section */}
        <div className="relative w-full py-6 flex items-center justify-center min-h-[420px]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-low/30 to-surface pointer-events-none z-10"></div>
          <BioDigitalWireframe scanLinePosition={scanLinePosition} />
        </div>

        {/* Floating Metric Cards around wireframe */}
        <section className="relative z-20 px-4 space-y-3 -mt-20">
          {/* Body Fat Card - positioned top-left */}
          <div className="glass-panel p-4 rounded-lg bg-surface-low/40 w-40">
            <p className="text-[9px] uppercase font-bold text-on-surface-variant tracking-widest mb-1">
              Body Fat Index
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-headline text-primary">14.2</span>
              <span className="text-xs font-bold text-primary/70">%</span>
            </div>
            <div className="w-full h-1 bg-surface-high/50 mt-2 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[14.2%] shadow-[0_0_6px_#CCFF00]"></div>
            </div>
            <p className="text-[8px] text-on-surface-variant mt-1">-0.5% this month</p>
          </div>

          {/* Weight/Height slider */}
          <div className="glass-panel p-3 rounded-lg bg-surface-low/40 flex items-center gap-4 w-48">
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-base mb-0.5">scale</span>
              <span className="text-sm font-bold text-on-surface">82.4</span>
              <span className="text-[7px] text-on-surface-variant">kg</span>
            </div>
            <div className="w-px h-12 bg-outline-variant/20"></div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-base mb-0.5">height</span>
              <span className="text-sm font-bold text-on-surface">184</span>
              <span className="text-[7px] text-on-surface-variant">cm</span>
            </div>
          </div>

          {/* Muscle Mass Card */}
          <div className="glass-panel p-4 rounded-lg bg-surface-low/40 w-40 ml-auto">
            <p className="text-[9px] uppercase font-bold text-on-surface-variant tracking-widest mb-1">
              Muscle Mass
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-headline text-primary">72.8</span>
              <span className="text-xs font-bold text-primary/70">kg</span>
            </div>
            <p className="text-[8px] text-primary mt-1 font-medium">+1.2kg this month</p>
          </div>
        </section>

        {/* Metric Details Grid Section */}
        <section className="px-4 space-y-4 mt-8 pb-4">
          {/* Metabolic Health Score */}
          <div className="bg-surface-low rounded-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-headline font-bold text-base text-on-surface">Metabolic Health</h3>
              <span className="bg-primary text-on-primary px-2 py-0.5 rounded text-[9px] font-black uppercase">
                Elite
              </span>
            </div>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black font-headline text-primary">94</span>
                  <span className="text-xs text-on-surface-variant">/100</span>
                </div>
                <p className="text-[8px] text-on-surface-variant mt-1 leading-tight">
                  Cellular recovery 12% above average
                </p>
              </div>
              <div className="w-16 h-16 relative flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    className="text-surface-high"
                    cx="32"
                    cy="32"
                    fill="transparent"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="3"
                  ></circle>
                  <circle
                    className="text-primary"
                    cx="32"
                    cy="32"
                    fill="transparent"
                    r="28"
                    stroke="currentColor"
                    strokeDasharray="176"
                    strokeDashoffset="11"
                    strokeWidth="3"
                    style={{ filter: "drop-shadow(0 0 3px #CCFF00)" }}
                  ></circle>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center material-symbols-outlined text-primary text-lg">
                  bolt
                </span>
              </div>
            </div>
          </div>

          {/* Two column stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-high rounded-lg p-4 flex flex-col justify-between">
              <span className="material-symbols-outlined text-primary mb-2 text-lg">water_drop</span>
              <div>
                <p className="text-[9px] uppercase font-bold text-on-surface-variant mb-0.5">Hydration</p>
                <p className="text-lg font-bold text-on-surface">68%</p>
              </div>
            </div>
            <div className="bg-surface-high rounded-lg p-4 flex flex-col justify-between">
              <span className="material-symbols-outlined text-primary mb-2 text-lg">vital_signs</span>
              <div>
                <p className="text-[9px] uppercase font-bold text-on-surface-variant mb-0.5">HRV</p>
                <p className="text-lg font-bold text-on-surface">72 ms</p>
              </div>
            </div>
          </div>

          {/* Macros Grid */}
          <div className="bg-surface-low rounded-lg overflow-hidden flex h-24">
            <div className="w-[55%] p-4 bg-surface-high/40 flex flex-col justify-between">
              <p className="text-[8px] uppercase font-bold text-on-surface-variant tracking-widest">
                Protein Goal
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-primary">185</span>
                <span className="text-[8px] font-bold text-on-surface-variant">/ 210g</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col divide-y divide-outline-variant/20">
              <div className="h-1/2 p-3 px-4 flex items-center justify-between">
                <span className="text-[8px] font-bold text-on-surface-variant">CARBS</span>
                <span className="text-xs font-black text-on-surface">240g</span>
              </div>
              <div className="h-1/2 p-3 px-4 flex items-center justify-between">
                <span className="text-[8px] font-bold text-on-surface-variant">FATS</span>
                <span className="text-xs font-black text-on-surface">65g</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-20 pb-safe bg-surface/95 backdrop-blur-md z-50 border-t border-outline-variant/20">
        <Link
          href="/bio-digital"
          className={`flex flex-col items-center justify-center transition-colors ${
            pathname === "/bio-digital"
              ? "text-primary"
              : "text-on-surface/50 hover:text-on-surface/70"
          }`}
        >
          <span className="material-symbols-outlined text-xl">view_in_ar</span>
          <span className="font-body text-[9px] uppercase font-bold mt-0.5">Twin</span>
        </Link>
        <Link
          href="/biometria"
          className={`flex flex-col items-center justify-center transition-colors ${
            pathname === "/biometria"
              ? "text-primary"
              : "text-on-surface/50 hover:text-on-surface/70"
          }`}
        >
          <span className="material-symbols-outlined text-xl">monitoring</span>
          <span className="font-body text-[9px] uppercase font-bold mt-0.5">Stats</span>
        </Link>
        <Link
          href="/dieta"
          className={`flex flex-col items-center justify-center transition-colors ${
            pathname === "/dieta"
              ? "text-primary"
              : "text-on-surface/50 hover:text-on-surface/70"
          }`}
        >
          <span className="material-symbols-outlined text-xl">nutrition</span>
          <span className="font-body text-[9px] uppercase font-bold mt-0.5">Fuel</span>
        </Link>
        <Link
          href="/pacientes/pat-001"
          className={`flex flex-col items-center justify-center transition-colors ${
            pathname === "/pacientes/pat-001"
              ? "text-primary"
              : "text-on-surface/50 hover:text-on-surface/70"
          }`}
        >
          <span className="material-symbols-outlined text-xl">person</span>
          <span className="font-body text-[9px] uppercase font-bold mt-0.5">Me</span>
        </Link>
      </nav>
    </div>
  );

  // Desktop/Workstation view
  const desktopView = (
    <div className="hidden md:flex min-h-screen flex-col bg-surface">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/20 h-14 flex items-center px-8">
        <h1 className="text-lg font-black tracking-widest text-primary uppercase font-headline flex-1">
          BIO-DIGITAL LAB
        </h1>
        <div className="flex gap-8 items-center">
          <button className="text-sm font-bold text-primary uppercase tracking-wide hover:opacity-70">
            WORKSTATION
          </button>
          <button className="text-sm font-bold text-on-surface-variant uppercase tracking-wide hover:text-on-surface">
            PROTOCOL
          </button>
          <button className="text-sm font-bold text-on-surface-variant uppercase tracking-wide hover:text-on-surface">
            BIOMETRICS
          </button>
          <Link href="/dashboard" className="text-on-surface hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">home</span>
          </Link>
        </div>
      </header>

      <div className="flex flex-1 pt-14">
        {/* Left Sidebar */}
        <aside className="w-48 bg-surface-low border-r border-outline-variant/20 p-6 overflow-y-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-sm">link</span>
              <p className="text-[11px] uppercase font-bold text-primary tracking-widest">Neural Link</p>
            </div>
            <p className="text-[9px] text-on-surface-variant bg-surface-high/50 px-2 py-1 rounded">
              ACTIVE SESSIONS: 1
            </p>
            <div className="text-[10px] text-primary/70 mt-2 font-mono">02:34:12</div>
          </div>

          <nav className="space-y-2">
            <button className="w-full text-left px-3 py-2 rounded text-[11px] font-bold uppercase text-primary bg-surface-high/50 tracking-widest">
              Anatomy
            </button>
            <button className="w-full text-left px-3 py-2 rounded text-[11px] font-bold uppercase text-on-surface-variant hover:text-on-surface tracking-widest">
              Biometrics
            </button>
            <button className="w-full text-left px-3 py-2 rounded text-[11px] font-bold uppercase text-on-surface-variant hover:text-on-surface tracking-widest">
              Timeline
            </button>
            <button className="w-full text-left px-3 py-2 rounded text-[11px] font-bold uppercase text-on-surface-variant hover:text-on-surface tracking-widest">
              Diagnostics
            </button>
            <button className="w-full text-left px-3 py-2 rounded text-[11px] font-bold uppercase text-on-surface-variant hover:text-on-surface tracking-widest">
              Archive
            </button>
          </nav>
        </aside>

        {/* Center Main Content */}
        <main className="flex-1 overflow-y-auto flex flex-col items-center justify-center py-12 px-12">
          <div className="relative w-full max-w-2xl h-[600px] flex items-center justify-center">
            <BioDigitalWireframe scanLinePosition={scanLinePosition} />

            {/* Holographic rings at feet */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 space-y-2">
              <div className="w-40 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-full"></div>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Floating Data Panels */}
          <div className="grid grid-cols-3 gap-6 mt-12 w-full">
            <div className="bg-surface-high rounded-lg p-5">
              <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-2">
                Body Fat Index
              </p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-black font-headline text-primary">14.2%</span>
              </div>
              <p className="text-[9px] text-primary">-0.5% this month</p>
            </div>

            <div className="bg-surface-high rounded-lg p-5">
              <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-2">
                Weight
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-headline text-primary">82.4</span>
                <span className="text-xs text-primary/70">kg</span>
              </div>
            </div>

            <div className="bg-surface-high rounded-lg p-5">
              <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-2">
                Muscle Mass
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black font-headline text-primary">72.8</span>
                <span className="text-xs text-primary/70">kg</span>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Biometric History */}
        <aside className="w-56 bg-surface-low border-l border-outline-variant/20 p-6 overflow-y-auto">
          <h3 className="text-sm font-black uppercase text-on-surface mb-6 tracking-wide">Biometric History</h3>

          <div className="space-y-6">
            {/* Fat % chart */}
            <div>
              <p className="text-[9px] uppercase font-bold text-on-surface-variant mb-2">Fat %</p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[8px] text-on-surface-variant w-8">Today</span>
                  <div className="flex-1 h-1.5 bg-surface-high rounded overflow-hidden">
                    <div className="h-full bg-primary w-[14.2%]"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] text-on-surface-variant w-8">Avg</span>
                  <div className="flex-1 h-1.5 bg-surface-high rounded overflow-hidden">
                    <div className="h-full bg-primary/50 w-[14.8%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metabolic Age */}
            <div className="bg-surface-high rounded-lg p-4">
              <p className="text-[9px] uppercase font-bold text-on-surface-variant mb-2">Metabolic Age</p>
              <p className="text-2xl font-black font-headline text-primary">24</p>
              <p className="text-[8px] text-on-surface-variant mt-1">5 years younger</p>
            </div>

            {/* Muscle Mass */}
            <div className="bg-surface-high rounded-lg p-4">
              <p className="text-[9px] uppercase font-bold text-on-surface-variant mb-2">Muscle Mass</p>
              <p className="text-2xl font-black font-headline text-on-surface">72.8</p>
              <span className="text-[7px] text-on-surface-variant">kg</span>
            </div>

            {/* Water % */}
            <div>
              <p className="text-[9px] uppercase font-bold text-on-surface-variant mb-2">Water %</p>
              <div className="space-y-2 text-[8px]">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Intracellular</span>
                  <span className="text-on-surface font-bold">38%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Extracellular</span>
                  <span className="text-on-surface font-bold">30%</span>
                </div>
              </div>
            </div>

            {/* Tissue Density */}
            <div>
              <p className="text-[9px] uppercase font-bold text-on-surface-variant mb-3 tracking-widest">
                Tissue Density
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[7px] text-on-surface-variant w-6">Bone</span>
                  <div className="flex-1 h-1 bg-surface rounded overflow-hidden">
                    <div className="h-full bg-primary w-[70%]"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[7px] text-on-surface-variant w-6">Muscle</span>
                  <div className="flex-1 h-1 bg-surface rounded overflow-hidden">
                    <div className="h-full bg-primary w-[86%]"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[7px] text-on-surface-variant w-6">Fat</span>
                  <div className="flex-1 h-1 bg-surface rounded overflow-hidden">
                    <div className="h-full bg-primary w-[42%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom actions */}
          <button className="w-full mt-8 bg-primary text-on-primary py-2 px-4 rounded-lg text-[10px] font-black uppercase tracking-wider hover:opacity-90 transition-opacity">
            Initiate Scan
          </button>

          {/* Bottom nav */}
          <div className="flex justify-around mt-6 pt-6 border-t border-outline-variant/20">
            <button className="text-[8px] uppercase font-bold text-primary tracking-widest">Live</button>
            <button className="text-[8px] uppercase font-bold text-on-surface-variant hover:text-on-surface">Layers</button>
            <button className="text-[8px] uppercase font-bold text-on-surface-variant hover:text-on-surface">Export</button>
          </div>
        </aside>
      </div>
    </div>
  );

  return (
    <>
      {mobileView}
      {desktopView}
    </>
  );
}
