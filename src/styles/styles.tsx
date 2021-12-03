import { SxProps } from "@mui/system";

interface Styles {
  root: SxProps;
  main: SxProps;
  icon: SxProps;
  form: SxProps;
  centered: SxProps;
  todoIcon: SxProps;
  popup: SxProps;
  textFlash: SxProps;
  spinner: SxProps;
  padding: SxProps;
};

const styles = {
  root: {
    minWidth: '350px'
  },
  main: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  icon: {
    '@media (max-width: 900px)': {
      height: '120px'
    },
    '@media (max-width: 767px)': {
      height: '100px'
    },
    '@media (max-width: 500px)': {
      height: '80px'
    }
  },
  form: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    width: '50%',
    '@media (max-width: 767px)': {
      width: '90%'
    }
  },
  centered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  todoIcon: {
    fontSize: 35,
    p: 1
  },
  popup: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    bgcolor: 'background.paper',
    boxShadow: 20,
    p: 4
  },
  textFlash: {
    opacity: '1',
    animation: 'flash 1s infinite',
    '@keyframes flash': {
      '0%': {opacity: 1},
      '50%': {opacity: 0},
      '100%': {opacity: 1}
    }
  },
  spinner: {
    height: '50px',
    width: '50px',
    backgroundColor: 'black',
    animation: 'spin 1s linear infinite',
    '@keyframes spin': {
      '100%': {transform: 'rotate(89deg)'}
    }
  },
  padding: {
    paddingBottom: '24px',
    '@media (max-width: 767px)': {
      paddingBottom: '16px'
    },
    '@media (max-width: 500px)': {
      paddingBottom: '8px'
    }
  }
} as Styles;

export default styles;
