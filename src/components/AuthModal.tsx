import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldAlert, LogIn, UserPlus, Sparkles, User, Mail, Lock } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signUp, signIn, signInWithGoogle, loading: isAuthenticating } = useAuth();
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authConfirmPassword, setAuthConfirmPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  const resetForm = () => {
    setAuthName("");
    setAuthEmail("");
    setAuthPassword("");
    setAuthConfirmPassword("");
    setAuthError(null);
  };

  const handleModeSwitch = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setAuthError(null);
  };

  const handleGoogleSignIn = async () => {
    setAuthError(null);
    try {
      await signInWithGoogle();
      onClose();
      resetForm();
    } catch (err: any) {
      console.error("Google Auth Error:", err);
      if (err.code === "auth/popup-blocked") {
        setAuthError("Popup blocked. Please allow popups for this site and try again.");
      } else {
        setAuthError("Google authentication could not be completed.");
      }
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!authEmail || !authPassword) {
      setAuthError("Please fill in all required fields.");
      return;
    }

    try {
      if (authMode === "signup") {
        if (!authName) {
          setAuthError("Name is required to initialize your profile.");
          return;
        }
        if (authPassword !== authConfirmPassword) {
          setAuthError("Passwords do not match.");
          return;
        }
        if (authPassword.length < 6) {
          setAuthError("Password must be at least 6 characters.");
          return;
        }
        await signUp(authName, authEmail, authPassword);
      } else {
        await signIn(authEmail, authPassword);
      }
      onClose();
      resetForm();
    } catch (err: any) {
      console.error("Auth Error:", err);
      if (err.code === "auth/email-already-in-use") {
        setAuthError("This email is already registered. Try signing in.");
      } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        setAuthError("Invalid email or password. Please verify your details.");
      } else if (err.code === "auth/operation-not-allowed") {
        setAuthError("Email/Password accounts are disabled in your Firebase console.");
      } else if (err.code === "auth/weak-password") {
        setAuthError("Password is too weak. Choose at least 6 characters.");
      } else {
        setAuthError(err.message || "An unexpected error occurred during authentication.");
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#03060a]/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090e17]/95 border border-border-dark/70 shadow-2xl shadow-black/80 p-6 md:p-8 scrollbar-thin scrollbar-thumb-border-dark"
          >
            {/* Corner Decorative Glowing Orbs */}
            <div className="absolute -top-12 -left-12 w-28 h-28 rounded-full bg-[#6C63FF]/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-28 h-28 rounded-full bg-[#00D1FF]/10 blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-surface-dark border border-border-dark/50 text-text-sub hover:text-white hover:border-[#00D1FF]/30 transition-all cursor-pointer"
              aria-label="Close authentication modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header / Title */}
            <div className="text-center space-y-2 mt-2 mb-6">
              <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-gradient-to-r from-[#6C63FF]/10 to-[#00D1FF]/10 border border-[#6C63FF]/20 text-[10px] font-mono text-[#00D1FF] uppercase tracking-widest">
                <Sparkles className="w-3 h-3 animate-pulse" />
                SUHX Hub Account
              </div>
              <h2 className="text-xl font-display font-extrabold text-white tracking-tight">
                {authMode === "signin" ? "Access SUHX Platform" : "Join SUHX Network"}
              </h2>
              <p className="text-xs text-text-sub max-w-xs mx-auto leading-relaxed">
                Unlock strategic consultations, tracking dashboards, and direct collaboration tools.
              </p>
            </div>

            {/* Primary Recommended Option: Google Sign-In */}
            <div className="space-y-3 mb-5">
              <div className="p-3 rounded-2xl bg-[#00D1FF]/5 border border-[#00D1FF]/15 space-y-1 text-left">
                <p className="text-[10px] font-mono font-bold text-[#00D1FF] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-pulse" />
                  Instant Authentication (Recommended)
                </p>
                <p className="text-[10px] text-text-sub leading-normal">
                  Google Verification works instantly with a single click.
                </p>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isAuthenticating}
                className="w-full py-3 rounded-xl border border-[#00D1FF]/30 bg-[#00D1FF]/5 text-xs font-mono text-[#00D1FF] hover:text-white hover:border-[#00D1FF] hover:bg-[#00D1FF]/10 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-bold uppercase tracking-wider">Fast Google Sign In</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 py-1 mb-4">
              <span className="h-px bg-border-dark/50 flex-1" />
              <span className="text-[9px] font-mono text-muted/40 uppercase tracking-widest">or use email / password</span>
              <span className="h-px bg-border-dark/50 flex-1" />
            </div>

            {/* Quick Admin Access Gateway Button */}
            <div className="mb-5 p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest mb-1.5 flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                ADMIN PORTAL ACCESS
              </p>
              <button
                type="button"
                onClick={async () => {
                  setAuthEmail("mohd.suhail114952@gmail.com");
                  setAuthPassword("Ahil@123");
                  setAuthName("MD Suhail");
                  setAuthConfirmPassword("Ahil@123");
                  setAuthError(null);
                  try {
                    if (authMode === "signup") {
                      await signUp("MD Suhail", "mohd.suhail114952@gmail.com", "Ahil@123");
                    } else {
                      await signIn("mohd.suhail114952@gmail.com", "Ahil@123");
                    }
                    onClose();
                    resetForm();
                  } catch (err: any) {
                    console.error("Admin Auth Error:", err);
                    if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
                      try {
                        // Attempt signup automatically as fallback
                        await signUp("MD Suhail", "mohd.suhail114952@gmail.com", "Ahil@123");
                        onClose();
                        resetForm();
                      } catch (signupErr: any) {
                        setAuthError("Admin creation failed. Please ensure Email/Password Auth is active in Firebase.");
                      }
                    } else {
                      setAuthError(err.message || "Admin validation failed.");
                    }
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/35 hover:bg-amber-500/20 hover:border-amber-400 text-[11px] font-mono font-bold text-amber-400 transition-all cursor-pointer uppercase tracking-wider relative z-10"
              >
                {authMode === "signup" ? "Admin Sign Up" : "Admin Sign In"}
              </button>
            </div>

            {/* Toggle Modes */}
            <div className="flex border-b border-border-dark/40 max-w-xs mx-auto mb-5">
              <button
                type="button"
                onClick={() => handleModeSwitch("signin")}
                className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  authMode === "signin"
                    ? "border-[#00D1FF] text-white font-bold"
                    : "border-transparent text-text-sub hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch("signup")}
                className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  authMode === "signup"
                    ? "border-[#00D1FF] text-white font-bold"
                    : "border-transparent text-text-sub hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-2 text-left">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span className="text-[11px] font-mono text-red-200 leading-normal">{authError}</span>
              </div>
            )}

            {/* Email/Password Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4 text-left">
              {authMode === "signup" && (
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-text-sub uppercase tracking-wider">Your Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
                    <input
                      type="text"
                      required
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#070B14]/70 border border-border-dark/65 focus:border-[#00D1FF]/50 text-xs font-mono text-white placeholder-muted/30 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-text-sub uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="partner@domain.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#070B14]/70 border border-border-dark/65 focus:border-[#00D1FF]/50 text-xs font-mono text-white placeholder-muted/30 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-text-sub uppercase tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#070B14]/70 border border-border-dark/65 focus:border-[#00D1FF]/50 text-xs font-mono text-white placeholder-muted/30 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {authMode === "signup" && (
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-text-sub uppercase tracking-wider">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50" />
                    <input
                      type="password"
                      required
                      value={authConfirmPassword}
                      onChange={(e) => setAuthConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#070B14]/70 border border-border-dark/65 focus:border-[#00D1FF]/50 text-xs font-mono text-white placeholder-muted/30 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] hover:opacity-90 active:scale-[0.98] transition-all text-xs font-mono font-bold text-white uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg shadow-[#6C63FF]/20"
              >
                {authMode === "signin" ? (
                  <>
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Authorize & Proceed</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Establish Account</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
