import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { toggleSearch, searchUsers } from '../../actions/users';
import { clear } from '../../actions/post';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

const Header = ({ isAuthenticated, logout, toggleSearch, searchUsers }) => {
  const history = useHistory();
  const [styleState, setStyleState] = useState(
    'w-full block flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block',
  );
  const [search, setSearch] = useState('');

  const toggle = () => {
    // If Desktop
    if (
      styleState ===
      'w-full block flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block'
    ) {
      setStyleState('w-full block flex-grow flex items-left w-auto flex-col');
      // If mobile
    } else {
      setStyleState(
        'w-full block flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block',
      );
    }
  };
  useEffect(() => {
    if (search !== '') {
      toggleSearch(true);
    } else if (search === '') {
      toggleSearch(false);
    }
    if (search !== '') {
      searchUsers(search);
    }
  }, [search, searchUsers, toggleSearch]);
  const onChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <nav className='sticky flex items-center justify-between flex-wrap bg-blue-500 p-3 top-0 z-30'>
      <div className='flex items-center flex-shrink-0 text-white mr-6'>
        <i className='fab fa-twitter text-2xl mr-3 pt-2'></i>

        <span className='font-semibold text-2xl tracking-tight'>
          Tweet <strong>CO</strong>
        </span>
      </div>
      {isAuthenticated && (
        <Fragment>
          <div className='flex block lg:hidden'>
            <button
              className='flex items-center px-3 py-3 border rounded text-blue-200 border-blue-400 transition duration-300 ease-in-out hover:text-white hover:border-white h-8 mt-1 block-inline focus:outline-none'
              onClick={() => toggle()}
            >
              <svg
                className='fill-current h-3 w-3'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Menu</title>
                <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
              </svg>
            </button>
          </div>
          <div className={styleState}>
            <div className='text-sm lg:flex-grow'>
              {styleState !==
                'w-full block flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block' && (
                <form
                  className='pt-2 relative mx-5 text-gray-600'
                  onSubmit={(e) => {
                    e.preventDefault();
                    searchUsers(search);
                  }}
                >
                  <input
                    className='w-full bg-white h-10 px-5 pr-16 rounded-full text-sm focus:outline-none text-left'
                    type='search'
                    name='search'
                    placeholder='Search'
                    value={search}
                    onChange={(e) => onChange(e)}
                  />
                  <i className='absolute right-0 top-0 mt-6 mr-6 fas fa-search text-gray-600 h-4 w-4 fill-current'></i>
                  <input
                    type='submit'
                    className='absolute right-0 top-0 mt-4 mr-6 z-50 opacity-0 cursor-pointer '
                  />
                </form>
              )}

              <Link
                to='/profile'
                className='block mt-4 lg:inline lg:mt-0 text-blue-200 transition duration-300 ease-in-out hover:text-white text-lg mr-4 focus:outline-none'
              >
                <i className='fas fa-user mr-2'></i>Profile
              </Link>
              <Link
                to='/home'
                className='block mt-4 lg:inline lg:mt-0 text-blue-200 text-lg transition duration-300 ease-in-out focus:outline-none hover:text-white '
              >
                <i className='fas fa-home mr-2'></i> Home
              </Link>
            </div>
            {styleState ===
              'w-full block flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block' && (
              <div className='pt-2 relative mx-5 text-gray-600'>
                <input
                  className=' bg-white h-10 px-5 pr-16 rounded-full text-sm focus:outline-none'
                  type='text'
                  name='search'
                  placeholder='Search'
                  value={search}
                  onChange={(e) => onChange(e)}
                />
                <button
                  type='submit'
                  className='absolute right-0 top-0 mt-4 mr-4 focus:outline-none'
                >
                  <i className='fas fa-search text-gray-600 h-4 w-4 fill-current'></i>
                </button>
              </div>
            )}
            <div>
              <button
                className='block mt-4 lg:inline-block lg:mt-0 text-blue-200 transition duration-300 focus:outline-none ease-in-out hover:text-white '
                onClick={() => {
                  logout();
                  history.push('/');
                  setTimeout(() => window.location.reload(false), 500);
                }}
              >
                Log out <i className='fas fa-sign-out-alt ml-1'></i>
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </nav>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  searching: PropTypes.bool,
  clear: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  searching: state.users.searching,
});

export default connect(mapStateToProps, {
  logout,
  toggleSearch,
  searchUsers,
  clear,
})(Header);
