'use client'

import Link from 'next/link'

interface TopNavProps {
  title: string
  backHref?: string
  showBack?: boolean
}

export default function TopNav({
  title,
  backHref = '/dashboard',
  showBack = true,
}: TopNavProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-[#1C1B1B] backdrop-blur-sm z-50">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left: Back arrow */}
        <div className="w-10 flex items-center">
          {showBack ? (
            <Link
              href={backHref}
              className="inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-[#2A2A2A] transition-colors"
              aria-label="Go back"
            >
              <span className="material-symbols-outlined text-[#E5E2E1] text-xl">
                arrow_back
              </span>
            </Link>
          ) : null}
        </div>

        {/* Center: Title */}
        <div className="flex-1 flex items-center justify-center">
          <h1 className="font-manrope font-semibold text-lg text-[#E5E2E1] tracking-tight">
            {title}
          </h1>
        </div>

        {/* Right: Home icon */}
        <div className="w-10 flex items-center justify-end">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-[#2A2A2A] transition-colors"
            aria-label="Go to dashboard"
          >
            <span className="material-symbols-outlined text-[#E5E2E1] text-xl">
              home
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
