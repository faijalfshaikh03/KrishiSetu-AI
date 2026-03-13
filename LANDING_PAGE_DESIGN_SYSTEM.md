# KrishiSetu-AI Landing Page - Design System

## 🎨 Complete Design System for Premium Startup Landing Page

---

## 📊 Color Palette

### Primary Brand Colors

#### Green 600 (Main Brand)
- **Hex**: `#16a34a`
- **RGB**: `22, 163, 74`
- **Usage**: Primary buttons, headings, icons, accents
- **Meaning**: Growth, trust, agriculture, prosperity

#### Emerald 600 (Secondary Brand)
- **Hex**: `#059669`
- **RGB**: `5, 150, 105`
- **Usage**: Gradients, hover states, secondary elements
- **Meaning**: Nature, sustainability, freshness

#### Green 500 (Accent)
- **Hex**: `#22c55e`
- **RGB**: `34, 197, 94`
- **Usage**: Highlights, active states, emphasis
- **Meaning**: Energy, action, growth

---

### Secondary Colors (Feature-Specific)

#### Blue 600 (Data & Technology)
- **Hex**: `#2563eb`
- **RGB**: `37, 99, 235`
- **Usage**: Price prediction, data insights, tech features
- **Meaning**: Trust, intelligence, technology

#### Cyan 600 (Modern & Fresh)
- **Hex**: `#0891b2`
- **RGB**: `8, 145, 178`
- **Usage**: Weather, real-time data, modern elements
- **Meaning**: Clarity, freshness, innovation

#### Purple 600 (Innovation & Connection)
- **Hex**: `#9333ea`
- **RGB**: `147, 51, 234`
- **Usage**: Community, connections, innovation
- **Meaning**: Creativity, connection, transformation

#### Orange 600 (Energy & Action)
- **Hex**: `#ea580c`
- **RGB**: `234, 88, 12`
- **Usage**: Marketplace, action items, energy
- **Meaning**: Energy, action, opportunity

#### Amber 600 (Warmth & Reliability)
- **Hex**: `#b45309`
- **RGB**: `180, 83, 9`
- **Usage**: Reliability, support, warmth
- **Meaning**: Trust, reliability, support

#### Indigo 600 (Sophistication)
- **Hex**: `#4f46e5`
- **RGB**: `79, 70, 229`
- **Usage**: Premium features, sophistication
- **Meaning**: Sophistication, intelligence, premium

#### Teal 600 (Balance)
- **Hex**: `#0d9488`
- **RGB**: `13, 148, 136`
- **Usage**: Balance, harmony, sustainability
- **Meaning**: Balance, harmony, growth

---

### Neutral Colors

#### Gray 900 (Dark Text & Backgrounds)
- **Hex**: `#111827`
- **RGB**: `17, 24, 39`
- **Usage**: Primary text, dark backgrounds, footer
- **Contrast**: WCAG AAA with white

#### Gray 700 (Secondary Text)
- **Hex**: `#374151`
- **RGB**: `55, 65, 81`
- **Usage**: Secondary headings, labels
- **Contrast**: WCAG AA with white

#### Gray 600 (Body Text)
- **Hex**: `#4b5563`
- **RGB**: `75, 85, 99`
- **Usage**: Body copy, descriptions
- **Contrast**: WCAG AA with white

#### Gray 500 (Muted Text)
- **Hex**: `#6b7280`
- **RGB**: `107, 114, 128`
- **Usage**: Captions, hints, secondary info
- **Contrast**: WCAG AA with white

#### Gray 50 (Light Backgrounds)
- **Hex**: `#f9fafb`
- **RGB**: `249, 250, 251`
- **Usage**: Section backgrounds, card backgrounds
- **Contrast**: Good with dark text

#### White (Clean Backgrounds)
- **Hex**: `#ffffff`
- **RGB**: `255, 255, 255`
- **Usage**: Main background, card backgrounds
- **Contrast**: WCAG AAA with dark text

---

### Gradient Combinations

#### Primary Gradient (Green → Emerald)
```
from-green-600 to-emerald-600
Linear 135deg
Usage: Primary buttons, hero section, main CTAs
```

#### Blue Gradient (Blue → Cyan)
```
from-blue-600 to-cyan-600
Linear 135deg
Usage: Data features, tech elements
```

#### Purple Gradient (Purple → Pink)
```
from-purple-600 to-pink-600
Linear 135deg
Usage: Innovation, community features
```

#### Orange Gradient (Orange → Amber)
```
from-orange-600 to-amber-600
Linear 135deg
Usage: Marketplace, action items
```

#### Indigo Gradient (Indigo → Blue)
```
from-indigo-600 to-blue-600
Linear 135deg
Usage: Premium features, sophistication
```

---

### Light Backgrounds (Tinted)

#### Green Tint
- **Hex**: `#f0fdf4` (Green 50)
- **Usage**: Green section backgrounds
- **Contrast**: Good with dark text

#### Blue Tint
- **Hex**: `#eff6ff` (Blue 50)
- **Usage**: Blue section backgrounds
- **Contrast**: Good with dark text

#### Purple Tint
- **Hex**: `#faf5ff` (Purple 50)
- **Usage**: Purple section backgrounds
- **Contrast**: Good with dark text

#### Orange Tint
- **Hex**: `#fff7ed` (Orange 50)
- **Usage**: Orange section backgrounds
- **Contrast**: Good with dark text

---

## 🔤 Typography System

### Font Stack

#### Headings (Primary)
```css
font-family: 'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
font-weight: 700 (bold);
letter-spacing: -0.02em;
```

#### Body (Secondary)
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
font-weight: 400 (regular);
letter-spacing: 0;
```

---

### Font Sizes & Scales

#### Heading Hierarchy

**H1 - Hero Headline**
- Mobile: 36px (2.25rem)
- Tablet: 48px (3rem)
- Desktop: 64px (4rem)
- Weight: 700 (bold)
- Line Height: 1.2
- Letter Spacing: -0.02em

**H2 - Section Title**
- Mobile: 28px (1.75rem)
- Tablet: 36px (2.25rem)
- Desktop: 48px (3rem)
- Weight: 700 (bold)
- Line Height: 1.2
- Letter Spacing: -0.01em

**H3 - Card Title**
- Mobile: 18px (1.125rem)
- Tablet: 20px (1.25rem)
- Desktop: 24px (1.5rem)
- Weight: 700 (bold)
- Line Height: 1.3
- Letter Spacing: 0

**H4 - Subheading**
- Size: 16px (1rem)
- Weight: 600 (semibold)
- Line Height: 1.4
- Letter Spacing: 0

#### Body Text

**Body Large**
- Size: 18px (1.125rem)
- Weight: 400 (regular)
- Line Height: 1.6
- Letter Spacing: 0
- Usage: Main body copy

**Body Regular**
- Size: 16px (1rem)
- Weight: 400 (regular)
- Line Height: 1.6
- Letter Spacing: 0
- Usage: Standard body text

**Body Small**
- Size: 14px (0.875rem)
- Weight: 400 (regular)
- Line Height: 1.5
- Letter Spacing: 0
- Usage: Secondary text, captions

**Caption**
- Size: 12px (0.75rem)
- Weight: 500 (medium)
- Line Height: 1.4
- Letter Spacing: 0.02em
- Usage: Labels, hints

---

### Text Styles

#### Gradient Text (Hero Headline)
```css
background: linear-gradient(to right, #16a34a, #059669);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

#### Emphasis Text
```css
font-weight: 600;
color: #16a34a;
```

#### Muted Text
```css
color: #6b7280;
font-weight: 400;
```

---

## 📐 Spacing System

### Base Unit: 4px

#### Spacing Scale
- **xs**: 4px (0.25rem)
- **sm**: 8px (0.5rem)
- **md**: 12px (0.75rem)
- **lg**: 16px (1rem)
- **xl**: 24px (1.5rem)
- **2xl**: 32px (2rem)
- **3xl**: 48px (3rem)
- **4xl**: 64px (4rem)
- **5xl**: 96px (6rem)

### Container Spacing
```
Max Width: 1280px (7xl)
Padding: 16px (mobile) → 32px (desktop)
Margin: 0 auto
```

### Section Spacing
```
Vertical: 64px (mobile) → 96px (desktop)
Horizontal: 32px (mobile) → 48px (desktop)
```

### Component Spacing
```
Card Padding: 32px
Button Padding: 16px (horizontal) × 12px (vertical)
Icon Spacing: 8px (inline) → 24px (section)
```

---

## 🎯 Border & Radius System

### Border Radius

#### Small (sm)
- Value: 6px (0.375rem)
- Usage: Small buttons, badges

#### Medium (md)
- Value: 8px (0.5rem)
- Usage: Input fields, small cards

#### Large (lg)
- Value: 12px (0.75rem)
- Usage: Buttons, medium cards

#### Extra Large (xl)
- Value: 16px (1rem)
- Usage: Large cards, sections

#### 2XL
- Value: 20px (1.25rem)
- Usage: Feature cards, hero elements

#### Full
- Value: 9999px
- Usage: Circles, pills

### Border Styles

#### Card Border
```css
border: 1px solid #e5e7eb;
border-radius: 16px;
```

#### Button Border
```css
border: 2px solid #16a34a;
border-radius: 12px;
```

#### Icon Border
```css
border-radius: 12px;
```

---

## 🎨 Shadow System

### Shadow Levels

#### No Shadow
```css
box-shadow: none;
```

#### Small Shadow (sm)
```css
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
```

#### Medium Shadow (md)
```css
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
```

#### Large Shadow (lg)
```css
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
```

#### Extra Large Shadow (xl)
```css
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

#### 2XL Shadow (2xl)
```css
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Shadow Usage
- **Cards**: lg shadow
- **Buttons (hover)**: xl shadow
- **Modals**: 2xl shadow
- **Floating elements**: md shadow

---

## 🎬 Animation System

### Transition Durations

#### Fast (150ms)
```css
transition-duration: 150ms;
```
Usage: Hover effects, quick interactions

#### Standard (300ms)
```css
transition-duration: 300ms;
```
Usage: Most animations, smooth transitions

#### Slow (500ms)
```css
transition-duration: 500ms;
```
Usage: Page transitions, major changes

### Easing Functions

#### Ease In Out (Standard)
```css
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
```

#### Ease In
```css
transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
```

#### Ease Out
```css
transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
```

### Animation Effects

#### Scale
```css
transform: scale(1.05);
transition: transform 300ms ease-in-out;
```

#### Translate
```css
transform: translateY(-4px);
transition: transform 300ms ease-in-out;
```

#### Fade
```css
opacity: 0.5;
transition: opacity 300ms ease-in-out;
```

#### Pulse
```css
animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```

---

## 🔘 Component Specifications

### Button Specifications

#### Primary Button
```
Background: Gradient (Green 600 → Emerald 600)
Text Color: White
Text Weight: 700 (bold)
Padding: 16px 32px
Border Radius: 12px
Font Size: 16px
Line Height: 1.5
Hover: Scale 1.05, Shadow xl
Active: Scale 0.98
Disabled: Opacity 0.5
Transition: 300ms ease-in-out
```

#### Secondary Button
```
Background: White
Border: 2px Green 600
Text Color: Green 600
Text Weight: 700 (bold)
Padding: 16px 32px
Border Radius: 12px
Font Size: 16px
Hover: Background Green 50
Active: Background Green 100
Transition: 300ms ease-in-out
```

#### Outline Button
```
Background: Transparent
Border: 2px White
Text Color: White
Text Weight: 700 (bold)
Padding: 16px 32px
Border Radius: 12px
Hover: Background White, Text Green 600
Transition: 300ms ease-in-out
```

### Card Specifications

#### Benefit Card
```
Background: Gradient (Color 50 → Color 50)
Border: 1px Color 100
Border Radius: 16px
Padding: 32px
Hover: Shadow 2xl
Transition: 300ms ease-in-out
```

#### Feature Card
```
Background: White
Border: 1px Gray 100
Border Radius: 16px
Padding: 32px
Hover: Shadow 2xl, Icon Scale 1.1
Transition: 300ms ease-in-out
```

---

## 📱 Responsive Breakpoints

### Mobile First Approach

#### Mobile (< 768px)
- Single column layouts
- Full-width buttons
- Larger text
- Simplified navigation
- Hamburger menu

#### Tablet (768px - 1024px)
- 2-column layouts
- Larger cards
- Medium text
- Simplified navigation

#### Desktop (> 1024px)
- Multi-column layouts
- Hover effects
- Standard text
- Full navigation
- Animations

---

## ✅ Accessibility Standards

### Color Contrast
- **WCAG AA**: 4.5:1 for text
- **WCAG AAA**: 7:1 for text
- **Large text**: 3:1 minimum

### Focus States
```css
outline: 2px solid #16a34a;
outline-offset: 2px;
```

### Keyboard Navigation
- Tab order: Logical
- Focus visible: Always
- Skip links: Available

### Screen Readers
- ARIA labels: Descriptive
- Alt text: Meaningful
- Semantic HTML: Proper

---

## 🎯 Design Tokens Summary

```json
{
  "colors": {
    "primary": "#16a34a",
    "secondary": "#059669",
    "accent": "#22c55e",
    "text": "#111827",
    "textSecondary": "#4b5563",
    "background": "#ffffff",
    "backgroundLight": "#f9fafb"
  },
  "typography": {
    "fontFamily": "Inter, sans-serif",
    "fontSize": {
      "h1": "64px",
      "h2": "48px",
      "h3": "24px",
      "body": "16px"
    }
  },
  "spacing": {
    "unit": "4px",
    "container": "1280px",
    "section": "96px"
  },
  "radius": {
    "sm": "6px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px"
  },
  "shadow": {
    "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
  }
}
```

---

## 🚀 Implementation Checklist

- [ ] Color palette applied to all sections
- [ ] Typography hierarchy consistent
- [ ] Spacing system followed
- [ ] Shadows applied correctly
- [ ] Animations smooth and performant
- [ ] Responsive design tested
- [ ] Accessibility standards met
- [ ] Buttons styled correctly
- [ ] Cards styled correctly
- [ ] Icons properly sized and colored

---

**Status**: Production-ready
**Last Updated**: 2024
**Version**: 1.0
