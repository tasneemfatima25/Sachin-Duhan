import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import RepositoriesList from './RepositoriesList';
import { GoRepo, GoPackage } from "react-icons/go";
import { IoMdBook } from "react-icons/io";
import { VscGithubProject } from "react-icons/vsc";
import { CiStar } from "react-icons/ci";

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
            <NavLink
              to="/overview"
              className={({ isActive }) => `text-black flex items-center p-2 ${isActive ? 'border-b-2 border-orange-500' : 'hover:text-black hover:bg-gray-100 hover:rounded-full'}`}
              aria-label="Overview"
            >
              <IoMdBook className="text-xl mr-2" />
              <span className="ml-2">Overview</span>
            </NavLink>
            <NavLink
              to="/repositories"
              className={({ isActive }) => `text-black flex items-center p-2 ${isActive ? 'border-b-2 border-orange-500' : 'hover:text-black hover:bg-gray-100 hover:rounded-full'}`}
              aria-label="Repositories"
            >
              <GoRepo className="text-xl mr-2" />
              <span className="ml-2">Repositories</span>
              {repos.length > 0 && <p className="bg-gray-100 rounded-full p-1 ml-2">{repos.length}</p>}
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) => `text-black flex items-center p-2  ${isActive ? 'border-b-2 border-orange-500' : 'hover:text-black hover:bg-gray-100 hover:rounded-full'}`}
              aria-label="Projects"
            >
              <VscGithubProject className="text-xl mr-2" />
              <span className="ml-2">Projects</span>
            </NavLink>
            <NavLink
              to="/packages"
              className={({ isActive }) => `text-black flex items-center p-2  ${isActive ? 'border-b-2 border-orange-500' : 'hover:text-black hover:bg-gray-100 hover:rounded-full'}`}
              aria-label="Packages"
            >
              <GoPackage className="text-xl mr-2" />
              <span className="ml-2">Packages</span>
            </NavLink>
            <NavLink
              to="/stars"
              className={({ isActive }) => `text-black flex items-center p-2 ${isActive ? 'border-b-2 border-orange-500' : 'hover:text-black hover:bg-gray-100 hover:rounded-full'}`}
              aria-label="Stars"
            >
              <CiStar className="text-xl mr-2 text-gray-800" />
              <span className="ml-2">Stars</span>
              {stars.length > 0 && <span className="bg-gray-100 rounded-full p-1 ml-2">{stars.length}</span>}
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainPage;
