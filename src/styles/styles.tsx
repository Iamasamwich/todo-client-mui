import { SxProps } from "@mui/system";

interface Styles {
  main: SxProps;
  form: SxProps;
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
  }
} as Styles;

export default styles;