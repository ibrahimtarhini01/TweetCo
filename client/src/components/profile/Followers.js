import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getFollowers, clear } from '../../actions/users';
import PropTypes from 'prop-types';

import UserSearch from '../users/UserSearch';
import Back from '../layout/Back';
import LoadingUser from '../layout/loading/LoadingUser';

const Followers = ({
  location: { state },
  getFollowers,
  followers,
  clear,
  loading,
}) => {
  useEffect(() => {
    clear();
    getFollowers(state.user.followers);
  }, [state.user.followers, getFollowers, clear]);

  return (
    <Fragment>
      <Back
        route={state.prev !== '' ? state.prev : '/profile'}
        currentUser={state.user}
      />

      {loading ? (
        <LoadingUser />
      ) : (
        followers.map((follower) => {
          return <UserSearch user={follower} key={follower._id} />;
        })
      )}
    </Fragment>
  );
};

const mapStatetoProps = (state) => ({
  followers: state.users.followers,
  loading: state.users.loading,
  isAuthenticated: state.auth.isAuthenticated,
});

Followers.propTypes = {
  clear: PropTypes.func,
  getFollowers: PropTypes.func,
  followers: PropTypes.array,
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStatetoProps, { getFollowers, clear })(Followers);
