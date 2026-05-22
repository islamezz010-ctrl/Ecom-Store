---
name: Tech/Lifestyle E-commerce System
colors:
  surface: '#fcf8ff'
  surface-dim: '#dcd9e0'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2fa'
  surface-container: '#f0ecf4'
  surface-container-high: '#eae7ef'
  surface-container-highest: '#e5e1e9'
  on-surface: '#1b1b21'
  on-surface-variant: '#474651'
  inverse-surface: '#303036'
  inverse-on-surface: '#f3eff7'
  outline: '#777682'
  outline-variant: '#c8c5d3'
  surface-tint: '#5654a8'
  primary: '#1a146b'
  on-primary: '#ffffff'
  primary-container: '#312e81'
  on-primary-container: '#9c9af4'
  inverse-primary: '#c3c0ff'
  secondary: '#006b5f'
  on-secondary: '#ffffff'
  secondary-container: '#6df5e1'
  on-secondary-container: '#006f64'
  tertiary: '#3e1a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#5f2b00'
  on-tertiary-container: '#de915e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#100563'
  on-primary-fixed-variant: '#3e3c8f'
  secondary-fixed: '#71f8e4'
  secondary-fixed-dim: '#4fdbc8'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005048'
  tertiary-fixed: '#ffdbc7'
  tertiary-fixed-dim: '#ffb688'
  on-tertiary-fixed: '#311300'
  on-tertiary-fixed-variant: '#70380b'
  background: '#fcf8ff'
  on-background: '#1b1b21'
  surface-variant: '#e5e1e9'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  caps-xs:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2.5rem
  xl: 4rem
  container-max: 1280px
  gutter: 1.5rem
---

## Brand & Style
This design system bridges the gap between high-performance technology and everyday lifestyle aesthetics. It is designed for a MERN stack environment where speed and clarity are paramount. The visual language is rooted in **Minimalism** and **Modern Corporate** styles—utilizing expansive whitespace to let product photography breathe, while employing high-precision technical details to convey reliability. 

The emotional goal is to evoke a sense of "premium utility." Users should feel they are using a sophisticated tool that is nonetheless accessible and human-centric. Visual clutter is ruthlessly eliminated in favor of clear paths to purchase and data visualization.

## Colors
The palette is led by **Deep Indigo (#312E81)**, used for primary actions, navigation headers, and brand-critical elements. It provides a stable, authoritative foundation. The **Vibrant Teal (#14B8A6)** acts as a high-energy accent for call-to-actions, success states, and highlight indicators, creating a "tech" flash against the deep base.

The grayscale is strictly neutral to avoid color clashing with product imagery. 
- **Backgrounds:** Use `gray-50` for the main canvas and `white` for cards and elevated containers.
- **Text:** Use `gray-900` for headings to ensure maximum contrast and `gray-500` for secondary metadata.

## Typography
We use **Hanken Grotesk** for headings to provide a sharp, contemporary "tech" edge with its geometric precision. **Inter** is utilized for all body copy and UI labels due to its exceptional legibility in data-heavy environments.

- **Hierarchy:** Maintain a clear distinction between product titles (Headline MD) and descriptions (Body MD).
- **Responsive Scaling:** On mobile devices, `display-lg` should scale down to `32px` to prevent awkward line breaks.
- **Labels:** Use `caps-xs` for category tags or table headers to create a structural rhythm.

## Layout & Spacing
The layout follows a **12-column fluid grid** for desktop and a **single-column flow** for mobile. 

- **Margins:** A standard page margin of `2.5rem` (lg) is used for desktop, reducing to `1rem` (sm) on mobile devices.
- **Generous Whitespace:** Components should be separated by `md` or `lg` units to prevent the "cluttered shop" feel.
- **Dashboard Layout:** Sidebars are fixed at `280px` on desktop, while dashboard widgets utilize a CSS Grid "auto-fill" pattern with a minimum width of `300px`.

## Elevation & Depth
This design system uses **Ambient Shadows** to create a soft, natural sense of depth. Surfaces are tiered as follows:
- **Level 0 (Base):** `gray-50` background, no shadow.
- **Level 1 (Cards/Widgets):** White background with a `4px` blur, 5% opacity black shadow. This is the default for product cards.
- **Level 2 (Sidebars/Navigation):** White background with a `12px` blur, 8% opacity indigo-tinted shadow to suggest the sidebar is "closer" to the user.
- **Level 3 (Modals/Popovers):** White background with a `24px` blur, 12% opacity shadow for maximum focus.

Avoid heavy borders; use subtle `gray-200` outlines only when cards sit on a pure white background.

## Shapes
The shape language is defined by a consistent **8px (roundedness 2)** corner radius. 
- **Buttons and Inputs:** Use the standard `8px` radius.
- **Product Cards and Dashboard Widgets:** Use `16px` (rounded-lg) to create a softer, more lifestyle-oriented container.
- **Search Bars:** Use "Pill-shaped" `24px` (rounded-xl) to distinguish global search from standard form inputs.

## Components

### Buttons
- **Primary:** Deep Indigo background, white text, 8px radius. Subtle scale-down effect (0.98) on click.
- **Secondary:** Transparent background, Indigo 1px border, Indigo text.
- **Accent:** Vibrant Teal background, white text. Reserved for "Add to Cart" or "Buy Now."

### Product Cards
- **Image:** Top-aligned, 1:1 aspect ratio, subtle hover-zoom effect.
- **Body:** Generous 24px padding. Title in `headline-sm`, price in Teal.
- **Shadow:** Level 1 elevation, increasing to Level 2 on hover.

### Sidebars
- **Background:** Pure white with a `gray-200` right-border.
- **Active State:** A vertical Teal bar (4px wide) on the left edge of the active menu item, with a light Teal tint background.

### Dashboard Widgets
- **Header:** `label-sm` in `gray-500` with an icon in `primary-indigo`.
- **Value:** `headline-md` for the primary metric.
- **Trend:** Small indicator in Teal (positive) or a soft coral (negative).

### Input Fields
- **Default:** `gray-100` background, 1px `gray-200` border, 8px radius.
- **Focus:** 2px border in `primary-indigo` with a soft Indigo outer glow.