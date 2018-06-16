import * as React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {LoginActions} from '../actions/auth';
import {ViewportActions} from '../actions/viewport';
import * as api from '../api';
import {getAuthDetails} from '../reducers/auth';
import {AuthDetails, State} from '../reducers/types';

interface OwnProps {
  component: React.ReactNode;
  redirectPath: string;
  roles: ReadonlyArray<string>;
}

interface DispatchProps {
  loginSuccess: typeof LoginActions.loginSuccess;
  setViewport: typeof ViewportActions.setViewport;
  push: typeof push;
}

interface StateProps {
  auth: AuthDetails;
}

type AuthorizedRouteProps = OwnProps & DispatchProps & StateProps;

class AuthorizedRoute extends React.Component<AuthorizedRouteProps> {
  componentWillMount() {
    this.checkAuth();
  }

  componentWillReceiveProps(nextProps: AuthorizedRouteProps) {
    this.checkAuth(nextProps);
  }

  checkAuth(props: AuthorizedRouteProps = this.props) {
    if (!props.auth.isAuthenticated) {
      const token = localStorage.getItem('token');
      if (token) {
        api.validateToken(token).then(() => {
          this.props.loginSuccess(token);
        });
      }
    }
  }

  render() {
    const {auth, component, roles, redirectPath} = this.props;
    if (auth.isAuthenticated && auth.role && roles.indexOf(auth.role) !== -1) {
      return component;
    }
    this.props.push(redirectPath);
    return null;
  }
}

const mapStateToProps = (state: State) => {
  return {
    auth: getAuthDetails(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
  return bindActionCreators(
    {
      loginSuccess: LoginActions.loginSuccess,
      setViewport: ViewportActions.setViewport,
      push,
    },
    dispatch,
  );
};

const ConnectedAuthorizedRoute = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(
  AuthorizedRoute,
);
export default ConnectedAuthorizedRoute;
