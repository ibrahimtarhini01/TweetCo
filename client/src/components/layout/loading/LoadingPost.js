import React, { Fragment } from 'react';

const LoadingPost = () => {
  return (
    <Fragment>
      <div
        className='border-b border-gray-300  pb-16  pt-5 px-5  w-full mx-auto'
        style={{ height: '250px' }}
      >
        <div className='animate-pulse flex space-x-4'>
          <div className='rounded-full bg-gray-400 h-12 w-12'></div>
          <div className='flex-1 space-y-4 py-1'>
            <div className='h-4 bg-gray-400 rounded w-3/4'></div>
            <div className='space-y-2'>
              <div className='h-4 bg-gray-400 rounded w-3/5'></div>
              <div className='h-4 bg-gray-400 rounded w-4/5'></div>
              <div className='h-4 bg-gray-400 rounded w-3/4'></div>
              <div className='h-4 bg-gray-400 rounded w-3/6'></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className='border-b border-gray-300  pb-16  pt-5 px-5 w-full mx-auto'
        style={{ height: '250px' }}
      >
        <div className='animate-pulse flex space-x-4'>
          <div className='rounded-full bg-gray-400 h-12 w-12'></div>
          <div className='flex-1 space-y-4 py-1'>
            <div className='h-4 bg-gray-400 rounded w-3/4'></div>
            <div className='space-y-2'>
              <div className='h-4 bg-gray-400 rounded w-3/5'></div>
              <div className='h-4 bg-gray-400 rounded w-4/5'></div>
              <div className='h-4 bg-gray-400 rounded w-3/4'></div>
              <div className='h-4 bg-gray-400 rounded w-3/6'></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className='border-b border-gray-300  pb-16 pt-5 px-5 w-full mx-auto'
        style={{ height: '250px' }}
      >
        <div className='animate-pulse flex space-x-4'>
          <div className='rounded-full bg-gray-400 h-12 w-12'></div>
          <div className='flex-1 space-y-4 py-1'>
            <div className='h-4 bg-gray-400 rounded w-3/4'></div>
            <div className='space-y-2'>
              <div className='h-4 bg-gray-400 rounded w-3/5'></div>
              <div className='h-4 bg-gray-400 rounded w-4/5'></div>
              <div className='h-4 bg-gray-400 rounded w-3/4'></div>
              <div className='h-4 bg-gray-400 rounded w-3/6'></div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoadingPost;
