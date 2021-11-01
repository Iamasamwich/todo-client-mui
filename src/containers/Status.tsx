import { connect } from "react-redux";
import GenericError from "./status_pages/GenericError";
import Loading from './status_pages/Loading';

interface State {
  appStatus : string | number | null;
};

const Status = ({appStatus} : State) => {

  const ShowStatus = () => {
    switch (appStatus) {
      case 'loading':
        return <Loading />
      default:
        return <GenericError statusCode={appStatus} />
    };
  };

  if (appStatus === null) {
    return null;
  } else {
    return (
      <ShowStatus />
    );
  }
};

const mapStateToProps = ({appStatus} : State) => {
  return {
    appStatus
  };
};

export default connect(mapStateToProps)(Status);