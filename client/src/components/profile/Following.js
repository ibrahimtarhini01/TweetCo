import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getFollowing, clear } from '../../actions/users';
import PropTypes from 'prop-types';

import UserSearch from '../users/UserSearch';
import Back from '../layout/Back';
import LoadingUser from '../layout/loading/LoadingUser';
const Following = ({
  location: {
    state: { user, prev },
  },
  getFollowing,
  following,
  clear,
  loading,
}) => {
  useEffect(() => {
    clear();
    getFollowing(user.following);
  }, [user.following, getFollowing, clear]);

  return (
    <Fragment>
      <Back route={prev !== '' ? prev : '/profile'} currentUser={user} />

      {loading ? (
        <LoadingUser />
      ) : (
        following.map((follower) => {
          return <UserSearch user={follower} key={follower._id} />;
        })
      )}
    </Fragment>
  );
};

const mapStatetoProps = (state) => ({
  following: state.users.following,
  loading: state.users.loading,
  isAuthenticated: state.auth.isAuthenticated,
});

Following.propTypes = {
  clear: PropTypes.func,
  getFollowing: PropTypes.func,
  following: PropTypes.array,
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStatetoProps, { getFollowing, clear })(Following);
