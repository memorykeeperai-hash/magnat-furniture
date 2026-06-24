"use client";

import { useActionState, useState } from "react";
import { loginAction } from "@/app/actions/auth";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Sofa } from "lucide-react";

export default function AdminLoginPage() {
  const [state, action, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F3EE] flex items-center justify-center p-6 antialiased">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px]"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-11 h-11 bg-[#C0001A] flex items-center justify-center mb-4">
            <img src="/images/magnat-icon-white.png" alt="Magnat Logo" className="h-8 w-auto object-contain" />
          </div>
          <h1 className="text-[#1A1208] text-xl font-semibold tracking-[0.18em] uppercase">
            Magnat
          </h1>
          <p className="text-[#9A9080] text-[10px] tracking-[0.25em] uppercase mt-1">
            Admin Portal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-sm shadow-sm border border-[#EAE4DC] px-10 py-10">
          <h2 className="text-[#1A1208] text-xl font-semibold mb-1">Sign in</h2>
          <p className="text-[#9A9080] text-sm mb-7">
            Enter your credentials to continue.
          </p>

          <form action={action} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[#1A1208] text-xs font-medium tracking-wide mb-1.5"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@magnat.com"
                className="w-full bg-[#FAFAF8] border border-[#E4DED4] px-4 py-4 text-[#1A1208] text-base placeholder:text-[#C4BDAF] focus:outline-none focus:border-[#C8873A] focus:bg-white transition-all rounded-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[#1A1208] text-xs font-medium tracking-wide mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full bg-[#FAFAF8] border border-[#E4DED4] px-4 pr-11 py-4 text-[#1A1208] text-base placeholder:text-[#C4BDAF] focus:outline-none focus:border-[#C8873A] focus:bg-white transition-all rounded-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#C4BDAF] hover:text-[#1A1208] transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {state?.error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-sm px-3.5 py-2.5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <p className="text-red-500 text-xs">{state.error}</p>
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full group bg-[#1A1208] text-white py-4 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#C8873A] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-sm mt-1 active:scale-[0.99]"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-[#C4BDAF] text-[10px] text-center mt-6 uppercase tracking-widest">
          © {new Date().getFullYear()} Magnat Furniture & Interiors
        </p>
      </motion.div>
    </div>
  );
}