import {Location} from 'history';
import * as React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import UrlPattern from 'url-pattern';
import {setViewport} from '../actions/viewport';
import {getLocation} from '../reducers/rootReducer';
import * as stateTypes from '../reducers/types';
import {getViewport} from '../reducers/viewport';

const VIEWPORT_ONLY_URL = new UrlPattern('/:viewport');
const VIEWPORT_WITH_OBJECT_ID_URL = new UrlPattern('/:viewport/:objectId');

type StateProps = {
  viewport: stateTypes.ViewportState;
  location: Location | null;
};

type DispatchProps = {
  push: typeof push;
  setViewport: (viewport: string) => ThunkAction<void, stateTypes.State, void>;
};

type URLSyncProps = StateProps & DispatchProps;

class URLSync extends React.Component<URLSyncProps> {
  updateStateFromUrl = () => {
    const locationPathname = this.props.location ? encodeURI(this.props.location.pathname) : '/';

    let matchResult = VIEWPORT_WITH_OBJECT_ID_URL.match(locationPathname);

    if (matchResult !== null) {
      this.props.setViewport(matchResult.viewport);
      return;
    }

    matchResult = VIEWPORT_ONLY_URL.match(locationPathname);

    if (matchResult !== null) {
      setViewport(matchResult.viewport);
      return;
    }

    throw new Error(`Invalid URL was given: ${locationPathname}`);
  };

  updateUrlFromState = () => {
    let expectedUrl;

    if (this.props.viewport) {
      expectedUrl = VIEWPORT_ONLY_URL.stringify({viewport: this.props.viewport});
    } else {
      throw new Error(`Invalid state was provided ${JSON.stringify(this.props)}, URL cannot be computed`);
    }

    expectedUrl = decodeURI(expectedUrl);
    if (expectedUrl !== this.props.location.pathname) {
      this.props.push(expectedUrl);
    }
  };

  componentWillMount() {
    // Before mounting (when the app is starting) we parse the URL and update the state (if the URL is not just '/').
    if (!this.props.location || this.props.location.pathname === '/') {
      // Default values are set by the reducers, we just need to update the URL.
      this.updateUrlFromState();
    } else {
      this.updateStateFromUrl();
    }
  }

  componentDidUpdate(prevProps: URLSyncProps) {
    const {location: prevLocation} = prevProps;

    // On location updates (back/forward by the user), we update the state.
    // Other updates are to the state, for which we update the URL.
    if (prevLocation !== this.props.location) {
      this.updateStateFromUrl();
    } else {
      this.updateUrlFromState();
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: stateTypes.State) => {
  return {
    viewport: getViewport(state),
    location: getLocation(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<stateTypes.State>) => {
  return bindActionCreators(
    {
      setViewport,
      push,
    },
    dispatch,
  );
};

const ConnectedURLSync = connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(URLSync);
export default ConnectedURLSync;
