import React, { useState, useEffect } from 'react';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sachin-duhan/packages');
        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }
        const data = await response.json();
        setPackages(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) return <p>Loading packages...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto mt-16 p-4">
      <h2 className="text-2xl font-bold mb-4">Packages</h2>
      {packages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">
                <a href={pkg.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {pkg.name}
                </a>
              </h3>
              <p className="text-gray-600">{pkg.description || 'No description available'}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p>There are not any packages yet.</p>
        </div>
      )}
    </div>
  );
};

export default Packages;
