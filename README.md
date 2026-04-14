# ⚡ Agentix — AI Agent Creation Platform

**Agentix** is a full-stack AI platform that enables users to **design, configure, and deploy custom AI agents visually**.  
It provides a seamless interface to build intelligent workflows, integrate APIs, and run real-time AI-powered conversations.

---

## 🌐 Live Demo

👉 https://agentify-ai-zeta.vercel.app/

---

## 📸 Screenshots

### 🔹 Agent Builder Interface
![Agent Builder](./public/screenshots/agent-builder.png)

### 🔹 Workflow Editor (React Flow)
![Workflow Editor](./public/screenshots/workflow.png)

### 🔹 Dashboard Overview
![Dashboard](./public/screenshots/dashboard.png)

### 🔹 Agent Configuration Panel
![Agent Config](./public/screenshots/config.png)

### 🔹 Live AI Conversation
![Chat](./public/screenshots/chat.png)

---

## ✨ Key Highlights

- 🧠 Design and launch custom AI agents with a visual workflow interface  
- 🔄 Real-time conversation streaming with token handling  
- 🔗 Integrate external APIs (e.g., Weather API, custom tools)  
- 👤 Secure authentication, user profiles, and pricing system  
- 🛡️ Built-in rate limiting and abuse protection  
- ⚡ Optimized for performance with real-time backend sync  

---

## 🖥️ Tech Stack

| Layer        | Technology |
|-------------|-----------|
| Frontend     | Next.js 16, React, TypeScript |
| UI           | Tailwind CSS, ShadCN UI, React Flow |
| Backend      | Convex (real-time database & serverless functions) |
| AI Integration | Gemini SDK |
| Auth         | Clerk |
| Security     | Arcjet |
| Deployment   | Vercel |

---

## 🧩 Core Features

### 🔹 Visual Agent Creation
Build AI agents using an intuitive drag-and-drop interface powered by **React Flow**.

### 🔹 AI Workflow Engine
Create dynamic workflows with **Gemini-powered logic**, enabling intelligent responses and automation.

### 🔹 Real-Time Execution
Experience **streaming responses and token-based processing** for fast and interactive AI conversations.

### 🔹 Scalable Architecture
Powered by **Convex**, ensuring real-time data sync and high scalability.

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Pruthviraj75/Agentify_AI.git
cd Agentify_AI
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Environment Setup

Create a .env.local file:
```bash
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_CONVEX_SITE_URL=your_site_url
```
# Add other API keys if required

### 4️⃣ Run Locally
```bash
npm run dev
```
### 5️⃣ Build for Production
```bash
npm run build
```
### 🚀 Deployment

Deployed on Vercel for fast and scalable performance.
```bash
vercel
```
## 📌 Future Improvements
- 🧩 More pre-built AI agent templates
- 📊 Advanced analytics for agent performance
- 🔌 Plugin marketplace for integrations
- 🧠 Improved memory handling for agents
