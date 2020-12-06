import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getUser,
  like,
  unlike,
  editPost,
  deletePost,
  getPost,
  clear,
} from '../../actions/post';

const PostItem = ({
  post: {
    _id,
    text,
    title,
    photo,
    tags,
    createdAt,
    avatar,
    username,
    name,
    likes,
    comments,
  },
  user,
  post_user,
  getUser,
  like,
  unlike,
  editPost,
  deletePost,
  getPost,
  clear,
}) => {
  const [leave, setLeave] = useState(false);
  const [liked, setLiked] = useState(likes.includes(user.username));
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    text: text,
    title: title,
    tags: tags.join(),
  });

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
      _id,
    );
    setShowModal(false);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
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
    <Fragment>
      <li className='overflow-hidden border-b border-gray-300 '>
        <div className='bg-white rounded-b lg:rounded-b-none lg:rounded-r p-2 md:p-5 flex flex-col justify-between leading-normal transition duration-500 ease-in-out hover:bg-gray-200'>
          <div className='flex items-start mb-3'>
            {/*Avatar */}
            <div>
              <img
                className=' rounded-full mr-4 w-16 h-16 '
                src={avatar}
                alt='Avatar'
              />
            </div>
            {/*Content */}
            <div className='flex flex-col text-sm md:text-md w-4/5 mr-2 md:w-10/12'>
              {/*Header */}
              <div className=''>
                <button
                  onClick={() => {
                    if (username !== user.username) {
                      getUser(username);
                    }

                    clear();
                    setTimeout(() => {
                      setLeave(true);
                      window.scrollTo(0, 0);
                    }, 500);
                  }}
                  className='text-gray-900 leading-none focus:outline-none'
                >
                  <b> {name}</b>
                </button>

                <p className='text-gray-600 '>@{username}</p>
                <p className='text-gray-600'>
                  Posted on {new Date(createdAt).toDateString()}
                </p>
              </div>
              {/*Body */}
              <div className='w-4/5'>
                <div className='mt-5'>
                  {title !== '' && (
                    <div className='text-gray-900 font-bold text-xl mb-2'>
                      {title}
                    </div>
                  )}
                  <p className='text-gray-700 my-5 text-base md:text-lg break-words w-5/6'>
                    {text}
                  </p>
                  {photo !== '' && (
                    <img
                      className='rounded'
                      src={photo}
                      alt='not found'
                      style={{ maxHeight: '400px' }}
                    />
                  )}
                </div>
                {tags[0] !== '' && (
                  <div className='py-2'>
                    {tags.map((tag, index) => (
                      <span
                        className='inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2'
                        key={index}
                      >
                        # {tag}
                      </span>
                    ))}
                  </div>
                )}
                {/*tool bar */}
                <div className='flex items-center justify-start text-red-500 w-full mt-2 '>
                  <div className='w-1/3 flex flex-row item-start'>
                    {liked ? (
                      <button
                        onClick={() => {
                          setLiked(false);
                          unlike(_id, username);
                        }}
                        className='focus:outline-none'
                      >
                        <i className='fas fa-heart '></i>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setLiked(true);
                          like(_id, username);
                        }}
                        className='focus:outline-none bg-transparent '
                      >
                        <i className='far fa-heart '></i>
                      </button>
                    )}{' '}
                    <span className='ml-3'>{likes.length}</span>
                  </div>
                  <div className='w-1/3 flex flex-row item-start'>
                    <Link
                      to='comments'
                      onMouseOver={() => getPost(_id)}
                      className='focus:outline-none bg-transparent'
                    >
                      <i className='fas fa-comments text-blue-300 '></i>
                    </Link>
                    <span className='ml-3 text-blue-300 '>
                      {comments.length}
                    </span>
                  </div>
                  <div className='w-1/3 flex flex-row item-start'>
                    {user.username === username && (
                      <button
                        className='text-gray-500 focus:outline-none bg-transparent '
                        onClick={() => setShowModal(true)}
                      >
                        <i className='fas fa-cog '></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      {showModal && (
        <>
          <form
            className='justify-center   items-center flex overflow-x-hidden scrolling-touch fixed inset-0 z-40 outline-none md:mt-auto md:pt-auto focus:outline-none w-11/12 md:w-5/6 lg:w-1/3 mx-auto'
            style={{ paddingTop: '100px' }}
            onSubmit={(e) => onSubmit(e)}
          >
            <div className='relative w-full my-6  '>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}
                <div className='flex items-start justify-between p-3 rounded-t'>
                  <h3 className='text-3xl font-semibold text-blue-500'>
                    Edit Post
                  </h3>
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
                      className='form-textarea mt-3 block w-full border border-blue-200 p-3 rounded focus:outline-none focus:border-blue-500 hover:border-blue-500'
                      rows='2'
                      placeholder='Edittweet'
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
                      deletePost(_id);
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
  loading: state.post.loading,
});

PostItem.propTypes = {
  user: PropTypes.object,
  post_user: PropTypes.object,
  getPost: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  getUser: PropTypes.func,
  like: PropTypes.func,
  unlike: PropTypes.func,
  editPost: PropTypes.func,
  deletePost: PropTypes.func,
  loading: PropTypes.bool,
  clear: PropTypes.func,
};
export default connect(mapStatetoProps, {
  getUser,
  like,
  unlike,
  editPost,
  deletePost,
  getPost,
  clear,
})(PostItem);
