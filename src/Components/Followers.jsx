// src/Components/Followers.jsx
import React, { useEffect, useState } from 'react';

const Followers = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowerDetails = async (followerUrl) => {
      try {
        const response = await fetch(followerUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch follower details');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching follower details:', error);
        return {};
      }
    };

    const fetchFollowers = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sachin-duhan/followers');
        if (!response.ok) {
          throw new Error('Failed to fetch followers');
        }
        const followersData = await response.json();

        // Fetch detailed information for each follower
        const followersWithDetails = await Promise.all(
          followersData.map(async (follower) => {
            const details = await fetchFollowerDetails(follower.url);
            return { ...follower, ...details };
          })
        );

        setFollowers(followersWithDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Followers</h1>
      <div className="grid grid-cols-1 gap-6">
        {followers.map((follower) => (
          <div key={follower.id} className="bg-white border border-gray-200 border-b-1 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={follower.avatar_url}
                alt={follower.login}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{follower.login}</h2>
                <p className="text-sm text-gray-500">{follower.bio}</p>
                <p className="text-xs text-gray-500">{follower.location}</p>
              </div>
            </div>
            <a href={`https://github.com/${follower.login}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Follow
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Followers;
