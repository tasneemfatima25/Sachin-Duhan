import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaUserFriends, FaLinkedin } from 'react-icons/fa';

const ProfileHeader = ({ user }) => {
  const [organizations, setOrganizations] = useState([]);


  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${user.login}/orgs`);
        if (!response.ok) {
          throw new Error('Failed to fetch organizations');
        }
        const data = await response.json();
        setOrganizations(data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, [user.login]);

  return (
    <div className="bg-white text-white p-6 flex flex-col items-center">
      <img
        className="w-32 h-32 md:w-[21rem] md:h-[21rem] rounded-full border-4 border-white"
        src={user.avatar_url}
        alt={user.name}
      />
      <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
        <h1 className="text-3xl text-black font-semibold">{user.name}</h1>
        <p className="text-gray-400">{user.login}</p>
       <a href="https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2Fsachin-duhan%3Ftab%3Dachievements">
       <button className="text-black hover:bg-gray-100 rounded-lg border hover:border-gray-200 border-gray-200 border-1 py-1 my-1 w-full">
         Follow
        </button></a>
        <p className="mt-2 text-black text-lg">{user.bio}</p>
        <div className="mt-4 flex flex-col md:flex-row justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-4">
          <Link to="/followers" className="hover:text-blue-500 text-black flex items-center">
            <FaUsers className="mr-1" /> {user.followers} Followers
          </Link>
          <Link to="/following" className="hover:text-blue-500 text-black flex items-center">
            <FaUserFriends className="mr-1" /> {user.following} Following
          </Link>
        </div>
        <div className="mt-4 flex flex-row justify-start space-y-1 lg:space-x-4 space-x-2 md:space-x-4">
          <a href="https://github.com/Signzy" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:underline text-black flex items-center">
            @Signzy
          </a>
          <a href="https://github.com/eulermotor" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:underline text-black flex items-center">
            @eulermotor
          </a>
          <a href="https://github.com/cronycle" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:underline text-black flex items-center">
            @cronycle
          </a>
        </div>
        <a href="https://www.linkedin.com/in/sachin-duhan" target="_blank" rel="noopener noreferrer" className="mt-4 hover:text-blue-500 hover:underline text-black flex items-center">
          <FaLinkedin className="mr-1" /> in/sachin-duhan
        </a>
        <hr className="my-6" />
        <div className="mt-4">
          <h2 className="text-2xl font-semibold text-black mb-2 hover:text-blue-500 hover:underline cursor-pointer">Achievements</h2>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col items-center">
              <img className="w-16 h-16 rounded-md" src="https://github.githubassets.com/assets/quickdraw-default--light-8f798b35341a.png" alt="Achievement 1" />
            </div>
            <div className="flex flex-col items-center">
              <img className="w-16 h-16 rounded-md" src="https://github.githubassets.com/assets/yolo-default-be0bbff04951.png" alt="Achievement 2" />
            </div>
            <div className="flex flex-col items-center">
              <img className="w-16 h-16 rounded-md" src="https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png" alt="Achievement 3" />
            </div>
            <div className="flex flex-col items-center">
              <img className="w-16 h-16 rounded-md" src="https://github.githubassets.com/assets/starstruck-default--light-a594e2a027e0.png" alt="Achievement 4" />
            </div>
          </div>
        </div>
        <hr className="my-8" />
        <div className="lg:flex flex-col hidden mt-4">
          <h2 className="text-2xl font-semibold text-black mb-2 ">Highlights</h2>
          <a href="https://docs.github.com/developers/overview/github-developer-program">
          <h3 className="text-black hover:text-blue-500 hover:underline cursor-pointer">Developer Program Member</h3>
          </a>
          <h3 className="text-blue-700 text-sm border-blue-700 border-1 border rounded-xl text-center px-2 w-[3rem] my-1">PRO</h3>
        </div>
        <hr className="my-8 lg:flex hidden" />
        <div className="lg:flex flex-col hidden mt-4">
          <h2 className="text-2xl font-semibold text-black mb-4">Organizations</h2>
          <div className="flex flex-row gap-2">
            {organizations.map(org => (
              <a key={org.id} href={org.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center cursor-pointer">
                <img className="w-8 h-8 rounded-md outline outline-gray-300 outline-1" src={org.avatar_url} alt={org.login} />
              </a>
            ))}
          </div>
          <h3 className="text-black hover:text-blue-500 hover:underline mt-3 cursor-pointer">Block or Report</h3>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
