import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register({ closeDialog }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    // auto set username = email
    values.username = values.email;

    try {
      // call thunk register and return data.user
      const resultAction = await dispatch(register(values));
      unwrapResult(resultAction);

      // do something here on register successfully
      // close dialog
      closeDialog?.();

      enqueueSnackbar('Register successfully', { variant: 'success' });
    } catch (error) {
      console.log('Fail to register', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
