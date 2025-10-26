# Design Guidelines for Luxury Hotel Web Application

## Design Reference
**Primary Inspiration**: Wanderlush Travel Landing Page (Dribbble shot 25897549)
- Big hero with full-bleed imagery
- Clean glassmorphism cards
- Elegant typography hierarchy
- Generous white space
- Subtle parallax and microinteractions

## Color Palette

**Approach**: Muted neutral palette with one accent color

**Light Mode:**
- Background: Soft whites and light grays (0 0% 98%, 0 0% 95%)
- Text Primary: Deep charcoal (0 0% 15%)
- Text Secondary: Medium gray (0 0% 45%)
- Accent: Sophisticated jewel tone or muted gold (select one complementary color)
- Glass Cards: White with 80-90% opacity, subtle blur

**Dark Mode:**
- Background: Deep navy or charcoal (220 15% 12%, 220 12% 8%)
- Text Primary: Off-white (0 0% 95%)
- Text Secondary: Light gray (0 0% 70%)
- Glass Cards: Dark with 20-30% opacity, enhanced blur

## Typography

**Headline Font**: Elegant serif (Playfair Display, Cormorant Garamond, or Lora via Google Fonts)
- Hero titles: 48-72px desktop, 32-40px mobile
- Section headings: 36-48px desktop, 28-32px mobile

**Body Font**: Clean, readable sans-serif (Inter, Outfit, or Poppins)
- Body text: 16-18px
- Captions: 14px
- Buttons: 16px medium weight

## Layout System

**Spacing Units**: Use Tailwind spacing - primarily 4, 8, 12, 16, 20, 24, 32 units
- Section padding: py-20 to py-32 desktop, py-12 to py-16 mobile
- Card padding: p-6 to p-8
- Element gaps: gap-4, gap-6, gap-8

**Container**: max-w-7xl for full sections, max-w-6xl for content areas

## Hero Section

**Desktop Layout:**
- Full-bleed background photo (luxury hotel exterior/pool/ocean view)
- Left: Text card with glass effect containing headline, subheadline, primary CTA
- Right: Floating glass package card showing "Quick Rates" with pricing preview and "Check Availability" CTA
- Height: 85-90vh

**Mobile Layout:**
- Stacked vertical layout
- Hero image with overlay
- Centered text card
- Sticky bottom CTA bar for "Check availability"

## Component Library

### Glass Cards (Glassmorphism)
- Background: rgba(255, 255, 255, 0.1) with backdrop-blur-lg
- Border: 1px solid rgba(255, 255, 255, 0.2)
- Border radius: rounded-2xl or rounded-3xl
- Subtle shadow: shadow-xl with low opacity
- Used for: rate cards, feature highlights, quick info panels

### Room Cards
- Soft rounded corners (rounded-2xl)
- Image with subtle hover scale (scale-105 transition)
- Card shadow: shadow-lg
- Padding: p-6
- Hover state: lift effect with increased shadow

### Buttons
**Primary CTA:**
- Solid fill with accent color
- Rounded-full or rounded-xl
- Generous padding: px-8 py-3 to px-10 py-4
- Hover: slight scale and brightness adjustment

**Outline Buttons on Images:**
- Glass background with blur (backdrop-blur-md)
- White border (border-2 border-white/30)
- White text
- NO hover/active states (Button component handles this)

### Form Inputs
- Rounded borders (rounded-lg)
- Light background in light mode, dark in dark mode
- Focused state: accent color border
- Generous padding for touch targets

## Animations & Interactions

**Keep Subtle for Accessibility:**

**Parallax Effects:**
- Hero background: slow scroll at 0.5x speed
- Layered elements with different scroll speeds

**Fade-In on Entry:**
- Sections fade in with slight upward movement on scroll
- Stagger animations for cards/grid items

**Hover Effects:**
- Cards: scale-105 with smooth transition (300ms)
- Images: subtle zoom or brightness overlay
- Buttons: scale-[1.02] and shadow enhancement

**Mobile Interactions:**
- Sticky bottom CTA appears on scroll
- Smooth transitions, no jarring animations

## Page-Specific Design

### Rooms Listing
- Grid layout: 2 columns tablet, 3 columns desktop
- Large room images with 16:10 aspect ratio
- Glass overlay on hover showing amenities icons

### Room Detail
- Image gallery carousel at top (3:2 aspect ratio images)
- Two-column layout: left (details, amenities), right (availability calendar, pricing card with glass effect)

### Reservation/Checkout
- Single column centered form (max-w-2xl)
- Progress indicator at top
- Price breakdown in sticky glass sidebar (desktop)

### Admin Panel
- Clean dashboard with card-based metrics
- Data tables with alternating row colors
- Status badges with color coding

## Images

**Hero Section:**
- Large, high-quality Pixabay image (minimum 1920x1080)
- Luxury hotel exterior, infinity pool, or oceanfront view
- Professional, aspirational aesthetic

**Room Images:**
- Multiple angles per room (bed, bathroom, view, amenities)
- Consistent 16:10 or 3:2 aspect ratio
- High resolution from Pixabay: "luxury hotel room", "boutique hotel", "hotel suite"

**Additional Imagery:**
- Gallery page: 20+ curated images (hotel facilities, dining, spa, views)
- Testimonials: Optional guest photos or placeholder avatars
- About section: Hotel exterior, staff, facilities

## Responsive Breakpoints

- Mobile: base (< 640px)
- Tablet: md (768px+)
- Desktop: lg (1024px+)
- Large: xl (1280px+)

**Mobile-First Approach:**
- Single column layouts
- Stacked cards
- Full-width images
- Touch-optimized spacing (min 44px tap targets)

## Accessibility

- Maintain WCAG AA contrast ratios
- Dark mode throughout entire application including forms
- Subtle animations with reduced motion support
- Clear focus indicators on interactive elements
- Semantic HTML structure