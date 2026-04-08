"use client";

import { useState, useRef } from "react";
import Link from "next/link";

type FilterChip = "all" | "analyzing" | "updated";

interface PatientCard {
  id: string;
  name: string;
  avatar: string;
  badge: string;
  status: "analyzing" | "updated" | "error" | "offline";
  statusDot: string;
  message: string;
  time: string;
  onlineStatus: "online" | "offline" | "error";
}

const patients: PatientCard[] = [
  {
    id: "1",
    name: "Ricardo Mendes",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBtqv48KhYUMjyaCV8FdGyjH7MzZw5lZw7_a8nlV3E8wHAcenKLUBVqCmuwFj0BgUcRI-vUCPagGyZpWpIPU9ak0kEdGTX7yf0k_PyRrexX4ngHik63kaqmmufyY92Jy6eyyQCdCUimYUD0t-MmmFuaeLAAC04fOgpffQA97Z21_I7fwvgp9t2HL6bUTxf8fnmeV06iKzOCtx7R6j_ejFkhyNXzIfcsRJ5u02IveBsTbHL-UPKN-1rnBS_8zNIsCdY6fDQtIUwwfsln",
    badge: "Hypertrophy",
    status: "analyzing",
    statusDot: "#CCFF00",
    message: "The prescribed load for the split squats felt consistent today...",
    time: "12:45 PM",
    onlineStatus: "online",
  },
  {
    id: "2",
    name: "Carla Antunes",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDv-kvSf7zKXela4gH0M1VKQ_8rXKsYcvdOkRYAzoIkEHm-l5WMaC7zHD0lfWLLjK0Ddujg1CpQzZqyGKvvsOjmUmOKiXYs8v7QP9W8KBUCFVPbRkLEXCmsvtp9cbh4B3vkKekEwm5A5mQcaXxGTgLa4DlO9DUxiZzKpiqzn41-pMnseLkhuXfp98s1wFRB2Mkzq2B6FJvIuk9_cvKUPLJ2MN4w1Njh4IglgEpb1TnnUeFVKljjOMCg1MHtB3eCNVpvFT8kBJ1BR0Jw",
    badge: "Low Adherence",
    status: "error",
    statusDot: "#FFB4AB",
    message: "Missed morning macro tracking for 3 days.",
    time: "09:12 AM",
    onlineStatus: "error",
  },
  {
    id: "3",
    name: "Tiago Silva",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAN4q9bijnJM5a5OrqQd04uCZBGV-HT5Y023IKTvc7OBMcMjW9-RblQO7A8KceMcqNMw0Age0B-47X6np3Q47lbxqRHVaUz2UrxtM8FrCWhHzHcs4HrOY17eoojEArDFXzLA5uH9hqSeGHI_tdmjiIualbDoJ6tJfeh1mRgj0tQHkHDuwqIp7HDm2M3K92V8YZqMEsl8tkQ8E_pw7zJtgXCUjZCk1LPWYoZS4Zh_xrWPiuk7mLSjJaC3I0Tjc-lCiYM1s5n8xygkRxQ",
    badge: "Fat Loss",
    status: "updated",
    statusDot: "#CCFF00",
    message: "Thanks coach! The new carb cycling is working.",
    time: "Yesterday",
    onlineStatus: "offline",
  },
];

export default function ChatPage() {
  const [activeFilter, setActiveFilter] = useState<FilterChip>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "#CCFF00";
      case "error":
        return "#FFB4AB";
      case "offline":
        return "rgba(196, 201, 172, 0.4)";
      default:
        return "#8E9379";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pb-24">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 glass-header">
        <div className="flex justify-between items-center px-6 h-16 w-full">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-highest overflow-hidden border border-outline-variant/20">
              <img
                alt="User Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWCtQ_PK0N9CpdSGv0DFl9Bg-XTrrH8FrtmOL0SC71-WwcB-lnyLo5k34k_QIKro-IRvMZhpbtDF6_iFCfDCA_JrlhrfDsl6t5HpjsbVhcOHpL4Z3vZyjl5ukSO8LRmnjW5C1oy7PYUraAwxY3TXJ8Mb7IpBN1XjFUJ71l_f3W1xpNno6GeyD7by9KaMPjGe6aQ0_Y9M0kG1WiGaOZu2rI4JB7iua38nY8TJ8V-Ec1TSO1HHReG6AgO0DL5AxCYcd9sA0ijx2c3cz7"
              />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-on-surface font-headline">
              KINETIC CHAT
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-on-surface hover:opacity-80 transition-transform active:scale-95 duration-200">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="text-on-surface hover:opacity-80 transition-transform active:scale-95 duration-200">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </div>
      </header>

      <main className="pt-20 pb-4 px-4 max-w-md mx-auto flex-1 w-full">
        {/* Status Filter Grid (Asymmetric) */}
        <section className="mb-8">
          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto hide-scrollbar pb-2"
          >
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center gap-2 flex-shrink-0 transition-colors ${
                activeFilter === "all"
                  ? "bg-primary-container text-on-primary-container"
                  : "bg-surface-high text-on-surface-variant border border-outline-variant/10"
              }`}
            >
              All Messages
            </button>
            <button
              onClick={() => setActiveFilter("analyzing")}
              className={`px-4 py-2 rounded-lg font-medium text-xs uppercase tracking-widest flex items-center gap-2 flex-shrink-0 transition-colors ${
                activeFilter === "analyzing"
                  ? "bg-primary-container text-on-primary-container"
                  : "bg-surface-high text-on-surface-variant border border-outline-variant/10"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Analyzing Check-in
            </button>
            <button
              onClick={() => setActiveFilter("updated")}
              className={`px-4 py-2 rounded-lg font-medium text-xs uppercase tracking-widest flex items-center gap-2 flex-shrink-0 transition-colors ${
                activeFilter === "updated"
                  ? "bg-primary-container text-on-primary-container"
                  : "bg-surface-high text-on-surface-variant border border-outline-variant/10"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              Plan Updated
            </button>
          </div>
        </section>

        {/* Chat List Section */}
        <div className="space-y-4">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="bg-surface-low rounded-xl p-4 flex gap-4 items-center transition-all active:scale-[0.98]"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-lg bg-surface-highest overflow-hidden border border-outline-variant/20">
                  <img
                    alt={patient.name}
                    className="w-full h-full object-cover"
                    src={patient.avatar}
                  />
                </div>
                <span
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-surface-low"
                  style={{
                    backgroundColor: getStatusColor(patient.onlineStatus),
                  }}
                ></span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-headline font-bold text-on-surface truncate">
                    {patient.name}
                  </h3>
                  <span className="text-[10px] font-body text-on-surface-variant/60 uppercase tracking-tighter">
                    {patient.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase"
                    style={{
                      backgroundColor:
                        patient.status === "error"
                          ? "rgba(255, 180, 171, 0.1)"
                          : "rgba(204, 255, 0, 0.1)",
                      color:
                        patient.status === "error" ? "#FFB4AB" : "#CCFF00",
                      borderColor:
                        patient.status === "error"
                          ? "rgba(255, 180, 171, 0.2)"
                          : "rgba(204, 255, 0, 0.2)",
                    }}
                  >
                    {patient.badge}
                  </span>
                  <span
                    className="text-[9px] font-medium uppercase tracking-wide"
                    style={{
                      color:
                        patient.status === "updated"
                          ? "#CCFF00"
                          : "rgba(195, 244, 0, 1)",
                    }}
                  >
                    {patient.status === "error"
                      ? ""
                      : patient.status === "analyzing"
                        ? "Analyzing Check-in"
                        : "Plan Updated"}
                  </span>
                </div>
                <p
                  className={`text-sm text-on-surface-variant line-clamp-1 ${
                    patient.status === "error" ? "font-semibold text-on-surface" : ""
                  }`}
                >
                  {patient.message}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Macro-Grid (Signature Component) */}
        <section className="mt-12 mb-6">
          <h4 className="text-[10px] font-body text-on-surface-variant uppercase tracking-[0.2em] mb-4">
            Daily Engagement Stats
          </h4>
          <div className="grid grid-cols-6 gap-3 h-32">
            <div className="col-span-4 bg-surface-high rounded-xl p-4 flex flex-col justify-between border border-outline-variant/5">
              <span className="text-[10px] font-bold text-primary uppercase">
                Response Velocity
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-headline font-black text-on-surface">14</span>
                <span className="text-xs text-on-surface-variant">min avg</span>
              </div>
            </div>
            <div className="col-span-2 bg-surface-low rounded-xl p-4 flex flex-col justify-between border border-outline-variant/5">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                Unread
              </span>
              <span className="text-4xl font-headline font-black text-primary-container">
                03
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* FAB: Create New Message */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary rounded-xl shadow-[0_8px_32px_rgba(204,255,0,0.3)] flex items-center justify-center text-background transition-transform active:scale-90 z-50">
        <span
          className="material-symbols-outlined text-3xl font-bold"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          add_comment
        </span>
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full h-20 bg-background/80 backdrop-blur-xl flex justify-around items-center px-4 pb-4 z-50 rounded-t-xl shadow-[0_-4px_40px_-5px_rgba(0,0,0,0.6)]">
        <Link
          href="#"
          className="flex flex-col items-center justify-center text-on-surface/50 hover:text-primary transition-colors active:scale-90 duration-150"
        >
          <span className="material-symbols-outlined mb-1">dashboard</span>
          <span className="font-body text-[10px] font-medium uppercase tracking-widest">
            Home
          </span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center justify-center text-on-surface/50 hover:text-primary transition-colors active:scale-90 duration-150"
        >
          <span className="material-symbols-outlined mb-1">restaurant</span>
          <span className="font-body text-[10px] font-medium uppercase tracking-widest">
            Nutrition
          </span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center justify-center text-on-surface/50 hover:text-primary transition-colors active:scale-90 duration-150"
        >
          <span className="material-symbols-outlined mb-1">fitness_center</span>
          <span className="font-body text-[10px] font-medium uppercase tracking-widest">
            Training
          </span>
        </Link>
        <Link
          href="#"
          className="flex flex-col items-center justify-center text-primary font-bold active:scale-90 duration-150"
        >
          <span
            className="material-symbols-outlined mb-1"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            forum
          </span>
          <span className="font-body text-[10px] font-medium uppercase tracking-widest">
            Community
          </span>
        </Link>
      </nav>
    </div>
  );
}
