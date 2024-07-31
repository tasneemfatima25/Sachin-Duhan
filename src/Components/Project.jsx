import React, { useState, useEffect } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sachin-duhan/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full h-full mx-auto mt-16 p-4">
    {projects.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {project.name}
              </a>
            </h3>
            <p className="text-gray-600">{project.body || 'No description available'}</p>
          </div>
        ))}
      </div>
    ) : (
      <div className="w-full p-10 shadow-sm border border-1 border-gray-300 
      bg-white mx-2 rounded-xl text-center">
        <p className="text-black text-xl font-semibold py-8 md:py-12 lg:py-20">There aren't any projects yet</p>
      </div>
    )}
  </div>
  );
};

export default Projects;
