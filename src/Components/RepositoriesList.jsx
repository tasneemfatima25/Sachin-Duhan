import React, { useState, useEffect } from 'react';
import { CiStar } from "react-icons/ci";
import { RiGitForkLine } from "react-icons/ri";

const languageColors = {
  'JavaScript': '#f1e05a',
  'Python': '#800080',
  'Java': '#b07219',
  'JavaScript': '#00008B',
  'C++': '#f34b7d',
  'TypeScript': '#2b7489',
  'Ruby': '#00FF00',
  'HTML': '#FF0000',
  'Jupiter Notebook': '#008000',
  'PLSQL': '#008000',

};

const RepositoriesList = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sachin-duhan/repos');
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const filteredRepos = repos
    .filter(repo => 
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(repo => selectedType === '' || repo.private === (selectedType === 'private'))
    .filter(repo => selectedLanguage === '' || repo.language === selectedLanguage)
    .sort((a, b) => {
      if (selectedSort === 'Stars') {
        return b.stargazers_count - a.stargazers_count;
      } else if (selectedSort === 'Forks') {
        return b.forks_count - a.forks_count;
      } else if (selectedSort === 'Updated') {
        return new Date(b.updated_at) - new Date(a.updated_at);
      }
      return 0;
    });

  if (loading) {
    return <p>Loading repositories...</p>;
  }

  return (
    <div className="w-full h-full mx-auto p-6">
      <div className="flex flex-row gap-6 my-4">
        <input
          type="text"
          placeholder="Find a repository ..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border lg:w-1/2 w-full px-2 py-1 rounded border-gray-200 text-sm mb-0 mr-2"
        />
        <select value={selectedType} onChange={handleTypeChange} className="lg:flex hidden w-1/6 text-black bg-gray-100 rounded-lg text-sm border hover:bg-gray-200 hover:border-gray-300 border-gray-200 border-1 p-1 my-1">
          <option value="">Types</option>
          <option value="public">All</option>
          <option value="private">Sources</option>
          <option value="forks">Forks</option>
          <option value="archived">Archived</option>
          <option value="sponsored">Can be sponsored</option>
          <option value="mirrors">Mirrors</option>
          <option value="templates">Templates</option>
        </select>
        <select value={selectedLanguage} onChange={handleLanguageChange} className="hidden lg:flex w-1/6 text-black bg-gray-100 rounded-lg text-sm border hover:bg-gray-200 hover:border-gray-300 border-gray-200 border-1 p-1 my-1">
          <option value="">Languages</option>
          {Array.from(new Set(repos.map(repo => repo.language).filter(Boolean))).map(language => (
            <option key={language} value={language}>{language}</option>
          ))}
        </select>
        <select value={selectedSort} onChange={handleSortChange} className="hidden lg:flex w-1/6 text-black bg-gray-100 rounded-lg text-sm border hover:bg-gray-200 hover:border-gray-300 border-gray-200 border-1 p-1 my-1">
          <option value="">Sort</option>
          <option value="stars">Updated</option>
          <option value="forks">Forks</option>
          <option value="updated">Stars</option>
        </select>
      </div>
      <hr />
      {filteredRepos.length > 0 ? (
        filteredRepos.map((repo) => (
          <div key={repo.id} className="bg-white p-6 border-gray-200 border-b border-1 mb-4 flex flex-col">
            <h3 className="text-xl font-semibold mb-2">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {repo.name}
              </a>
            </h3>
            <p className="text-gray-600 text-lg">{repo.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {repo.topics.map((topic, index) => (
                <span key={index} className="bg-blue-100 text-blue-500 font-semibold px-2 py-1 rounded-xl text-sm">
                  {topic}
                </span>
              ))}
            </div>
            <div className="flex items-center mt-2 text-gray-500">
              <span className="flex items-center mr-4 text-sm">
                <span className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: languageColors[repo.language] || '#000' }} />
                {repo.language}
              </span>
              <span className="flex items-center mr-4 text-sm">
                <CiStar className="text-xl text-gray-800 mr-1" /> {repo.stargazers_count}
              </span>
              <span className="flex items-center text-sm mr-4">
                <RiGitForkLine className="text-xl mr-1" /> {repo.forks_count}
              </span>
            
            <div className="flex flex-col mt-auto text-gray-500 text-sm">
              <span className="text-gray-600 text-sm">
                Updated on {new Date(repo.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full p-10 shadow-sm border border-1 border-gray-300 bg-white mx-2 rounded-xl text-center">
          <p className="text-black text-xl font-semibold py-8 md:py-12 lg:py-20">sachin-duhan doesn’t have any repositories that match.</p>
        </div>
      )}
    </div>
  );
};

export default RepositoriesList;
