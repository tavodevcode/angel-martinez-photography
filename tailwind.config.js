/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Anton', 'system-ui', 'sans-serif'],
        body: ['"Geist Variable"', 'system-ui', 'sans-serif'],
        caption: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        meta: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: '#000000',
        fog: '#ffffff',
        muted: '#9c9c9a',
        accent: '#e2e2e2',
      },
      animation: {
        'float-slow': 'float-slow 12s ease-in-out infinite',
        'marquee': 'marquee 32s linear infinite',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
