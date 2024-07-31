import React from 'react'
import PinnedRepos from './PinnedRepos'

const Overview = () => {
  return (
    <>
    <section id="overview" className="bg-white p-4 md:p-10 rounded-lg shadow-lg border border-gray-200 lg:my-10 my-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
                <span className="hover:text-blue-500 hover:underline cursor-pointer">sachin-duhan </span>
                <span className="font-semibold text-black">/ readme.md</span>
            </div>
            <img 
                src="https://raw.githubusercontent.com/sachin-duhan26/sachin-duhan26/master/header.png" 
                className="py-4 w-full md:w-auto" 
                alt="tasneem"
            />
            <hr className="my-8" />
            <PinnedRepos />
        </section>

    </>
  )
}

export default Overview
