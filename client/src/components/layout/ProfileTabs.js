import React, { Fragment, useState, useEffect } from 'react';
import { getUserPost, getUserLikedPost } from '../../actions/post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PostList from '../post/PostList';
import LoadingPost from '../layout/loading/LoadingPost';

const ProfileTabs = ({
  username,
  getUserPost,
  getUserLikedPost,
  user_posts,
  user_liked_posts,
  loading,
}) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    getUserPost(username);
    getUserLikedPost(username);
  }, [getUserPost, getUserLikedPost, username]);
  return (
    <Fragment>
      {loading ? (
        <LoadingPost />
      ) : (
        <Fragment>
          <div className='w-full border-t border-b border-grey-300 h-12 flex flex-row text-blue-500'>
            <button
              onClick={() => setPage(1)}
              className={`w-1/2 ${
                page === 1 ? `bg-gray-200` : `bg-white`
              } focus:outline-none`}
            >
              User Posts
            </button>
            <button
              onClick={() => setPage(2)}
              className={`w-1/2 border-l border-r ${
                page === 2 ? `bg-gray-200` : `bg-white`
              } focus:outline-none`}
            >
              User Likes
            </button>
          </div>
          {page === 1 ? (
            <PostList list={user_posts} />
          ) : (
            <PostList list={user_liked_posts} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStatetoProps = (state) => ({
  user_posts: state.post.user_posts,
  user_liked_posts: state.post.user_liked_posts,
  loading: state.post.loading,
});

ProfileTabs.propTypes = {
  getUserPost: PropTypes.func,
  getUserLikedPost: PropTypes.func,
  loading: PropTypes.bool,
};
export default connect(mapStatetoProps, {
  getUserPost,
  getUserLikedPost,
})(ProfileTabs);
