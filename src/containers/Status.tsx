import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import styles from '../styles/styles';

interface State {
  appStatus : string | number | null;
};

const Status = ({appStatus} : State) => {

  const [statusOpen, setStatusOpen] = useState <boolean> (false);

  useEffect(() => {
    if (appStatus) {
      setStatusOpen(true);
    } else {
      setStatusOpen(false);
    }
  }, [appStatus]);

  const handleClose = () => {
    if (appStatus === 'loading') {
      return;
    } else {
      setStatusOpen(false);
    };
  };

  const showError = () => {
    switch (appStatus) {
      case 401:
        return "Not Authorised";
      case 406:
        return "Invalid inputs";
      case 404:
        return "Not found";
      case 409:
        return "Duplication";
      default:
        return "There was a problem with your request";
    };
  };

  const ShowStatus = () => {
    switch (appStatus) {
      case 'loading':
        return <>
          <Typography variant='h4'>Loading</Typography>
          <Box marginTop={2} sx={styles.spinner} />
        </>;
      default:
        return <Stack alignItems='center' spacing={2}>
          <Typography variant='h4'>Warning!</Typography>
          <Typography variant='h5'>{showError()}</Typography>
          <Typography sx={styles.textFlash} color='blue' variant='h6'>Click to dismiss</Typography>
        </Stack>
    };
  };

  return (
    <Modal open={statusOpen}>
      <Box sx={{...styles.popup, border: '2px solid red'}}>
        <Box 
          sx={styles.main}
          onClick={() => handleClose()}  
        >
          <ShowStatus />
        </Box>
      </Box>
    </Modal>
  );
};

const mapStateToProps = ({appStatus} : State) => {
  return {
    appStatus
  };
};

export default connect(mapStateToProps)(Status);