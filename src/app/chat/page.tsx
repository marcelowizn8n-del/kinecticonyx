"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type FilterChip = "all" | "analyzing";

interface PatientCard {
  id: string;
  name: string;
  initials: string;
  badge1: string;
  badge2?: string;
  message: string;
  time: string;
  onlineStatus: "online" | "offline" | "analyzing";
}

const patients: PatientCard[] = [
  {
    id: "1",
    name: "Ricardo Mendes",
    initials: "RM",
    badge1: "HYPERTROPHY",
    badge2: "ANALYZING CHECK-IN",
    message: "The prescribed load for the split...",
    time: "12:45 PM",
    onlineStatus: "online",
  },
  {
    id: "2",
    name: "Carla Antunes",
    initials: "CA",
    badge1: "LOW ADHERENCE",
    message: "Missed morning macro tracking fo...",
    time: "09:12 AM",
    onlineStatus: "offline",
  },
  {
    id: "3",
    name: "Tiago Silva",
    initials: "TS",
    badge1: "FAT LOSS",
    badge2: "PLAN UPDATED",
    message: "Thanks coach! The new carb cycling...",
    time: "YESTERDAY",
    onlineStatus: "analyzing",
  },
];

export default function ChatPage() {
  const [activeFilter, setActiveFilter] = useState<FilterChip>("all");
  const pathname = usePathname();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "#CCFF00";
      case "offline":
        return "#C4C9AC";
      case "analyzing":
        return "#FFB4AB";
      default:
        return "#8E9379";
    }
  };

  const getInitialsBgColor = (initials: string) => {
    const colors = [
      "bg-surface-high",
      "bg-surface-container",
      "bg-surface-container-high",
    ];
    return colors[initials.charCodeAt(0) % colors.length];
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
            <h1 className="text-base font-black tracking-tight text-on-surface font-headline">
              KINETIC CHAT
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-on-surface hover:opacity-70 transition-opacity active:scale-90 duration-200">
              <span className="material-symbols-outlined text-xl">search</span>
            </button>
            <button className="text-on-surface hover:opacity-70 transition-opacity active:scale-90 duration-200">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-4 px-6 max-w-md mx-auto flex-1 w-full">
        {/* Filter Tabs */}
        <section className="mb-8">
          <div className="flex gap-3 pb-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors flex-shrink-0 ${
                activeFilter === "all"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-high text-on-surface-variant"
              }`}
            >
              ALL MESSAGES
            </button>
            <button
              onClick={() => setActiveFilter("analyzing")}
              className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 flex-shrink-0 ${
                activeFilter === "analyzing"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-high text-on-surface-variant"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-primary" style={{ background: "#CCFF00" }}></span>
              ANALYZING CHECK-IN
            </button>
          </div>
        </section>

        {/* Message Cards */}
        <div className="space-y-3 mb-12">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="backdrop-blur-[20px] rounded-lg p-4 flex gap-4 items-start transition-all active:scale-[0.98]"
              style={{ background: "rgba(42, 42, 42, 0.5)" }}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className={`w-12 h-12 rounded flex items-center justify-center text-xs font-bold text-on-surface border border-outline-variant/20 ${getInitialsBgColor(
                    patient.initials
                  )}`}
                >
                  {patient.initials}
                </div>
                <span
                  className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-background"
                  style={{
                    backgroundColor: getStatusColor(patient.onlineStatus),
                  }}
                ></span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-headline font-bold text-sm text-on-surface">
                    {patient.name}
                  </h3>
                  <span className="text-[10px] font-body text-on-surface-variant uppercase tracking-tight ml-2">
                    {patient.time}
                  </span>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className="text-[9px] font-bold px-2 py-1 rounded uppercase"
                    style={{
                      backgroundColor: "rgba(204, 255, 0, 0.15)",
                      color: "#CCFF00",
                    }}
                  >
                    {patient.badge1}
                  </span>
                  {patient.badge2 && (
                    <span
                      className="text-[9px] font-bold px-2 py-1 rounded uppercase"
                      style={{
                        backgroundColor: "rgba(204, 255, 0, 0.15)",
                        color: "#CCFF00",
                      }}
                    >
                      {patient.badge2}
                    </span>
                  )}
                </div>

                {/* Message */}
                <p className="text-sm text-on-surface-variant line-clamp-1">
                  {patient.message}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Engagement Stats */}
        <section className="mb-6">
          <h4 className="text-[10px] font-body text-on-surface-variant uppercase tracking-widest mb-4">
            DAILY ENGAGEMENT STATS
          </h4>
          <div className="grid grid-cols-3 gap-3">
            <div
              className="col-span-2 rounded-lg p-4 flex flex-col justify-between"
              style={{ background: "rgba(53, 53, 52, 0.5)" }}
            >
              <span className="text-[10px] font-bold text-primary uppercase">
                RESPONSE VELOCITY
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-headline font-black text-on-surface">
                  14
                </span>
                <span className="text-xs text-on-surface-variant">min avg</span>
              </div>
            </div>
            <div
              className="col-span-1 rounded-lg p-4 flex flex-col justify-between"
              style={{ background: "rgba(28, 27, 27, 0.5)" }}
            >
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                UNREAD
              </span>
              <span className="text-2xl font-headline font-black text-primary">
                03
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* FAB Button */}
      <button
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary rounded flex items-center justify-center text-on-primary transition-transform active:scale-90 z-50 font-bold"
        style={{ boxShadow: "0 8px 32px rgba(204, 255, 0, 0.3)" }}
      >
        <span
          className="material-symbols-outlined text-2xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          add_comment
        </span>
      </button>

      {/* Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-0 w-full h-20 flex justify-around items-center px-4 pb-4 z-40 rounded-t-2xl"
        style={{ background: "rgba(19, 19, 19, 0.6)", backdropFilter: "blur(20px)" }}
      >
        <Link
          href="/dashboard"
          className="flex flex-col items-center justify-center text-on-surface/50 hover:text-primary transition-colors active:scale-90 duration-150"
        >
          <span className="material-symbols-outlined mb-1">home</span>
          <span className="font-body text-[10px] font-bold uppercase tracking-tight">
            HOME
          </span>
        </Link>
        <Link
          href="/dieta"
          className="flex flex-col items-center justify-center text-on-surface/50 hover:text-primary transition-colors active:scale-90 duration-150"
        >
          <span className="material-symbols-outlined mb-1">restaurant</span>
          <span className="font-body text-[10px] font-bold uppercase tracking-tight">
            NUTRITION
          </span>
        </Link>
        <Link
          href="/treino"
          className="flex flex-col items-center justify-center text-on-surface/50 hover:text-primary transition-colors active:scale-90 duration-150"
        >
          <span className="material-symbols-outlined mb-1">fitness_center</span>
          <span className="font-body text-[10px] font-bold uppercase tracking-tight">
            TRAINING
          </span>
        </Link>
        <Link
          href="/chat"
          className={`flex flex-col items-center justify-center transition-colors active:scale-90 duration-150 ${
            pathname === "/chat" ? "text-primary font-bold" : "text-on-surface/50"
          }`}
        >
          <span
            className="material-symbols-outlined mb-1"
            style={
              pathname === "/chat"
                ? { fontVariationSettings: "'FILL' 1" }
                : {}
            }
          >
            forum
          </span>
          <span className="font-body text-[10px] font-bold uppercase tracking-tight">
            COMMUNITY
          </span>
        </Link>
      </nav>
    </div>
  );
}
