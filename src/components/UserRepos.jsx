import React from 'react';
import UserRepo from "./UserRepo";

function UserRepos({ user, userRepos, techStack, repoInfo }) {
  const learningResources = {
    'JavaScript (React possible)': [
      'https://reactjs.org/',
      'https://www.freecodecamp.org/learn/front-end-development-libraries/react/',
    ],
  }
  return (
    <div className='w-full  bg-zinc-500 mt-10 p-[1.5rem] rounded-xl flex flex-col items-center'>
      {user && <h1 className='text-4xl font-bold text-zinc-200'>{user}'s Repos</h1>}
      <div className="text-white mt-5 bg-black w-full p-4 rounded-md">
        {userRepos && userRepos.length > 0 ? (
          userRepos.map(repo => (
            <UserRepo key={repo.id} {...repo} />
          ))
        ) : (
          <p>No repositories found</p>
        )}
      </div>
    </div>
  );
}

export default UserRepos;
