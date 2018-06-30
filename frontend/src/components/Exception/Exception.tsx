import {Button} from 'antd';
import classNames from 'classnames';
import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {setViewport} from '../../actions/viewport';
import internalServerError from '../../assets/internal_server_error.svg';
import notFoundError from '../../assets/not_found_error.svg';
import unauthorizedAccessError from '../../assets/unauthorized_access_error.svg';
import * as exceptionTypes from '../../constants/exceptionTypes';
import * as routes from '../../constants/routes';
import './Exception.css';

interface OwnProps {
  className?: string;
  type: number;
  style?: React.CSSProperties;
  title?: string;
  desc?: string;
  img?: string;
  actions?: ReadonlyArray<React.ReactNode>;
}

interface DispatchProps {
  setViewport: typeof setViewport;
}

type ExceptionProps = OwnProps & DispatchProps;

const config = {
  [exceptionTypes.UNAUTHORIZED_ACCESS_ERROR]: {
    desc: 'Unauthorized Access',
    img: unauthorizedAccessError,
    title: '403',
  },
  [exceptionTypes.NOT_FOUND_ERROR]: {
    desc: 'Page Not Found',
    img: notFoundError,
    title: '404',
  },
  [exceptionTypes.INTERNAL_SERVER_ERROR]: {
    desc: 'Internal Server Error',
    img: internalServerError,
    title: '500',
  },
};

const Exception = (props: ExceptionProps) => {
  const {className, type, title, desc, img, actions} = props;

  const pageType: number = type in config ? type : exceptionTypes.NOT_FOUND_ERROR;
  const classString = classNames('exception', className);
  return (
    <div className={classString}>
      <div className={'image-block'}>
        <div className={'image-element'} style={{backgroundImage: `url(${img || config[pageType].img})`}} />
      </div>
      <div className={'content'}>
        <h1>{title || config[pageType].title}</h1>
        <div className={'desc'}>{desc || config[pageType].desc}</div>
        <div className={'actions'}>
          {actions || (
            <Button type="primary" onClick={() => props.setViewport(routes.DEFAULT)}>
              Return to Home Page
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      setViewport,
    },
    dispatch,
  );
};

const ConnectedException = connect<void, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Exception);
export default ConnectedException;
