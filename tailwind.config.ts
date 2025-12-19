import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#00E5FF", // Cyan/Neon Blue
                    dark: "#00B8CC",
                    light: "#E0FCFF",
                },
                secondary: {
                    DEFAULT: "#2D3748", // Dark Slate
                    dark: "#1A202C",
                    light: "#4A5568",
                },
                accent: {
                    DEFAULT: "#00FF9D", // Neon Green
                },
                surface: {
                    DEFAULT: "#1E293B", // Dark Blue-Grey
                    hover: "#334155",
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
