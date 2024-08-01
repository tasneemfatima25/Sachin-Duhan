import React, { useState, useEffect } from 'react';
import { CiStar } from "react-icons/ci";
import { RiGitForkLine } from "react-icons/ri";

const languageColors = {
  'JavaScript': '#f1e05a',
  'Python': '#800080',
  'Java': '#b07219',
  'C++': '#f34b7d',
  'TypeScript': '#2b7489',
  'Ruby': '#00FF00',
  'HTML': '#FF0000',
  'Jupyter Notebook': '#008000',
  'PLSQL': '#008000',
  // Add more languages and colors if needed
};

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

  const handleSearch = () => {
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

  useEffect(() => {
    handleSearch();
  }, [search, type, language, sort]);

  if (loading) return <p>Loading starred repositories...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full h-full mx-auto p-6">
      <div className="flex flex-row gap-6 my-4">
        <input
          type="text"
          placeholder="Search stars"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border lg:w-1/2 w-full px-2 py-1 rounded border-gray-200 text-sm mb-0 mr-2"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="lg:flex hidden w-1/6 text-black bg-gray-100 rounded-lg text-sm border hover:bg-gray-200 hover:border-gray-300 border-gray-200 border-1 p-1 my-1"
        >
          <option value="">Type</option>
          <option value="">All</option>
          <option value="User">User</option>
          <option value="Organization">Organization</option>
        </select>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="hidden lg:flex w-1/6 text-black bg-gray-100 rounded-lg text-sm border hover:bg-gray-200 hover:border-gray-300 border-gray-200 border-1 p-1 my-1"
        >
          <option value="">Language</option>
          {Array.from(new Set(stars.map(star => star.language).filter(Boolean))).map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="hidden lg:flex w-1/6 text-black bg-gray-100 rounded-lg text-sm border hover:bg-gray-200 hover:border-gray-300 border-gray-200 border-1 p-1 my-1"
        >
          <option value="">Sort by</option>
          <option value="stars">Most Stars</option>
          <option value="forks">Most Forks</option>
          <option value="updated">Recently Updated</option>
        </select>
      </div>
      <hr />
      {filteredStars.length > 0 ? (
        filteredStars.map((star) => (
          <div key={star.id} className="bg-white p-6 border-gray-200 border-b border-1 mb-4 flex flex-col">
            <h3 className="text-xl font-semibold mb-2">
              <a href={star.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {star.full_name}
              </a>
            </h3>
            <p className="text-gray-600 text-lg">{star.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {/* You can add language tags here if needed */}
            </div>
            <div className="flex items-center mt-2 text-gray-500">
              <span className="flex items-center mr-4 text-sm">
                <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: languageColors[star.language] || '#000' }} />
                {star.language || 'Not specified'}
              </span>
              <span className="flex items-center mr-4 text-sm">
                <CiStar className="text-xl text-gray-800 mr-1" /> {star.stargazers_count}
              </span>
              <span className="flex items-center text-sm mr-4">
                <RiGitForkLine className="text-xl mr-1" /> {star.forks_count}
              </span>
              <span className="flex items-center text-sm">
                Updated on {new Date(star.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full p-10 shadow-sm border border-1 border-gray-300 bg-white mx-2 rounded-xl text-center">
          <p className="text-black text-xl font-semibold py-8 md:py-12 lg:py-20">No starred repositories match your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Stars;
