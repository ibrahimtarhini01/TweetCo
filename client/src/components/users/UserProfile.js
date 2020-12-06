import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { follow, unfollow } from '../../actions/auth';

import Back from '../layout/Back';
import Spinner from '../layout/loading/Spinner';
import ProfileTabs from '../layout/ProfileTabs';
const UserProfile = ({
  location: { state },
  user,
  isAuthenticated,
  searching,
  follow,
  unfollow,
}) => {
  if (!isAuthenticated && localStorage.length === 1) {
    return <Redirect to='/login' />;
  } else if (searching) {
    return <Redirect to={{ pathname: '/search', state: { prev: '/home' } }} />;
  } else if (user === null) {
    return <Redirect to='/home' />;
  } else if (state.user.username === user.username) {
    return <Redirect to='/profile' />;
  }
  return (
    <Fragment>
      <Back route={'/home'} currentUser={state.user} />
      {user === null ? (
        <Spinner />
      ) : (
        <div className='relative overflow-hidden shadow-lg'>
          <img
            className='w-full max-h-md '
            src={
              state.user.backGroundImage !==
              'https://www.solidbackgrounds.com/images/1680x1050/1680x1050-ghost-white-solid-color-background.jpg'
                ? state.user.backGroundImage
                : 'https://www.solidbackgrounds.com/images/1680x1050/1680x1050-ghost-white-solid-color-background.jpg'
            }
            alt=''
            style={{ height: '300px' }}
          />

          <div className='relative'>
            <div className=' w-full h-24 md:h-32'>
              <img
                className='w-32 h-32 md:w-40  md:h-40 rounded-full absolute ml-2'
                style={{ top: '-20%' }}
                src={
                  state.user.profileImage !==
                  'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
                    ? state.user.profileImage
                    : 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
                }
                alt=''
              />

              <div
                className='md:w-1/7  md:item-right absolute'
                style={{ right: '10%', top: '10%' }}
              >
                {!user.following.includes(state.user.username) ? (
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold focus:outline-none item-right py-2 px-4 rounded-full'
                    onClick={() => follow(state.user.username)}
                  >
                    Follow
                  </button>
                ) : (
                  <Fragment>
                    <p className='bg-blue-500  text-white font-bold item-right py-2 px-4 rounded-full inline'>
                      Following
                    </p>
                    <button
                      className=' bg-blue-500 hover:bg-blue-700 text-white font-bold item-right focus:outline-none ml-2 py-1 px-2 rounded-full '
                      onClick={() => unfollow(state.user.username)}
                    >
                      <i className='fas fa-times w-5 h-5'></i>
                    </button>
                  </Fragment>
                )}
              </div>
            </div>
            <div className='ml-5'>
              <div className='font-bold text-xl'>{state.user.name}</div>
              <div className='text-md mb-2 text-gray-400'>
                @{state.user.username}
              </div>
              <div className='text-gray-600  text-xs md:text-base flex flex-row'>
                <p className='mr-2'>
                  <strong>Joined</strong> in{' '}
                  {new Date(state.user.createdAt).toDateString()},{' '}
                </p>
                <p className='mr-2'>
                  <strong>Born</strong> {state.user.birthday},{' '}
                </p>
                <p className='mr-2'>
                  <strong>From</strong> {state.user.country}
                </p>
              </div>
              <p className='text-gray-600  text-xs md:text-base mt-3'>
                <strong>Bio:</strong> {state.user.bio}
              </p>
              <div className='text-gray-600  text-xs md:text-base flex flex-row mt-2'>
                <p className='mr-2'>
                  {state.user.following.length}{' '}
                  <Link
                    to={{
                      pathname: '/following',
                      state: { user: state.user, prev: '/user' },
                    }}
                    className='focus:outline-none'
                  >
                    <u>Following</u>
                  </Link>
                </p>
                <p className='mr-2'>
                  {state.user.followers.length}{' '}
                  <Link
                    to={{
                      pathname: '/followers',
                      state: { user: state.user, prev: '/user' },
                    }}
                    className='focus:outline-none'
                  >
                    <u>Followers</u>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className='px-6 py-4'>
            <p className='inline-block text-gray-600  text-sm md:text-base mt-3 mr-2'>
              <strong>Interested in: </strong>
            </p>
            {state.user.intrests.map((intrest, key) => (
              <span
                key={key}
                className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'
              >
                #{intrest}
              </span>
            ))}
          </div>
          <ProfileTabs username={state.user.username} />
        </div>
      )}
    </Fragment>
  );
};

const mapStatetoProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  searching: state.users.searching,
});

UserProfile.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  searching: PropTypes.bool,
  follow: PropTypes.func,
  unfollow: PropTypes.func,
};
export default connect(mapStatetoProps, { follow, unfollow })(UserProfile);
