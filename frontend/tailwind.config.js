module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        discord: {
          blue: '#5865F2',
          'blue-dark': '#4752C4',
          dark: '#2C2F33',
          darker: '#202225',
          light: '#F6F6FE',
          'channel-gray': '#8E9297',
          'menu-gray': '#2F3136',
          'text-gray': '#72767D',
          'input-bg': '#40444B',
          'success-green': '#43B581',
          'warning-yellow': '#FAA61A',
          'error-red': '#F04747',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'xxs': '0.625rem', // 10px
      },
      spacing: {
        '18': '4.5rem', // 72px
        '68': '17rem',  // 272px
        '84': '21rem',  // 336px
        '96': '24rem',  // 384px
      },
      borderRadius: {
        'discord': '0.375rem', // Discord's standard border radius
      },
      boxShadow: {
        'discord': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'discord-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'discord-focus': '0 0 0 2px rgba(88, 101, 242, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.discord.blue'),
              '&:hover': {
                color: theme('colors.discord.blue-dark'),
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.gray.900'),
              fontWeight: theme('fontWeight.semibold'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.discord.blue'),
              '&:hover': {
                color: theme('colors.discord.blue-dark'),
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};