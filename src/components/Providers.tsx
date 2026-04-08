'use client';
import { AppProvider } from '@/lib/AppContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
