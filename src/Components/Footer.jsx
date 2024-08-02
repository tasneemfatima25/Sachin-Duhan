import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoRepo } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { GoOrganization } from "react-icons/go";

const Footer = () => {
  const [repos, setRepos] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sachin-duhan/repos');
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    const fetchOrgs = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sachin-duhan/orgs');
        const data = await response.json();
        setOrgs(data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    const fetchStars = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sachin-duhan/starred');
        const data = await response.json();
        setStars(data);
      } catch (error) {
        console.error('Error fetching starred repositories:', error);
      }
    };

    fetchRepos();
    fetchOrgs();
    fetchStars();
  }, []);

  return (
    <footer className="bg-white text-black border border-1 border-gray-200 py-6 md:hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          <Link to="/repositories" className="mb-4 md:mb-0 w-full hover:bg-gray-100 p-2 flex items-center">
            <div className="bg-gray-700 text-white rounded-lg p-2 mr-3">
              <GoRepo size={24} />
            </div>
            <p className="font-semibold text-lg">
              Repositories {repos.length > 0 && <span className="ml-2 bg-gray-200 px-2 py-1 rounded-full">{repos.length}</span>}
            </p>
          </Link>

          <Link to="/organisations" className="mb-4 md:mb-0 w-full hover:bg-gray-100 p-2 flex items-center">
            <div className="bg-orange-500 text-white rounded-lg p-2 mr-3">
              <GoOrganization size={24} />
            </div>
            <p className="font-semibold text-lg">
              Organizations {orgs.length > 0 && <span className="ml-2 bg-gray-200 px-2 py-1 rounded-full">{orgs.length}</span>}
            </p>
          </Link>

          <Link to="/stars" className="mb-4 md:mb-0 w-full hover:bg-gray-100 p-2 flex items-center">
            <div className="bg-yellow-400 text-white rounded-lg p-2 mr-3">
              <CiStar size={24} />
            </div>
            <p className="font-semibold text-lg">
              Starred {stars.length > 0 && <span className="ml-2 bg-gray-200 rounded-full p-1">{stars.length}</span>}
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
