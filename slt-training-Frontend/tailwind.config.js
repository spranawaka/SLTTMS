/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Rich, deep background
        primary: '#1a103d',      // Deep purple background
        secondary: '#2d1b5a',    // Lighter purple
        'card-bg': '#432c85',    // Vibrant purple for cards
       
        
        // Vibrant accent colors
        accent: '#00d4ff',       // Bright cyan
        'accent-hover': '#00bfff', // Slightly darker cyan
        'accent-secondary': '#ff3e88', // Pink accent
        
        // Text colors
        'text-primary': '#ffffff',    // Pure white
        'text-secondary': '#e2e8ff',  // Light purple
        'text-highlight': '#ffffff',  // Bright white
        
        // Status colors
        success: '#00ffa3',      // Bright green
        error: '#ff3366',        // Bright red
        warning: '#ffb300',      // Bright amber
        
        // Border colors
        'border-light': 'rgba(255, 255, 255, 0.15)',
        'border-hover': 'rgba(255, 255, 255, 0.3)'
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 212, 255, 0.2)',
        'glow-hover': '0 0 30px rgba(0, 212, 255, 0.3)'
      }
    }
  },
  plugins: []
};