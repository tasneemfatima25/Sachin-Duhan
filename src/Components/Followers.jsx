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
      <div className="grid grid-cols-1 gap-6">
        {followers.map((follower) => (
          <div 
            key={follower.id} 
            className="bg-white border-b border-gray-200 shadow-sm p-4 flex flex-col lg:flex-row items-center lg:items-start justify-between"
          >
            <div className="flex flex-col lg:flex-row items-center w-full lg:w-auto">
              <img
                src={follower.avatar_url}
                alt={follower.login}
                className="w-16 h-16 rounded-full mb-4 lg:mb-0 lg:mr-4"
              />
              <div className="text-center lg:text-left mb-4 lg:mb-0">
                <h2 className="text-xl font-semibold">{follower.login}</h2>
                <p className="text-sm text-gray-500">{follower.bio}</p>
                <p className="text-xs text-gray-500">{follower.location}</p>
              </div>
            </div>
            <a 
              href={`https://github.com/${follower.login}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-black text-sm bg-gray-100 hover:bg-gray-200 rounded-lg border hover:border-gray-300 border-gray-200 border-1 py-1 px-4 mt-4 lg:mt-0"
            >
              Follow
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Followers;
