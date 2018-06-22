import {Icon} from 'antd';
import * as React from 'react';
import DocumentTitle from 'react-document-title';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {setViewport, ViewportActions} from '../actions/viewport';
import logo from '../assets/michelin-logo.png';
import {GlobalFooter} from '../components/GlobalFooter/index';
import * as routes from '../constants/routes';
import {getAuthStatus} from '../reducers/auth';
import * as stateTypes from '../reducers/types';
import {getViewport} from '../reducers/viewport';
import './UserLayout.css';

const links = [
  {
    key: 'help',
    title: 'Help',
    href: '',
  },
  {
    key: 'privacy',
    title: 'Privacy',
    href: '',
  },
  {
    key: 'terms',
    title: 'Terms',
    href: '',
  },
];

const copyright = (
  <div>
    Copyright <Icon type="copyright" /> 2018 Michelin
  </div>
);

interface OwnProps {
  routerData: stateTypes.RouterData;
}

interface StateProps {
  auth: stateTypes.AuthStatus;
  viewport: stateTypes.ViewportState;
}

type DispatchProps = {
  setViewport: (viewport: string) => ThunkAction<void, stateTypes.State, void, ViewportActions>;
};

type UserLayoutProps = OwnProps & StateProps & DispatchProps;

class UserLayout extends React.PureComponent<UserLayoutProps> {
  componentWillMount() {
    // Redirect if user is already logged in.
    if (this.props.auth.isAuthenticated) {
      this.props.setViewport(routes.DEFAULT);
    }
  }

  render() {
    const {routerData} = this.props;
    const {viewport} = this.props.viewport;

    const content = routerData[viewport];
    if (!content) {
      this.props.setViewport(routes.LOGIN);
      return null;
    }

    return (
      <DocumentTitle title={'Michelin'}>
        <div className={'container'}>
          <div className={'content'}>
            <div className={'top'}>
              <div className={'user-header'}>
                <a href="/">
                  <img alt="logo" className={'logo'} src={logo} />
                  <span className={'title'}>Michelin</span>
                </a>
              </div>
              <div className={'desc'}>A React+Redux Boilerplate</div>
            </div>
            {content.component}
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (state: stateTypes.State) => {
  return {
    auth: getAuthStatus(state),
    viewport: getViewport(state),
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

const ConnectedUserLayout = connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(UserLayout);
export default ConnectedUserLayout;
