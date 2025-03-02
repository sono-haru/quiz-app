import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                kaisei: ["Kaisei Decol", "serif"],
            },
            screens: {
                // 画面の高さが836px以下の場合に適用される
                short: { raw: "(max-height: 800px)" },
                short2: { raw: "(max-height: 900px)" },
            },
        },
    },
    plugins: [],
} satisfies Config;
