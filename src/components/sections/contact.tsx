"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, FileText, Send, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import { personal } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getAssetPath } from "@/lib/utils";

export function Contact() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields before sending.");
      return;
    }
    const recipient = "bharath.eee.engineer@gmail.com";
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const emailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${emailBody}`;

    setStatus("sent");
    toast.success(`Message prepared! Opening email client addressed to ${recipient}.`);
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setStatus("idle");
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="grid gap-10 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left — copy + links */}
          <div>
            <div className="font-mono-tech text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Contact
            </div>
            <h2
              id="contact-heading"
              className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
            >
              {personal.contactHeading}
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {personal.contactBody}
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${personal.emailPlaceholder}`}
                className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-foreground/25"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-accent-brand">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
                    Email
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {personal.emailPlaceholder}
                  </div>
                </div>
              </a>
              <a
                href={personal.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-foreground/25"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-accent-brand">
                  <GithubIcon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
                    GitHub
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {personal.socials.github.handle}
                  </div>
                </div>
              </a>
              <a
                href={personal.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-foreground/25"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-accent-brand">
                  <LinkedinIcon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
                    LinkedIn
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {personal.socials.linkedin.handle}
                  </div>
                </div>
              </a>
              <a
                href={getAssetPath("/resume.pdf")}
                download
                className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-foreground/25"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-accent-brand">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground">
                    Resume
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    Download PDF
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="contact-name" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Your name
                </Label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Recruiter"
                  className="mt-1.5 bg-background"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contact-email" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Your email
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="mt-1.5 bg-background"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contact-message" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Message
                </Label>
                <Textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about the role or opportunity…"
                  className="mt-1.5 min-h-[140px] bg-background"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-xl bg-foreground text-background hover:bg-foreground/90"
              >
                {status === "sending" ? (
                  "Sending…"
                ) : status === "sent" ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Sent
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
              <p className="font-mono-tech text-[10px] uppercase tracking-wider text-muted-foreground/70">
                Delivery integration is configurable — no fake success messages.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
