# KrishiSetu-AI Landing Page - Component Guide

## 🧩 Component Architecture

The landing page is built with reusable, modular components following React best practices.

---

## 📦 Main Components

### 1. Landing Page (Landing.tsx)
**Purpose**: Main landing page container
**Location**: `src/pages/Landing.tsx`
**Exports**: Default export

**Structure**:
```
Landing
├── Sticky Navbar
├── Hero Section
├── Benefits Section
├── Features Section
├── How It Works Section
├── Product Preview Section
├── Impact Section
├── Strong CTA Section
└── Footer
```

**Key Features**:
- Scroll detection for navbar
- Mobile menu toggle
- Smooth navigation
- Responsive grid layouts
- Hover animations
- Gradient backgrounds

---

## 🎨 Section Components

### Sticky Navbar
**Purpose**: Fixed navigation bar
**Props**: None (uses internal state)
**State**: 
- `isScrolled`: Boolean for scroll detection
- `mobileMenuOpen`: Boolean for mobile menu

**Features**:
- Logo with gradient icon
- Desktop navigation links
- Mobile hamburger menu
- Auth buttons (Sign In, Get Started)
- Shadow on scroll
- Smooth transitions

**Responsive**:
- Mobile: Hamburger menu, stacked buttons
- Desktop: Horizontal nav, side-by-side buttons

---

### Hero Section
**Purpose**: Above-the-fold impact section
**Layout**: 2-column grid (desktop), 1-column (mobile)

**Left Column**:
- Badge: "🌾 AI-Powered Agricultural Intelligence"
- Headline: "Grow Smarter, Earn Better"
- Value proposition text
- Two CTA buttons
- Trust indicators

**Right Column**:
- Dashboard mockup card
- Floating price card
- Floating weather card
- Gradient background blobs

**Features**:
- Animated background blobs
- Gradient text on headline
- Hover effects on buttons
- Floating card animations

---

### Benefits Section
**Purpose**: Explain key benefits
**Layout**: 3-column grid (desktop), 1-column (mobile)

**Card Structure** (6 cards):
```
┌─────────────────────┐
│  Colored Icon       │
│  Title              │
│  Description        │
└─────────────────────┘
```

**Card Variants**:
1. Green gradient (Higher Profits)
2. Blue gradient (Smarter Decisions)
3. Purple gradient (Direct Connection)
4. Orange gradient (Reduced Losses)
5. Indigo gradient (Reliable Sourcing)
6. Teal gradient (No Middlemen)

**Features**:
- Color-coded by benefit
- Hover shadow elevation
- Icon in top-left
- Responsive grid

---

### Features Section
**Purpose**: Showcase core features
**Layout**: 4-column grid (desktop), 1-column (mobile)
**Background**: Light gradient

**Card Structure** (4 cards):
```
┌─────────────────────┐
│  Large Icon         │
│  Title              │
│  Description        │
└─────────────────────┘
```

**Features**:
1. AI Crop Recommendation (Green)
2. Market Price Prediction (Blue)
3. Weather Insights (Purple)
4. Direct Buyer Marketplace (Orange)

**Interactions**:
- Icon scales on hover
- Shadow elevation
- Smooth transitions

---

### How It Works Section
**Purpose**: Explain 3-step process
**Layout**: 3-column grid with connecting line

**Step Structure**:
```
    ┌─────┐
    │  1  │
    └─────┘
      ↓
    ┌─────┐
    │  2  │
    └─────┘
      ↓
    ┌─────┐
    │  3  │
    └─────┘
```

**Features**:
- Numbered circles (1, 2, 3)
- Connecting line (desktop only)
- Step descriptions
- CTA button at bottom
- Responsive: Stacked on mobile

---

### Product Preview Section
**Purpose**: Show dashboard mockups
**Layout**: 2-column grid (desktop), 1-column (mobile)

**Left Column - Farmer Dashboard**:
- Header: Green gradient
- Mockup area with crop recommendations
- 3 stat cards: Weather, Price, Buyers

**Right Column - Buyer Dashboard**:
- Header: Blue gradient
- Mockup area with available produce
- 3 stat cards: Farmers, Orders, Savings

**Features**:
- Responsive stacking
- Color-coded headers
- Stat cards with icons
- Gradient backgrounds

---

### Impact Section
**Purpose**: Show statistics and trust
**Layout**: 4-column grid + trust box

**Statistics** (4 cards):
```
┌──────────────┐
│   Icon       │
│   30%        │
│   Label      │
└──────────────┘
```

**Stats**:
1. 30% - Average Income Increase
2. 40% - Reduction in Crop Losses
3. 100% - Transparent Pricing
4. 0 - Middlemen Required

**Trust Box**:
- 3 trust indicators
- Icon + title + description
- Green background gradient
- Checkmark icons

---

### Strong CTA Section
**Purpose**: Final call-to-action
**Background**: Green gradient with pattern

**Content**:
- Large headline
- Supporting text
- Two CTA buttons
- Trust indicators
- Animated background blobs

**Features**:
- Full-width background
- Centered content
- Responsive buttons
- Subtle background pattern

---

### Footer
**Purpose**: Navigation and contact
**Layout**: 4-column grid (desktop), 1-column (mobile)

**Columns**:
1. Brand info + description
2. Quick links
3. Contact info
4. (Merged on mobile)

**Bottom Bar**:
- Copyright text
- Footer links: Privacy, Terms, Support

**Features**:
- Dark background (Gray 900)
- Responsive grid
- Link hover effects
- Contact information

---

## 🎯 Icon Usage

### Lucide React Icons
All icons from lucide-react library:

```typescript
import {
  Sprout,           // Logo, crop recommendation
  TrendingUp,       // Income, growth
  Cloud,            // Weather
  ShoppingCart,     // Marketplace, buyer
  CheckCircle,      // Trust, verification
  ArrowRight,       // CTA buttons
  Menu,             // Mobile menu
  X,                // Close menu
  Leaf,             // Agriculture
  BarChart3,        // Price prediction
  Users,            // Community, buyers
  Shield,           // Security, trust
  Zap,              // Energy, action
  Target            // Goals, decisions
} from 'lucide-react'
```

### Icon Sizing
- Navbar: 24px
- Section headers: 32px
- Cards: 56-64px
- Stats: 40px

### Icon Colors
- Match section theme
- Gradient backgrounds
- White on colored backgrounds
- Consistent stroke width (2px)

---

## 🎨 Styling Approach

### Tailwind CSS Classes

**Colors**:
```
Primary: from-green-600 to-emerald-600
Secondary: from-blue-600 to-cyan-600
Accent: from-purple-600 to-pink-600
```

**Spacing**:
```
Container: max-w-7xl mx-auto
Padding: px-4 sm:px-6 lg:px-8
Sections: py-16 md:py-24
Cards: p-8
```

**Typography**:
```
H1: text-4xl md:text-5xl lg:text-6xl font-bold
H2: text-3xl md:text-4xl lg:text-5xl font-bold
H3: text-xl md:text-2xl font-bold
Body: text-lg md:text-xl
Small: text-sm
```

**Borders & Shadows**:
```
Cards: rounded-2xl border border-gray-100
Hover: hover:shadow-2xl transition-all
Buttons: rounded-xl
```

**Animations**:
```
Transitions: transition-all duration-300
Hover: hover:scale-105 hover:shadow-lg
Scroll: animate-pulse delay-1000
```

---

## 📱 Responsive Design

### Breakpoints
- Mobile: < 768px (md)
- Tablet: 768px - 1024px (lg)
- Desktop: > 1024px

### Grid Layouts
```
Mobile:  1 column
Tablet:  2 columns
Desktop: 3-4 columns
```

### Button Sizing
```
Mobile:  Full-width, py-4
Desktop: Inline, px-8 py-4
```

### Text Sizing
```
Mobile:  Smaller (text-lg)
Desktop: Larger (text-xl)
```

---

## 🔄 State Management

### Component State
```typescript
const [isScrolled, setIsScrolled] = useState(false)
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
```

### Scroll Detection
```typescript
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

### Navigation
```typescript
const navigate = useNavigate()
onClick={() => navigate('/signup')}
```

---

## 🎬 Animations

### Scroll Animations
- Fade-in on scroll
- Slide-up animations
- Parallax backgrounds

### Hover Effects
- Button scale: 1.05
- Card shadow elevation
- Icon rotation/scale
- Color transitions

### Background Animations
- Gradient blobs with pulse
- Blur filter (blur-3xl)
- Opacity: 0.3
- Infinite animation

---

## 🔗 Navigation

### Internal Links
```typescript
<Link to="/login">Sign In</Link>
<Link to="/signup">Get Started</Link>
```

### Anchor Links
```typescript
<a href="#features">Features</a>
<a href="#how-it-works">How It Works</a>
<a href="#benefits">Benefits</a>
<a href="#impact">About</a>
```

### Button Navigation
```typescript
onClick={() => navigate('/signup')}
```

---

## ✅ Component Checklist

- [ ] All sections are responsive
- [ ] Icons are properly sized
- [ ] Colors match design system
- [ ] Buttons are clickable
- [ ] Links are functional
- [ ] Animations are smooth
- [ ] Text is readable
- [ ] Mobile menu works
- [ ] Scroll detection works
- [ ] No console errors

---

## 🚀 Performance Optimization

### Code Splitting
- Landing page is separate component
- Lazy load if needed
- Minimize bundle size

### Image Optimization
- Use WebP format
- Lazy loading
- Responsive images
- Optimized file sizes

### CSS Optimization
- Tailwind CSS purging
- Minimal custom CSS
- Reusable classes

### JavaScript Optimization
- Minimal state
- Efficient event listeners
- Cleanup in useEffect

---

## 📚 Component Dependencies

```
Landing.tsx
├── React (useState, useEffect)
├── react-router-dom (Link, useNavigate)
├── lucide-react (Icons)
└── Tailwind CSS (Styling)
```

---

## 🔧 Customization Guide

### Change Colors
1. Update Tailwind classes
2. Modify gradient colors
3. Update icon colors
4. Test on all sections

### Change Content
1. Update text in sections
2. Modify headlines
3. Update descriptions
4. Change CTA text

### Change Layout
1. Modify grid columns
2. Update spacing
3. Adjust responsive breakpoints
4. Test on all devices

### Add Sections
1. Create new section component
2. Add to Landing.tsx
3. Update navigation links
4. Test responsiveness

---

**Status**: Production-ready
**Last Updated**: 2024
**Version**: 1.0
