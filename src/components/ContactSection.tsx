"use client";

import React, { useState } from "react";
import { soundFx } from "@/utils/soundEffects";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Send, Mail, Copy, Check, Terminal, ShieldCheck, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import StarBorder from "./StarBorder";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [copied, setCopied] = useState(false);
  const [submittedViaMailto, setSubmittedViaMailto] = useState(false);

  const personal = PORTFOLIO_DATA.personal;

  const handleCopyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playPulse();

    // Construct accessible direct mailto URI with user's inputs
    const subjectEncoded = encodeURIComponent(formData.subject || `Engineering Inquiry from ${formData.name}`);
    const bodyEncoded = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${personal.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    window.location.href = mailtoUrl;
    setSubmittedViaMailto(true);
  };

  return (
    <section id="connect" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-950/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-slate-800/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="space-y-4 mb-16 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/90 backdrop-blur-md text-xs font-mono text-slate-300">
          <span>05 / CONNECT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 font-heading">
          Have an Idea? <br />
          <span className="text-slate-300">
            Let&apos;s Build the Future.
          </span>
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
          &ldquo;{personal.headline}&rdquo; — I&apos;m open to engineering opportunities, AI projects, embedded systems development, robotics collaborations, and innovative technical challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Connection HUD & Socials */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Terminal Information Card */}
          <div className="rounded-3xl border border-slate-800 bg-[#0B1020]/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800 font-mono text-xs text-slate-300">
              <Terminal className="w-4 h-4" />
              <span>TERMINAL TELEMETRY // COMMS-PORT</span>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400">PRIMARY CONTACT CHANNEL</span>
              <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-800 bg-[#05070D] font-mono text-xs sm:text-sm text-slate-200">
                <span className="truncate mr-2">{personal.email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white text-xs transition-all shrink-0"
                  title="Copy email address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "COPIED" : "COPY"}</span>
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono text-slate-400">VERIFIED PROFILES</span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex items-center gap-2.5 p-3.5 rounded-2xl border border-slate-800 bg-[#05070D] text-slate-300 hover:border-slate-600 hover:text-white hover:bg-slate-800/60 transition-all font-mono text-xs"
                >
                  <GithubIcon className="w-4 h-4 text-slate-400" />
                  <span>GITHUB</span>
                </a>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex items-center gap-2.5 p-3.5 rounded-2xl border border-slate-800 bg-[#05070D] text-slate-300 hover:border-slate-600 hover:text-white hover:bg-slate-800/60 transition-all font-mono text-xs"
                >
                  <LinkedinIcon className="w-4 h-4 text-slate-400" />
                  <span>LINKEDIN</span>
                </a>
              </div>
            </div>

            {/* Response Time Guarantee */}
            <div className="p-4 rounded-2xl border border-slate-800/80 bg-[#05070D]/60 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div className="text-xs text-slate-400 space-y-0.5">
                <span className="font-semibold text-slate-200 block font-mono">ENCRYPTED DISPATCH</span>
                <p>Standard response window is typically within 24–48 hours for engineering inquiries.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Terminal Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-slate-800 bg-[#0B1020]/90 p-6 sm:p-10 backdrop-blur-xl shadow-xl relative">
            {/* Top Terminal Bar */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">TERMINAL_PROMPT // v2.4</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider">SECURE TRANSMISSION</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    01 // YOUR NAME *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-[#05070D] text-slate-100 placeholder-slate-600 font-sans text-sm focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    02 // RETURN EMAIL *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-[#05070D] text-slate-100 placeholder-slate-600 font-sans text-sm focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  03 // SUBJECT LINE *
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Collaboration on Embedded AI / Robotics Project"
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-[#05070D] text-slate-100 placeholder-slate-600 font-sans text-sm focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  04 // TRANSMISSION MESSAGE *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe the opportunity, technical scope, or collaboration inquiry..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-[#05070D] text-slate-100 placeholder-slate-600 font-sans text-sm focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <StarBorder
                as="button"
                type="submit"
                color="#64748B"
                trailColor="#E2E8F0"
                duration={4.5}
                glow={0.15}
                radius={16}
                thickness={1}
                sparkle={false}
                hover="lap"
                clickPulse={true}
                theme="dark"
                backgroundColor="#0F172A"
                className="w-full group cursor-pointer py-4 font-heading font-semibold text-sm tracking-wide text-slate-100 hover:text-white border border-slate-700 hover:border-slate-500 transition-all shadow-sm"
              >
                <div className="flex items-center justify-center gap-2.5">
                  <Send className="w-4 h-4 text-slate-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  <span>INITIALIZE DISPATCH TRANSMISSION</span>
                </div>
              </StarBorder>

              {/* Delivery Mechanism Transparency Note */}
              <div className="p-3.5 rounded-xl border border-slate-800 bg-[#05070D]/80 flex items-start gap-2.5 text-xs text-slate-400 font-mono">
                <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Dispatches directly via your system&apos;s default mail protocol to <strong className="text-slate-200">{personal.email}</strong>. Ready for Formspree / Resend webhook endpoint integration in production.
                </span>
              </div>

              {submittedViaMailto && (
                <div className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Email client triggered. Your transmission is ready for sending.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
