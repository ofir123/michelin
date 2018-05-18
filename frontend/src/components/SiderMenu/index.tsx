import DrawerMenu from 'rc-drawer-menu';
import * as React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {withRouter} from 'react-router-dom';
import {getAuthDetails} from '../../reducers/auth';
import * as stateTypes from '../../reducers/types';
import SiderMenu from './SiderMenu';

interface StateProps {
  auth: stateTypes.AuthDetails;
}

interface OwnProps {
  isMobile: boolean;
  logo: string;
  menuData: stateTypes.MenuData;
  collapsed: boolean;
  onCollapse: (isCollapsed: boolean) => void;
  auth: stateTypes.AuthDetails;
}

// type DrawerSiderMenuProps = OwnProps & StateProps;
interface DrawerSiderMenuProps extends RouteComponentProps<{}>, OwnProps, StateProps {}

const DrawerSiderMenu = (props: DrawerSiderMenuProps) =>
  props.isMobile ? (
    <DrawerMenu
      parent={null}
      level={null}
      iconChild={null}
      open={!props.collapsed}
      onMaskClick={() => {
        props.onCollapse(true);
      }}
      width="256px"
    >
      <SiderMenu {...props} collapsed={false} />
    </DrawerMenu>
  ) : (
    <SiderMenu {...props} />
  );

const mapStateToProps = (state: stateTypes.State) => {
  return {
    auth: getAuthDetails(state),
  };
};

const ConnectedDrawerSiderMenu = withRouter(connect<StateProps>(mapStateToProps, {})(DrawerSiderMenu));
export {ConnectedDrawerSiderMenu as DrawerSiderMenu};
