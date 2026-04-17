"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Plug,
  Zap,
  Shield,
  Workflow,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import React from "react";

/* ─── Fonts ─── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

body { font-family: 'Inter', sans-serif; }

@keyframes float {
  0%,100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}

/* ✅ Responsive tweaks */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column !important;
    gap: 12px;
  }

  .hero-section {
    padding: 80px 16px 60px !important;
  }

  .hero-title {
    font-size: 2.2rem !important;
    line-height: 1.2;
  }

  .hero-desc {
    font-size: 14px;
    padding: 0 10px;
  }

  .cta-buttons {
    flex-direction: column !important;
    width: 100%;
  }

  .cta-buttons a {
    width: 100%;
    justify-content: center;
  }

  .feature-grid {
    grid-template-columns: 1fr !important;
  }

  .cta-section {
    padding: 60px 16px !important;
  }
}
`;

/* ─── Light Theme ─── */
const C = {
  bg: "#FFFFFF",
  surface: "#FFFFFF",
  card: "#FFFFFF",
  border: "#E5E7EB",
  accent: "#111827",
  primary: "#000000",
  textHi: "#111827",
  textMid: "#374151",
  textLo: "#6B7280",
};

/* ─── Shared Button Type ─── */
type BtnProps = {
  children: React.ReactNode;
  href?: string;
};

/* ───────── Buttons ───────── */
function PrimaryBtn({ children, href = "/dashboard" }: BtnProps) {
  return (
    <Link
      href={href}
      style={{
        padding: "12px 22px",
        borderRadius: 10,
        background: "#000000",
        color: "#fff",
        fontWeight: 600,
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
      }}
    >
      {children}
    </Link>
  );
}

function GhostBtn({ children, href = "/dashboard" }: BtnProps) {
  return (
    <Link
      href={href}
      style={{
        padding: "12px 22px",
        borderRadius: 10,
        border: `1px solid ${C.border}`,
        color: C.textMid,
        textDecoration: "none",
        fontWeight: 500,
        background: "#fff",
      }}
    >
      {children}
    </Link>
  );
}

/* ───────── Node Canvas ───────── */
function NodeCanvas() {
  return (
    <div
      style={{
        opacity: 0.12,
        transform: "scale(1.1)",
        animation: "float 6s ease-in-out infinite",
      }}
    >
      <svg viewBox="0 0 600 200" width="100%">
        <circle cx="100" cy="100" r="40" fill="#4F46E5" />
        <circle cx="300" cy="60" r="40" fill="#6366F1" />
        <circle cx="300" cy="140" r="40" fill="#6366F1" />
        <circle cx="500" cy="100" r="40" fill="#10B981" />
      </svg>
    </div>
  );
}

/* ───────── Feature Data ───────── */
const FEATURES = [
  {
    icon: <Bot size={18} />,
    title: "Agent Studio",
    desc: "Build AI agents visually using React Flow.",
  },
  {
    icon: <Plug size={18} />,
    title: "API Integration",
    desc: "Connect any API with secure keys.",
  },
  {
    icon: <MessageSquare size={18} />,
    title: "Live Chat",
    desc: "Interact with agents instantly.",
  },
  {
    icon: <Shield size={18} />,
    title: "Secure Vault",
    desc: "Encrypted API key storage.",
  },
  {
    icon: <Workflow size={18} />,
    title: "Flow Builder",
    desc: "Design logic visually.",
  },
  {
    icon: <Zap size={18} />,
    title: "Deploy Fast",
    desc: "Launch agents instantly.",
  },
];

/* ───────── Home ───────── */
export default function Home() {
  return (
    <>
      <style>{CSS}</style>

      <div style={{ background: C.bg, minHeight: "100vh" }}>
        {/* NAVBAR */}
        {/* NAVBAR */}
{/* NAVBAR */}
<header
  style={{
    position: "sticky",
    top: 0,
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(10px)",
    zIndex: 50,
  }}
>
  <div
    style={{
      maxWidth: 1100,
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 16px",
      gap: 10,
    }}
  >
    {/* ✅ Agentix → go to home */}
    <Link
      href="/"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: "1.2rem", // smaller for mobile
        fontWeight: 600,
        textDecoration: "none",
        color: "#111827",
        whiteSpace: "nowrap",
      }}
    >
      <img
        src="/ai2.png"
        alt="Ai-Agent"
        style={{ width: 20, height: 20 }}
      />
      Agentix
    </Link>

    {/* ✅ Buttons */}
    <div
      style={{
        display: "flex",
        gap: 8,
        flexShrink: 0,
      }}
    >
      <Link
        href="/dashboard"
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #E5E7EB",
          fontSize: 13,
          color: "#374151",
          textDecoration: "none",
          background: "#fff",
          whiteSpace: "nowrap",
        }}
      >
        Login
      </Link>

      <Link
        href="/dashboard"
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          background: "#000",
          color: "#fff",
          fontSize: 13,
          fontWeight: 600,
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        Get Started
      </Link>
    </div>
  </div>
</header>

        {/* HERO */}
        <section
          className="hero-section"
          style={{
            textAlign: "center",
            padding: "120px 20px 100px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 2 }}>
            <h1
              className="hero-title"
              style={{
                fontSize: "clamp(2.5rem,5vw,4rem)",
                fontWeight: 800,
                color: C.textHi,
              }}
            >
              Build AI Agents
              <br />
              That Actually Work
            </h1>

            <p
              className="hero-desc"
              style={{
                marginTop: 16,
                color: C.textLo,
                maxWidth: 500,
                marginInline: "auto",
              }}
            >
              Connect APIs, design flows, and deploy intelligent agents — all
              visually.
            </p>

            <div
              className="cta-buttons"
              style={{
                marginTop: 30,
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <PrimaryBtn>
                Start Free <ArrowRight size={16} />
              </PrimaryBtn>
              <GhostBtn>Live Demo</GhostBtn>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ padding: "60px 20px", background: C.bg }}>
          <div
            className="feature-grid"
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 20,
            }}
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                style={{
                  background: "#fff",
                  padding: 24,
                  borderRadius: 14,
                  border: `1px solid ${C.border}`,
                }}
              >
                <div style={{ marginBottom: 10, color: C.primary }}>
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 600 }}>{f.title}</h3>
                <p style={{ color: C.textLo, fontSize: 14 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="cta-section"
          style={{
            textAlign: "center",
            padding: "80px 20px",
            background: C.bg,
          }}
        >
          <h2 style={{ fontSize: 32, fontWeight: 700 }}>
            Start building your agent today
          </h2>
          <p style={{ color: C.textLo, marginTop: 10 }}>
            No setup. No complexity. Just build.
          </p>
          <div style={{ marginTop: 20 }}>
            <PrimaryBtn>Get Started</PrimaryBtn>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            borderTop: `1px solid ${C.border}`,
            padding: 20,
            textAlign: "center",
            color: C.textLo,
          }}
        >
          © {new Date().getFullYear()} Agentix
        </footer>
      </div>
    </>
  );
}