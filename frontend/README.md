# Thriving Talents

Built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## 🎯 Project Overview

## 📄 Pages & Sections

### Home Page (`app/page.tsx`)

#### 1. **Header Component** (`components/header.tsx`)
- Navigation bar with logo and menu
- Sign In and Create Account buttons visible on all screen sizes
- Mobile-responsive menu with dropdown navigation
- Sticky header for easy access

#### 2. **Hero Section** (`components/hero-section.tsx`)
- Eye-catching headline and call-to-action
- Company logos carousel (LinkedIn, Asana, Toyota, Zoom)
- Auto-scrolling logo display on mobile
- Statistics display: "2943 Companies Joined" and "1M+ Interns Hired"
- Responsive design with side image

#### 3. **Why Choose Us Section** (`components/why-choose-us.tsx`)
- Headline: "Empower HR with AI-driven tools to optimize teams, boost productivity, and drive success"
- Highlights key benefits with "AI-driven" text highlighted in pink/magenta
- Feature cards showcasing platform advantages
- Responsive grid layout

#### 4. **Interns Section** (`components/interns-section.tsx`)
- Showcases opportunities for interns
- Side-by-side layout with image and content
- Maintains horizontal layout on all screen sizes
- Call-to-action for intern sign-ups

#### 5. **Testimonials Section** (`components/testimonials-section.tsx`)
- Customer testimonials and reviews
- 6 testimonial cards in a 2-column grid on desktop
- Auto-scrolling carousel on mobile (5-second intervals)
- Features:
  - Profile images positioned half outside/half inside cards
  - 5-star ratings in top-right corner
  - Thumbs-up icon with blue background beside "Testimonial" text
  - Customer name and title below testimonial
  - Testimonial badge on the right
- White background with subtle shadow effects
- Smooth edge blending with surrounding sections

#### 6. **CTA Section** (`components/cta-section.tsx`)
- "Try it for free" call-to-action
- Red background with rounded corners
- Left side: Headline, description, and "Start for Free" button
- Right side: Professional image filling the entire height
- Horizontal layout maintained on all screen sizes
- Reduced background height for moderate appearance

#### 7. **Footer Component** (`components/footer.tsx`)
- Company information and links
- Navigation links
- Social media links
- Copyright information

### Authentication Pages
- **Signup Page** (`app/signup/page.tsx`)
  - Multi-step signup process
  - Step 1: Role selection (Employer/Intern)
  - Step 2: CV upload with progress tracking
  - Step 3: Video introduction (Introduce yourself)
  - Features:
    - Logo positioned at top-left corner
    - Side image with professional background
    - Light blue button borders with hover effects
    - Real-time upload progress animation
    - File upload functionality for both CV and video

## 🎨 Design Features

### Color Scheme
- **Primary Red**: #FE2728 (brand color)
- **Light Blue**: #D1E9FF (hover/accent states)
- **White**: Background color
- **Blue-Gray**: Shadows and subtle accents

### Typography
- **Font Family**: Geist (sans-serif)
- **Mono Font**: Geist Mono
- **Responsive text sizing** with Tailwind CSS

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)
- Carousel on mobile, grid on desktop
- Proportional scaling of elements on small screens

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Font**: Google Fonts (Geist)

## 📦 Project Structure

\`\`\`
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles and design tokens
│   ├── signup/
│   │   └── page.tsx         # Multi-step signup page
│   └── ...
├── components/
│   ├── header.tsx           # Navigation header
│   ├── hero-section.tsx     # Hero section with stats
│   ├── why-choose-us.tsx    # Features section
│   ├── interns-section.tsx  # Interns opportunities
│   ├── testimonials-section.tsx  # Customer testimonials
│   ├── cta-section.tsx      # Call-to-action section
│   ├── company-logos.tsx    # SVG logo components
│   ├── footer.tsx           # Footer
│   └── ui/                  # shadcn/ui components
├── hooks/
│   ├── use-mobile.tsx       # Mobile detection hook
│   └── use-toast.ts         # Toast notifications
├── lib/
│   └── utils.ts             # Utility functions
├── public/
│   ├── thrivingtalentlogo.png
│   ├── signupsideimage.jpg
│   └── ...
├── package.json
├── tsconfig.json
├── next.config.mjs
└── README.md
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd thriving-talents
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 📱 Key Features

✅ **Responsive Design** - Works seamlessly on all devices
✅ **Auto-scrolling Carousel** - Logo and testimonial carousels
✅ **Multi-step Signup** - Intuitive onboarding process
✅ **File Upload** - CV and video upload with progress tracking
✅ **Interactive Elements** - Hover effects, animations, and transitions
✅ **Accessibility** - Semantic HTML and ARIA attributes
✅ **Performance** - Optimized images and lazy loading
✅ **SEO Friendly** - Proper metadata and structured content

## 🔄 Creating a Branch for Review

Follow these steps to create a branch for code review:

### Step 1: Create a New Branch
\`\`\`bash
git checkout -b feature/review-[feature-name]
\`\`\`

Example:
\`\`\`bash
git checkout -b feature/review-testimonials-update
\`\`\`

### Step 2: Make Your Changes
Make all necessary updates to the code.

### Step 3: Stage Your Changes
\`\`\`bash
git add .
\`\`\`

### Step 4: Commit Your Changes
\`\`\`bash
git commit -m "feat: [description of changes]"
\`\`\`

Example:
\`\`\`bash
git commit -m "feat: update testimonials section with auto-scroll carousel"
\`\`\`

### Step 5: Push the Branch to Remote
\`\`\`bash
git push origin feature/review-[feature-name]
\`\`\`

Example:
\`\`\`bash
git push origin feature/review-testimonials-update
\`\`\`

### Step 6: Create a Pull Request
1. Go to your GitHub repository
2. Click "Compare & pull request" button
3. Add a descriptive title and description
4. Assign reviewers
5. Click "Create pull request"

### Pull Request Template
\`\`\`markdown
## Description
Brief description of the changes made.