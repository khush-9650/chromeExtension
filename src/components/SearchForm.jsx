import React from 'react';

function SearchForm({ user, setUser, SearchUser }) {
  return (
    <form
      className="flex text-black w-[80%] h-[6.5%] justify-between py-1 px-2 rounded-md bg-white m-auto border-3 border-red-500"
      onSubmit={SearchUser}
    >
      <input
        type="text"
        className="h-full outline-none text-xl font-medium py-2 px-4 w-[85%]"
        placeholder="Enter GitHub sername"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />
      <button
        className="font-semibold bg-blue-900 px-9 py-1 text-white rounded-md"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
