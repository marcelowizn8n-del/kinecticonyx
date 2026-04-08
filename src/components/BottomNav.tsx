"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { label: "Início", href: "/", icon: "home" },
  { label: "Nutrition", href: "/checkin/nutricao", icon: "restaurant" },
  { label: "Coach", href: "/checkin/energia", icon: "fitness_center" },
  { label: "Fuel", href: "/substituicao", icon: "local_dining" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-outline-variant bg-surface-container-high/80 backdrop-blur-lg dark">
      <div className="mx-auto flex max-w-md items-center justify-around py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-2 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl" style={{ color: isActive ? "#CCFF00" : "#E5E2E1" }}>
                {item.icon}
              </span>
              <span
                className="text-xs font-medium transition-colors"
                style={{ color: isActive ? "#CCFF00" : "rgba(229, 226, 225, 0.5)" }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
