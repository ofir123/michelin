import {Icon, Layout} from 'antd';
import * as React from 'react';
import DocumentTitle from 'react-document-title';
import {Redirect, Route, Switch} from 'react-router-dom';
import logo from '../assets/michelin-logo.png';
import {getMenuData} from '../common/menu';
import AuthorizedRoute from '../components/AuthorizedRoute';
import {GlobalFooter} from '../components/GlobalFooter';
import {GlobalHeader} from '../components/GlobalHeader';
import {DrawerSiderMenu} from '../components/SiderMenu';
import * as routes from '../constants/routes';
import * as stateTypes from '../reducers/types';
import {NotFoundError} from '../routes/Exception';
import {enquireScreen, unenquireScreen} from '../utils/media';
import {getRoutes} from '../utils/routing';

const {Content} = Layout;

// Set default redirect to first child, for every parent in the menu.
const redirectData: Array<{
  from: string;
  to: string;
}> = [];
const getRedirect = (item: stateTypes.MenuItem) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`,
      });
      item.children.forEach(children => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

let isMobile: boolean;
enquireScreen(result => {
  isMobile = result;
});

type Props = {
  location: {
    pathname: string;
  };
  match: {
    path: string;
    url: string;
    isExact: boolean;
  };
  routerData: stateTypes.RouterData;
};

type State = {
  isMobile: boolean;
  menuCollapsed: boolean;
};

export default class BasicLayout extends React.PureComponent<Props, State> {
  state = {
    isMobile,
    menuCollapsed: false,
  };

  enquireHandler: any;

  componentDidMount() {
    this.enquireHandler = enquireScreen((mobile: boolean) => {
      this.setState({
        isMobile: mobile,
      });
    });
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  getPageTitle() {
    const {routerData, location} = this.props;
    const {pathname} = location;
    let title = 'Michelin';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - Michelin`;
    }
    return title;
  }

  handleMenuCollapse = (menuCollapsed: boolean) => {
    this.setState({
      menuCollapsed,
    });
  };

  render() {
    const {routerData, match} = this.props;
    const layout = (
      <Layout>
        <DrawerSiderMenu
          logo={logo}
          menuData={getMenuData()}
          collapsed={this.state.menuCollapsed}
          isMobile={this.state.isMobile}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <GlobalHeader
            logo={logo}
            menuCollapsed={this.state.menuCollapsed}
            isMobile={this.state.isMobile}
            onMenuCollapse={this.handleMenuCollapse}
          />
          <Content style={{margin: '24px 24px 0', height: '100%'}}>
            <Switch>
              {redirectData.map(item => <Redirect key={item.from} exact={true} from={item.from} to={item.to} />)}
              {getRoutes(match.path, routerData).map(item => (
                <AuthorizedRoute
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                  roles={item.roles}
                  redirectPath={routes.NOT_FOUND_ERROR}
                />
              ))}
              <Redirect exact={true} from="/" to={routes.ANALYSIS} />
              <Route render={NotFoundError} />
            </Switch>
          </Content>
          <GlobalFooter
            copyright={
              <div>
                Copyright <Icon type="copyright" /> 2018 Michelin, Inc.
              </div>
            }
          />
        </Layout>
      </Layout>
    );

    return <DocumentTitle title={this.getPageTitle()}>{layout}</DocumentTitle>;
  }
}
