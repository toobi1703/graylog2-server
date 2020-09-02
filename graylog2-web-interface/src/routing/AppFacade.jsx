import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import loadAsync from 'routing/loadAsync';
import ServerUnavailablePage from 'pages/ServerUnavailablePage';
import StoreProvider from 'injection/StoreProvider';
import connect from 'stores/connect';
import CombinedProvider from 'injection/CombinedProvider';

import 'bootstrap/less/bootstrap.less';
import 'toastr/toastr.less';

const { SessionActions } = CombinedProvider.get('Session');
const SessionStore = StoreProvider.getStore('Session');
const ServerAvailabilityStore = StoreProvider.getStore('ServerAvailability');
const CurrentUserStore = StoreProvider.getStore('CurrentUser');

const LoginPage = loadAsync(() => import(/* webpackChunkName: "LoginPage" */ 'pages/LoginPage'));
const LoadingPage = loadAsync(() => import(/* webpackChunkName: "LoadingPage" */ 'pages/LoadingPage'));
const LoggedInPage = loadAsync(() => import(/* webpackChunkName: "LoggedInPage" */ 'pages/LoggedInPage'));

const SERVER_PING_TIMEOUT = 20000;

const AppFacade = ({ currentUser, server, sessionId }) => {
  const [didValidateSession, setDidValidateSession] = useState(false);

  useEffect(() => {
    const sessionPromise = SessionActions.validate().then((response) => {
      setDidValidateSession(true);

      return response;
    });

    return () => {
      sessionPromise.cancel();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(ServerAvailabilityStore.ping, SERVER_PING_TIMEOUT);

    return () => clearInterval(interval);
  }, []);

  if (!server.up) {
    return <ServerUnavailablePage server={server} />;
  }

  if (!sessionId) {
    return didValidateSession ? <LoginPage /> : <LoadingPage text="We are preparing Graylog for you..." />;
  }

  if (!currentUser) {
    return <LoadingPage text="We are preparing Graylog for you..." />;
  }

  return <LoggedInPage />;
};

AppFacade.propTypes = {
  currentUser: PropTypes.object,
  server: PropTypes.shape({
    up: PropTypes.bool,
  }),
  sessionId: PropTypes.string,
};

AppFacade.defaultProps = {
  currentUser: undefined,
  server: undefined,
  sessionId: undefined,
};

export default connect(AppFacade, {
  currentUser: CurrentUserStore,
  server: ServerAvailabilityStore,
  sessionId: SessionStore,
}, ({
  currentUser: { currentUser } = {},
  server: { server } = {},
  sessionId: { sessionId } = '',
}) => ({ currentUser, server, sessionId }));
