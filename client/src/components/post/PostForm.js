import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import PropTypes from 'prop-types';

import Alert from '../layout/Alert';

const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    tags: '',
  });
  const [showModal, setShowModal] = useState(false);
  const { title, text, tags } = formData;
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: '',
      text,
      tags: [],
      image: '',
    };

    addPost(data);
    setFormData({ title: '', text: '', tags: '' });
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      const data = {
        title,
        text,
        tags: tags.replace(/ +/g, '').split(','),
        image: reader.result,
      };

      addPost(data);
    };
    setShowModal(false);
    setFormData({ title: '', text: '', tags: '' });
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <form
        className='overflow-hidden  mx-auto p-3 border-b border-gray-300'
        onSubmit={(e) => onSubmit(e)}
      >
        <Alert />
        <label className='block'>
          <span className='text-blue-300 font-bold text-xl mb-3 transition duration-300 ease-in-out hover:text-blue-500'>
            Quick Tweet
          </span>
          <textarea
            className='form-textarea mt-3 block w-full border border-blue-200 focus:outline-none p-3 rounded focus:border-blue-500 '
            rows='2'
            placeholder='Enter a quick tweet'
            name='text'
            value={text}
            onChange={(e) => onChange(e)}
          ></textarea>
        </label>
        <div className=' flex item-center flex-row m-3'>
          <div
            className='text-blue-500 transition duration-300 ease-in-out hover:text-blue-700 cursor-pointer '
            onClick={() => setShowModal(true)}
          >
            <i className='fas fa-images fa-2x'></i>
          </div>

          <button className='bg-blue-500 transition duration-300 ease-in-out focus:outline-none hover:bg-blue-700 text-white font-bold  px-3 rounded-full mx-3'>
            Tweet
          </button>
        </div>
      </form>
      {showModal && (
        <>
          <form
            className='justify-center   items-center flex overflow-x-hidden scrolling-touch fixed inset-0 z-40 outline-none md:mt-auto md:pt-auto focus:outline-none w-11/12 md:w-5/6 lg:w-1/3 mx-auto'
            style={{ paddingTop: '100px' }}
            onSubmit={handleSubmitFile}
          >
            <div className='relative w-full my-6  '>
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
                    <div
                      className='relative text-center border border-blue-200 rounded'
                      style={{ maxHeight: '400px' }}
                    >
                      <input
                        type='file'
                        name='image'
                        accept='image/*'
                        className='absolute h-full w-full top-0 left-0 cursor-pointer z-20 opacity-0 focus:outline-none'
                        value={fileInputState}
                        onChange={handleFileInputChange}
                      />
                      {previewSource === '' ? (
                        <div className='my-5'>
                          <img
                            src={process.env.PUBLIC_URL + '/upload.png'}
                            className=' h-12 w-16 mx-auto my-auto'
                            alt='preview'
                          />
                          <p className='text-blue-200 mx-auto my-auto text-bold text-lg'>
                            UPLOAD PIC
                          </p>
                        </div>
                      ) : (
                        <img
                          src={previewSource}
                          className='w-full '
                          style={{ maxHeight: '400px' }}
                          alt=' preview'
                        />
                      )}
                    </div>

                    <input
                      className='border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500  mt-3 '
                      id='title'
                      type='text'
                      name='title'
                      value={title}
                      onChange={(e) => onChange(e)}
                      placeholder='Title... (Optional)'
                    />
                    <textarea
                      className='form-textarea mt-3 block w-full border border-blue-200 p-3 focus:outline-none rounded focus:border-blue-500 '
                      rows='2'
                      placeholder='Tweet'
                      name='text'
                      value={text}
                      onChange={(e) => onChange(e)}
                      required
                    ></textarea>
                  </label>
                  <div className='md:flex md:items-center my-5'>
                    <div className='md:w-1/10'>
                      <label
                        className='block text-blue-300 font-bold mb-1 md:mb-0 pr-4 transition duration-300 ease-in-out hover:text-blue-500'
                        htmlFor='inline-full-name'
                      >
                        <i className='fas fa-hashtag'></i> Tags
                      </label>
                    </div>
                    <div className='md:w-1/10'>
                      <input
                        className=' appearance-none border-2 border-blue-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 '
                        id='inline-full-name'
                        type='text'
                        name='tags'
                        value={tags}
                        placeholder='pets,cats,kitten (optional)'
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </div>{' '}
                </div>
                {/*footer*/}
                <div className='flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b'>
                  <button
                    className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 transition duration-300 ease-in-out'
                    type='button'
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <input
                    required
                    className='bg-blue-500 hover:bg-blue-700 text-white active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow transition duration-300 ease-in-out outline-none focus:outline-none mr-1 mb-1'
                    type='submit'
                    value='Tweet'
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
PostForm.propTypes = {
  user: PropTypes.object,
  addPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { addPost })(PostForm);
