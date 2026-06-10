# Rafli Hendarsyah - Modern Web Portfolio ✨

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

A modern, highly interactive, and aesthetically pleasing personal portfolio website built with **Vue 3**, **Vite**, and **Tailwind CSS**. Designed with a *Dreamy Dark Aesthetic* theme, this portfolio leverages **Inspira UI** to deliver premium micro-interactions, smooth animations, and a seamless user experience.

## 🌟 Key Features

- 🎨 **Dreamy Dark Aesthetic**: A carefully crafted custom color palette featuring Deep Twilight Purple (`#2A2F4F`), Muted Lavender (`#917FB3`), and Soft Lilac (`#E5BEEC`).
- 🍱 **Bento Grid Layout**: A modern, fully responsive grid system showcasing the developer profile, local timezone, and live coding statistics.
- 📊 **Live Contribution Calendars**: Real-time **GitHub** & **GitLab** activity graphs integrated directly via APIs, featuring custom proxy fallbacks and parallel pagination for highly accurate data rendering.
- ⏳ **Interactive Career Timeline**: A scroll-triggered, animated timeline component with custom glowing dots and gradients to showcase educational and professional milestones.
- ✨ **Premium Micro-interactions**: Smooth entrance animations and visual effects powered by **Inspira UI** and **Motion-V** (e.g., `CardSpotlight`, `BlurReveal`, `SparklesText`, `LineShadowText`).

## 🛠️ Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Inspira UI](https://inspira-ui.com/) & [Reka UI](https://reka-ui.com/)
- **Animations**: [Motion-V](https://motion.dev/vue) (Framer Motion for Vue)
- **Icons**: [Lucide Vue](https://lucide.dev/)

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### 2. Installation
Clone the repository and install the dependencies:

```bash
git clone https://github.com/Flidoang/shadcn-portofolio.git
cd shadcn-portofolio
npm install
```

### 3. Environment Variables
This project requires API tokens to fetch real-time contribution data from GitHub and GitLab.
Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Open `.env` and fill in your Personal Access Tokens (PAT):
```env
VITE_GITHUB_TOKEN=your_github_classic_token_here
VITE_GITLAB_TOKEN=your_gitlab_pat_here
```
*(Note: Generate a classic GitHub PAT with `read:user` permissions. For GitLab, generate a PAT with `read_api` or `read_user` access).*

### 4. Run Development Server
Start the Vite development server:

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser to see the portfolio!

## 📦 Build for Production

To build the app for production, run:

```bash
npm run build
```
This will compile and minify the Vue components into static files in the `dist` directory, ready to be deployed to Vercel, Netlify, or any other static hosting service.

---
*Designed & Developed with ❤️ by Rafli Hendarsyah*
