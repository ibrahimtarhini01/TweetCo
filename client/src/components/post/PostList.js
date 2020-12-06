import React from 'react';
import PostItem from './PostItem';
import PropTypes from 'prop-types';

const PostList = ({ list }) => {
  return (
    <div>
      <ul>
        {list.map((post) => (
          <PostItem post={post} key={post._id} />
        ))}
      </ul>
    </div>
  );
};

PostList.propTypes = {
  list: PropTypes.array.isRequired,
};

export default PostList;
