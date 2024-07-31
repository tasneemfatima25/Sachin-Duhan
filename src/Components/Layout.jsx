import React,{useEffect, useState} from 'react';
import MainPage from './MainPage'; 
import ProfileHeader from './ProfileHeader'; 
import MainContent from './MainContent'; 
import Footer from './Footer'
import { Outlet } from 'react-router-dom';



const Layout = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
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
    <div className="flex flex-col min-h-screen">
    {/* Navbar */}
    <MainPage />

    {/* Layout Container */}
    <div className="flex flex-col lg:flex-row flex-1 lg:mt-12 mt-8">
        {/* ProfileHeader */}
        <div className="w-full lg:w-1/3 bg-white p-4 border-b md:border-b-0 md:border-r-0">
            {loading ? <p>Loading...</p> : user && <ProfileHeader user={user} />}
        </div>

        {/* MainContent */}
        <div className="flex-1 bg-white p-4">
        </div>
        
    </div>

        {/* Footer small screen */}
       <div className="lg:hidden flex min-h-screen flex-col">
      <Footer />
    </div>
</div>
  );
};

export default Layout;
