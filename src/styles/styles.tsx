import { SxProps } from "@mui/system";

interface Styles {
  main: SxProps;
  form: SxProps;
  centered: SxProps;
  todoIcon: SxProps;
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
} as Styles;

export default styles;