import React, { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp, getFirestore } from "firebase/firestore";
// Import the firebase module file as a namespace to avoid import-time errors
// if it does not export `db`. The module still runs (initializes app) so
// we can fallback to the default app's Firestore via getFirestore().
import * as firebaseModule from "./firebase";

// Resolve Firestore instance safely. If `firebaseModule.db` exists use it,
// otherwise attempt to use the default app's Firestore. If that fails we set
// db to null and handle it at runtime.
let db;
try {
  db = firebaseModule.db ?? getFirestore();
} catch (err) {
  // Do not throw — keep the app renderable even if Firebase fails
  console.error("Failed to initialize Firestore:", err);
  db = null;
}

/*
  Single-file React landing page component (src/App.jsx)
  - Uses Tailwind CSS for styling
  - Uses Framer Motion for subtle fade + translate animations
  - White, spacious, Apple/Stripe-like aesthetic
  - All sections are short and well-commented for easy edits
*/

export default function App() {
  // Local state for the email capture form
  const [email, setEmail] = useState("");

  // Simple submit handler (replace with real integration)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    // If Firestore is not available, fail gracefully without breaking the UI
    if (!db) {
      console.error("Firestore is not initialized. Email not saved.");
      // Provide non-blocking user feedback
      alert("Thanks — we'll keep you updated. (local only)");
      setEmail("");
      return;
    }

    try {
      // Use async/await safely and ensure collection reference uses `db`
      await addDoc(collection(db, "earlyAccess"), {
        email: email,
        createdAt: serverTimestamp(),
      });

      alert("Thanks — we'll keep you updated.");
      setEmail("");
    } catch (error) {
      // Log the error. Do not rethrow so the UI doesn't crash.
      console.error("Failed to save email to Firestore:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  // Shared animation for sections (fade + small translate)
  const fadeUp = {
    initial: { opacity: 0, y: 8 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      {/* ===========================
          Fixed Top Navigation (minimal)
          =========================== */}
      <header className="fixed inset-x-0 top-0 bg-white/60 backdrop-blur-sm border-b border-gray-100 z-30">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-lg font-semibold tracking-tight">RealShare</div>
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <a href="#" className="text-gray-700 hover:text-gray-900">Why RealShare</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">How it works</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Invest</a>
          </nav>
        </div>
      </header>

      {/* ===========================
          Main content area (push below fixed header)
          =========================== */}
      <main className="pt-28">
        {/* ---------------------------
            Hero: large typography + CTAs
            --------------------------- */}
        <section>
          <motion.div {...fadeUp} className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Fractional real estate, simplified.
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
              Invest in premium properties with as little as one share. Diversify your portfolio, earn passive income, and own a piece of institutional-grade real estate.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              {/* Primary CTA */}
              <a
                href="#invest"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-650 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                Start investing
              </a>

              {/* Secondary CTA */}
              <a
                href="#learn"
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Learn how it works
              </a>
            </div>
          </motion.div>
        </section>

        {/* ---------------------------
            Features: 3 simple text blocks
            --------------------------- */}
        <section className="mt-20">
          <motion.div {...fadeUp} className="max-w-5xl mx-auto px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="p-4">
                <h3 className="text-lg font-semibold">Institutional Properties</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Hand-picked, professionally managed assets in stable markets.
                </p>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold">Low Minimums</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Start with a modest investment to access diversified real estate exposure.
                </p>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold">Transparent Reporting</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Regular performance updates, clear fee structures, and detailed reports.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ---------------------------
            Email capture CTA section
            --------------------------- */}
        <section className="mt-20">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto px-6">
            <div className="rounded-xl border border-gray-100 bg-white p-6">
              <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h4 className="text-lg font-semibold">Get early access</h4>
                  <p className="mt-1 text-sm text-gray-600">Join our investor list for priority deals and updates.</p>
                </div>

                <form onSubmit={handleSubmit} className="w-full md:w-auto flex items-center gap-3">
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@investor.com"
                    className="min-w-0 flex-1 rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <button
                    type="submit"
                    className="whitespace-nowrap rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-650 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                  >
                    Join the list
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ---------------------------
            Simple footer
            --------------------------- */}
        <footer className="mt-20 pb-12">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} RealShare — All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
