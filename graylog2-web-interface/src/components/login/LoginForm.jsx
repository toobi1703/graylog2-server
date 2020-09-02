import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button, FormGroup } from 'components/graylog';
import { Input } from 'components/bootstrap';
import CombinedProvider from 'injection/CombinedProvider';

const { SessionActions } = CombinedProvider.get('Session');

const StyledFormGroup = styled(FormGroup)`
  margin-bottom: 0;
`;

const LoginForm = ({ onErrorChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const promise = useRef();
  const usernameInput = useRef();
  const passwordInput = useRef();

  useEffect(() => {
    return () => promise?.current?.cancel();
  }, []);

  const onSignInClicked = (event) => {
    event.preventDefault();
    onErrorChange();
    setIsLoading(true);

    const username = usernameInput.current.getValue();
    const password = passwordInput.current.getValue();
    const location = document.location.host;

    promise.current = SessionActions.login(username, password, location);

    promise.current?.catch((error) => {
      if (error.additional.status === 401) {
        onErrorChange('Invalid credentials, please verify them and retry.');
      } else {
        onErrorChange(`Error - the server returned: ${error.additional.status} - ${error.message}`);
      }
    });

    promise.current?.finally(() => {
      if (!promise?.current?.isCancelled()) {
        setIsLoading(false);
      }
    });
  };

  return (
    <form onSubmit={onSignInClicked}>
      <Input ref={usernameInput}
             id="username"
             type="text"
             placeholder="Username"
             autoFocus />

      <Input ref={passwordInput}
             id="password"
             type="password"
             placeholder="Password" />

      <StyledFormGroup>
        <Button type="submit" bsStyle="info" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </StyledFormGroup>
    </form>
  );
};

LoginForm.propTypes = {
  onErrorChange: PropTypes.func.isRequired,
};

export default LoginForm;
