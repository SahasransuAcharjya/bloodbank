"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Activity, Users, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export default function PublicHomePage() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 text-center">
        {/* Abstract Background Elements */}
        <div className="absolute left-1/4 top-1/4 -z-10 h-96 w-96 rounded-full bg-[#E63946]/10 blur-[100px] animate-pulse" />
        <div className="absolute right-1/4 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-[#457B9D]/10 blur-[100px] animate-pulse delay-1000" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E63946]/20 bg-[#E63946]/5 px-4 py-1.5 text-sm font-bold text-[#E63946] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E63946] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E63946]"></span>
            </span>
            Saving Lives, One Drop at a Time
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-[#1D3557] sm:text-7xl dark:text-white">
            Your Blood Can Be Someone's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] to-[#D90429]">Lifeline</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#333333]/70 sm:text-xl dark:text-gray-300">
            JeevanDhaara connects donors with those in critical need instantly.
            Join our network of heroes and make a real impact today.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register" className="cta-btn group text-lg px-10 py-4">
              <Heart className="mr-2 h-5 w-5 fill-current group-hover:animate-bounce" />
              Become a Donor
            </Link>
            <Link href="/login" className="cta-outline group text-lg px-10 py-4">
              Login
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Floating Stats Cards */}
        <div className="absolute bottom-10 left-10 hidden lg:block">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass-card flex items-center gap-4 p-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-[#E63946]">
              <Activity className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-500">Live Requests</p>
              <p className="text-xl font-bold text-[#1D3557]">120+</p>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-20 right-10 hidden lg:block">
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="glass-card flex items-center gap-4 p-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-[#1D3557]">
              <Users className="h-6 w-6" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-500">Active Donors</p>
              <p className="text-xl font-bold text-[#1D3557]">5,000+</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: MapPin,
                title: "Find Nearby",
                desc: "Locate blood banks and donation camps near you instantly with our interactive map.",
                color: "bg-blue-50 text-blue-600"
              },
              {
                icon: ShieldCheck,
                title: "Verified & Safe",
                desc: "We ensure all requests and donors are verified for a safe and secure process.",
                color: "bg-green-50 text-green-600"
              },
              {
                icon: Activity,
                title: "Real-time Updates",
                desc: "Get instant notifications for SOS requests and track your donation journey.",
                color: "bg-red-50 text-red-600"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="glass-card glass-card-hover p-8 text-center"
              >
                <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${feature.color}`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#1D3557] dark:text-white">{feature.title}</h3>
                <p className="text-[#333333]/70 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
