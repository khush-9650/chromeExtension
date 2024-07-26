import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import UserRepos from './components/UserRepos';

const apiUrl = 'https://api.github.com'; // Use environment variable for security

function App() {
  const [user, setUser] = useState('');
  const [userRepos, setUserRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [techStacks, setTechStacks] = useState([]); // State for detected tech stack
  const [repoInfo, setRepoInfo] = useState([]); // State for basic repo info (optional)

  const SearchUser = async () => {
    if (!user) return; // Prevent unnecessary API calls

    setLoading(true);
    setError(null);

    try {
      const reposResponse = await fetch(`https://api.github.com/users/${user}/repos`);
      if (!reposResponse.ok) {
        throw new Error('Network response was not ok (repos)');
      }
      const reposData = await reposResponse.json();

      const detectedTechStack = [];
      const repoInfoList = []; // Initialize repo info array (optional)
      for (const repo of reposData) {
        try {
          // Analyze files in each repo (replace with your implementation)
          const filesResponse = await fetch(`https://api.github.com/repos/${user}/${repo.name}/contents`);
          if (!filesResponse.ok) {
            continue; // Skip on error to avoid breaking the loop
          }
          const fileData = await filesResponse.json();
          fileData.forEach((file) => {
            if (file.name.endsWith('.js') || file.name.endsWith('.jsx')) {
              detectedTechStack.push('JavaScript (React possible)');
            } else if (file.name.endsWith('.html') || file.name.endsWith('.css')) {
              detectedTechStack.push('Web Development (HTML, CSS)');
            }
            // Add logic for other tech stacks
          });

          // Optional: Fetch basic repo info (e.g., description, language)
          const repoInfoResponse = await fetch(`${apiUrl}/repos/${user}/${repo.name}`);
          if (repoInfoResponse.ok) {
            const repoInfoData = await repoInfoResponse.json();
            repoInfoList.push({
              name: repo.name,
              description: repoInfoData.description || 'No description provided',
              language: repoInfoData.language || 'N/A',
            });
          }

        } catch (error) {
          console.error(`Error fetching files or info for ${repo.name}`, error);
        }
      }

      setUserRepos(reposData);
      setTechStacks(detectedTechStack.filter((item, i, arr) => arr.indexOf(item) === i)); // Remove duplicates
      setRepoInfo(repoInfoList); // Set repo info (optional)
    } catch (error) {
      setError('There was a problem fetching repositories.');
      console.error('Error fetching repositories:', error);
    } finally {
      setLoading(false);
    }
  };
console.log(userRepos);

  // useEffect(() => {
  //   SearchUser();
  //   console.log(repoInfo); // Call SearchUser on component mount
  // }, [user]);

  return (
    <div className='text-white bg-zinc-800 w-[50vw] h-[100vh] py-[2rem] px-[3rem] overflow-y-auto'>
      <SearchForm user={user} setUser={setUser} SearchUser={SearchUser} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <UserRepos
        user={user}
        userRepos={userRepos}
        techStacks={techStacks}
        repoInfo={repoInfo} // Pass repo info (optional)
      />
    </div>
  );
}

export default App;
