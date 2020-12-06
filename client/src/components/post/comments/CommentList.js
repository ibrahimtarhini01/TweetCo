import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser, deleteComment } from '../../../actions/post';
const CommentList = ({
  list,
  user,
  getUser,
  post_user,
  postId,
  deleteComment,
}) => {
  const [leave, setLeave] = useState(false);
  const [username, setUsername] = useState('');
  if (leave) {
    return (
      <Redirect
        to={
          username === user.username
            ? 'profile'
            : {
                pathname: '/user',
                state: { user: post_user, prev: '/home' },
              }
        }
      />
    );
  }
  return (
    <ul>
      {list.map((comment) => (
        <li
          className='bg-white rounded-b lg:rounded-b-none lg:rounded-r p-6 flex flex-col justify-between leading-normal border-b relative transition duration-300 ease-in-out hover:bg-gray-200'
          key={comment._id}
        >
          {comment.username === user.username && (
            <button
              className='absolute top-0 right-0 text-red-500 mr-5 mt-3 focus:outline-none'
              onClick={() => deleteComment(postId, comment._id)}
            >
              <i class='fas fa-times'></i>
            </button>
          )}
          <div className='flex items-center mb-3'>
            <img
              className=' rounded-full mr-4 w-16 h-16'
              src={comment.avatar}
              alt='Avatar'
            />
            <div className='flex flex-col text-sm md:text-md'>
              <button
                className='text-gray-900 leading-none focus:outline-none'
                to={
                  comment.username === user.username
                    ? 'profile'
                    : {
                        pathname: '/user',
                        state: { user: post_user, prev: '/home' },
                      }
                }
                onClick={() => {
                  setUsername(comment.username);
                  if (comment.username !== user.username) {
                    getUser(comment.username);
                  }
                  setTimeout(() => {
                    setLeave(true);
                    window.scrollTo(0, 0);
                  }, 500);
                }}
              >
                <b> {comment.name}</b>
              </button>

              <p className='text-gray-600 '>@{comment.username}</p>
              <p className='text-gray-600'>
                {new Date(comment.createdAt).toDateString()}
              </p>
            </div>
          </div>
          <div className='mt-5'>
            <p className='text-gray-700 text-base'>{comment.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

const mapStatetoProps = (state) => ({
  post_user: state.post.post_user,
});

CommentList.propTypes = {
  post_user: PropTypes.object,
  deleteComment: PropTypes.func,
  getUser: PropTypes.func,
};

export default connect(mapStatetoProps, { getUser, deleteComment })(
  CommentList,
);
