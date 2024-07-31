import React from 'react'
import Overview from './Overview';
import RepositoriesList from './RepositoriesList';
import Project from './Project';
import Packages from './Packages';
import Stars from './Stars';
import { Outlet } from 'react-router-dom';





const MainContent = () => {
  return (
    <>
     <Outlet />
    </>
  )
}

export default MainContent
