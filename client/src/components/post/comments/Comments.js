import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getUser,
  like,
  unlike,
  editPost,
  deletePost,
  getPost,
  comment,
} from '../../../actions/post';

import Back from '../../layout/Back';
import CommentList from './CommentList';
import Alert from '../../layout/Alert';

// Dont forget to fix the update problem with user info
// Improve design
const Comments = ({
  post,
  getPost,
  user,
  post_user,
  getUser,
  like,
  unlike,
  editPost,
  deletePost,
  comment,
}) => {
  const [leave, setLeave] = useState(false);
  const [liked, setLiked] = useState(
    post === null ? false : post.likes.includes(post.username),
  );
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    text: post === null ? '' : post.text,
    title: post === null ? '' : post.title,
    tags: post === null ? [] : post.tags.join(),
  });

  const [commentText, setCommentText] = useState('');

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    editPost(
      {
        text: formData.text,
        title: formData.title,
        tags: formData.tags.split(','),
      },
      post._id,
    );
    setShowModal(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const commentSubmit = (e) => {
    e.preventDefault();
    comment(post._id, { text: commentText });
    setCommentText('');
  };

  if (user === null || post === null) {
    return <Redirect to='/home' />;
  }

  if (leave) {
    return (
      <Redirect
        to={
          post.username === user.username
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
    <Fragment>
      <Back route={'/home'} currentUser={user} />
      <div className='overflow-hidden mx-auto border-t border-gray-300 lg:border-none '>
        <div className='bg-white rounded-b lg:rounded-b-none lg:rounded-r p-6 flex flex-col justify-between leading-normal'>
          <div className='flex items-center mb-3'>
            {/*Avatar */}
            <img
              className='rounded-full mr-4 w-16 h-16'
              src={post.avatar}
              alt='Avatar'
            />
            {/*Content */}
            <div className='flex flex-col text-sm md:text-md w-4/5 mr-2 md:w-10/12'>
              {/*Header */}

              <button
                className='text-gray-900 leading-none focus:outline-none text-left'
                onClick={() => {
                  if (post.username !== user.username) {
                    getUser(post.username);
                  }

                  setTimeout(() => {
                    setLeave(true);
                    window.scrollTo(0, 0);
                  }, 500);
                }}
              >
                <b> {post.name}</b>
              </button>

              <p className='text-gray-600 '>@{post.username}</p>
              <p className='text-gray-600'>
                Posted on {new Date(post.createdAt).toDateString()}
              </p>
            </div>
          </div>
          {/* Body */}
          <div className=''>
            <div className='my-3'>
              {/* Title */}
              {post.title !== '' && (
                <div className='text-gray-900 font-bold text-xl mb-2'>
                  {post.title}
                </div>
              )}
              {/* Text */}
              <p className='text-gray-700 text-base'>{post.text}</p>
            </div>
            {/* Photo */}
            {post.photo !== '' && (
              <img
                className=''
                src={post.photo}
                alt=' not found'
                style={{ maxHeight: '400px' }}
              />
            )}
            {/* Tags */}
            {post.tags[0] !== '' && (
              <div className='py-4'>
                {post.tags.map((tag, index) => (
                  <span
                    className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'
                    key={index}
                  >
                    # {tag}
                  </span>
                ))}
              </div>
            )}
            <div className='flex items-center justify-start text-red-500 w-full mt-2 '>
              <div className='w-1/4 flex flex-row item-start'>
                {liked ? (
                  <button
                    onClick={() => {
                      setLiked(false);
                      unlike(post._id, post.username);
                      setTimeout(() => getPost(post._id), 500);
                    }}
                    className='focus:outline-none'
                  >
                    <i className='fas fa-heart '></i>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setLiked(true);
                      like(post._id, post.username);
                      setTimeout(() => getPost(post._id), 500);
                    }}
                    className='focus:outline-none bg-transparent '
                  >
                    <i className='far fa-heart '></i>
                  </button>
                )}{' '}
                <span className='mx-3'>{post.likes.length}</span>
              </div>
              <div className='w-1/4 flex flex-row item-start'>
                <p>
                  <i className='fas fa-comments text-blue-300'></i>
                </p>
                <span className='ml-3 text-blue-300 '>
                  {post.comments.length}
                </span>
              </div>
              <div className='w-1/4 flex flex-row item-start'>
                {user.username === post.username && (
                  <button
                    className='text-gray-500 focus:outline-none bg-transparent '
                    onClick={() => setShowModal(true)}
                  >
                    <i className='fas fa-cog'></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <form
          className='flex items-center justify-start  border-t border-b border-solid border-gray-300 p-3 relative'
          onSubmit={(e) => commentSubmit(e)}
        >
          <input
            type='text'
            name='commentText'
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className='w-4/5 border rounded-full py-2 px-3 border-blue-200 focus:outline-none '
            placeholder='Comment...'
          />
          <input
            type='submit'
            className='bg-blue-500  transition duration-300 focus:outline-none ease-in-out hover:bg-blue-700 text-white w-1/7 font-bold py-2 px-3 hidden sm:block rounded-full ml-5'
            value='Comment'
          />
          <button
            type='submit'
            className='bg-blue-500 transition duration-300 ease-in-out focus:outline-none hover:bg-blue-700 text-white w-1/7 font-bold py-2 px-3 sm:hidden block rounded-full ml-5'
            onClick={(e) => commentSubmit(e)}
          >
            <i className='fas fa-arrow-right'></i>
          </button>
        </form>
        <Alert />
        <CommentList list={post.comments} user={user} postId={post._id} />
      </div>
      {showModal && (
        <>
          <form
            className='justify-center   items-center flex overflow-x-hidden scrolling-touch fixed inset-0 z-40 outline-none md:mt-auto md:pt-auto focus:outline-none  w-11/12 md:w-5/6 lg:w-1/3 mx-auto'
            style={{ paddingTop: '100px' }}
            onSubmit={(e) => onSubmit(e)}
          >
            <div className='relative w-full my-6 '>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-3 rounded-t'>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}
                  >
                    <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className='overflow-hidden w-full mx-auto p-3'>
                  <label className='block'>
                    <input
                      className='border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500  mt-3 hover:border-blue-500'
                      id='title'
                      type='text'
                      name='title'
                      value={formData.title}
                      onChange={(e) => onChange(e)}
                      placeholder='Title... (Optional)'
                    />
                    <textarea
                      className='form-textarea mt-3 block w-full border border-blue-200 p-3 rounded focus:border-blue-500 hover:border-blue-500'
                      rows='2'
                      placeholder='Edit tweet'
                      name='text'
                      value={formData.text}
                      onChange={(e) => onChange(e)}
                      required
                    ></textarea>
                  </label>
                  <div className='md:flex md:items-center my-5'>
                    <div className='md:w-1/10'>
                      <label
                        className='block text-blue-300 font-bold mb-1 md:mb-0 pr-4  hover:text-blue-500'
                        htmlFor='inline-full-name'
                      >
                        <i className='fas fa-hashtag'></i> Tags
                      </label>
                    </div>
                    <div className='md:w-1/10'>
                      <input
                        className=' appearance-none border-2 border-blue-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none  hover:border-blue-500 focus:bg-white focus:border-blue-500 '
                        id='inline-full-name'
                        type='text'
                        name='tags'
                        value={formData.tags}
                        placeholder='pets,cats,kitten'
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </div>{' '}
                </div>
                {/*footer*/}
                <div className='flex items-center justify-between p-6 border-t border-solid border-gray-300 rounded-b'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                    type='button'
                    style={{ transition: 'all .15s ease' }}
                    onClick={() => {
                      deletePost(post._id);
                      setShowModal(false);
                      setTimeout(() => {
                        window.location.reload();
                      }, 1000);
                    }}
                  >
                    Delete Post
                  </button>
                  <input
                    required
                    className='bg-blue-500 hover:bg-blue-700 text-white active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 cursor-pointer '
                    type='submit'
                    value='Edit Post'
                  />
                </div>
              </div>
            </div>
          </form>
          <div className='opacity-25 fixed inset-0 z-30 bg-black'></div>
        </>
      )}
    </Fragment>
  );
};
const mapStatetoProps = (state) => ({
  user: state.auth.user,
  post_user: state.post.post_user,
  isAuthenticated: state.auth.isAuthenticated,
  post: state.post.post,
});

Comments.propTypes = {
  user: PropTypes.object,
  post_user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  getUser: PropTypes.func,
  like: PropTypes.func,
  unlike: PropTypes.func,
  editPost: PropTypes.func,
  deletePost: PropTypes.func,
  post: PropTypes.object,
  getPost: PropTypes.func,
  comment: PropTypes.func,
};
export default connect(mapStatetoProps, {
  getUser,
  like,
  unlike,
  editPost,
  deletePost,
  getPost,
  comment,
})(Comments);
