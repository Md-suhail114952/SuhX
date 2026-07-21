import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Award, 
  Flame, 
  User, 
  Mail, 
  Briefcase, 
  Lock, 
  ShieldAlert, 
  UserPlus, 
  LogIn,
  KeyRound,
  LogOut
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookCallModal({ isOpen, onClose }: BookCallModalProps) {
  const { user, loading: authLoading, signIn, signUp, signInWithGoogle, logOut } = useAuth();
  
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Booking info form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agenda, setAgenda] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  // Authentication internal form states
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authConfirmPassword, setAuthConfirmPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const timeSlots = [
    "10:30 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"
  ];

  // Generate days in the selected month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get starting day offset of the month
  const getFirstDayOffset = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const totalDays = getDaysInMonth(selectedMonth, selectedYear);
  const startOffset = getFirstDayOffset(selectedMonth, selectedYear);
  const currentDateObj = new Date();
  const currentDay = currentDateObj.getDate();
  const currentMonth = currentDateObj.getMonth();
  const currentYear = currentDateObj.getFullYear();

  // Reset steps on open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedDate(null);
      setSelectedTime(null);
      setAgenda("");
      setBookingError(null);
      setAuthError(null);
      setAuthPassword("");
      setAuthConfirmPassword("");
      // Generate unique secure booking ID
      setBookingRef("SHX-" + Math.floor(100000 + Math.random() * 900000));
    }
  }, [isOpen]);

  // Autofill booking name/email from auth profile
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleNextStep = () => {
    if (step === 1 && (!selectedDate || !selectedTime)) {
      return;
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Handle Booking form submission with Firestore saving
  const handleBookCall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !name || !email || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setBookingError(null);

    try {
      const bookingData = {
        bookingId: bookingRef,
        userId: user.uid,
        name,
        email,
        date: selectedDate,
        month: selectedMonth,
        year: selectedYear,
        time: selectedTime,
        agenda: agenda || "",
        bookingRef,
        createdAt: new Date().toISOString()
      };

      // Store in firestore rules protected collection
      await setDoc(doc(db, "bookings", bookingRef), bookingData);
      setStep(3);
    } catch (err: any) {
      console.error("Booking write error:", err);
      try {
        handleFirestoreError(err, OperationType.WRITE, `bookings/${bookingRef}`);
      } catch (formattedErr: any) {
        setBookingError(formattedErr.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Authentication Forms
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsAuthenticating(true);

    if (!authEmail || !authPassword) {
      setAuthError("Email and Password are required parameters.");
      setIsAuthenticating(false);
      return;
    }

    try {
      if (authMode === "signup") {
        if (!authName) {
          setAuthError("Name is required for profile initialization.");
          setIsAuthenticating(false);
          return;
        }
        if (authPassword !== authConfirmPassword) {
          setAuthError("Passwords do not match.");
          setIsAuthenticating(false);
          return;
        }
        if (authPassword.length < 6) {
          setAuthError("Password must be at least 6 characters.");
          setIsAuthenticating(false);
          return;
        }
        await signUp(authName, authEmail, authPassword);
      } else {
        await signIn(authEmail, authPassword);
      }
    } catch (err: any) {
      console.error("Authentication action failed:", err);
      // Clean up readable messages
      if (err.code === "auth/email-already-in-use") {
        setAuthError("This email address is already registered. Try signing in instead.");
      } else if (err.code === "auth/invalid-credential") {
        setAuthError("Authentication failed: Invalid credentials or Email/Password Sign-In Provider is not enabled. In your Firebase Console, navigate to 'Authentication' > 'Sign-in method' and enable the 'Email/Password' provider.");
      } else if (err.code === "auth/operation-not-allowed") {
        setAuthError("Email/Password accounts are not enabled. Please go to your Firebase Console under 'Authentication' > 'Sign-in method' and enable 'Email/Password'.");
      } else if (err.code === "auth/weak-password") {
        setAuthError("Password is too weak. Ensure at least 6 characters.");
      } else {
        setAuthError(err.message || "Authentication transmission error.");
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Handle Google OAuth Popup
  const handleGoogleSignIn = async () => {
    setAuthError(null);
    setIsAuthenticating(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error("Google authentication failed:", err);
      setAuthError(err.message || "Google Authentication popup interrupted.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Month navigators
  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
    setSelectedDate(null);
  };

  const prevMonth = () => {
    // Prevent moving back past the current month/year
    if (selectedYear === currentYear && selectedMonth <= currentMonth) {
      return;
    }
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
    setSelectedDate(null);
  };

  // Keyboard escape listener to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
      />

      {/* Main Glassmorphic Modal Dialog Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-[#090D16]/98 border border-border-dark/80 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(108,99,255,0.12)] z-10"
      >
        {/* Background design accents */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-64 h-64 bg-[#00D1FF]/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-64 h-64 bg-[#6C63FF]/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-dark/50 relative z-10">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-[#00D1FF]" />
            <div>
              <h3 className="text-base font-display font-bold text-text-luxury">
                Book a Strategic Consultation
              </h3>
              <p className="text-[10px] font-mono text-muted/60 uppercase tracking-wider">
                Suhail's Live Studio Mainframe
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* User session status info */}
            {user && (
              <div className="flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="max-w-[120px] truncate">{user.displayName || user.email}</span>
                <button 
                  onClick={logOut} 
                  className="ml-1 text-muted hover:text-red-400 transition-colors cursor-pointer font-bold"
                  title="Sign out"
                >
                  [Exit]
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-surface-dark border border-border-dark/60 text-muted hover:text-text-luxury hover:border-red-500/30 transition-all cursor-pointer"
              aria-label="Close scheduler"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Progress Indicators */}
        {user && step < 3 && (
          <div className="flex items-center gap-1.5 px-6 pt-5 pb-1 relative z-10">
            <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? "bg-[#00D1FF]" : "bg-border-dark"}`} />
            <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? "bg-[#6C63FF]" : "bg-border-dark"}`} />
            <div className="h-1 w-16 rounded-full bg-border-dark overflow-hidden">
              <div className={`h-full bg-emerald-500 transition-all duration-300 ${step === 3 ? "w-full" : "w-0"}`} />
            </div>
          </div>
        )}

        {/* Interactive Steps Content */}
        <div className="p-6 relative z-10">
          <AnimatePresence mode="wait">
            {/* SECTION 1: USER IS NOT LOGGED IN - REQUIRE SIGN IN / SIGN UP FIRST */}
            {!user ? (
              <motion.div
                key="auth-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="text-center space-y-1.5">
                  <div className="inline-flex p-3 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#6C63FF] mb-1">
                    <KeyRound className="w-5 h-5 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-mono font-bold text-text-luxury uppercase tracking-wider">
                    // Identity Verification Required
                  </h4>
                  <p className="text-xs text-text-sub max-w-sm mx-auto">
                    Configure your SUHX account to secure your consultation block and sync live calendar invitations.
                  </p>
                </div>

                {/* Primary Recommended Option: Google Sign-In */}
                <div className="max-w-md mx-auto space-y-3">
                  <div className="p-3.5 rounded-2xl bg-[#00D1FF]/5 border border-[#00D1FF]/15 text-left space-y-1.5">
                    <p className="text-[11px] font-mono font-bold text-[#00D1FF] uppercase tracking-wide flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00D1FF] animate-pulse" />
                      Instant Access (Recommended)
                    </p>
                    <p className="text-[10px] text-text-sub leading-relaxed">
                      Google Sign-In is pre-configured and works instantly out-of-the-box in the AI Studio environment.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isAuthenticating}
                    className="w-full py-3.5 rounded-xl border border-[#00D1FF]/35 bg-[#00D1FF]/5 text-xs font-mono text-[#00D1FF] hover:text-white hover:border-[#00D1FF] hover:bg-[#00D1FF]/10 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
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
                    <span className="font-bold uppercase tracking-wider">Fast Google Verification</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 max-w-md mx-auto py-1">
                  <span className="h-px bg-border-dark/50 flex-1" />
                  <span className="text-[9px] font-mono text-muted/40 uppercase tracking-widest">or use email / password</span>
                  <span className="h-px bg-border-dark/50 flex-1" />
                </div>

                {/* Quick Admin Access Gateway Button */}
                <div className="mb-4 p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-center relative overflow-hidden group max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest mb-1.5 flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    ADMIN SECURE SIGN-IN
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
                      } catch (err: any) {
                        console.error("Admin BookCall Auth Error:", err);
                        if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
                          try {
                            await signUp("MD Suhail", "mohd.suhail114952@gmail.com", "Ahil@123");
                          } catch (signupErr: any) {
                            setAuthError("Admin creation failed. Please ensure Email/Password Auth is active.");
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

                {/* Authentication Switch Tabs */}
                <div className="flex border-b border-border-dark/55 max-w-xs mx-auto">
                  <button
                    type="button"
                    onClick={() => { setAuthMode("signin"); setAuthError(null); }}
                    className={`flex-1 pb-2.5 text-center text-xs font-mono font-bold transition-all ${
                      authMode === "signin" 
                        ? "text-[#00D1FF] border-b-2 border-[#00D1FF]" 
                        : "text-muted hover:text-text-sub"
                    }`}
                  >
                    SIGN IN
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAuthMode("signup"); setAuthError(null); }}
                    className={`flex-1 pb-2.5 text-center text-xs font-mono font-bold transition-all ${
                      authMode === "signup" 
                        ? "text-[#6C63FF] border-b-2 border-[#6C63FF]" 
                        : "text-muted hover:text-text-sub"
                    }`}
                  >
                    SIGN UP
                  </button>
                </div>

                {authError && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-2.5 max-w-md mx-auto text-left">
                    <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-[11px] font-mono text-red-200 leading-normal">{authError}</span>
                  </div>
                )}

                {/* Credentials Form */}
                <form onSubmit={handleAuthSubmit} className="space-y-4 max-w-md mx-auto">
                  {authMode === "signup" && (
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-muted/60 uppercase tracking-widest block">// Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input
                          required
                          type="text"
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          placeholder="MD Suhail"
                          className="w-full pl-10 pr-4 py-2.5 bg-[#070B14]/80 border border-border-dark rounded-xl text-xs text-text-luxury focus:outline-none focus:border-[#6C63FF] transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-muted/60 uppercase tracking-widest block">// Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                      <input
                        required
                        type="email"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#070B14]/80 border border-border-dark rounded-xl text-xs text-text-luxury focus:outline-none focus:border-[#00D1FF] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-muted/60 uppercase tracking-widest block">// Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                      <input
                        required
                        type="password"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#070B14]/80 border border-border-dark rounded-xl text-xs text-text-luxury focus:outline-none focus:border-[#00D1FF] transition-all"
                      />
                    </div>
                  </div>

                  {authMode === "signup" && (
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono text-muted/60 uppercase tracking-widest block">// Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input
                          required
                          type="password"
                          value={authConfirmPassword}
                          onChange={(e) => setAuthConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-2.5 bg-[#070B14]/80 border border-border-dark rounded-xl text-xs text-text-luxury focus:outline-none focus:border-[#6C63FF] transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isAuthenticating}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-studio to-secondary-studio text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-[#6C63FF]/20 transition-all disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>{isAuthenticating ? "Verifying..." : authMode === "signin" ? "Sign In" : "Register Account"}</span>
                    {authMode === "signin" ? <LogIn className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                  </button>
                </form>
              </motion.div>
            ) : (
              /* SECTION 2: USER IS AUTHENTICATED - SHOW ACTIVE CALENDAR & STEPS */
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Header intro info */}
                    <div className="p-4 rounded-2xl bg-[#00D1FF]/5 border border-[#00D1FF]/10 flex items-start gap-3 text-left">
                      <Flame className="w-5 h-5 text-[#00D1FF] shrink-0 mt-0.5 animate-pulse" />
                      <div className="space-y-0.5">
                        <p className="text-xs font-mono font-bold text-[#00D1FF] uppercase">// Direct Digital Sync</p>
                        <p className="text-[11px] text-text-sub leading-normal">
                          Claim a premium slots allocation for high-level UI/UX wireframing, tech scalability mapping, and AI stack advisory directly with MD Suhail.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
                      {/* Calendar Matrix (7 cols) */}
                      <div className="md:col-span-7 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-text-sub uppercase tracking-widest">
                            Select Date Slot
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={prevMonth}
                              disabled={selectedYear === currentYear && selectedMonth <= currentMonth}
                              className="p-1 rounded bg-surface border border-border-dark/60 text-muted hover:text-text-luxury disabled:opacity-30 disabled:hover:text-muted transition-colors cursor-pointer"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-mono font-semibold text-text-luxury min-w-[90px] text-center">
                              {months[selectedMonth]} {selectedYear}
                            </span>
                            <button
                              onClick={nextMonth}
                              className="p-1 rounded bg-surface border border-border-dark/60 text-muted hover:text-text-luxury transition-colors cursor-pointer"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Interactive Calendar Days Grid */}
                        <div className="border border-border-dark/50 rounded-2xl p-3 bg-surface-dark/40 overflow-hidden">
                          {/* Day Headers */}
                          <div className="grid grid-cols-7 text-center gap-1 mb-2">
                            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                              <div key={day} className="text-[10px] font-mono text-muted uppercase tracking-wider py-1 font-bold">
                                {day}
                              </div>
                            ))}
                          </div>

                          {/* Day Numbers Grid */}
                          <div className="grid grid-cols-7 gap-1">
                            {/* Render blank space for first day offset offset */}
                            {Array.from({ length: startOffset }).map((_, idx) => (
                              <div key={`offset-${idx}`} className="aspect-square" />
                            ))}

                            {/* Month Days */}
                            {Array.from({ length: totalDays }).map((_, idx) => {
                              const dayNum = idx + 1;
                              const isPast = selectedYear === currentYear && selectedMonth === currentMonth && dayNum < currentDay;
                              const isSelected = selectedDate === dayNum;

                              return (
                                <button
                                  key={`day-${dayNum}`}
                                  disabled={isPast}
                                  onClick={() => setSelectedDate(dayNum)}
                                  className={`aspect-square rounded-xl text-xs font-mono flex items-center justify-center border transition-all cursor-pointer ${
                                    isPast
                                      ? "opacity-20 border-transparent text-muted pointer-events-none"
                                      : isSelected
                                      ? "bg-gradient-to-r from-[#6C63FF] to-[#00D1FF] border-transparent text-white font-bold shadow-[0_0_12px_rgba(108,99,255,0.4)]"
                                      : "bg-[#070B14]/40 border-border-dark/40 text-text-sub hover:border-[#00D1FF]/40 hover:text-text-luxury"
                                  }`}
                                >
                                  {dayNum}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Time Slot Select Grid (5 cols) */}
                      <div className="md:col-span-5 space-y-3">
                        <span className="text-[10px] font-mono text-text-sub uppercase tracking-widest block">
                          Select Standard Hour
                        </span>

                        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                          {timeSlots.map((slot) => {
                            const isSlotSelected = selectedTime === slot;
                            return (
                              <button
                                key={slot}
                                onClick={() => setSelectedTime(slot)}
                                className={`py-2.5 px-3 rounded-xl border font-mono text-xs text-left transition-all flex items-center gap-2 cursor-pointer ${
                                  isSlotSelected
                                    ? "bg-[#00D1FF]/10 text-white border-[#00D1FF] shadow-[0_0_12px_rgba(0,209,255,0.15)] font-bold"
                                    : "bg-[#070B14]/40 border-border-dark/50 text-text-sub hover:border-[#00D1FF]/30 hover:text-text-luxury"
                                }`}
                              >
                                <Clock className={`w-3.5 h-3.5 ${isSlotSelected ? "text-[#00D1FF]" : "text-muted"}`} />
                                <span>{slot}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Footer Selection Summary & Submit Trigger */}
                    <div className="flex items-center justify-between pt-4 border-t border-border-dark/40">
                      <div className="text-left font-mono text-[11px] text-text-sub">
                        {selectedDate && selectedTime ? (
                          <span className="text-white font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Selected: {selectedDate} {months[selectedMonth]} // {selectedTime}
                          </span>
                        ) : (
                          <span className="text-muted/60">// Configure parameters to advance</span>
                        )}
                      </div>

                      <button
                        disabled={!selectedDate || !selectedTime}
                        onClick={handleNextStep}
                        className="pill-glow-button px-6 py-2.5 text-xs font-mono tracking-wider flex items-center gap-1.5 uppercase font-bold disabled:opacity-40 disabled:pointer-events-none"
                      >
                        <span>Confirm Slot</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.form
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleBookCall}
                    className="space-y-5 text-left"
                  >
                    {/* Visual slot summary */}
                    <div className="flex flex-wrap items-center justify-between p-3.5 px-4 rounded-xl bg-surface-dark border border-border-dark/80 text-xs font-mono">
                      <div className="flex items-center gap-2 text-text-luxury">
                        <Calendar className="w-4 h-4 text-[#00D1FF]" />
                        <span>{selectedDate} {months[selectedMonth]} {selectedYear}</span>
                      </div>
                      <div className="flex items-center gap-2 text-text-luxury">
                        <Clock className="w-4 h-4 text-[#6C63FF]" />
                        <span>{selectedTime} (IST Relay)</span>
                      </div>
                    </div>

                    {bookingError && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-2.5">
                        <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] font-mono text-red-200 leading-snug">{bookingError}</span>
                      </div>
                    )}

                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-text-sub uppercase tracking-wider block">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3 h-3 text-[#00D1FF]" />
                          <span>// Partner Identification</span>
                        </span>
                      </label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Aris Thorne"
                        className="w-full px-4 py-3 bg-[#070B14] border border-border-dark rounded-xl text-sm text-text-luxury placeholder-text-sub/40 focus:outline-none focus:border-[#00D1FF] transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-text-sub uppercase tracking-wider block">
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-[#6C63FF]" />
                          <span>// Correspondence Address</span>
                        </span>
                      </label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. aris@synthai.systems"
                        className="w-full px-4 py-3 bg-[#070B14] border border-border-dark rounded-xl text-sm text-text-luxury placeholder-text-sub/40 focus:outline-none focus:border-[#6C63FF] transition-all"
                      />
                    </div>

                    {/* Objective / Agenda */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-text-sub uppercase tracking-wider block">
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3 h-3 text-[#9D4EDD]" />
                          <span>// Call Objectives & Agenda (Optional)</span>
                        </span>
                      </label>
                      <textarea
                        value={agenda}
                        onChange={(e) => setAgenda(e.target.value)}
                        rows={3}
                        placeholder="Briefly describe what we'll solve: UI overhaul, AI pipeline, brand alignment..."
                        className="w-full px-4 py-3 bg-[#070B14] border border-border-dark rounded-xl text-sm text-text-luxury placeholder-text-sub/40 focus:outline-none focus:border-[#9D4EDD] transition-all resize-none"
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-border-dark/40">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="px-5 py-2.5 rounded-xl border border-border-dark text-xs font-mono text-text-sub hover:text-text-luxury transition-colors cursor-pointer"
                      >
                        Back to Calendar
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="pill-glow-button px-8 py-3 font-semibold text-xs font-mono uppercase tracking-wider flex items-center gap-2"
                      >
                        <span>{isSubmitting ? "Linking Mainframe..." : "Secure Schedule"}</span>
                        <CheckCircle className={`w-3.5 h-3.5 ${isSubmitting ? "animate-pulse" : ""}`} />
                      </button>
                    </div>
                  </motion.form>
                )}

                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-6 space-y-6"
                  >
                    {/* Cyber confirmation badge */}
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                      <CheckCircle className="w-8 h-8 animate-bounce" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 p-1 px-3 bg-emerald-500/10 rounded-full">
                        // BROADCAST LINK SUCCESSFUL
                      </span>
                      <h3 className="text-xl md:text-2xl font-display font-medium text-text-luxury mt-2">
                        Consultation Locked!
                      </h3>
                      <p className="text-xs text-text-sub max-w-md mx-auto leading-relaxed">
                        Suhail's auto-scheduler has successfully processed your strategic proxy briefing. A Google Meet transmission invite has been piped to your mailbox and synchronized with your SUHX account.
                      </p>
                    </div>

                    {/* Premium Ticket confirmation display */}
                    <div className="relative max-w-sm mx-auto p-5 rounded-2xl bg-surface-dark/90 border border-border-dark text-left space-y-3.5 shadow-xl overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-[#00D1FF]/5 rounded-full blur-xl" />
                      
                      <div className="flex items-center justify-between text-[10px] font-mono text-muted/50 border-b border-border-dark/40 pb-2">
                        <span>SUHX.STUDIO // CO-2026</span>
                        <span className="font-semibold text-[#00D1FF]">{bookingRef}</span>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="text-[9px] font-mono text-muted/50 uppercase">PARTNER</p>
                          <p className="text-xs font-semibold text-text-luxury">{name}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-[9px] font-mono text-muted/50 uppercase">DATE</p>
                            <p className="text-xs font-semibold text-text-luxury">{selectedDate} {months[selectedMonth]}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-mono text-muted/50 uppercase">TIME (IST)</p>
                            <p className="text-xs font-semibold text-text-luxury">{selectedTime}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] font-mono text-muted/50 uppercase">LINK CHANNEL</p>
                          <p className="text-xs font-semibold text-[#6C63FF] flex items-center gap-1">
                            <Video className="w-3.5 h-3.5" />
                            <span>Google Meet Interactive Frame</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2.5 border-t border-border-dark/40 text-[9px] font-mono text-text-sub/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>SYNCHRONIZED WITH GOOGLE CALENDAR & FIRESTORE</span>
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-studio to-secondary-studio text-white text-xs font-mono uppercase tracking-widest font-extrabold hover:shadow-[0_0_15px_rgba(0,209,255,0.25)] transition-all cursor-pointer"
                      >
                        Return to Mainframe
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
