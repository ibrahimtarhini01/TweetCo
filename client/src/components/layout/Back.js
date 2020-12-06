import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Back = ({ route, user, currentUser }) => {
  if (user === null) {
    return <Redirect to='/home' />;
  }
  return (
    <Fragment>
      <div className='max-w-sm w-full lg:max-w-full lg:flex border-b border-gray-200'>
        <div className=' bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal'>
          <div className='flex items-center focus:outline-none'>
            <Link
              to={{ pathname: route, state: { user: currentUser } }}
              className='w-10 h-10 mr-4 p-2 '
            >
              <i className='fas fa-chevron-left text-blue-500'></i>
            </Link>
            <div className=''>
              <p className='text-gray-900 leading-none text-md'>{user.name}</p>
              <p className='text-gray-500 text-sm'>@{user.username}</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStatetoProps = (state) => ({
  user: state.auth.user,
});

Back.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStatetoProps, {})(Back);
