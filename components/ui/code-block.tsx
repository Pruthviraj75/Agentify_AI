"use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Copy, Check } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface CodeBlockProps {
//   code: string;
//   language?: string;
//   fileName?: string;
// }

// export function CodeBlock({
//   code,
//   language = "javascript",
//   fileName = "example.js",
// }: CodeBlockProps) {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = async () => {
//     await navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     // <div className="group relative rounded-xl border border-zinc-800 bg-zinc-950 shadow-lg overflow-hidden">
//     <div className="group relative rounded-xl border bg-zinc-50 shadow-lg overflow-hidden">

//       {/* Top Bar */}
//       {/* <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800"> */}
//       <div className="flex items-center justify-between px-4 py-2 border-b">
//         <div className="flex items-center gap-2">
//           {/* Fake window dots */}
//           <div className="flex gap-1">
//             <span className="h-2 w-2 rounded-full bg-red-500" />
//             <span className="h-2 w-2 rounded-full bg-yellow-500" />
//             <span className="h-2 w-2 rounded-full bg-green-500" />
//           </div>

//           {/* File name */}
//           <span className="text-xs text-zinc-400 ml-2">
//             {fileName}
//           </span>
//         </div>

//         {/* Language */}
//         <span className="text-xs text-zinc-500 uppercase">
//           {language}
//         </span>
//       </div>

//       {/* Copy Button */}
//       <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
//         <Button
//           variant="secondary"
//           size="icon"
//           onClick={handleCopy}
//           className="h-8 w-8"
//         >
//           {copied ? (
//             <Check className="h-4 w-4 text-green-400" />
//           ) : (
//             <Copy className="h-4 w-4" />
//           )}
//         </Button>
//       </div>

//       {/* Code */}
//       <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
//         <code className="whitespace-pre-wrap wrap-break-word font-mono">
//           {code}
//         </code>
//       </pre>
//     </div>
//   );
// }


{console.log("Original Code:");}


// import { useState } from "react";
// import { Copy, Check } from "lucide-react";

// interface CodeBlockProps {
//   code: string;
//   language?: string;
//   fileName?: string;
// }

// // ─── All token styles as plain React CSSProperties objects ───────────────────
// const STYLES: Record<string, React.CSSProperties> = {
//   keyword:     { color: "#c792ea", fontWeight: 700 },
//   string:      { color: "#c3e88d" },
//   template:    { color: "#c3e88d" },
//   comment:     { color: "#546e7a", fontStyle: "italic" },
//   number:      { color: "#f78c6c" },
//   boolean:     { color: "#ff5370", fontWeight: 700 },
//   type:        { color: "#ffcb6b" },
//   function:    { color: "#82aaff" },
//   method:      { color: "#82aaff" },
//   property:    { color: "#f07178" },
//   operator:    { color: "#89ddff" },
//   punctuation: { color: "#89ddff" },
//   plain:       { color: "#cdd6f4" },
// };

// const KEYWORDS = new Set([
//   "const", "let", "var", "function", "return", "if", "else", "while",
//   "for", "of", "in", "new", "await", "async", "import", "export",
//   "default", "from", "try", "catch", "throw", "null", "undefined",
//   "class", "extends", "this", "typeof", "instanceof", "void", "break",
//   "continue", "switch", "case", "do", "finally", "yield", "static",
//   "true", "false", "get", "set", "type", "interface", "as",
// ]);

// type Token = { type: string; value: string };

// function tokenize(code: string): Token[] {
//   const tokens: Token[] = [];
//   let i = 0;

//   while (i < code.length) {
//     // Single-line comment
//     if (code[i] === "/" && code[i + 1] === "/") {
//       const end = code.indexOf("\n", i);
//       const val = end === -1 ? code.slice(i) : code.slice(i, end);
//       tokens.push({ type: "comment", value: val });
//       i += val.length;
//       continue;
//     }

//     // Multi-line comment
//     if (code[i] === "/" && code[i + 1] === "*") {
//       const end = code.indexOf("*/", i + 2);
//       const val = end === -1 ? code.slice(i) : code.slice(i, end + 2);
//       tokens.push({ type: "comment", value: val });
//       i += val.length;
//       continue;
//     }

//     // Template literal (backtick string)
//     if (code[i] === "`") {
//       let j = i + 1;
//       while (j < code.length && code[j] !== "`") {
//         if (code[j] === "\\") j++;
//         j++;
//       }
//       tokens.push({ type: "template", value: code.slice(i, j + 1) });
//       i = j + 1;
//       continue;
//     }

//     // String (single or double quote)
//     if (code[i] === '"' || code[i] === "'") {
//       const q = code[i];
//       let j = i + 1;
//       while (j < code.length && code[j] !== q) {
//         if (code[j] === "\\") j++;
//         j++;
//       }
//       tokens.push({ type: "string", value: code.slice(i, j + 1) });
//       i = j + 1;
//       continue;
//     }

//     // Number
//     if (/[0-9]/.test(code[i])) {
//       let j = i;
//       while (j < code.length && /[0-9.]/.test(code[j])) j++;
//       tokens.push({ type: "number", value: code.slice(i, j) });
//       i = j;
//       continue;
//     }

//     // Word — keyword / type / function / method / plain
//     if (/[a-zA-Z_$]/.test(code[i])) {
//       let j = i;
//       while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
//       const word = code.slice(i, j);
//       const after = code.slice(j).trimStart();
//       const prevChar = code[i - 1];

//       let type = "plain";
//       if (KEYWORDS.has(word))           type = "keyword";
//       else if (word === "true" || word === "false") type = "boolean";
//       else if (/^[A-Z]/.test(word))     type = "type";
//       else if (prevChar === ".")        type = "method";
//       else if (after.startsWith("("))   type = "function";

//       tokens.push({ type, value: word });
//       i = j;
//       continue;
//     }

//     // Dot-access property (e.g. res.body → .body is "property")
//     if (code[i] === "." && /[a-zA-Z_$]/.test(code[i + 1] ?? "")) {
//       tokens.push({ type: "punctuation", value: "." });
//       i++;
//       continue;
//     }

//     // Operator
//     if (/[+\-*/%=<>!&|^~?]/.test(code[i])) {
//       tokens.push({ type: "operator", value: code[i] });
//       i++;
//       continue;
//     }

//     // Punctuation
//     if (/[{}()[\];:,]/.test(code[i])) {
//       tokens.push({ type: "punctuation", value: code[i] });
//       i++;
//       continue;
//     }

//     // Anything else (whitespace, newlines)
//     tokens.push({ type: "plain", value: code[i] });
//     i++;
//   }

//   return tokens;
// }

// export function CodeBlock({
//   code,
//   language = "typescript",
//   fileName = "integration.ts",
// }: CodeBlockProps) {
//   const [copied, setCopied] = useState(false);
//   const tokens = tokenize(code);
//   const lineCount = code.split("\n").length;

//   const handleCopy = async () => {
//     await navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div
//       style={{
//         background: "#1e1e2e",
//         border: "1px solid #313244",
//         borderRadius: "12px",
//         overflow: "hidden",
//         boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
//         fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', Consolas, monospace",
//       }}
//     >
//       {/* ── Top bar ────────────────────────────────────────────────────────── */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "10px 16px",
//           background: "#181825",
//           borderBottom: "1px solid #313244",
//         }}
//       >
//         {/* Traffic lights + filename */}
//         <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//           <div style={{ display: "flex", gap: "6px" }}>
//             <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
//             <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
//             <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
//           </div>
//           <span style={{ fontSize: "12px", color: "#6c7086", fontFamily: "monospace" }}>
//             {fileName}
//           </span>
//         </div>

//         {/* Right side: language badge + copy button */}
//         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//           <span
//             style={{
//               fontSize: "11px",
//               color: "#cba6f7",
//               background: "#313244",
//               border: "1px solid #45475a",
//               borderRadius: "20px",
//               padding: "2px 10px",
//               textTransform: "uppercase",
//               letterSpacing: "0.05em",
//               fontFamily: "monospace",
//             }}
//           >
//             {language}
//           </span>

//           <button
//             onClick={handleCopy}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "5px",
//               padding: "4px 12px",
//               borderRadius: "6px",
//               border: `1px solid ${copied ? "#a6e3a1" : "#45475a"}`,
//               background: copied ? "#1e3a2e" : "#313244",
//               color: copied ? "#a6e3a1" : "#cdd6f4",
//               fontSize: "12px",
//               cursor: "pointer",
//               transition: "all 0.15s ease",
//               fontFamily: "monospace",
//             }}
//           >
//             {copied
//               ? <><Check style={{ width: 12, height: 12 }} /> Copied!</>
//               : <><Copy style={{ width: 12, height: 12 }} /> Copy</>
//             }
//           </button>
//         </div>
//       </div>

//       {/* ── Code area ──────────────────────────────────────────────────────── */}
//       <div style={{ display: "flex", overflowX: "auto" }}>
//         {/* Line numbers */}
//         <div
//           style={{
//             padding: "16px 12px",
//             textAlign: "right",
//             userSelect: "none",
//             flexShrink: 0,
//             minWidth: "3rem",
//             background: "#1e1e2e",
//             borderRight: "1px solid #313244",
//             fontSize: "13px",
//             lineHeight: "1.7",
//             color: "#45475a",
//             fontFamily: "monospace",
//           }}
//         >
//           {Array.from({ length: lineCount }, (_, i) => (
//             <div key={i}>{i + 1}</div>
//           ))}
//         </div>

//         {/* Highlighted code */}
//         <pre
//           style={{
//             margin: 0,
//             padding: "16px 20px",
//             background: "#1e1e2e",
//             fontSize: "13px",
//             lineHeight: "1.7",
//             flex: 1,
//             overflowX: "auto",
//           }}
//         >
//           <code>
//             {tokens.map((tok, idx) => (
//               <span key={idx} style={STYLES[tok.type] ?? STYLES.plain}>
//                 {tok.value}
//               </span>
//             ))}
//           </code>
//         </pre>
//       </div>
//     </div>
//   );
// }


// "use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
}

const STYLES: Record<string, React.CSSProperties> = {
  keyword:     { color: "#cba6f7", fontWeight: 700 },
  string:      { color: "#a6e3a1" },
  template:    { color: "#a6e3a1" },
  comment:     { color: "#585b70", fontStyle: "italic" },
  number:      { color: "#fab387" },
  boolean:     { color: "#f38ba8", fontWeight: 700 },
  type:        { color: "#f9e2af" },
  function:    { color: "#89b4fa" },
  method:      { color: "#89dceb" },
  operator:    { color: "#89dceb" },
  punctuation: { color: "#6c7086" },
  plain:       { color: "#cdd6f4" },
};

const KEYWORDS = new Set([
  "const","let","var","function","return","if","else","while","for","of",
  "in","new","await","async","import","export","default","from","try",
  "catch","throw","null","undefined","class","extends","this","typeof",
  "instanceof","void","break","continue","switch","case","do","finally",
  "yield","static","true","false","get","set","type","interface","as",
]);

type Token = { type: string; value: string };

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < code.length) {
    if (code[i] === "/" && code[i + 1] === "/") {
      const end = code.indexOf("\n", i);
      const val = end === -1 ? code.slice(i) : code.slice(i, end);
      tokens.push({ type: "comment", value: val }); i += val.length; continue;
    }
    if (code[i] === "/" && code[i + 1] === "*") {
      const end = code.indexOf("*/", i + 2);
      const val = end === -1 ? code.slice(i) : code.slice(i, end + 2);
      tokens.push({ type: "comment", value: val }); i += val.length; continue;
    }
    if (code[i] === "`") {
      let j = i + 1;
      while (j < code.length && code[j] !== "`") { if (code[j] === "\\") j++; j++; }
      tokens.push({ type: "template", value: code.slice(i, j + 1) }); i = j + 1; continue;
    }
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i]; let j = i + 1;
      while (j < code.length && code[j] !== q) { if (code[j] === "\\") j++; j++; }
      tokens.push({ type: "string", value: code.slice(i, j + 1) }); i = j + 1; continue;
    }
    if (/[0-9]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[0-9.]/.test(code[j])) j++;
      tokens.push({ type: "number", value: code.slice(i, j) }); i = j; continue;
    }
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      const after = code.slice(j).trimStart();
      const prev = code[i - 1];
      let type = "plain";
      if (KEYWORDS.has(word))          type = "keyword";
      else if (/^[A-Z]/.test(word))   type = "type";
      else if (prev === ".")           type = "method";
      else if (after.startsWith("(")) type = "function";
      tokens.push({ type, value: word }); i = j; continue;
    }
    if (/[+\-*/%=<>!&|^~?]/.test(code[i])) {
      tokens.push({ type: "operator", value: code[i] }); i++; continue;
    }
    if (/[{}()[\];:.,]/.test(code[i])) {
      tokens.push({ type: "punctuation", value: code[i] }); i++; continue;
    }
    tokens.push({ type: "plain", value: code[i] }); i++;
  }
  return tokens;
}

export function CodeBlock({
  code,
  language = "typescript",
  fileName = "integration.ts",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const tokens = tokenize(code);
  const lines = code.split("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        .cb-outer::-webkit-scrollbar { width: 8px; }
        .cb-outer::-webkit-scrollbar-track { background: #181825; }
        .cb-outer::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #cba6f7, #89b4fa);
          border-radius: 999px;
          border: 2px solid #181825;
        }
        .cb-outer::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #d4b8ff, #a0c4ff);
        }
        /* Kill inner pre scrollbar entirely */
        .cb-pre::-webkit-scrollbar { display: none; }
        .cb-pre { scrollbar-width: none; }
      `}</style>

      <div
        style={{
          background: "#1e1e2e",
          border: "1px solid #313244",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
          fontFamily: "'Fira Code','Cascadia Code','JetBrains Mono',Consolas,monospace",
        }}
      >
        {/* ── Top bar ─────────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            background: "#181825",
            borderBottom: "1px solid #313244",
          }}
        >
          {/* Left: traffic lights + filename */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", gap: 6 }}>
              {["#ff5f57", "#febc2e", "#28c840"].map((bg, i) => (
                <span key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: bg, display: "inline-block" }} />
              ))}
            </div>
            <span style={{ fontSize: 12, color: "#6c7086" }}>{fileName}</span>
          </div>

          {/* Right: language badge + professional copy button */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              fontSize: 11, color: "#cba6f7", background: "#313244",
              border: "1px solid #45475a", borderRadius: 20,
              padding: "2px 10px", textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}>
              {language}
            </span>

            {/* Professional copy button */}
            <button
              onClick={handleCopy}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 12px",
                borderRadius: 6,
                cursor: "pointer",
                border: "none",
                background: copied ? "#2d4739" : "#313244",
                color: copied ? "#a6e3a1" : "#cdd6f4",
                fontSize: 12,
                fontWeight: 500,
                transition: "background 0.2s, color 0.2s",
                letterSpacing: "0.01em",
                outline: "none",
              }}
            >
              {copied
                ? <><Check style={{ width: 13, height: 13, strokeWidth: 2.5 }} /> Copied</>
                : <><Copy style={{ width: 13, height: 13, strokeWidth: 2 }} /> Copy</>
              }
            </button>
          </div>
        </div>

        {/* ── Outer scroll container (only one scrollbar) ──────────────── */}
        <div
          className="cb-outer"
          style={{
            display: "flex",
            overflowY: "auto",
            overflowX: "auto",
            maxHeight: "58vh",
            scrollbarWidth: "thin",
            scrollbarColor: "#6c7086 #181825",
          }}
        >
          {/* Sticky line numbers */}
          <div
            style={{
              padding: "16px 12px 16px 16px",
              textAlign: "right",
              userSelect: "none",
              flexShrink: 0,
              width: "3.2rem",
              background: "#1e1e2e",
              borderRight: "1px solid #2a2a3d",
              fontSize: 13,
              lineHeight: "1.75",
              color: "#45475a",
              position: "sticky",
              left: 0,
              zIndex: 2,
            }}
          >
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code — no scrollbar, parent handles it */}
          <pre
            className="cb-pre"
            style={{
              margin: 0,
              padding: "16px 24px",
              background: "#1e1e2e",
              fontSize: 13,
              lineHeight: "1.75",
              flex: 1,
              overflow: "visible", // let parent scroll, not this
              whiteSpace: "pre",
              minWidth: 0,
            }}
          >
            <code>
              {tokens.map((tok, idx) => (
                <span key={idx} style={STYLES[tok.type] ?? STYLES.plain}>
                  {tok.value}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
}