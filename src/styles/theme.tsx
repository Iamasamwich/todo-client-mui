const todoTheme = {
  palette: {
    success: {
      main: '#9ee99e'
    }
  },
  typography: {
    h1: {
      '@media (max-width: 900px)': {
        fontSize: '4rem'
      },
      '@media (max-width: 767px)': {
        fontSize: '3rem'
      },
      '@media (max-width: 500px)': {
        fontSize: '2.5rem'
      }
    },
    h2: {
      '@media (max-width: 900px)': {
        fontSize: '3rem'
      },
      '@media (max-width: 767px)': {
        fontSize: '2.5rem'
      },
      '@media (max-width: 500px)': {
        fontSize: '2rem'
      }
    },
    h4: {
      '@media (max-width: 900px)': {
        fontSize: '1.8rem'
      },
      '@media (max-width: 767px)': {
        fontSize: '1.4rem'
      },
      '@media (max-width: 500px)': {
        fontSize: '1.2rem'
      }
    },
    h5: {
      '@media (max-width: 900px)': {
        fontSize: '1.2rem'
      },
      '@media (max-width: 767px)': {
        fontSize: '1rem'
      },
      '@media (max-width: 500px)': {
        fontSize: '0.8rem'
      }
    },
    button: {
      '@media (max-width: 767px)': {
        fontSize: '0.6rem'
      },
      '@media (max-width: 500px)': {
        fontSize: '0.38rem'
      }
    },
  }
};

export default todoTheme;