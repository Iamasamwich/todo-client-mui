import { SxProps } from "@mui/system";

interface Styles {
  main: SxProps;
  form: SxProps;
  centered: SxProps;
  todoIcon: SxProps;
  deleteWarning: SxProps;
  textFlash: SxProps;
};

const styles = {
  main: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  form: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    width: '50%'
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
  deleteWarning: {
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
  }
} as Styles;

export default styles;