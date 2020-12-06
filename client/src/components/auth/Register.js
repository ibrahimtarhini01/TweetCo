import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';
import Alert from '../layout/Alert';
import { setAlert } from '../../actions/alert';

const Register = ({ register, isAuthenticated, setAlert }) => {
  const [match, setMatch] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    password2: '',
    day: '1',
    month: 'January',
    year: '',
    country: '',
    bio: '',
  });
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    password2,
    day,
    month,
    year,
    country,
    bio,
  } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === password2) {
      if (year <= 0 || year > new Date().getFullYear()) {
        setAlert('Please enter a proper year', 'red');
        window.scrollTo(0, 0);
      } else {
        const data = {
          name: firstName + ' ' + lastName,
          username,
          email,
          password,
          birthday: day + ' ' + month + ' ' + year,
          country,
          bio,
        };

        register(data);
        window.scrollTo(0, 0);
      }
    } else {
      setMatch(false);
      setTimeout(() => setMatch(true), 3000);
    }
  };
  if (isAuthenticated) {
    history.push('/profile');
    return <Redirect to='/profile' />;
  }
  return (
    <form onSubmit={(e) => onSubmit(e)} className='p-10'>
      <Alert />
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
          <label className='block uppercase tracking-wide  text-xs font-bold mb-2 text-blue-300 transition duration-300 ease-in-out hover:text-blue-500'>
            First Name
          </label>
          <input
            required
            className='appearance-none block w-full  border border-blue-200  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white '
            type='text'
            placeholder='Jane'
            name='firstName'
            value={firstName}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='w-full md:w-1/2 px-3'>
          <label className='block uppercase tracking-wide  text-xs font-bold mb-2 text-blue-300 transition duration-300 ease-in-out hover:text-blue-500'>
            Last Name
          </label>
          <input
            required
            className='appearance-none block w-full  border border-blue-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 '
            type='text'
            placeholder='Doe'
            name='lastName'
            value={lastName}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
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
            email
          </label>
          <input
            required
            className='appearance-none block w-full  border border-blue-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 '
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            type='email'
            placeholder='some_example@example.com'
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
          <p className='text-gray-600 text-xs italic'>
            The Password should be between 6 and 16 characters
          </p>
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label className='block uppercase tracking-wide  text-xs font-bold mb-2 text-blue-300 transition duration-300 ease-in-out hover:text-blue-500'>
            Confirm Password
          </label>
          <input
            required
            className='appearance-none block w-full  border   border-blue-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            type='password'
            placeholder='****************'
          />
          {!match && (
            <p className='text-red-500 text-xs italic'>
              * Passwords don't match
            </p>
          )}
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-2'>
        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
          <label className='block uppercase tracking-wide  text-xs font-bold mb-2 text-blue-300 transition duration-300 ease-in-out hover:text-blue-500'>
            Day
          </label>
          <div className='relative z-0'>
            <select
              className='block appearance-none w-full border border-blue-200  py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-blue-500  '
              name='day'
              value={day}
              onChange={(e) => onChange(e)}
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
              <option value='11'>11</option>
              <option value='12'>12</option>
              <option value='13'>13</option>
              <option value='14'>14</option>
              <option value='15'>15</option>
              <option value='16'>16</option>
              <option value='17'>17</option>
              <option value='18'>18</option>
              <option value='19'>19</option>
              <option value='20'>20</option>
              <option value='21'>21</option>
              <option value='22'>22</option>
              <option value='23'>23</option>
              <option value='24'>24</option>
              <option value='25'>25</option>
              <option value='26'>26</option>
              <option value='27'>27</option>
              <option value='28'>28</option>
              <option value='29'>29</option>
              <option value='30'>30</option>
              <option value='31'>31</option>
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
        </div>
        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-blue-300 transition duration-300 ease-in-out hover:text-blue-500'>
            Month
          </label>
          <div className='relative'>
            <select
              className='block appearance-none w-full border border-blue-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-blue-500 '
              name='month'
              value={month}
              onChange={(e) => onChange(e)}
            >
              <option value='January'>January</option>
              <option value='February'>February</option>
              <option value='March'>March</option>
              <option value='April'>April </option>
              <option value='May'>May</option>
              <option value='June'>June</option>
              <option value='July'>July</option>
              <option value='August'>August</option>
              <option value='September'>September</option>
              <option value='October'>October</option>
              <option value='November'>November</option>
              <option value='December'>December</option>
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
        </div>
        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-blue-300 transition duration-300 ease-in-out hover:text-blue-500'>
            Year
          </label>
          <input
            required
            className='appearance-none block w-full  border border-blue-200 rounded py-3 px-4  leading-tight focus:outline-none bg-white focus:border-blue-500  '
            name='year'
            value={year}
            onChange={(e) => onChange(e)}
            type='number'
            placeholder='Year...'
          />
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='w-full px-3'>
          <label className='block uppercase tracking-wide text-blue-300 text-xs font-bold mb-2  transition duration-300 ease-in-out hover:text-blue-500'>
            Country
          </label>
          <input
            required
            className='appearance-none block w-full  border border-blue-200 rounded py-3 px-4 mb-3 leading-tight  focus:outline-none  focus:border-blue-500'
            name='country'
            value={country}
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='Country...'
          />
        </div>
      </div>
      <label className='block'>
        <span className='text-blue-300 transition duration-300 ease-in-out hover:text-blue-500 font-bold text-xl mb-3 '>
          Bio
        </span>
        <textarea
          className='form-textarea mt-3 block w-full border border-blue-200 p-3 focus:outline-none rounded focus:border-blue-500 '
          rows='2'
          placeholder='Write about yourself'
          name='bio'
          value={bio}
          onChange={(e) => onChange(e)}
        ></textarea>
      </label>
      <div className='flex items-center justify-between mt-6'>
        <Link
          className='inline-block align-baseline font-bold text-sm text-blue-300 transition duration-300 ease-in-out hover:text-blue-500 focus:outline-none'
          to='/login'
        >
          <u>Already have an account? Sign In</u>
        </Link>{' '}
        <input
          required
          className='bg-blue-500 transition duration-300 ease-in-out hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'
          type='submit'
          value='Sign Up'
        />
      </div>
    </form>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
