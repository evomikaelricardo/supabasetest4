# REST API Platform Design Guidelines

## Design Approach
**System Selected:** Stripe/Vercel Developer Platform Aesthetic
**Justification:** API-focused products require crystal-clear information hierarchy, excellent code readability, and professional technical aesthetics. Drawing inspiration from Stripe's documentation clarity and Vercel's minimalist precision.

**Core Principles:**
- Technical elegance over visual complexity
- Information clarity drives all design decisions
- Code-first typography and spacing
- Professional, trustworthy aesthetic for developer tools

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- Background Base: 222 47% 11% (deep charcoal)
- Surface: 222 47% 15% (elevated panels)
- Surface Hover: 222 47% 18%
- Primary Accent: 142 76% 36% (terminal green - for success states, active API indicators)
- Text Primary: 0 0% 98%
- Text Secondary: 0 0% 71%
- Border: 222 47% 24%
- Code Block Background: 222 84% 5%

**Light Mode:**
- Background: 0 0% 100%
- Surface: 0 0% 98%
- Primary Accent: 142 71% 45%
- Text Primary: 222 47% 11%
- Text Secondary: 222 13% 46%
- Border: 0 0% 89%

**Status Colors:**
- Success: 142 76% 36%
- Error: 0 84% 60%
- Warning: 38 92% 50%
- Info: 217 91% 60%

### B. Typography

**Font Stack:**
- Display/Headings: Inter (Google Fonts) - 600, 700 weights
- Body Text: Inter - 400, 500 weights  
- Code/Technical: JetBrains Mono (Google Fonts) - 400, 500 weights

**Scale:**
- Hero/H1: text-5xl md:text-6xl font-bold
- H2: text-3xl md:text-4xl font-semibold
- H3: text-2xl font-semibold
- Body: text-base
- Small/Caption: text-sm
- Code: text-sm font-mono

### C. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 or p-8
- Section spacing: py-16 md:py-24
- Card gaps: gap-6 or gap-8
- Button padding: px-6 py-3

**Grid Structure:**
- Max container: max-w-7xl mx-auto px-4 md:px-6
- Documentation: max-w-4xl for optimal code readability
- Dashboard: Full-width grid with responsive columns

### D. Component Library

**Navigation:**
- Fixed top navbar with blur backdrop (backdrop-blur-xl)
- Logo left, navigation center, API key/user right
- Mobile: Hamburger menu with slide-in drawer
- Sticky documentation sidebar on desktop

**Cards & Panels:**
- Subtle elevation with border-2 border-border
- Rounded corners: rounded-xl
- Code blocks: Dark background with syntax highlighting placeholders
- API endpoint cards with method badges (GET/POST/PUT/DELETE)

**Forms & Inputs:**
- Dark-themed inputs with focus:ring-2 ring-primary
- API key display with copy-to-clipboard functionality
- Token input fields with monospace font
- Clear validation states with inline feedback

**Data Display:**
- API response preview panels with JSON formatting
- Request/Response tabs for documentation
- Status indicators with colored badges
- Metrics dashboard with grid layout (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)

**Buttons:**
- Primary: bg-primary text-white
- Secondary: border-2 border-primary text-primary
- Outline on images: backdrop-blur-md bg-white/10 border-white/30
- Icon buttons for copy, expand, collapse actions

**Overlays:**
- Modal dialogs for API key generation
- Toast notifications for copy confirmations
- Dropdown menus for user actions

### E. Animations
Use sparingly - only for functional feedback:
- Button hover: subtle scale-105 transform
- Card hover: border color transition
- Code copy: success checkmark animation
- Page transitions: fade-in only

## Page-Specific Layouts

**Landing/Marketing Page:**
- Hero: Dark gradient background (from-surface-dark to-background-dark) with terminal-style code preview showing API call example - no large hero image, code IS the hero
- Features: 3-column grid showcasing Bearer token security, Supabase speed, REST endpoints
- Quick Start: Code snippet carousel with different language examples
- Pricing/Plans: Clean comparison cards if applicable

**Documentation Portal:**
- Two-column: Sticky sidebar (navigation tree) + main content area
- Code examples in dark themed blocks with language tabs
- Interactive API playground section
- Clear endpoint reference cards

**Dashboard (API Management):**
- Sidebar navigation + main content grid
- API key management table with generate/revoke actions
- Usage metrics widgets (4-column grid on desktop)
- Request logs table with search/filter

**Authentication/Login:**
- Centered card on gradient background
- Email/password or OAuth options
- Security badge indicators

## Images
No large hero images needed - this is a technical product where code examples and clear UI serve as visual anchors. Use subtle gradient backgrounds and focus on typography and layout precision. Any imagery should be:
- Screenshots of dashboard/documentation (if needed for marketing)
- Developer-focused icons (minimal, monochromatic)
- Architectural diagrams for technical explanations