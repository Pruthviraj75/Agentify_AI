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


type BtnProps = {
  children: React.ReactNode;
  href?: string;
};


/* ─── Fonts ─── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

body { font-family: 'Inter', sans-serif; }

@keyframes float {
  0%,100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
}
`;

/* ─── Light Theme ─── */
const C = {
  bg: "#FFFFFF",
  surface: "#FFFFFF", // ✅ FIXED (was gray before)
  card: "#FFFFFF",
  border: "#E5E7EB",
  accent: "#111827",
  primary: "#000000",
  textHi: "#111827",
  textMid: "#374151",
  textLo: "#6B7280",
};

/* ───────── Buttons ───────── */
// function PrimaryBtn({ children, href = "/dashboard" }: { children: React.ReactNode; href?: string }) {
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
        <header
          style={{
            position: "sticky",
            top: 0,
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
            }}
          >
              <h2 className="flex items-center gap-2 text-3xl font-semibold">
                
                  <img
                    className="w-6 h-6"
                    src="/ai2.png"
                    alt="Ai-Agent"
                  />Agentix
              </h2>
            <div style={{ display: "flex", gap: 12 }}>
              <GhostBtn>Login</GhostBtn>
              <PrimaryBtn>Get Started</PrimaryBtn>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section
          style={{
            textAlign: "center",
            padding: "120px 20px 100px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* BLUR BACKGROUNDS */}
          <div
            style={{
              position: "absolute",
              top: -120,
              left: -120,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "white",
              filter: "blur(120px)",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: -140,
              right: -100,
              width: 420,
              height: 420,
              borderRadius: "50%",
              background: "white",
              filter: "blur(130px)",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "white",
              // background: "rgba(99,102,241,0.15)",
              filter: "blur(160px)",
            }}
          />

          {/* FLOW */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <NodeCanvas />
          </div>

          {/* TEXT */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <h1
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

        {/* FEATURES (NOW WHITE SAME BG) */}
        <section style={{ padding: "60px 20px", background: C.bg }}>
          <div
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
