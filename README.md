# StudyAbroad TN - MVP Platform

A subscription-based platform for Tunisian students to access study abroad guides (Campus France, Italy, Germany, etc.) and AI language tutoring to reach C1 level in French, English, and Arabic.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma (SQLite for development, PostgreSQL for production)
- **Authentication**: JWT-based with httpOnly cookies
- **AI**: OpenAI GPT-4
- **Payment**: Stripe (to be integrated)
- **Languages Supported**: French 🇫🇷, English 🇬🇧, Arabic 🇸🇦

## 📁 Project Structure

```
startup/
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication endpoints
│   │   ├── tutor/         # AI tutor chat endpoints
│   │   └── user/          # User management
│   ├── courses/           # Course listing page
│   ├── dashboard/         # User dashboard
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── tutor/             # AI tutor interface
│   ├── layout.tsx
│   └── page.tsx           # Landing page
├── lib/
│   ├── db.ts              # Prisma client
│   └── auth.config.ts     # Auth configuration
├── src/prisma/
│   └── contract.prisma    # Database schema
└── .env                   # Environment variables
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your keys:

```bash
# Database (SQLite for development)
DATABASE_URL="file:./dev.db"

# Authentication
NEXTAUTH_SECRET="your-secret-key-change-in-production"

# OpenAI (required for AI tutor)
OPENAI_API_KEY="sk-your-openai-api-key"

# Stripe (for payments - optional for now)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### 3. Set Up Database

```bash
# Generate Prisma client
npx prisma generate

# Create database and run migrations
npx prisma db push

# Optional: Open Prisma Studio to view data
npx prisma studio
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📝 Database Schema

The platform uses the following main models:

- **User**: User accounts with authentication
- **Subscription**: Stripe subscription tracking
- **Country**: Study destinations (France, Italy, Germany, etc.)
- **Course**: Study guides and video content
- **ChatSession**: AI tutor conversation sessions
- **ChatMessage**: Individual messages in chat
- **LearningProgress**: Track user progress in each language

## ✨ Features

### ✅ Implemented (MVP)

- 🎨 Beautiful landing page with pricing
- 🔐 User registration and login
- 📊 User dashboard
- 🤖 AI tutor for French, English, and German
- 📚 Course listing by country
- 🌍 Multi-country support (France, Italy, Germany)

### 🔜 Next Steps

1. **Stripe Integration**
   - Add checkout flow
   - Webhook handling for subscriptions
   - Subscription status management

2. **Content Management**
   - Admin panel to add courses
   - Video upload and hosting
   - Rich text editor for guides

3. **Learning Progress**
   - Track language levels
   - Exercise completion
   - Streak system

4. **Enhanced AI Tutor**
   - Voice practice
   - Grammar exercises
   - Level assessment

5. **Community Features**
   - Forum for students
   - Success stories
   - Q&A section

## 🎯 Pricing Plans

### Basic (29 TND/month)
- Access to basic guides
- AI tutor (100 messages/month)
- 1 language (French, English, or Arabic)
- Community support

### Premium (59 TND/month)
- All premium guides
- Unlimited AI tutor
- 3 languages (French, English, Arabic)
- Priority support
- Document templates
- Exclusive updates

## 🔒 Authentication

The platform uses JWT tokens stored in httpOnly cookies for security. No third-party auth providers yet (can add Google/Facebook later).

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database

For production, switch from SQLite to PostgreSQL:

```
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

## 🤝 Contributing

This is an MVP for testing. Future improvements welcome!

## 📄 License

Private project - All rights reserved.

---

Built with ❤️ for Tunisian students pursuing their dreams abroad.
