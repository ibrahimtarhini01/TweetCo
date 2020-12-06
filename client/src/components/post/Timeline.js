import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import PostForm from './PostForm';
import PostList from './PostList';
import LoadingPost from '../layout/loading/LoadingPost';
import { loadUser } from '../../actions/auth';

const Timeline = ({ searching, timeline, user, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  if (searching) {
    return <Redirect to={{ pathname: '/search', state: { prev: '/home' } }} />;
  }

  return (
    <Fragment>
      <div>
        <PostForm />

        {timeline.length === 0 && user === null ? (
          <LoadingPost />
        ) : (
          <PostList list={timeline} />
        )}
      </div>
    </Fragment>
  );
};

Timeline.propTypes = {
  isAuthenticated: PropTypes.bool,
  searching: PropTypes.bool,
  timeline: PropTypes.array,
  loadUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  searching: state.users.searching,
  timeline: state.post.timeline,
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadUser })(Timeline);
