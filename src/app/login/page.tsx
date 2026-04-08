"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Admin credentials
const ADMIN_USER = {
  email: "marcelowiz@gmail.com",
  password: "Gulex0519!@",
  name: "Marcelo",
  role: "admin",
};

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Sign Up fields
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
        localStorage.setItem(
          "kinetic_user",
          JSON.stringify({ name: ADMIN_USER.name, email: ADMIN_USER.email, role: ADMIN_USER.role })
        );
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Check your email and password.");
        setLoading(false);
      }
    }, 800);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!signupName || !signupEmail || !signupPassword) {
      setError("All fields are required.");
      return;
    }
    if (signupPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setSignupSuccess(true);
      setLoading(false);
      setTimeout(() => {
        setActiveTab("login");
        setEmail(signupEmail);
        setSignupSuccess(false);
      }, 2000);
    }, 800);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      localStorage.setItem(
        "kinetic_user",
        JSON.stringify({ name: "Marcelo", email: "marcelowiz@gmail.com", role: "admin", provider: "google" })
      );
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Header / Brand */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md pt-[env(safe-area-inset-top,0px)]">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="text-lg font-extrabold tracking-tighter text-primary font-headline uppercase">
            KINETIC ONYX
          </div>
          <div className="font-headline text-[8px] uppercase tracking-[0.3em] text-white/40">
            Clinical Edge
          </div>
        </div>
      </header>

      {/* Background Decor */}
      <div className="absolute inset-0 clinical-grid pointer-events-none opacity-60"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -ml-20 -mb-20"></div>

      {/* Content */}
      <main className="relative z-10 w-full max-w-md mx-auto flex flex-col flex-grow pt-24 pb-12 overflow-hidden px-6">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="font-headline text-4xl font-extrabold tracking-tighter leading-none mb-3">
            ELITE
            <br />
            <span className="text-primary uppercase">AUTHENTICATION</span>
          </h1>
          <p className="text-on-surface-variant/80 font-light text-sm max-w-[280px] leading-relaxed">
            Initialize your clinical-grade performance session.
          </p>
        </div>

        {/* Main Auth Interface */}
        <div className="glass-card rounded-xl p-1 flex-grow flex flex-col shadow-2xl border border-white/5">
          {/* Toggle Tab */}
          <div className="flex p-1 bg-white/5 rounded-lg mb-6">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 text-xs font-headline font-bold uppercase tracking-widest rounded-md transition-all ${
                activeTab === "login"
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-3 text-xs font-headline font-bold uppercase tracking-widest rounded-md transition-all ${
                activeTab === "signup"
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Section */}
          <div className="px-3 flex-grow flex flex-col justify-center">
            {/* Error message */}
            {error && (
              <div className="mb-4 px-4 py-3 rounded-lg bg-error-container/30 border border-error/20">
                <p className="text-error text-xs font-medium">{error}</p>
              </div>
            )}

            {/* Signup success message */}
            {signupSuccess && (
              <div className="mb-4 px-4 py-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-primary text-xs font-medium">Account created! Redirecting to login...</p>
              </div>
            )}

            {activeTab === "login" ? (
              /* LOGIN FORM */
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold ml-1">
                    Email Identifier
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="marcelowiz@gmail.com"
                    className="w-full glass-input rounded-xl py-4 px-5 text-on-surface placeholder:text-white/20 focus:ring-1 focus:ring-primary/50 transition-all text-sm border-0 outline-0"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold">
                      Security Credential
                    </label>
                    <a
                      href="#"
                      className="text-[9px] uppercase tracking-widest text-primary/60 hover:text-primary transition-colors"
                    >
                      Forgot?
                    </a>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="••••••••"
                    className="w-full glass-input rounded-xl py-4 px-5 text-on-surface placeholder:text-white/20 focus:ring-1 focus:ring-primary/50 transition-all text-sm border-0 outline-0"
                    required
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:brightness-110 active:scale-[0.97] transition-all text-on-primary font-headline font-extrabold py-5 rounded-xl uppercase tracking-widest text-sm shadow-[0_8px_30px_rgba(204,255,0,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></span>
                        Authenticating...
                      </span>
                    ) : (
                      "Initialize Session"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* SIGN UP FORM */
              <form onSubmit={handleSignup} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={signupName}
                    onChange={(e) => { setSignupName(e.target.value); setError(""); }}
                    placeholder="Your full name"
                    className="w-full glass-input rounded-xl py-4 px-5 text-on-surface placeholder:text-white/20 focus:ring-1 focus:ring-primary/50 transition-all text-sm border-0 outline-0"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold ml-1">
                    Email Identifier
                  </label>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => { setSignupEmail(e.target.value); setError(""); }}
                    placeholder="name@onyx.labs"
                    className="w-full glass-input rounded-xl py-4 px-5 text-on-surface placeholder:text-white/20 focus:ring-1 focus:ring-primary/50 transition-all text-sm border-0 outline-0"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold ml-1">
                    Create Password
                  </label>
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => { setSignupPassword(e.target.value); setError(""); }}
                    placeholder="Min. 6 characters"
                    className="w-full glass-input rounded-xl py-4 px-5 text-on-surface placeholder:text-white/20 focus:ring-1 focus:ring-primary/50 transition-all text-sm border-0 outline-0"
                    required
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:brightness-110 active:scale-[0.97] transition-all text-on-primary font-headline font-extrabold py-5 rounded-xl uppercase tracking-widest text-sm shadow-[0_8px_30px_rgba(204,255,0,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></span>
                        Creating Account...
                      </span>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Bio-Sync Link divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[8px] uppercase tracking-[0.4em]">
                <span className="bg-background px-3 text-on-surface-variant/40">Bio-Sync Link</span>
              </div>
            </div>

            {/* Social: Visual minimal icons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex items-center justify-center gap-2 glass-input py-4 rounded-xl active:bg-white/10 transition-colors hover:bg-white/5 disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  ></path>
                </svg>
                <span className="text-[9px] uppercase font-bold tracking-widest text-on-surface">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 glass-input py-4 rounded-xl active:bg-white/10 transition-colors hover:bg-white/5 opacity-40 cursor-not-allowed">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    d="M17.05 20.28c-.96.95-2.22 1.44-3.54 1.44-1.32 0-2.31-.41-3.13-.41-.83 0-1.94.41-3.26.41-1.32 0-2.67-.53-3.71-1.63-2.15-2.23-2.15-6.07 0-8.31 1.04-1.1 2.39-1.63 3.71-1.63 1.32 0 2.22.41 3.26.41.83 0 1.81-.41 3.13-.41 1.32 0 2.58.49 3.54 1.44 1.83 1.82 1.83 5.08 0 6.9zM12 7.15c.01-1.94 1.57-3.5 3.51-3.51.01 1.94-1.57 3.5-3.51 3.51z"
                    fill="white"
                  ></path>
                </svg>
                <span className="text-[9px] uppercase font-bold tracking-widest text-on-surface/50">Apple</span>
              </button>
            </div>
          </div>
        </div>

        {/* Trust / Status Micro-copy */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="p-4 glass-card rounded-xl border border-white/5">
            <div className="text-[7px] uppercase tracking-[0.2em] mb-1 text-primary">System Uptime</div>
            <div className="font-headline text-sm font-bold text-on-surface">99.98%</div>
          </div>
          <div className="p-4 glass-card rounded-xl border border-white/5">
            <div className="text-[7px] uppercase tracking-[0.2em] mb-1 text-white/40">Clinical Labs</div>
            <div className="font-headline text-sm font-bold text-on-surface">Global-12</div>
          </div>
        </div>
      </main>

      {/* Footer: Minimal Mobile */}
      <footer className="pb-8 px-6 pt-4 border-t border-white/5 bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-6">
            <a href="#" className="text-[8px] uppercase tracking-widest text-white/30 hover:text-white/50 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-[8px] uppercase tracking-widest text-white/30 hover:text-white/50 transition-colors">
              Terms
            </a>
            <a href="#" className="text-[8px] uppercase tracking-widest text-white/30 hover:text-white/50 transition-colors">
              Science
            </a>
          </div>
          <div className="text-[7px] uppercase tracking-[0.3em] text-white/20">
            © 2026 Kinetic Onyx
          </div>
        </div>
      </footer>

      {/* Safe area spacer */}
      <div className="fixed bottom-0 left-0 w-full h-[env(safe-area-inset-bottom,20px)] bg-background z-[100]"></div>
    </div>
  );
}
