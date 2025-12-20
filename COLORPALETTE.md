Color Palette

Backgrounds:

Screen Background: ALWAYS use bg-background-light (#F2F2F7). The app is never pure white background.

Content Cards: ALWAYS use bg-background-card (#FFFFFF) for content containers.

Primary Actions:

Use bg-primary (#34C759 - Green) for the main "Call to Action" (e.g., 'Start Lesson', 'Continue').

Use text-white on primary buttons.

Brand & Accents:

Use text-secondary (#5856D6 - Purple) for brand headers or active tab icons.

Use bg-tertiary (#FF9500 - Orange) for streaks, warnings, or highlight badges.

Text:

Headings: text-typography-950 (Soft Black).

Subtitles: text-typography-500 (Gray). Never use pure black (#000000).

B. Typography

Display / Numbers / Headers: Use font-serif.

Context: Use this for the "Big Numbers" (e.g., "50 Words Learned"), Streak counts, or Greeting headers. This provides the "Storybook" feel.

UI Text / Body / Buttons: Use font-body (Sans-serif).

Context: Use this for button text, settings labels, and lesson content.

C. Shape Language (Crucial)

Cards: rounded-3xl (approx 24px). The UI should feel bubbly.

Buttons: rounded-4xl or rounded-full (Pill shape). NEVER use sharp corners.

Inputs: rounded-2xl with bg-background-subtle (#F9F9FB).


```
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Use 'class' strategy for dark mode so you can control it manually if needed
  darkMode: 'class', 
  content: [
    './app/**/*.{html,js,jsx,ts,tsx,mdx}',
    './components/**/*.{html,js,jsx,ts,tsx,mdx}',
    './utils/**/*.{html,js,jsx,ts,tsx,mdx}',
    './*.{html,js,jsx,ts,tsx,mdx}',
    './src/**/*.{html,js,jsx,ts,tsx,mdx}',
  ],
  presets: [require('nativewind/preset')],
  important: 'html',
  theme: {
    extend: {
      colors: {
        // PRIMARY: The "Action" color (The Green from your 'Continue' button)
        primary: {
          DEFAULT: '#34C759', // iOS Success Green - Friendly and bright
          50: '#EDFCF2',
          100: '#D3F9DE',
          200: '#A8F2C0',
          300: '#76E69E',
          400: '#4BD87F',
          500: '#34C759', 
          600: '#26A446',
          700: '#1E8239',
          800: '#196630',
          900: '#15542A',
        },
        // SECONDARY: The "Brand" color (The Purple from the Luna icon)
        secondary: {
          DEFAULT: '#5856D6', // iOS Indigo - Trustworthy and magical
          50: '#EFEEFF',
          100: '#E0DFFC',
          200: '#C2BFF7',
          300: '#A39EF0',
          400: '#847DE9',
          500: '#5856D6',
          600: '#4541B0',
          700: '#34318A',
          800: '#252366',
          900: '#181645',
        },
        // TERTIARY: Warm Accents (Coral/Orange for streaks or warnings)
        tertiary: {
          DEFAULT: '#FF9500', // Sunshine Orange
          50: '#FFF8EB',
          100: '#FFEDCC',
          200: '#FFD699',
          300: '#FFBF66',
          400: '#FFA933',
          500: '#FF9500',
          600: '#CC7700',
          700: '#995900',
          800: '#663C00',
          900: '#331E00',
        },
        // TYPOGRAPHY & NEUTRALS
        typography: {
          DEFAULT: '#1C1C1E', // Soft Black (Never use pure #000000)
          50: '#F2F2F7',
          100: '#E5E5EA',
          200: '#D1D1D6',
          300: '#C7C7CC',
          400: '#AEAEB2',
          500: '#8E8E93', // Secondary text
          600: '#636366',
          700: '#48484A',
          800: '#3A3A3C',
          900: '#2C2C2E',
          950: '#1C1C1E', // Primary Text
        },
        // BACKGROUNDS
        background: {
          light: '#F2F2F7', // The "App Background" (Light Gray)
          card: '#FFFFFF',  // The "Card" background (Pure White)
          dark: '#000000',
          subtle: '#F9F9FB', // For input fields
        },
        // STATUS INDICATORS
        indicator: {
          success: '#34C759',
          error: '#FF3B30',
          warning: '#FFCC00',
          info: '#007AFF',
        },
      },
      fontFamily: {
        // Use 'font-serif' for big numbers and headings (e.g., "Words Learned: 50")
        serif: ['Georgia', 'Times New Roman', 'serif'], 
        // Use 'font-body' or default for everything else
        body: ['System', 'Inter', 'sans-serif'],
        rounded: ['Nunito', 'System', 'sans-serif'], // Optional: if you install Nunito
      },
      // EXTENDED BORDER RADIUS for that "Soft" look
      borderRadius: {
        '4xl': '32px', // For big pill buttons
        '5xl': '40px',
      },
      // SOFT SHADOWS to make cards float
      boxShadow: {
        'soft-1': '0px 4px 20px rgba(0, 0, 0, 0.03)', // Very subtle lift
        'soft-2': '0px 8px 30px rgba(0, 0, 0, 0.04)', // Floating card
        'float': '0px 10px 40px -10px rgba(88, 86, 214, 0.15)', // Purple glow for primary actions
      },
    },
  },
};
```