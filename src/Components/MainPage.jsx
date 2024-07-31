import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RepositoriesList from './RepositoriesList';

const MainPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sachin-duhan/repos');
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch('https://api.github.com/users/sachin-duhan/starred');
        const data = await response.json();
        setStars(data);
      } catch (error) {
        console.error('Error fetching starred repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStars();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch('https://api.github.com/users/sachin-duhan');
        if (!userResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white border-b-2 border-gray-200 z-50">
        <div className="flex items-center justify-center p-6 lg:p-2">
          <div className="lg:flex hidden flex-row items-center justify-center space-x-12">
            <Link to="/overview" className="text-black hover:text-black hover:bg-gray-100 p-2 rounded-full flex items-center" aria-label="Overview">
              Overview
            </Link>
            <Link to="/repositories" className="text-black py-2 hover:text-black hover:bg-gray-100 p-2 rounded-full flex items-center" aria-label="Repositories">
              Repositories 
              {repos.length > 0 && <p className="bg-gray-100 rounded-full p-1">{repos.length}</p>}
            </Link>
            <Link to="/projects" className="text-black hover:text-black hover:bg-gray-100 p-2 rounded-full flex items-center" aria-label="Projects">
              Projects
            </Link>
            <Link to="/packages" className="text-black hover:text-black hover:bg-gray-100 p-2 rounded-full flex items-center" aria-label="Packages">
              Packages
            </Link>
            <Link to="/stars" className="text-black hover:text-black hover:bg-gray-100 p-2 rounded-full flex items-center" aria-label="Stars">
              Stars {stars.length > 0 && <span className="bg-gray-100 rounded-full p-1">{stars.length}</span>}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainPage;
