import React, { useEffect, useState } from 'react';

const Following = () => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async (userUrl) => {
      try {
        const response = await fetch(userUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching user details:', error);
        return {};
      }
    };

    const fetchFollowing = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sachin-duhan/following');
        if (!response.ok) {
          throw new Error('Failed to fetch following');
        }
        const followingData = await response.json();

        const followingWithDetails = await Promise.all(
          followingData.map(async (user) => {
            const details = await fetchUserDetails(user.url);
            return { ...user, ...details };
          })
        );

        setFollowing(followingWithDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Following</h1>
      <div className="grid grid-cols-1 gap-6">
        {following.map((user) => (
          <div key={user.id} className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{user.login}</h2>
                <p className="text-sm text-gray-500">Bio: {user.bio}</p>
                <p className="text-sm text-gray-500">Location: {user.location}</p>
              </div>
            </div>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer" 
            className="text-black text-sm bg-gray-100 hover:bg-gray-200 rounded-lg border hover:border-gray-300 border-gray-200 border-1 py-1 px-4">
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Following;
