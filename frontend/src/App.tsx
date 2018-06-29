import * as React from 'react';
import {connect} from 'react-redux';
import {getRouterData} from './common/router';
import AuthorizedRoute from './components/AuthorizedRoute';
import URLSync from './components/UrlSync';
import * as roles from './constants/roles';
import * as routes from './constants/routes';
import * as stateTypes from './reducers/types';
import {getViewport} from './reducers/viewport';

interface StateProps {
  viewport: stateTypes.ViewportState;
}

type MichelinAppProps = StateProps;

class MichelinApp extends React.Component<MichelinAppProps> {
  render() {
    const routerData = getRouterData();
    const UserLayout = routerData[routes.USER].component;
    const BasicLayout = routerData[routes.DEFAULT].component;

    const layout = '/' + this.props.viewport.viewport.split('/')[1];

    let content;

    switch (layout) {
      case routes.USER:
        content = <UserLayout />;
        break;
      default:
        content = <AuthorizedRoute component={BasicLayout} roles={[roles.USER, roles.ADMIN]} />;
    }

    return (
      <>
        <URLSync />
        {content}
      </>
    );
  }
}

const mapStateToProps = (state: stateTypes.State) => {
  return {
    viewport: getViewport(state),
  };
};

const ConnectedMichelinApp = connect<StateProps>(mapStateToProps)(MichelinApp);
export default ConnectedMichelinApp;
