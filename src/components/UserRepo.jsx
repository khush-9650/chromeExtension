import React from 'react';

function UserRepo({ name, html_url, description }) {
  return (
    <div className='mb-4 p-4 bg-zinc-700 rounded-md w-full'>
      <a href={html_url} target="_blank" rel="noopener noreferrer" className='text-xl font-bold text-blue-400'>
        {name}
      </a>
      <p className='text-zinc-300 mt-2'>{description}</p>
    </div>
  );
}

export default UserRepo;
