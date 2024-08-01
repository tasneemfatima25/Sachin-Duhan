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
          <Link to="/repositories" className="mb-4 md:mb-0 w-full hover:bg-gray-100 p-2">
            <p
              className="font-semibold text-lg cursor-pointer px-4 py-2"
              
            >
              Repositories {repos.length > 0 && <span className="ml-2 bg-gray-200 p-1 rounded-full"> {(repos.length)}</span>}
            </p>
          </Link>

          {/* Organizations */}
          <Link to="/organisations" className="mb-4 md:mb-0 w-full hover:bg-gray-100 p-2">
            <p 
              className="font-semibold text-lg cursor-pointer px-4 py-2"
            
            >
              Organizations {orgs.length > 0 && <span className="ml-2 bg-gray-200 px-2 py-1 rounded-full">{(orgs.length)}</span>}
            </p>
          </Link>

          {/* Starred */}
          <Link to="/stars" className="mb-4 md:mb-0 w-full hover:bg-gray-100 p-2">
            <p
              className="font-semibold text-lg cursor-pointer px-4 py-2"
              
            >
              Starred {stars.length > 0 && <span className="ml-2 bg-gray-200 rounded-full p-1">{(stars.length)}</span>}
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
