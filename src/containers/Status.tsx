import { connect } from "react-redux";
import { setStatus } from '../actions/status';

interface Props {
  appStatus : string | number | null;
  setStatus : {
    (status : string | number | null) : void;
  };
};


const Status = (props : Props) => {

  const ShowStatus = () => {
    switch (props.appStatus) {
      case 'login_fail':
        return "Incorrect Login Details";
      default: 
        return "Error With Request";
    };
  };

  return (
    <div 
      className="Status"
      onClick={() => props.setStatus(null)}
    >
      <div className="status-box">
        <h1>Error Error</h1>
        <h1>{ShowStatus()}</h1>
        <p>*click anywhere to dismiss*</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state : Props) => {
  return {
    appStatus: state.appStatus
  }
}

export default connect(mapStateToProps, {setStatus})(Status);