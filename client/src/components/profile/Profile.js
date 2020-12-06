import React, { Fragment, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Spinner from '../layout/loading/Spinner';
import { connect } from 'react-redux';
import {
  updateProfilePic,
  updateBackgroundePic,
  updateUserInfo,
} from '../../actions/auth';

import ProfileTabs from '../layout/ProfileTabs';
import PropTypes from 'prop-types';

const Profile = ({
  user,
  loading,
  updateProfilePic,
  updateBackgroundePic,
  updateUserInfo,
  searching,
}) => {
  const [showModal, setShowModal] = useState(false);

  const [userData, setUserData] = useState({
    firstName: user === null ? '' : user.name.split(' ')[0],
    lastName: user === null ? '' : user.name.split(' ')[1],
    username: user === null ? '' : user.username,
    email: user === null ? '' : user.email,
    day: user === null ? '1' : user.birthday.split(' ')[0],
    month: user === null ? 'January' : user.birthday.split(' ')[1],
    year: user === null ? '' : user.birthday.split(' ')[2],
    country: user === null ? '' : user.country,
    bio: user === null ? '' : user.bio,
    intrests: user === null ? '' : user.intrests.join(),
  });
  const {
    firstName,
    lastName,
    username,
    day,
    month,
    year,
    country,
    bio,
    intrests,
  } = userData;

  let history = useHistory();

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onClear = () => {
    setSelectedFile1();
    setPreviewSource1('');
    setSelectedFile2();
    setPreviewSource2('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: firstName + ' ' + lastName,
      username,
      birthday: day + ' ' + month + ' ' + year,
      country,
      bio,
      intrests: intrests.replace(/ +/g, '').split(','),
    };
    updateUserInfo(data);
    setShowModal(false);
  };

  const [fileInputState1, setFileInputState1] = useState('');
  const [previewSource1, setPreviewSource1] = useState('');
  const [selectedFile1, setSelectedFile1] = useState();

  const [fileInputState2, setFileInputState2] = useState('');
  const [previewSource2, setPreviewSource2] = useState('');
  const [selectedFile2, setSelectedFile2] = useState();

  const handleFileInputChange1 = (e) => {
    const file = e.target.files[0];
    previewFile1(file);
    setSelectedFile1(file);
    setFileInputState1(e.target.value);
  };

  const previewFile1 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource1(reader.result);
    };
  };

  const handleFileInputChange2 = (e) => {
    const file = e.target.files[0];
    previewFile2(file);
    setSelectedFile2(file);
    setFileInputState2(e.target.value);
  };

  const previewFile2 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource2(reader.result);
    };
  };

  if (searching) {
    return (
      <Redirect to={{ pathname: '/search', state: { prev: '/profile' } }} />
    );
  } else if (user === null) {
    return <Redirect to='/home' />;
  }
  return (
    <Fragment>
      {user === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='relative overflow-hidden shadow-lg'>
            <img
              className='w-full max-h-md '
              src={
                previewSource2 !== ''
                  ? previewSource2
                  : user.backGroundImage !==
                    'https://www.solidbackgrounds.com/images/1680x1050/1680x1050-ghost-white-solid-color-background.jpg'
                  ? user.backGroundImage
                  : 'https://www.solidbackgrounds.com/images/1680x1050/1680x1050-ghost-white-solid-color-background.jpg'
              }
              alt='backgroundPic'
              style={{ height: '300px' }}
            />
            <input
              type='file'
              name='backGroundPic'
              accept='image/*'
              className='absolute z-10 w-full max-h-md  cursor-pointer top-0 left-0 opacity-0 focus:outline-none'
              style={{ height: '250px' }}
              onChange={handleFileInputChange2}
              value={fileInputState2}
            />
            <div className='relative'>
              <div className=' w-full h-24 md:h-32'>
                <img
                  className='w-32 h-32 md:w-40  md:h-40 rounded-full absolute ml-2'
                  style={{ top: '-20%' }}
                  src={
                    previewSource1 !== ''
                      ? previewSource1
                      : user.profileImage !==
                        'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
                      ? user.profileImage
                      : 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'
                  }
                  alt='profile'
                />
                <input
                  type='file'
                  name='profilePic'
                  accept='image/*'
                  className='w-32 h-32 md:w-40  md:h-40 rounded-full absolute ml-2 z-10 opacity-0 cursor-pointer focus:outline-none'
                  style={{ top: '-20%' }}
                  value={fileInputState1}
                  onChange={handleFileInputChange1}
                />
                <div
                  className='md:w-1/7  md:item-right absolute'
                  style={{ right: '10%', top: '10%' }}
                >
                  {selectedFile1 === undefined &&
                  selectedFile2 === undefined ? (
                    <button
                      className='bg-blue-500 transition duration-300 ease-in-out hover:bg-blue-700 text-white font-bold item-right py-2 px-4 rounded-full focus:outline-none'
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <Fragment>
                      <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold item-right py-2 px-4 rounded-full focus:outline-none'
                        onClick={(e) => {
                          console.log(1);
                          const reader = new FileReader();
                          if (
                            selectedFile2 !== undefined &&
                            selectedFile1 === undefined
                          ) {
                            reader.readAsDataURL(selectedFile2);
                            reader.onloadend = () => {
                              const data = { image: reader.result };
                              updateBackgroundePic(data);
                            };
                          } else if (
                            selectedFile1 !== undefined &&
                            selectedFile2 === undefined
                          ) {
                            reader.readAsDataURL(selectedFile1);
                            reader.onloadend = () => {
                              const data = { image: reader.result };
                              updateProfilePic(data);
                            };
                          } else if (
                            selectedFile2 !== undefined &&
                            selectedFile1 !== undefined
                          ) {
                            reader.readAsDataURL(selectedFile1);
                            reader.onloadend = () => {
                              updateProfilePic({ image: reader.result });
                              const reader2 = new FileReader();
                              reader2.readAsDataURL(selectedFile2);
                              reader2.onloadend = () => {
                                updateBackgroundePic({ image: reader2.result });
                              };
                            };
                          }
                          history.push('/home');
                        }}
                      >
                        Update Profile
                      </button>
                      <button
                        className=' bg-blue-500 hover:bg-blue-700 text-white font-bold item-right ml-2 py-1 px-2 rounded-full focus:outline-none '
                        onClick={() => onClear()}
                      >
                        <i className='fas fa-times w-5 h-5'></i>
                      </button>
                    </Fragment>
                  )}
                </div>
              </div>
              <div className='ml-5'>
                <div className='font-bold text-xl'>{user.name}</div>
                <div className='text-md mb-2 text-gray-400'>
                  @{user.username}
                </div>
                <div className='text-gray-600  text-xs md:text-base flex flex-row'>
                  <p className='mr-2'>
                    <strong>Joined</strong> in{' '}
                    {new Date(user.createdAt).toDateString()},{' '}
                  </p>
                  <p className='mr-2'>
                    <strong>Born</strong> {user.birthday},{' '}
                  </p>
                  <p className='mr-2'>
                    <strong>From</strong> {user.country}
                  </p>
                </div>
                <p className='text-gray-600  text-xs md:text-base mt-3'>
                  <strong>Bio:</strong> {user.bio}
                </p>
                <div className='text-gray-600  text-xs md:text-base flex flex-row mt-2'>
                  <p className='mr-2'>
                    {user.following.length}{' '}
                    <Link
                      to={{
                        pathname: '/following',
                        state: { user: user, prev: '' },
                      }}
                      className='focus:outline-none'
                    >
                      <u>Following</u>
                    </Link>
                  </p>
                  <p className='mr-2'>
                    {user.followers.length}{' '}
                    <Link
                      to={{
                        pathname: '/followers',
                        state: { user: user, prev: '' },
                      }}
                      className='focus:outline-none'
                    >
                      <u>Followers</u>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className='px-6 py-4'>
              <p className='inline-block text-gray-600  text-sm md:text-base mt-3 mr-2'>
                <strong>Interested in: </strong>
              </p>
              {intrests.split(',').map((intrest, key) => (
                <span
                  key={key}
                  className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'
                >
                  #{intrest}
                </span>
              ))}
            </div>
            <ProfileTabs username={username} />
          </div>
          {showModal && (
            <>
              <div
                className='justify-center items-center flex overflow-x-hidden scrolling-touch fixed inset-0 z-40 outline-none md:mt-auto md:pt-auto focus:outline-none '
                style={{ paddingTop: '400px' }}
              >
                <form
                  className='relative w-auto my-6 mx-auto max-w-3xl'
                  onSubmit={(e) => onSubmit(e)}
                >
                  {/*content*/}
                  <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                    {/*header*/}
                    <div className='flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t'>
                      <h3 className='text-3xl font-semibold'>Edit Profile</h3>
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
                    <div className='relative p-6 flex-auto'>
                      <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                          <label className='block uppercase tracking-wide  text-xs font-bold mb-2 text-blue-300 transition duration-300 ease-in-out hover:text-blue-500'>
                            First Name
                          </label>
                          <input
                            required
                            className='appearance-none block w-full  border border-blue-200  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white '
                            type='text'
                            placeholder='Jane'
                            name='firstName'
                            value={firstName}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                        <div className='w-full md:w-1/2 px-3'>
                          <label className='block uppercase tracking-wide  text-xs font-bold mb-2 text-blue-300 transition duration-300 ease-in-out hover:text-blue-500'>
                            Last Name
                          </label>
                          <input
                            required
                            className='appearance-none block w-full  border border-blue-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 '
                            type='text'
                            placeholder='Doe'
                            name='lastName'
                            value={lastName}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                      </div>
                      <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3'>
                          <label className='block uppercase tracking-wide  text-xs font-bold mb-2 text-blue-300 transition duration-300 ease-in-out hover:text-blue-500'>
                            username
                          </label>
                          <input
                            required
                            className='appearance-none block w-full  border border-blue-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 '
                            name='username'
                            value={username}
                            onChange={(e) => onChange(e)}
                            type='text'
                            placeholder='username...'
                          />
                        </div>
                      </div>
                      <div className='flex flex-wrap -mx-3 mb-2'>
                        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                          <label className='block uppercase tracking-wide  text-xs font-bold mb-2 text-blue-300 transition duration-300 ease-in-out hover:text-blue-500'>
                            Day
                          </label>
                          <div className='relative z-0'>
                            <select
                              className='block appearance-none w-full border border-blue-200  py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500  '
                              name='day'
                              value={day}
                              onChange={(e) => onChange(e)}
                            >
                              <option value='1'>1</option>
                              <option value='2'>2</option>
                              <option value='3'>3</option>
                              <option value='4'>4</option>
                              <option value='5'>5</option>
                              <option value='6'>6</option>
                              <option value='7'>7</option>
                              <option value='8'>8</option>
                              <option value='9'>9</option>
                              <option value='10'>10</option>
                              <option value='11'>11</option>
                              <option value='12'>12</option>
                              <option value='13'>13</option>
                              <option value='14'>14</option>
                              <option value='15'>15</option>
                              <option value='16'>16</option>
                              <option value='17'>17</option>
                              <option value='18'>18</option>
                              <option value='19'>19</option>
                              <option value='20'>20</option>
                              <option value='21'>21</option>
                              <option value='22'>22</option>
                              <option value='23'>23</option>
                              <option value='24'>24</option>
                              <option value='25'>25</option>
                              <option value='26'>26</option>
                              <option value='27'>27</option>
                              <option value='28'>28</option>
                              <option value='29'>29</option>
                              <option value='30'>30</option>
                              <option value='31'>31</option>
                            </select>
                            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                              <svg
                                className='fill-current h-4 w-4'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                              >
                                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-blue-300 transition duration-300 ease-in-out hover:text-blue-500'>
                            Month
                          </label>
                          <div className='relative'>
                            <select
                              className='block appearance-none w-full border border-blue-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 '
                              name='month'
                              value={month}
                              onChange={(e) => onChange(e)}
                            >
                              <option value='January'>January</option>
                              <option value='February'>February</option>
                              <option value='March'>March</option>
                              <option value='April'>April </option>
                              <option value='May'>May</option>
                              <option value='June'>June</option>
                              <option value='July'>July</option>
                              <option value='August'>August</option>
                              <option value='September'>September</option>
                              <option value='October'>October</option>
                              <option value='November'>November</option>
                              <option value='December'>December</option>
                            </select>
                            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                              <svg
                                className='fill-current h-4 w-4'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                              >
                                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-blue-300 transition duration-300 ease-in-out hover:text-blue-500'>
                            Year
                          </label>
                          <input
                            required
                            className='appearance-none block w-full  border border-blue-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-blue-500  '
                            name='year'
                            value={year}
                            onChange={(e) => onChange(e)}
                            type='number'
                            placeholder='Year...'
                            min='1'
                            max={new Date().getFullYear()}
                          />
                        </div>
                      </div>
                      <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3'>
                          <label className='block uppercase tracking-wide text-blue-300 text-xs font-bold mb-2  transition duration-300 ease-in-out hover:text-blue-500'>
                            Country
                          </label>
                          <input
                            required
                            className='appearance-none block w-full  border border-blue-200 rounded py-3 px-4 mb-3 leading-tight  focus:outline-none focus:border-blue-500'
                            name='country'
                            value={country}
                            onChange={(e) => onChange(e)}
                            type='text'
                            placeholder='Country...'
                          />
                        </div>
                      </div>
                      <div className='flex flex-wrap -mx-3 mb-6'>
                        <div className='w-full px-3'>
                          <label className='block uppercase tracking-wide text-blue-300 text-xs font-bold mb-2  transition duration-300 ease-in-out hover:text-blue-500'>
                            Interests
                          </label>
                          <input
                            required
                            className='appearance-none block w-full  border border-blue-200 rounded py-3 px-4 mb-3 leading-tight   focus:border-blue-500'
                            name='intrests'
                            value={intrests}
                            onChange={(e) => onChange(e)}
                            type='text'
                            placeholder='pets,cats,kitten'
                          />
                        </div>
                      </div>
                      <label className='block'>
                        <span className='text-blue-300 transition duration-300 ease-in-out hover:text-blue-500 font-bold text-xl mb-3 '>
                          Bio
                        </span>
                        <textarea
                          className='form-textarea mt-3 block w-full border border-blue-200 p-3 rounded focus:outline-none focus:border-blue-500 '
                          rows='2'
                          placeholder='Write about yourself'
                          name='bio'
                          value={bio}
                          onChange={(e) => onChange(e)}
                        ></textarea>
                      </label>
                    </div>
                    {/*footer*/}
                    <div className='flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b'>
                      <button
                        className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1'
                        type='button'
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <input
                        required
                        className='bg-blue-500 transition duration-300 ease-in-out hover:bg-blue-700 text-white active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'
                        type='submit'
                        value='Update Profile'
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className='opacity-25 fixed inset-0 z-30 bg-black'></div>
            </>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStatetoProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  searching: state.users.searching,
});

Profile.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  updateProfilePic: PropTypes.func,
  updateBackgroundePic: PropTypes.func,
  updateUserInfo: PropTypes.func,
  searching: PropTypes.bool,
};
export default connect(mapStatetoProps, {
  updateProfilePic,
  updateBackgroundePic,
  updateUserInfo,
})(Profile);
