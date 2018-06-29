import {Button} from 'antd';
import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {setViewport} from '../../actions/viewport';
import {Result} from '../../components/Result/index';
import * as routes from '../../constants/routes';
import {getAuthDetails} from '../../reducers/auth';
import * as stateTypes from '../../reducers/types';
import {State} from '../../reducers/types';
import './RegisterResult.css';

interface StateProps {
  auth: stateTypes.AuthDetails;
}

interface DispatchProps {
  setViewport: typeof setViewport;
}

type RegisterResultProps = StateProps & DispatchProps;

const RegisterResult = (props: RegisterResultProps) => {
  const actions = (
    <div className={'actions'}>
      <Button size="large" onClick={() => props.setViewport(routes.DEFAULT)}>
        Return to home page
      </Button>
    </div>
  );

  return (
    <Result
      className={'register-result'}
      type="success"
      title={<div className={'title'}>Your account：{props.auth.email} registered successfully</div>}
      description="It's time to log in!"
      actions={actions}
      style={{marginTop: 56}}
    />
  );
};

const mapStateToProps = (state: State) => {
  return {
    auth: getAuthDetails(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      setViewport,
    },
    dispatch,
  );
};

const ConnectedRegisterResult = connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterResult);
export default ConnectedRegisterResult;
