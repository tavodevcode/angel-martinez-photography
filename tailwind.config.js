/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Mona Sans"', 'system-ui', 'sans-serif'],
        body: ['"Mona Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#0a0a0a',
        fog: '#f6f6f6',
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
