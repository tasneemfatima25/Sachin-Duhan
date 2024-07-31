import React, { useEffect, useState } from 'react';

const OrganizationList = () => {
  const [orgs, setOrgs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sachin-duhan/orgs');
        if (!response.ok) {
          throw new Error('Failed to fetch organizations');
        }
        const data = await response.json();
        setOrgs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching organizations:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) return <p>Loading organizations...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Organizations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 gap-4">
        {orgs.length > 0 ? (
          orgs.map((org) => (
            <a key={org.id} href={org.url} className="border p-4 rounded-lg shadow-sm hover:shadow-xl">
              <a href={org.html_url} target="_blank" rel="noopener noreferrer">
                <img className="w-20 h-20 rounded-full mx-auto" src={org.avatar_url} alt={org.login} />
                <h2 className="mt-2 text-center font-semibold">{org.login}</h2>
                <p className="text-gray-600 text-center">{org.description}</p>
              </a>
            </a>
          ))
        ) : (
          <p>No organizations found.</p>
        )}
      </div>
    </div>
  );
};

export default OrganizationList;
