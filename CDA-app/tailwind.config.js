module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    'font-size': {},
    extend: {
      height: (theme) => ({
        '1/12': 'calc(100vh / 12)',
        '2/12': 'calc(100vh * 2 / 12)',
        '3/12': 'calc(100vh * 3 / 12)',
        '4/12': 'calc(100vh * 4 / 12)',
        '5/12': 'calc(100vh * 5 / 12)',
        '6/12': 'calc(100vh * 6 / 12)',
        '7/12': 'calc(100vh * 7 / 12)',
        '8/12': 'calc(100vh * 8 / 12)',
        '9/12': 'calc(100vh * 9 / 12)',
        '10/12': 'calc(100vh * 10 / 12)',
        '11/12': 'calc(100vh * 11 / 12)',
        '12/12': 'calc(100vh)',
      }),
      colors: {
        primary: '#6868AC',
        secondary: '#EF846C',
        'light-base': '#D8D8E9',
        link: '#0D6EFD',
      },
      backgroundImage: {
        'bckg-desktop':
          "url('https://res.cloudinary.com/morio/image/upload/v1648499875/App-insurance/bckg-mtn-desktop.svg')",
        'bckg-mobile': "url('assets/img/svg/bckg-mtn-mobile.svg')",
      },
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-3deg)',
          },
          '50%': {
            transform: 'rotate(3deg)',
          },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-down': {
          from: {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          to: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out-up': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0px)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
        },
        'fade-slide-in': {
          '0%': {
            opacity: '0',
            transform: 'translateX(100px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0px)',
          },
        },
        'fade-slide-out': {
          '0%': {
            opacity: '1',
            transform: 'translateX(0px)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateX(100px)',
          },
        },
        'slide-in': {
          '0%': {
            transform: 'translateX(100px)',
          },
          '100%': {
            transform: 'translateX(0px)',
          },
        },
        'slide-out': {
          '0%': {
            transform: 'translateX(0px)',
          },
          '100%': {
            transform: 'translateX(100px)',
          },
        },
        'scale-up-down': {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.02)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 0.8s ease-in-out infinite',
        'fade-in-down': 'fade-in-down 0.8s ease-out',
        'fade-out-down': 'fade-out-down 0.8s ease-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'fade-out-up': 'fade-out-up 0.8s ease-out',
        'fade-slide-in': 'fade-slide-in 0.8s ease-out',
        'fade-slide-out': 'fade-slide-out 0.8s ease-out',
        'slide-in': 'slide-in 0.8s ease-out',
        'slide-out': 'slide-out 0.8s ease-out',
        'scale-up-down': 'scale-up-down 0.2s ease-in-out',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'group-hover'],
    },
  },
  plugins: [],
};
