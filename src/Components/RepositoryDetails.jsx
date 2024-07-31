import React, { useState, useEffect } from 'react';

const RepositoryDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sachin-duhan');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading user profile...</p>;
  }

  return (
    user && (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <img className="w-32 h-32 rounded-full" src={user.avatar_url} alt={user.name} />
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-gray-600">@{user.login}</p>
        <p className="mt-2 text-gray-700">{user.bio}</p>
      </div>
    )
  );
};

export default RepositoryDetails;
