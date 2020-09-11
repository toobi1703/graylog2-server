// @flow strict
import * as React from 'react';
import { Field } from 'formik';
import styled, { type StyledComponent } from 'styled-components';

import type { ThemeInterface } from 'theme';
import { Input } from 'components/bootstrap';

const ErrorMessage: StyledComponent<{}, ThemeInterface, HTMLDivElement> = styled.div(({ theme }) => `
  width: 100%;
  margin-top: 3px;
  color: ${theme.colors.variant.danger};
`);

type Props = {
  component?: typeof Field,
  label: string,
  name: string,
  type?: string,
  help?: string,
  labelClassName?: string,
  wrapperClassName?: string,
  validate?: (string) => ?string,
};

const checkboxProps = (value) => {
  return { checked: value ?? false };
};

const inputProps = (value) => {
  return { value: value ?? '' };
};

const FormikInput = ({ component: Component, label, name, type, help, validate, ...rest }: Props) => (
  <Component name={name} validate={validate}>
    {({ field: { value, onChange }, meta: { error } }) => {
      const typeSepcificProps = type === 'checkbox' ? checkboxProps(value) : inputProps(value);

      return (
        <Input {...rest}
               help={error ?? help}
               label={label}
               id={name}
               bsStyle={error ? 'error' : undefined}
               name={name}
               onChange={onChange}
               type={type}
               {...typeSepcificProps}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Input>
      );
    }}
  </Component>
);

FormikInput.ErrorMessage = ErrorMessage;

FormikInput.defaultProps = {
  component: Field,
  help: undefined,
  labelClassName: undefined,
  type: 'text',
  validate: () => {},
  wrapperClassName: undefined,
};

export default FormikInput;
