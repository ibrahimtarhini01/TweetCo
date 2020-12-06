import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import UserSearch from './UserSearch';
import PropTypes from 'prop-types';

const UserSearchList = ({ location, searching, users, isAuthenticated }) => {
  if (!isAuthenticated && localStorage.length === 1)
    return <Redirect to='/login' />;
  if (!searching) {
    return <Redirect to={location.state.prev} />;
  }
  return (
    <Fragment>
      {users.map((user) => (
        <UserSearch user={user} key={user._id} />
      ))}
    </Fragment>
  );
};

const mapStatetoProps = (state) => ({
  searching: state.users.searching,
  users: state.users.users,
  isAuthenticated: state.auth.isAuthenticated,
});

UserSearchList.propTypes = {
  searching: PropTypes.bool,
  users: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool,
};
export default connect(mapStatetoProps, {})(UserSearchList);
