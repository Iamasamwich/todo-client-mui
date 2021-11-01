import React from 'react';
import { connect } from 'react-redux';
import {setStatus} from '../../actions/status';

interface Props {
  statusCode: number | string | null;
  setStatus: (status: string | number| null) => void;
};

const GenericError = ({statusCode, setStatus} : Props) => {

  const showError = () => {
    switch (statusCode) {
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
  
  return (
    <div 
      className='Status'
      onClick={() => setStatus(null)}
    >
      <div className='status-box'>
        <h1>Error!</h1>
        <h1>{showError()}</h1>
        <p>*click anywhere to dismiss*</p>
      </div>
    </div>
  )
};

const mapDispatchToProps = {
  setStatus
};

export default connect(null, mapDispatchToProps)(GenericError);