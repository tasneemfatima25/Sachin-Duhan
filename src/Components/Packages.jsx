import React, { useState, useEffect } from 'react';

const Packages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPackages(packageData);
      } catch (error) {
        console.error('Failed to fetch packages:', error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-xl hover:shadow-lg p-6 border-gray-200 boder-1 border cursor-pointer">
            <h2 className="text-2xl font-semibold p-1">{pkg.title}</h2>
            <p className="text-gray-700 text-lg ">{pkg.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;

const packageData = [
  {
    id: 1,
    title: "Docker",
    description: "A software platform used for building applications based on containers — small and lightweight execution environments."
  },
  {
    id: 2,
    title: "Apache Maven",
    description: "A default package manager used for the Java programming language and the Java runtime environment."
  },
  {
    id: 3,
    title: "NuGet",
    description: "A free and open source package manager used for the Microsoft development platforms including .NET."
  },
  {
    id: 4,
    title: "RubyGems",
    description: "A standard format for distributing Ruby programs and libraries used for the Ruby programming language."
  },
  {
    id: 5,
    title: "npm",
    description: "A package manager for JavaScript, included with Node.js. npm makes it easy for developers to share and reuse code."
  },
  {
    id: 6,
    title: "Containers",
    description: "A single place for your team to manage Docker images and decide who can see and access your images."
  }
];
