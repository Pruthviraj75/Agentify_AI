"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CodeBlock } from "@/components/ui/code-block";
import { Copy, Check, Rocket, Clipboard, Zap } from "lucide-react";

type Props = {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  agentId?: string;
};

const STEPS = [
  { icon: Clipboard, label: "Copy snippet", desc: "Grab the code below" },
  { icon: Zap,       label: "Paste & wire",  desc: "Drop it in your app"  },
  { icon: Rocket,    label: "Ship it",        desc: "Your agent is live"   },
];

const PublishCodeDialog = ({ openDialog, setOpenDialog, agentId }: Props) => {
  const [idCopied, setIdCopied] = useState(false);

  const handleCopyId = async () => {
    if (!agentId) return;
    await navigator.clipboard.writeText(agentId);
    setIdCopied(true);
    setTimeout(() => setIdCopied(false), 2000);
  };

  const code = `const response = await fetch("https://your-domain.com/api/agent-chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    agentId: "${agentId ?? "<YOUR_AGENT_ID>"}",
    userId: "<YOUR_USER_ID>",
    userInput: "<USER_MESSAGE>",
  }),
});

if (!response.body) return;

const reader = response.body.getReader();
const decoder = new TextDecoder();
let result = "";

while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  const chunk = decoder.decode(value);
  result += chunk;
  console.log("chunk:", chunk);
}

console.log("Final response:", result);`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Syne:wght@500;700&display=swap');

        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pcd-shimmer-bar {
          height: 2px;
          background: linear-gradient(
            90deg,
            #1e1e2e 0%, #cba6f7 30%, #89b4fa 50%, #a6e3a1 70%, #1e1e2e 100%
          );
          background-size: 800px 2px;
          animation: shimmer 2.4s linear infinite;
        }

        .pcd-step { animation: fadeSlideUp 0.4s ease both; }
        .pcd-step:nth-child(1) { animation-delay: 0.05s; }
        .pcd-step:nth-child(2) { animation-delay: 0.12s; }
        .pcd-step:nth-child(3) { animation-delay: 0.19s; }

        .pcd-id-btn:hover  { background: #313244 !important; }
        .pcd-id-btn:active { transform: scale(0.97); }

        /* ── Outer dialog shell — overflow hidden keeps corners clean ── */
        .pcd-dialog {
          width: 95vw;
          max-width: 860px;
          overflow: hidden !important; /* border-radius respected, no scrollbar bleed */
          padding: 0 !important;
        }

        /*
          Inner scroll wrapper sits INSIDE the rounded shell.
          The scrollbar is therefore clipped by the parent's border-radius
          and never bleeds past the corners.
        */
        .pcd-inner {
          max-height: 90vh;
          overflow-y: auto;
          overflow-x: hidden;
        }

        /* ── Scrollbar — contained inside rounded shell ── */
        .pcd-inner::-webkit-scrollbar       { width: 6px; }
        .pcd-inner::-webkit-scrollbar-track { background: #11111b; border-radius: 0 16px 16px 0; }
        .pcd-inner::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #cba6f7 0%, #89b4fa 50%, #a6e3a1 100%);
          border-radius: 999px;
          border: 1px solid #11111b;
        }
        .pcd-inner::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #d4b8ff 0%, #a0c4ff 50%, #b8f0c8 100%);
        }
        .pcd-inner { scrollbar-width: thin; scrollbar-color: #89b4fa #11111b; }

        /* ── Layout helpers ── */
        .pcd-header { padding: 20px 24px 0; }
        .pcd-title  { font-size: 16px; }
        .pcd-desc   { font-size: 12.5px; margin: 0 0 18px 40px; }
        .pcd-steps  { display: flex; flex-direction: row; gap: 8px; margin-bottom: 18px; }
        .pcd-step   { flex: 1; }
        .pcd-code   { padding: 16px; }
        .pcd-footer { padding: 10px 24px 14px; }
        .pcd-foot-tag { font-size: 11px; }

        /* Agent ID */
        .pcd-agent-id      { display: flex; align-items: center; justify-content: space-between; flex-wrap: nowrap; gap: 10px; margin-bottom: 18px; padding: 8px 12px; background: #1e1e2e; border: 1px solid #2a2a3d; border-radius: 8px; }
        .pcd-agent-id-left { display: flex; align-items: center; gap: 8px; min-width: 0; flex: 1; }
        .pcd-agent-id-text { font-size: 12px; color: #a6adc8; font-family: 'IBM Plex Mono', monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        /* ── Medium (≤ 768px) ── */
        @media (max-width: 768px) {
          .pcd-dialog  { max-width: 680px; }
          .pcd-inner   { max-height: 88vh; }
          .pcd-header  { padding: 16px 18px 0; }
          .pcd-title   { font-size: 15px; }
          .pcd-desc    { font-size: 12px; margin: 0 0 14px 38px; }
          .pcd-steps   { gap: 6px; margin-bottom: 14px; }
          .pcd-code    { padding: 12px; }
          .pcd-footer  { padding: 8px 18px 12px; }
        }

        /* ── Small (≤ 540px) ── */
        @media (max-width: 540px) {
          .pcd-dialog  { max-width: 98vw; }
          .pcd-inner   { max-height: 85vh; }
          .pcd-header  { padding: 14px 14px 0; }
          .pcd-title   { font-size: 14px; }
          .pcd-desc    { font-size: 11px; margin: 0 0 12px 36px; }
          .pcd-steps   { flex-direction: column; gap: 6px; margin-bottom: 12px; }
          .pcd-step    { flex: unset; width: 100%; }
          .pcd-agent-id      { flex-direction: column; align-items: flex-start; gap: 8px; }
          .pcd-agent-id-left { width: 100%; }
          .pcd-agent-id-text { font-size: 11px; }
          .pcd-id-btn  { width: 100% !important; justify-content: center !important; }
          .pcd-code    { padding: 10px; }
          .pcd-footer  { padding: 8px 14px 12px; flex-wrap: wrap; gap: 6px; }
          .pcd-foot-tag { font-size: 10px; }
        }
      `}</style>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {/*
          pcd-dialog: overflow:hidden — clips the child scrollbar to the rounded border.
          pcd-inner:  overflow-y:auto — the actual scroll container, safely inside the clip.
        */}
        <DialogContent
          className="pcd-dialog"
          style={{
            background: "#11111b",
            border: "1px solid #2a2a3d",
            borderRadius: 16,
            boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px #1e1e2e",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          <div className="pcd-inner">

            {/* ── Shimmer bar ─────────────────────────────────────────── */}
            <div className="pcd-shimmer-bar" />

            {/* ── Header ──────────────────────────────────────────────── */}
            <div
              className="pcd-header"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at 60% 0%, rgba(137,180,250,0.06) 0%, transparent 70%)",
              }}
            >
              {/* Title row */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <div
                  style={{
                    width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                    background: "linear-gradient(135deg, #cba6f7, #89b4fa)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Rocket style={{ width: 15, height: 15, color: "#11111b" }} />
                </div>
                <DialogTitle
                  className="pcd-title"
                  style={{ fontWeight: 700, color: "#cdd6f4", margin: 0, letterSpacing: "-0.01em" }}
                >
                  Deploy Your Agent
                </DialogTitle>
              </div>

              <DialogDescription
                className="pcd-desc"
                style={{ color: "#6c7086", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 400 }}
              >
                Paste this snippet anywhere to stream responses from your agent.
              </DialogDescription>

              {/* ── 3-step flow ─────────────────────────────────────── */}
              <div className="pcd-steps">
                {STEPS.map(({ icon: Icon, label, desc }, i) => (
                  <div
                    key={i}
                    className="pcd-step"
                    style={{
                      background: "#1e1e2e",
                      border: "1px solid #2a2a3d",
                      borderRadius: 10,
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 26, height: 26, borderRadius: 7, flexShrink: 0,
                        background: "#313244",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginTop: 1,
                      }}
                    >
                      <Icon style={{ width: 13, height: 13, color: "#cba6f7" }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#cdd6f4", lineHeight: 1.3 }}>
                        {label}
                      </div>
                      <div
                        style={{
                          fontSize: 11, color: "#585b70", marginTop: 2,
                          fontFamily: "'IBM Plex Mono', monospace",
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}
                      >
                        {desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Agent ID pill ────────────────────────────────────── */}
              {agentId && (
                <div className="pcd-agent-id">
                  <div className="pcd-agent-id-left">
                    <span
                      style={{
                        fontSize: 10, fontWeight: 500, color: "#cba6f7",
                        background: "#2a1f3d", border: "1px solid #45305a",
                        borderRadius: 20, padding: "2px 8px", flexShrink: 0,
                        textTransform: "uppercase", letterSpacing: "0.08em",
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      Agent ID
                    </span>
                    <span className="pcd-agent-id-text">{agentId}</span>
                  </div>

                  <button
                    className="pcd-id-btn"
                    onClick={handleCopyId}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                      padding: "4px 10px", borderRadius: 6, flexShrink: 0,
                      cursor: "pointer", border: "1px solid #313244",
                      background: "transparent",
                      color: idCopied ? "#a6e3a1" : "#6c7086",
                      fontSize: 11, fontWeight: 500,
                      transition: "all 0.18s ease",
                      fontFamily: "'IBM Plex Mono', monospace",
                      outline: "none",
                    }}
                  >
                    {idCopied
                      ? <><Check style={{ width: 11, height: 11 }} /> Copied</>
                      : <><Copy style={{ width: 11, height: 11 }} /> Copy</>
                    }
                  </button>
                </div>
              )}
            </div>

            {/* ── Divider ─────────────────────────────────────────────── */}
            <div style={{ height: 1, background: "#1e1e2e" }} />

            {/* ── Code block ──────────────────────────────────────────── */}
            <div className="pcd-code" style={{ background: "#11111b" }}>
              <CodeBlock
                code={code}
                language="typescript"
                fileName="agent-integration.ts"
              />
            </div>

            {/* ── Footer ──────────────────────────────────────────────── */}
            <div
              className="pcd-footer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid #1e1e2e",
                flexWrap: "wrap",
                gap: 6,
              }}
            >
              <span
                className="pcd-foot-tag"
                style={{ color: "#45475a", fontFamily: "'IBM Plex Mono', monospace" }}
              >
                streaming · server-sent · zero config
              </span>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((bg, i) => (
                  <span
                    key={i}
                    style={{
                      width: 7, height: 7, borderRadius: "50%",
                      background: bg, display: "inline-block", opacity: 0.5,
                    }}
                  />
                ))}
              </div>
            </div>

          </div>{/* end pcd-inner */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PublishCodeDialog;