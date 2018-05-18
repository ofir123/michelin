import * as React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import {getRouterData} from './common/router';
import AuthorizedRoute from './components/AuthorizedRoute';
import * as roles from './constants/roles';
import * as routes from './constants/routes';
import history from './store/history';

const MichelinApp = () => {
  const routerData = getRouterData();
  const UserLayout = routerData[routes.USER].component;
  const BasicLayout = routerData[routes.DEFAULT].component;

  return (
    <Router history={history}>
      <Switch>
        <Route path={routes.USER} component={UserLayout} />} />
        <AuthorizedRoute
          path={routes.DEFAULT}
          render={(props: any) => <BasicLayout {...props} />}
          roles={[roles.USER, roles.ADMIN]}
          redirectPath={routes.LOGIN}
        />
      </Switch>
    </Router>
  );
};

export {MichelinApp};
