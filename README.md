# Design.ly: The AI-Powered Creative Engine

![Design.ly Logo](https://via.placeholder.com/800x200/9929EA/FFFFFF?text=Design.ly+-+The+AI-Powered+Creative+Engine)

## 🎨 Overview

**Design.ly** is a revolutionary, full-stack generative AI design platform meticulously engineered for boundless creativity. Through its sleek, intuitive UI accented by a vibrant **#9929EA purple**, Design.ly seamlessly integrates cutting-edge **Google Gemini AI** for multi-modal content generation and a powerful **Supabase backend** for secure data persistence and blazing-fast asset storage.

### ✨ Your Vision. Our AI. Unbounded Creativity.

Beyond simple automation, Design.ly provides:
- 🧠 **Deep creative control** with intelligent AI assistance
- 📊 **Intelligent trend insights** and adaptive learning
- 🎯 **Brand-consistent visuals** across all design disciplines
- 🚀 **Real-time collaboration** and instant generation
- 🎨 **Comprehensive design modes** from branding to motion graphics

## 🌟 Key Features

### 🤖 AI-Powered Design Generation
- **Google Gemini Integration**: Advanced text-to-image and multimodal AI
- **Intelligent Prompting**: AI-enhanced prompt suggestions and refinement
- **Style Transfer**: Apply sophisticated design styles with AI precision
- **Brand Intelligence**: Maintain perfect brand consistency automatically

### 🎨 Comprehensive Design Modes
1. **Design Assets** - Social media, posters, advertisements
2. **Branding & Identity** - Logos, brand guidelines, business kits
3. **UI/UX Concepts** - App interfaces, web designs, component libraries
4. **Product & Packaging** - 3D mockups, labels, product visualization
5. **Editorial & Publication** - Layouts, blog graphics, newsletters
6. **Data Storytelling** - Infographics, charts, data visualization

### 🛠️ Professional Tools
- **Interactive Canvas Editor** with drag-and-drop functionality
- **Real-time Collaboration** with team workspace features
- **Version Control** with comprehensive design history
- **Export Formats**: PNG, PDF, SVG, and more
- **Brand Management** with guideline enforcement

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Cloud account (for Gemini API)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhinav28birajdar/DesignDot.git
   cd DesignDot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # Google Gemini AI
   GOOGLE_AI_API_KEY=your_gemini_api_key
   
   # Application
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Database Setup**
   ```bash
   # Run the schema SQL file in your Supabase SQL editor
   # Located at: database/schema.sql
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

### Color Palette
- **Primary**: `#9929EA` (Design.ly Purple) - Magic, creativity, innovation
- **Secondary**: `#34D399` (Design.ly Emerald) - Growth, success, harmony
- **Dark UI**: `#1A1A1A` (Near Black) - Sophisticated, modern background
- **Panels**: `#2C2C2C` (Dark Grey) - Content separation and elevation

### Typography
- **Headlines**: Plus Jakarta Sans - Strong, geometric impact
- **Body Text**: Inter - Highly legible, versatile readability
