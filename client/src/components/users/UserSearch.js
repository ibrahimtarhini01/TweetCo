import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSearch, clear } from '../../actions/users';
import { follow } from '../../actions/auth';
import PropTypes from 'prop-types';

const UserSearch = ({ user, toggleSearch, clear, follow, auth }) => {
  return (
    <div className='flex bg-white rounded-lg p-6 transition duration-300 ease-in-out hover:bg-gray-200 border-b border-gray-200  w-full'>
      <div className='flex flex-row w-full justify-between'>
        <img
          className='h-12 w-12 sm:h-24 sm:w-24 rounded-full  mr-6 item-center'
          src={
            user.profileImage !==
            'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
              ? user.profileImage
              : 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
          }
          alt='1'
        />
        <div className='text-left w-3/4'>
          <h2>
            <Link
              to={{ pathname: '/user', state: { user: user, prev: '/home' } }}
              className='text-sm sm:text-lg truncate focus:outline-none'
              onClick={() => {
                toggleSearch(false);
                clear();
              }}
            >
              {' '}
              {user.name}
            </Link>
          </h2>
          <div className='text-gray-500 truncate'>@{user.username}</div>
          <div className='text-sm sm:text-lg text-gray-600 w-1/3 truncate'>
            {user.bio}
          </div>
        </div>
        <div className='w-1/6  item-left my-auto '>
          {auth.user.following.includes(user.username) ? (
            <Fragment>
              <p className='bg-blue-500  text-white font-bold item-right py-2 px-4 rounded-full hidden sm:inline'>
                Following
              </p>
              <p className='bg-blue-500  text-white font-bold item-right py-2 px-4 rounded-full inline sm:hidden'>
                <i class='fas fa-user-check'></i>
              </p>
            </Fragment>
          ) : (
            auth.user.username !== user.username && (
              <Fragment>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white hidden sm:block  font-bold item-right py-2 px-4 rounded-full focus:outline-none'
                  onClick={() => follow(user.username)}
                >
                  Follow
                </button>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white block sm:hidden  font-bold item-right py-2 px-4 rounded-full focus:outline-none'
                  onClick={() => follow(user.username)}
                >
                  <i class='fas fa-user-plus'></i>
                </button>
              </Fragment>
            )
          )}
        </div>
      </div>
    </div>
  );
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
});

UserSearch.propTypes = {
  toggleSearch: PropTypes.func,
  clear: PropTypes.func,
  follow: PropTypes.func,
  auth: PropTypes.object,
};
export default connect(mapStatetoProps, { toggleSearch, clear, follow })(
  UserSearch,
);
