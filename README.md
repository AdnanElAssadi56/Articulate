# Articulate - AI Voice Advisory Platform

<div align="center">
  <img src="/public/images/hero-banner.png" alt="Articulate Platform" width="800"/>
  
  <p align="center">
    <strong>Your Personal AI Advisory Council</strong>
  </p>
  
  <p align="center">
    Connect with specialized AI advisors through natural voice conversations for career guidance, wellness coaching, spiritual growth, and academic support.
  </p>

  <p align="center">
    <a href="https://articulate-phi.vercel.app/">Live Demo</a> •
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#deployment">Deployment</a>
  </p>
</div>

---

## 📋 Table of Contents

- [🤖 Introduction](#-introduction)
- [⚙️ Tech Stack](#️-tech-stack)
- [🔋 Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Getting Started](#-getting-started)
- [🔐 Environment Variables](#-environment-variables)
- [📱 Screenshots](#-screenshots)
- [🎯 Subscription Tiers](#-subscription-tiers)
- [🛠️ Development](#️-development)
- [📦 Deployment](#-deployment)
- [📄 License](#-license)

---

## 🤖 Introduction

**Articulate** is a cutting-edge SaaS platform that revolutionizes personal advisory services through AI-powered voice conversations. Whether you need career guidance, wellness coaching, spiritual mentorship, or academic tutoring, Articulate connects you with specialized AI advisors that understand your needs and provide personalized guidance through natural voice interactions.

Built with modern web technologies and powered by advanced AI voice synthesis, Articulate delivers a seamless, human-like advisory experience that's accessible 24/7.

### Why Articulate?

- 🎯 **Specialized Advisors**: Choose from 40+ pre-built advisors or create your own custom AI advisor
- 🗣️ **Natural Voice Conversations**: Real-time voice interactions with low-latency responses
- 📊 **Track Your Progress**: Monitor your journey with detailed analytics and insights
- � **Flexible Pricing**: Free tier to get started, premium plans for power users
- 🔒 **Secure & Private**: Enterprise-grade security with Clerk authentication

---

## ⚙️ Tech Stack

<div align="center">

| Technology | Purpose | Why We Chose It |
|------------|---------|-----------------|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) | **Framework** | Server-side rendering, API routes, optimal performance |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) | **Language** | Type safety, better developer experience |
| ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) | **Database** | Real-time PostgreSQL, instant APIs |
| ![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white) | **Auth & Billing** | Complete user management, subscription handling |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) | **Styling** | Utility-first, rapid UI development |
| ![Sentry](https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white) | **Monitoring** | Error tracking, performance monitoring |
| ![Vapi](https://img.shields.io/badge/Vapi-FF6B6B?style=for-the-badge) | **Voice AI** | Low-latency voice conversations |

</div>

### Additional Technologies

- **shadcn/ui** - Beautiful, accessible component library
- **Zod** - TypeScript-first schema validation
- **React Hook Form** - Performant form handling
- **Lucide Icons** - Modern icon library

---

## 🔋 Features

### 🎙️ AI Voice Conversations
<img src="/public/images/voice-session.png" alt="Voice Session" width="600"/>

- **Real-time voice interactions** with AI advisors
- **Low-latency responses** for natural conversations
- **Session timer** to track conversation duration
- **Live transcription** of conversations
- **Download transcripts** for future reference

### 👥 Advisor Marketplace
<img src="/public/images/advisors-grid.png" alt="Advisors Grid" width="600"/>

- **Browse 40+ pre-built advisors** across 4 categories:
  - 💼 Career & Professional Development
  - 🧘 Wellness & Mental Health
  - 🕉️ Spiritual & Personal Growth
  - 📚 Academic & Learning
- **Advanced search & filtering** by category, subject, and topic
- **Advisor ratings** and session counts
- **Bookmark favorite advisors** for quick access

### 🎨 Create Custom Advisors
<img src="/public/images/create-advisor.png" alt="Create Advisor" width="600"/>

- **Design your own AI advisor** with custom:
  - Name and personality
  - Subject expertise
  - Conversation style (casual, professional, formal, nurturing)
  - Voice type (male/female)
  - Session duration
- **Tier-based limits**:
  - Free: 5 custom advisors
  - Pro: 20 custom advisors
  - Premium: Unlimited

### 📊 Journey Dashboard
<img src="/public/images/journey-dashboard.png" alt="Journey Dashboard" width="600"/>

- **Track your progress** with detailed statistics
- **Session history** with all your conversations
- **Bookmarked advisors** for easy access
- **Advanced analytics** (Premium feature - Coming Soon)
- **Conversation insights** (Pro/Premium feature)

### 💳 Subscription Management
<img src="/public/images/pricing.png" alt="Pricing Plans" width="600"/>

- **Flexible pricing tiers** to match your needs
- **Clerk-powered billing** for secure payments
- **Easy plan upgrades** and downgrades
- **Transparent pricing** with no hidden fees

### 🔐 Authentication & Security

- **Secure sign-up/sign-in** with Clerk
- **Google OAuth** integration
- **Session management** with automatic refresh
- **Protected routes** for authenticated users
- **Error monitoring** with Sentry

### 📱 Responsive Design

- **Mobile-first approach** for all devices
- **Smooth animations** and transitions
- **Loading states** for better UX
- **Skeleton screens** during data fetching
- **Optimized performance** with Next.js

---

## 🏗️ Architecture

### Project Structure

```
articulate/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── companions/               # Advisor routes
│   │   ├── [id]/                 # Individual advisor session
│   │   ├── new/                  # Create new advisor
│   │   └── page.tsx              # Advisors list
│   ├── journey/                  # User dashboard
│   ├── subscription/             # Pricing & billing
│   ├── loading.tsx               # Global loading state
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── CompanionCard.tsx
│   ├── CompanionComponent.tsx    # Voice session component
│   ├── CompanionForm.tsx
│   ├── Navbar.tsx
│   └── ...
├── lib/                          # Utility functions
│   ├── actions/                  # Server actions
│   ├── subscription.ts           # Tier management
│   ├── supabase.ts              # Database client
│   └── vapi.sdk.ts              # Voice AI SDK
├── constants/                    # App constants
│   ├── categories.ts
│   └── index.ts
├── types/                        # TypeScript types
└── public/                       # Static assets
```

### Database Schema (Supabase)

```sql
-- Companions (AI Advisors)
companions (
  id: uuid
  name: text
  category: text
  subject: text
  topic: text
  duration: integer
  voice: text
  style: text
  description: text
  author: text (user_id)
  created_at: timestamp
)

-- Bookmarks
bookmarks (
  id: uuid
  user_id: text
  companion_id: uuid (FK)
  created_at: timestamp
)

-- Session History
session_history (
  id: uuid
  user_id: text
  companion_id: uuid (FK)
  created_at: timestamp
)
```

---

## �  Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/AdnanElAssadi56/Articulate.git
cd Articulate
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Vapi Voice AI
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token

# Sentry Error Monitoring (Optional)
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

4. **Set up Supabase database**

Run the following SQL in your Supabase SQL editor:

```sql
-- Create companions table
create table companions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null,
  subject text not null,
  topic text not null,
  duration integer not null,
  voice text not null,
  style text not null,
  description text,
  author text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create bookmarks table
create table bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  companion_id uuid references companions(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, companion_id)
);

-- Create session_history table
create table session_history (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  companion_id uuid references companions(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table companions enable row level security;
alter table bookmarks enable row level security;
alter table session_history enable row level security;

-- Create policies
create policy "Companions are viewable by everyone"
  on companions for select
  using (true);

create policy "Users can create companions"
  on companions for insert
  with check (true);

create policy "Users can manage their own bookmarks"
  on bookmarks for all
  using (true);

create policy "Users can manage their own session history"
  on session_history for all
  using (true);
```

5. **Configure Clerk subscriptions**

In your Clerk dashboard:
- Create three subscription plans: Free, Pro, Premium
- Set up pricing: Pro ($9.99/mo), Premium ($19.99/mo)
- Configure features for each tier

6. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

7. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | [Clerk Dashboard](https://dashboard.clerk.com) |
| `CLERK_SECRET_KEY` | Clerk secret key | [Clerk Dashboard](https://dashboard.clerk.com) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | [Supabase Dashboard](https://app.supabase.com) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | [Supabase Dashboard](https://app.supabase.com) |
| `NEXT_PUBLIC_VAPI_WEB_TOKEN` | Vapi web token | [Vapi Dashboard](https://vapi.ai) |

### Optional Variables

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `SENTRY_AUTH_TOKEN` | Sentry authentication token | [Sentry Dashboard](https://sentry.io) |

---

## 📱 Screenshots

### Homepage
<img src="/public/images/homepage.png" alt="Homepage" width="800"/>

### Mobile View
<img src="/public/images/mobile-view.png" alt="Mobile View" width="400"/>

---

## 🎯 Subscription Tiers

### Free Tier
Perfect for trying out the platform
- 5 custom advisors
- 3 bookmarks
- 5 sessions per month
- 10-minute sessions
- Access to all pre-built advisors

### Pro Tier - $9.99/month
For regular users
- 20 custom advisors
- Unlimited bookmarks
- 50 sessions per month
- 20-minute sessions
- Conversation insights
- Download transcripts
- Unlimited conversation history

### Premium Tier - $19.99/month
For power users
- Unlimited custom advisors
- Unlimited bookmarks
- Unlimited sessions
- 30-minute sessions
- Advanced analytics
- AI-powered insights
- All Pro features

---

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**

- Go to [Vercel](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Add environment variables
- Deploy!

3. **Configure environment variables in Vercel**

Add all variables from `.env.local` to your Vercel project settings.

Your app will be live at `https://your-project.vercel.app`

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

Built with [Clerk](https://clerk.com), [Supabase](https://supabase.com), [Vapi](https://vapi.ai), and [Vercel](https://vercel.com).
