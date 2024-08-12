import type { Config } from 'tailwindcss'
import withMT from "@material-tailwind/react/utils/withMT"
const config = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        cactus: ['var(--font-cactus)'],
        bebas: ['var(--font-bebas)'],
        poppins: ['var(--font-poppins)'],
      },
      colors: {
        "grey": "#EBEAEA",
        "white": "#FFFFF",
        "ochra": "#EFC45B",
        "green": "#4ADE80",
        "pink": "#FF84B8",
        "black": "#000000",
      },
      fontSize: {
        "xs": "10px",
        "sm": "12px",
        "base": "14px",
        "lg": "17px",
        "xl": "20px",
        "2xl": "24px",
        "3xl": "29px",
        "4xl": "35px",
        "5xl": "42px",
      },
      scrollbar: ['dark'],
    },
  },
  plugins: [],
})
export default config
