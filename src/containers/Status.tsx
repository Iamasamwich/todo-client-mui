import { connect } from "react-redux";
import { setStatus } from '../actions/status';

interface State {
  appStatus : string | number | null;
};

interface Props extends State {
  setStatus : (status : string | number | null) => void;
};

const Status = ({appStatus, setStatus} : Props) => {

  const ShowStatus = () => {
    switch (appStatus) {
      case 'loading':
        return "Loading...";
      case 'login_fail':
        return "Incorrect Login Details";
      case 409:
        return "User Email already taken";
      default: 
        return "Error With Request";
    };
  };

  if (appStatus === null) {
    return null;
  } else {
    return (
      <div 
        className="Status"
        onClick={() => setStatus(null)}
        >
        <div className="status-box">
          <h1>Error Error</h1>
          <h1>{ShowStatus()}</h1>
          <p>*click anywhere to dismiss*</p>
        </div>
      </div>
    );
  }
};

const mapStateToProps = ({appStatus} : Props) => {
  return {
    appStatus
  };
};

const mapDispatchToProps = {
  setStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(Status);