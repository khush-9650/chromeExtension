import React, { useState } from 'react';
import SearchForm from "./components/SearchForm";
import UserRepos from './components/UserRepos';

function App() {
  const [user, setUser] = useState("");
  const [userRepos, setUserRepos] = useState([]);
  const [techInfo, setTechInfo] = useState(null);

  async function SearchUser(e) {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.github.com/users/${user}/repos`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUserRepos(data);

      // Fetch additional information from ChatGPT API
      const chatGptResponse = await fetch('http://localhost:3000/api/getTechInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user }),
      });
      if (!chatGptResponse.ok) {
        throw new Error('ChatGPT API response was not ok');
      }
      const techData = await chatGptResponse.json();
      setTechInfo(techData);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  return (
    <div className='text-white bg-zinc-800 w-[50vw] h-[100vh] py-[2rem] px-[3rem] overflow-y-auto'>
      <SearchForm user={user} setUser={setUser} SearchUser={SearchUser} />
      <UserRepos user={user} userRepos={userRepos} />
      {techInfo && (
        <div className="tech-info">
          <h3>Tech Stack:</h3>
          <p>{techInfo.techStack}</p>
          <h3>Known Languages:</h3>
          <p>{techInfo.knownLanguages}</p>
          <h3>To Learn:</h3>
          <p>{techInfo.toLearn}</p>
        </div>
      )}
    </div>
  );
}

export default App;
  