import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';

const Login = ({ isAuthenticated, login }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };
  if (isAuthenticated) {
    return <Redirect to='/home' />;
  }
  return (
    <form onSubmit={(e) => onSubmit(e)} className='p-10'>
      <Alert />
      <div className='flex flex-wrap -mx-3 mb-6 '>
        <div className='w-full px-3'>
          <label className='block uppercase tracking-wide  text-xs font-bold mb-2 text-blue-300 transition duration-300 ease-in-out hover:text-blue-500'>
            username
          </label>
          <input
            required
            className='appearance-none block w-full  border border-blue-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 '
            name='username'
            value={username}
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='username...'
          />
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label className='block uppercase tracking-wide  text-xs font-bold mb-2 text-blue-300 transition duration-300 ease-in-out hover:text-blue-500'>
            Password
          </label>
          <input
            required
            className='appearance-none block w-full  border border-blue-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 '
            type='password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            placeholder='****************'
          />
        </div>
      </div>

      <div className='flex items-center justify-between mt-6'>
        <Link
          className='inline-block align-baseline font-bold text-sm text-blue-300 transition duration-300 ease-in-out hover:text-blue-500'
          to='/register'
        >
          <u>Don't have an account ? Join Us</u>
        </Link>{' '}
        <input
          required
          className='bg-blue-500 transition duration-300 ease-in-out hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'
          type='submit'
          value='Sign In'
        />
      </div>
    </form>
  );
};

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStatetoProps, { login })(Login);
