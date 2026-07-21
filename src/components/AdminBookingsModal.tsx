import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Search, 
  Trash2, 
  Calendar, 
  Clock, 
  Mail, 
  User, 
  Hash, 
  Sparkles, 
  Copy, 
  Check, 
  FileText, 
  TrendingUp, 
  Users, 
  Inbox,
  ExternalLink
} from "lucide-react";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";

interface Booking {
  bookingId: string;
  userId: string;
  name: string;
  email: string;
  date: number;
  month: number;
  year: number;
  time: string;
  bookingRef: string;
  agenda?: string;
  createdAt?: any;
}

interface AdminBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

export default function AdminBookingsModal({ isOpen, onClose }: AdminBookingsModalProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load Bookings in real-time
  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    setError(null);

    const bookingsQuery = query(
      collection(db, "bookings"),
      orderBy("year", "desc"),
      orderBy("month", "desc"),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(
      bookingsQuery,
      (snapshot) => {
        const list: Booking[] = [];
        snapshot.forEach((docSnap) => {
          list.push(docSnap.data() as Booking);
        });
        setBookings(list);
        setLoading(false);
      },
      (err) => {
        console.error("Error reading bookings: ", err);
        setError("Missing permissions or database access issue.");
        setLoading(false);
        try {
          handleFirestoreError(err, OperationType.LIST, "bookings");
        } catch (e) {
          // Keep in console and show error
        }
      }
    );

    return () => unsubscribe();
  }, [isOpen]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (bookingId: string) => {
    if (!confirm("Are you sure you want to delete this booking? This action is irreversible.")) {
      return;
    }

    setDeletingId(bookingId);
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
    } catch (err) {
      console.error("Delete Error: ", err);
      alert("Failed to delete booking. Insufficient permissions.");
      try {
        handleFirestoreError(err, OperationType.DELETE, `bookings/${bookingId}`);
      } catch (e) {}
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered list
  const filteredBookings = bookings.filter((b) => {
    const term = searchQuery.toLowerCase();
    return (
      b.name.toLowerCase().includes(term) ||
      b.email.toLowerCase().includes(term) ||
      b.bookingRef.toLowerCase().includes(term) ||
      (b.agenda && b.agenda.toLowerCase().includes(term)) ||
      `${b.date} ${MONTHS[b.month]} ${b.year}`.toLowerCase().includes(term)
    );
  });

  // Basic Stats calculations
  const totalBookings = bookings.length;
  const uniquePartners = new Set(bookings.map((b) => b.email.toLowerCase())).size;
  
  // Upcoming bookings calculation
  const now = new Date();
  const upcomingBookings = bookings.filter((b) => {
    const bookingDate = new Date(b.year, b.month, b.date);
    return bookingDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#03060a]/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl h-[90vh] md:h-[80vh] overflow-hidden rounded-3xl bg-[#090e17]/95 border border-border-dark/70 shadow-2xl shadow-black/80 flex flex-col"
          >
            {/* Glowing accents */}
            <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-[#00D1FF]/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-[#6C63FF]/10 blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-dark/50 relative z-10">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full bg-gradient-to-r from-[#6C63FF]/10 to-[#00D1FF]/10 border border-[#6C63FF]/20 text-[10px] font-mono text-[#00D1FF] uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  SUHX Admin Dashboard
                </div>
                <h2 className="text-xl font-display font-extrabold text-white tracking-tight flex items-center gap-2">
                  Partner Consultations List
                </h2>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-surface-dark border border-border-dark/60 text-text-sub hover:text-white hover:border-[#00D1FF]/30 transition-all cursor-pointer"
                aria-label="Close dashboard"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
              {/* Error Callout */}
              {error && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                  {error}
                </div>
              )}

              {/* Stats Overview Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-surface-dark/40 border border-border-dark/40 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-muted">
                    <span className="text-[10px] font-mono uppercase tracking-wider">Total Consultations</span>
                    <Inbox className="w-4 h-4 text-[#00D1FF]" />
                  </div>
                  <span className="text-2xl font-bold text-white mt-2">{totalBookings}</span>
                </div>
                <div className="p-4 rounded-2xl bg-surface-dark/40 border border-border-dark/40 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-muted">
                    <span className="text-[10px] font-mono uppercase tracking-wider">Unique Partners</span>
                    <Users className="w-4 h-4 text-[#6C63FF]" />
                  </div>
                  <span className="text-2xl font-bold text-white mt-2">{uniquePartners}</span>
                </div>
                <div className="p-4 rounded-2xl bg-surface-dark/40 border border-border-dark/40 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-muted">
                    <span className="text-[10px] font-mono uppercase tracking-wider">Upcoming Calls</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-2xl font-bold text-white mt-2">{upcomingBookings}</span>
                </div>
              </div>

              {/* Controls (Search / Filter) */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60" />
                <input
                  type="text"
                  placeholder="Search bookings by partner, email, code or dates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#070B14]/80 border border-border-dark/70 text-xs font-mono text-white placeholder-muted/40 focus:outline-none focus:border-[#00D1FF]/50 transition-all"
                />
              </div>

              {/* Booking Cards Stack */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-border-dark border-t-[#00D1FF] animate-spin" />
                  <span className="text-xs font-mono text-muted/60">Fetching live partner bookings...</span>
                </div>
              ) : filteredBookings.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-border-dark/60 rounded-3xl space-y-3">
                  <Inbox className="w-10 h-10 text-muted/30 mx-auto" />
                  <p className="text-xs font-mono text-text-sub">No consultation bookings found matching your filter.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <div 
                      key={booking.bookingId}
                      className="p-5 rounded-2xl bg-[#090e17] border border-border-dark/60 hover:border-border-dark transition-all duration-300 flex flex-col md:flex-row justify-between gap-4 relative overflow-hidden group"
                    >
                      {/* Booking Code Tag Accent */}
                      <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-[#6C63FF] to-[#00D1FF] opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="space-y-3 flex-1">
                        {/* Primary Client info */}
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-dark border border-border-dark text-[10px] font-mono text-text-luxury font-bold">
                            <Hash className="w-3 h-3 text-[#00D1FF]" />
                            {booking.bookingRef}
                          </span>
                          <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-muted/70" />
                            {booking.name}
                          </h4>
                          <span className="text-xs text-text-sub flex items-center gap-1">
                            <Mail className="w-3 h-3 text-muted/50" />
                            {booking.email}
                          </span>
                        </div>

                        {/* Meeting Schedule details */}
                        <div className="flex flex-wrap gap-4 text-xs font-mono text-muted">
                          <span className="flex items-center gap-1.5 text-white/90">
                            <Calendar className="w-3.5 h-3.5 text-[#6C63FF]" />
                            {booking.date} {MONTHS[booking.month]} {booking.year}
                          </span>
                          <span className="flex items-center gap-1.5 text-white/90">
                            <Clock className="w-3.5 h-3.5 text-[#00D1FF]" />
                            {booking.time}
                          </span>
                        </div>

                        {/* Agenda / description if any */}
                        {booking.agenda && (
                          <div className="p-3.5 rounded-xl bg-surface-dark/40 border border-border-dark/30 text-xs text-text-sub leading-relaxed relative">
                            <p className="text-[10px] font-mono font-bold text-[#6C63FF] mb-1 flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              AGENDAS & TARGET DETAILS
                            </p>
                            {booking.agenda}
                          </div>
                        )}
                      </div>

                      {/* Action buttons (copy, mail, cancel) */}
                      <div className="flex md:flex-col items-end justify-between md:justify-center gap-2 border-t md:border-t-0 border-border-dark/30 pt-3 md:pt-0 shrink-0">
                        <div className="flex gap-2">
                          {/* Copy Ref Code */}
                          <button
                            onClick={() => handleCopy(booking.bookingRef, booking.bookingId)}
                            className="p-2 rounded-lg bg-surface-dark border border-border-dark/70 text-text-sub hover:text-[#00D1FF] hover:border-[#00D1FF]/40 transition-all cursor-pointer"
                            title="Copy Booking Reference"
                          >
                            {copiedId === booking.bookingId ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>

                          {/* Email Partner */}
                          <a
                            href={`mailto:${booking.email}?subject=Regarding your SUHX consultation booking (${booking.bookingRef})`}
                            className="p-2 rounded-lg bg-surface-dark border border-border-dark/70 text-text-sub hover:text-[#6C63FF] hover:border-[#6C63FF]/40 transition-all cursor-pointer flex items-center justify-center"
                            title="Email Partner"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          {/* Cancel / Delete booking */}
                          <button
                            onClick={() => handleDelete(booking.bookingId)}
                            disabled={deletingId === booking.bookingId}
                            className="p-2 rounded-lg bg-surface-dark border border-border-dark/70 text-text-sub hover:text-red-500 hover:border-red-500/40 transition-all cursor-pointer disabled:opacity-50"
                            title="Cancel Booking"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <div className="text-[10px] font-mono text-muted/40">
                          // SUHX-MGMT
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
