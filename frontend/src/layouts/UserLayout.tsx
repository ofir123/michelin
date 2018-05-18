import {Icon} from 'antd';
import * as React from 'react';
import DocumentTitle from 'react-document-title';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {Link, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import logo from '../assets/michelin-logo.png';
import {GlobalFooter} from '../components/GlobalFooter/index';
import * as routes from '../constants/routes';
import {getAuthStatus} from '../reducers/auth';
import * as stateTypes from '../reducers/types';
import {getRoutes} from '../utils/routing';
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
}

interface UserLayoutProps extends RouteComponentProps<{}>, OwnProps, StateProps {}

class UserLayout extends React.PureComponent<UserLayoutProps> {
  getPageTitle() {
    const {routerData, history} = this.props;
    const {pathname} = history.location;
    let title = 'Michelin';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - ${title}`;
    }
    return title;
  }

  componentWillMount() {
    // Redirect if user is already logged in.
    if (this.props.auth.isAuthenticated) {
      this.props.history.push(routes.DEFAULT);
    }
  }

  render() {
    const {routerData, match} = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={'container'}>
          <div className={'content'}>
            <div className={'top'}>
              <div className={'user-header'}>
                <Link to="/">
                  <img alt="logo" className={'logo'} src={logo} />
                  <span className={'title'}>Michelin</span>
                </Link>
              </div>
              <div className={'desc'}>A React+Redux Boilerplate</div>
            </div>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
              ))}
              <Redirect exact={true} from={routes.USER} to={routes.LOGIN} />
            </Switch>
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
  };
};

const ConnectedUserLayout = withRouter(connect<StateProps>(mapStateToProps, {})(UserLayout));
export default ConnectedUserLayout;
