import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [repos, setRepos] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();

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
          {/* Repositories */}
          <div className="mb-4 md:mb-0">
            <Link
              className="font-semibold text-lg cursor-pointer hover:bg-gray-200 px-4 py-2"
              to="/repositories"
            >
              Repositories {repos.length > 0 && <span className="20"> {(repos.length)}</span>}
            </Link>
          </div>

          {/* Organizations */}
          <div className="mb-4 md:mb-0">
            <Link to="/organisations"
              className="font-semibold text-lg cursor-pointer px-4 py-2"
            
            >
              Organizations {orgs.length > 0 && <span className="ml-20">{(orgs.length)}</span>}
            </Link>
          </div>

          {/* Starred */}
          <div className="mb-4 md:mb-0">
            <Link
              className="font-semibold text-lg cursor-pointer hover:bg-gray-200 px-4 py-2"
              to="/stars"
            >
              Starred {stars.length > 0 && <span className="ml-20">{(stars.length)}</span>}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
