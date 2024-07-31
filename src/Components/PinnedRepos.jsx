import React, { useState, useEffect } from 'react';

const PinnedRepos = () => {
  const [pinnedRepos, setPinnedRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      try {
        const response = await fetch('https://github.com/sachin-duhan/repos');
        if (!response.ok) {
          throw new Error('Failed to fetch pinned repositories');
        }
        const data = await response.json();
        const pinned = data.filter(repo => repo.pinned);
        setPinnedRepos(pinned);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPinnedRepos();
  }, []);

  if (loading) return <p>Loading pinned repositories...</p>;
  if (error) return <p>Loading pinned repositories..</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Pinned Repositories</h2>
      {pinnedRepos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pinnedRepos.map((repo) => (
            <div key={repo.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {repo.name}
                </a>
              </h3>
              <p className="text-gray-600">{repo.description}</p>
              <div className="mt-2 text-gray-500">
                <span className="mr-4">⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-600">There are no pinned repositories yet.</div>
      )}
    </div>
  );
};

export default PinnedRepos;
