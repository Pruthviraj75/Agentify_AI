# 🚀 Agentify AI – AI Agent Builder Platform

Agentify AI is a modern web application that allows users to create, manage, and run custom AI agents with ease. It provides a visual and user-friendly interface to configure agents, integrate APIs, and automate workflows.

---

## 🌐 Live Demo

👉 https://agentify-ai-zeta.vercel.app/

---

## 🌟 Features

- 🤖 Create and manage AI agents  
- 🔗 API integration support (tools like Weather API, etc.)  
- 🧠 Custom agent configuration (memory, behavior, etc.)  
- 📊 Dashboard to manage all agents  
- ⚡ Fast and responsive UI  
- ☁️ Deployed on Vercel  

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 16, React, TypeScript  
- **UI:** Tailwind CSS, ShadCN UI  
- **Backend:** Convex  
- **API Integration:** External APIs (e.g., Weather API, OpenAI/Gemini)  
- **Deployment:** Vercel  

---

## 📁 Folder Structure


app/
├── agent-builder/
├── dashboard/
├── api/
components/
convex/
public/


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Pruthviraj75/Agentify_AI.git
cd Agentify_AI
2️⃣ Install dependencies
npm install
3️⃣ Setup environment variables

Create a .env.local file and add:

NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_CONVEX_SITE_URL=your_site_url

(Add API keys if needed)

4️⃣ Run the project locally
npm run dev
5️⃣ Build for production
npm run build
🚀 Deployment

This project is deployed using Vercel.

To deploy:

vercel
