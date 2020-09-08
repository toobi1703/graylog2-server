// @flow strict
import * as React from 'react';
import { Field } from 'formik';

import { Input } from 'components/bootstrap';

import FormikFieldError from './FormikFieldError';

type Props = {
  component: Field,
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

const FormikField = ({ component: Component, label, name, type, help, validate, ...rest }: Props) => (
  <Component name={name} validate={validate}>
    {({ field: { value, onChange }, meta: { error } }) => {
      const inputSepcificProps = type === 'checkbox' ? checkboxProps(value) : inputProps(value);

      return (
        <Input {...rest}
               help={error ?? help}
               label={label}
               id={name}
               bsStyle={error ? 'error' : undefined}
               name={name}
               onChange={onChange}
               type={type}
               {...inputSepcificProps}>
          {error && <FormikFieldError>{error}</FormikFieldError>}
        </Input>
      );
    }}
  </Component>
);

FormikField.defaultProps = {
  component: Field,
  help: undefined,
  labelClassName: undefined,
  type: 'text',
  validate: () => {},
  wrapperClassName: undefined,
};

export default FormikField;
