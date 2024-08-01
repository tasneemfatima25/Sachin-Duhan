import React, { useState, useEffect } from 'react';
import { FaDocker } from "react-icons/fa";
import { SiApachemaven, SiNuget, SiRubygems, SiNpm } from "react-icons/si";
import { GoContainer } from "react-icons/go";
import { TbPackages } from "react-icons/tb";

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
    <div className="w-full p-8 bg-white rounded-xl text-center
     flex flex-col items-center">
    <div className="flex flex-col items-center">
      <TbPackages  className="text-[6rem] mb-1 text-blue-500" />
      <p className="text-black text-4xl font-semibold py-2">Get started with GitHub Packages</p>
      <p className="text-gray-400 text-lg">Safely publish packages, store your packages alongside your code, and share your packages privately with your team.

</p>
    </div>
  </div>
      <h1 className="text-gray-400 text-center mb-6 text-2xl">Choose a registry</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-xl hover:shadow-lg p-6 border-gray-200 border-1 border cursor-pointer">
            <div className="flex flex-row items-center">
              <div className="text-2xl mt-3 mr-2 mb-4">
                {pkg.img}
              </div>
              <h2 className="text-2xl font-semibold p-1">{pkg.title}</h2>
            </div>
            <p className="text-gray-600 text-sm text-lg">{pkg.description}</p>
            <a href={pkg.url} target="_blank" rel="noopener noreferrer" 
            className="mt-4 inline-block text-xs font-semibold bg-white border text-black py-1 px-2 rounded hover:bg-gray-100">Learn More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;

const packageData = [
  {
    img: <FaDocker className="text-blue-500"/>,
    id: 1,
    title: "Docker",
    description: "A software platform used for building applications based on containers — small and lightweight execution environments.",
    url: "https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-docker-registry"
  },
  {
    img: <SiApachemaven className="text-red-500"/>,
    id: 2,
    title: "Apache Maven",
    description: "A default package manager used for the Java programming language and the Java runtime environment.",
    url: "https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-apache-maven-registry"
  },
  {
    img: <SiNuget className="text-indigo-800"/>,
    id: 3,
    title: "NuGet",
    description: "A free and open source package manager used for the Microsoft development platforms including .NET.",
    url: "https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-nuget-registry"
  },
  {
    img: <SiRubygems className="text-red-500"/>,
    id: 4,
    title: "RubyGems",
    description: "A standard format for distributing Ruby programs and libraries used for the Ruby programming language.",
    url: "https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-rubygems-registry"
  },
  {
    img: <SiNpm className="text-red-700"/>,
    id: 5,
    title: "npm",
    description: "A package manager for JavaScript, included with Node.js. npm makes it easy for developers to share and reuse code.",
    url: "https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry"
  },
  {
    img: <GoContainer />,
    id: 6,
    title: "Containers",
    description: "A single place for your team to manage Docker images and decide who can see and access your images.",
    url: "https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry"
  }
];
