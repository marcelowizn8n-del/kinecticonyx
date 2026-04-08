"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function CheckinNutricaoPage() {
  const [adherence, setAdherence] = useState(75);
  const [selectedFriction, setSelectedFriction] = useState("taste");
  const [favoriteMealImage, setFavoriteMealImage] = useState<string | null>(null);
  const [difficultMealImage, setDifficultMealImage] = useState<string | null>(null);
  const fileInputRefDifficult = useRef<HTMLInputElement>(null);

  const frictionPoints = [
    { id: "cravings", label: "Cravings", icon: "favorite" },
    { id: "social", label: "Social", icon: "people" },
    { id: "time", label: "Time", icon: "schedule" },
    { id: "taste", label: "Taste", icon: "restaurant" },
    { id: "other", label: "Other", icon: "more_horiz" },
  ];

  const handleDifficultMealUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setDifficultMealImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // SVG Circle Progress for adherence gauge
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (adherence / 100) * circumference;

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background pb-24">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-4 bg-background/80 backdrop-blur-lg border-b border-outline-variant max-w-md mx-auto">
          <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-high transition-colors">
            <span className="material-symbols-outlined text-on-surface">close</span>
          </button>
          <h1 className="text-lg font-headline font-bold text-on-surface">Performance Check-in</h1>
          <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-high transition-colors">
            <span className="material-symbols-outlined text-on-surface">save</span>
          </button>
        </header>

        {/* Main Content */}
        <div className="pt-16 px-5 flex-1">
          {/* Progress Stepper */}
          <div className="mb-8">
            <div className="flex gap-1 mb-3">
              <div className="flex-1 h-2 rounded-full bg-primary" />
              <div className="flex-1 h-2 rounded-full bg-primary" />
              <div className="flex-1 h-2 rounded-full bg-surface-high" />
              <div className="flex-1 h-2 rounded-full bg-surface-high" />
            </div>
            <p className="text-xs font-label font-bold text-on-surface-variant uppercase tracking-wider">
              PHASE 02: NUTRITION
            </p>
          </div>

          {/* Section Title */}
          <div className="mb-6">
            <p className="text-xs font-label font-bold text-on-surface-variant uppercase tracking-wider mb-2">
              ADHERENCE METRICS
            </p>
            <h2 className="text-2xl font-headline font-bold text-on-surface">
              How was your adherence to the diet this week?
            </h2>
          </div>

          {/* Adherence Gauge */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative w-48 h-48 mb-4">
              <svg width="192" height="192" viewBox="0 0 192 192" className="transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-surface-high"
                />
                {/* Progress circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="text-primary transition-all duration-500"
                />
              </svg>
              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-headline font-bold text-primary">{adherence}</span>
                <span className="text-sm text-on-surface-variant">%</span>
              </div>
            </div>

            {/* Adherence Slider */}
            <div className="w-full">
              <input
                type="range"
                min="0"
                max="100"
                value={adherence}
                onChange={(e) => setAdherence(parseInt(e.target.value))}
                className="w-full h-2 rounded-full bg-surface-high appearance-none accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-xs text-on-surface-variant mt-2">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Friction Points */}
          <div className="mb-8">
            <p className="text-xs font-label font-bold text-on-surface-variant uppercase tracking-wider mb-3">
              IDENTIFY FRICTION POINTS
            </p>
            <div className="grid grid-cols-3 gap-2">
              {frictionPoints.map((point) => (
                <button
                  key={point.id}
                  onClick={() => setSelectedFriction(point.id)}
                  className={`flex flex-col items-center gap-2 py-3 px-2 rounded-lg transition-all ${
                    selectedFriction === point.id
                      ? "bg-primary text-on-primary"
                      : "bg-surface-high text-on-surface hover:border-primary/30 border border-outline-variant/30"
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">{point.icon}</span>
                  <span className="text-xs font-label font-semibold">{point.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Meal Feedback */}
          <div className="mb-8">
            <p className="text-xs font-label font-bold text-on-surface-variant uppercase tracking-wider mb-3">
              MEAL FEEDBACK
            </p>

            {/* Favorite Meal Card */}
            <div className="mb-4 glass-card rounded-2xl p-4 border border-outline-variant/30">
              <p className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
                Favorite Meal
              </p>
              <div className="flex gap-3">
                <div className="w-20 h-20 rounded-lg bg-surface-high flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant">restaurant</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-headline font-bold text-on-surface mb-1">Salmon Quinoa Bowl</h3>
                  <p className="text-xs text-on-surface-variant">Premium protein & whole grains</p>
                  <button className="mt-2 text-xs font-label font-bold text-primary hover:underline">
                    View Recipe
                  </button>
                </div>
              </div>
            </div>

            {/* Difficult Meal Card */}
            <div className="glass-card rounded-2xl p-4 border border-outline-variant/30">
              <p className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
                Difficult Meal
              </p>
              <div
                onClick={() => fileInputRefDifficult.current?.click()}
                className="border-2 border-dashed border-outline-variant/50 rounded-lg p-6 text-center cursor-pointer hover:border-primary/30 transition-colors"
              >
                {difficultMealImage ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={difficultMealImage}
                      alt="Difficult meal"
                      className="w-20 h-20 rounded-lg object-cover mb-2"
                    />
                    <p className="text-xs text-on-surface-variant">Tap to change</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined text-on-surface-variant text-3xl mb-2">
                      add_photo_alternate
                    </span>
                    <p className="text-sm font-label font-semibold text-on-surface mb-1">Upload meal image</p>
                    <p className="text-xs text-on-surface-variant">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRefDifficult}
                type="file"
                accept="image/*"
                onChange={handleDifficultMealUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 py-4 px-5 rounded-xl border border-outline-variant/30 text-on-surface font-headline font-bold text-base transition-transform hover:scale-105 active:scale-95">
              Back
            </button>
            <button className="flex-1 py-4 px-5 rounded-xl bg-primary text-on-primary font-headline font-bold text-base transition-transform hover:scale-105 active:scale-95">
              Continue Check-in
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
}
