import React, { useState, useEffect } from 'react';

const Stars = () => {
  const [stars, setStars] = useState([]);
  const [filteredStars, setFilteredStars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [sort, setSort] = useState('');
  const [language, setLanguage] = useState('');

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sachin-duhan/starred');
        if (!response.ok) {
          throw new Error('Failed to fetch starred repositories');
        }
        const data = await response.json();
        setStars(data);
        setFilteredStars(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStars();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let filtered = stars;

    if (search) {
      filtered = filtered.filter((star) =>
        star.full_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type) {
      filtered = filtered.filter((star) => star.owner.type === type);
    }

    if (language) {
      filtered = filtered.filter((star) => star.language === language);
    }

    if (sort) {
      filtered.sort((a, b) => {
        if (sort === 'stars') {
          return b.stargazers_count - a.stargazers_count;
        } else if (sort === 'forks') {
          return b.forks_count - a.forks_count;
        } else if (sort === 'updated') {
          return new Date(b.updated_at) - new Date(a.updated_at);
        } else {
          return 0;
        }
      });
    }

    setFilteredStars(filtered);
  };

  if (loading) return <p>Loading starred repositories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto mt-2 p-4">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="Search stars"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border w-1/2 w-1/2 px-2 py-1 rounded border-gray-200 text-sm mb-0 mr-2"
        />
        <button type="submit" className="text-black text-sm bg-gray-100 hover:bg-gray-200 rounded-lg border hover:border-gray-300 border-gray-200 border-1 py-1 px-4 my-1">Search</button>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="text-black bg-gray-100 lg:flex hidden text-sm rounded-lg border hover:bg-gray-200 hover:border-gray-300 border-gray-200 border-1 py-1 my-1"
        >
          <option value="">Type</option>
          <option value="">All</option>
          <option value="User">Sources</option>
          <option value="Organization">Forks</option>
          <option value="Organization">Can be Sponsored</option>
          <option value="Organization">Mirrors</option>
          <option value="Organization">Templates</option>
        </select>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="text-black bg-gray-100 rounded-lg lg:flex hidden text-sm border hover:bg-gray-200 hover:border-gray-300 border-gray-200 border-1 py-1 my-1"
        >
          <option value="">Language</option>
          <option value="C">C</option>
          <option value="C#">C#</option>
          <option value="C++">C++</option>
          <option value="Dockerfile">Dockerfile</option>
          <option value="HTML">HTML</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Jupyter Notebook">Jupyter Notebook</option>
          <option value="Lua">Lua</option>
          <option value="Makefile">Makefile</option>
          <option value="PHP">PHP</option>
          <option value="Python">Python</option>
          <option value="Ruby">Ruby</option>
          <option value="Shell">Shell</option>
          <option value="TypeScript">TypeScript</option>
          <option value="Zig">Zig</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-black bg-gray-100 text-sm lg:flex hidden rounded-lg border hover:bg-gray-200 hover:border-gray-300 border-gray-200 border-1 py-1 my-1"
        >
          <option value="">Sort by</option>
          <option value="">Recently Starred</option>
          <option value="stars">Most Stars</option>
          <option value="forks">Most Forks</option>
          <option value="updated">Recently Updated</option>
        </select>
      </form>
      <hr className="mt-6"/>
      {filteredStars.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredStars.map((star) => (
            <div key={star.id} className="bg-white p-6 border-gray-200 border-b border-1">
              <h3 className="text-xl font-semibold mb-2">
                <a href={star.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {star.full_name}
                </a>
              </h3>
              <p className="text-gray-600 text-lg">{star.description}</p>
              <div className="mt-2 text-gray-500">
                <span className="mr-4">{star.language}</span>
                <span className="mr-4">⭐ {star.stargazers_count}</span>
                <span className="mr-4">🍴 {star.forks_count}</span>
                <span className="mr-4">updated on {new Date(star.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p>There are no starred repositories matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Stars;
