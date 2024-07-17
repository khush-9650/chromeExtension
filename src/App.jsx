import React, { useState } from 'react';
import SearchForm from "./components/SearchForm";
import UserRepos from './components/UserRepos';

function App() {
  const [user, setUser] = useState("");
  const [userRepos, setUserRepos] = useState([]);

  async function SearchUser(e) {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.github.com/users/${user}/repos`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUserRepos(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  return (
    <div className='text-white bg-zinc-800 w-[50vw] h-[100vh] py-[2rem] px-[3rem] overflow-y-auto'>
      <SearchForm user={user} setUser={setUser} SearchUser={SearchUser} />
      <UserRepos user={user} userRepos={userRepos} />
    </div>
  );
}

export default App;
