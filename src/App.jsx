import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './Components/MainPage';
import Overview from './Components/Overview';
import RepositoriesList from './Components/RepositoriesList';
import Project from './Components/Project';
import Packages from './Components/Packages';
import Stars from './Components/Stars';
import Layout from './Components/Layout';
import OrganisationList from './Components/OrganisationList';
import Followers from './Components/Followers';
import Following from './Components/Following';



const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="repositories" element={<RepositoriesList />} />
          <Route path="projects" element={<Project />} />
          <Route path="packages" element={<Packages />} />
          <Route path="stars" element={<Stars />} />
          <Route path="organizations" element={< OrganisationList />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/following" element={<Following />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
