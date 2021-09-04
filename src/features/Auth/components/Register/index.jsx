import React from 'react';
import RegisterForm from '../RegisterForm';

Register.propTypes = {};

function Register(props) {
  const handleSubmit = (values) => {
    console.log('RegisterForm values', values);
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
