# 🛍️ Next.js E-Commerce Store

A modern e-commerce application built with Next.js, featuring product listings, user authentication, cart functionality, and Stripe payments.

## ✨ Key Features

### 🏷️ Product Management
- Browse products in grid or list view
- Detailed product pages with reviews
- Admin product CRUD operations
- Product favorites system

### 👤 User Experience
- Clerk authentication (sign up/in)
- User profile management
- Product reviews and ratings
- Personalized favorites list

### 🛒 Shopping Cart
- Add/remove items
- Adjust quantities
- Automatic total calculation (subtotal, tax, shipping)

### 💳 Checkout Process
- Secure Stripe embedded checkout
- Order history tracking

### 👔 Admin Dashboard
- Sales analytics
- Product management
- Order tracking

## 🛠️ Technology Stack

### Frontend
- Next.js 15 (App Router)
- TypeScript
- Shadcn UI components
- Tailwind CSS
- React Icons

### Backend
- Prisma ORM
- PostgreSQL (via Supabase)
- Next.js Server Actions

### Services
- Clerk for authentication
- Stripe for payments
- Supabase for storage

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL database
- Accounts with:
  - Clerk
  - Stripe
  - Supabase

### Installation
```bash
# Clone repository
git clone https://github.com/mrtnwilliam/comfy-store.git
cd comfy-store

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Database setup
npx prisma db push
npx prisma generate

# Start development server
npm run dev