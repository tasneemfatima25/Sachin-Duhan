import React from 'react';
import { GoRepo } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { RiGitForkLine } from "react-icons/ri";


const pinnedItems = [
  {
    id: '249238297',
    name: 'COMPETITVE-PROGRAMMING',
    description: 'Competitive programming is a mind sport usually held over the Internet or a local network, involving participants trying to program according to provided specifications. This repo contains the Deta...',
    language: 'C++',
    stars: 70,
    forks: 21,
    url: '/sachin-duhan/COMPETITVE-PROGRAMMING',
  },
  {
    id: '269220607',
    name: 'DISCOUNTED_CASH_FLOW_MODEL',
    description: 'Discounted cash flow (DCF) is a valuation method used to estimate the value of an investment based on its future cash flows. DCF analysis attempts to figure out the value of an investment today, ba...',
    language: 'Python',
    stars: 8,
    forks: 3,
    url: '/sachin-duhan/DISCOUNTED_CASH_FLOW_MODEL',
  },
  {
    id: '671655629',
    name: 'cronzimus',
    description: 'Python canary manager and adhoc task scheduler',
    language: 'Python',
    stars: 0, 
    forks: 0,
    url: '/sachin-duhan/cronzimus',
  },
  {
    id: '671655629',
    name: 'go-Ifs',
    description: 'WIP | something that would not change anything about how you breath?',
    language: '',
    stars: 0, 
    forks: 0,
    url: '/sachin-duhan/go-Ifs',
  },
];

const PinnedRepos = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl mb-2 flex items-center">
        Pinned
       
      </h2>
      <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        {pinnedItems.map(item => (
          <li key={item.id} className="bg-white border rounded-md p-4 flex items-start">
            <div className="flex-1">
              <div className="flex flex-row gap-2">
              <GoRepo className="text-xl mt-1 text-gray-600"/>
              <h3 className="text-lg font-semibold">
                <a href={item.url} className="text-blue-600 hover:underline">{item.name}
                </a>
              </h3>
          <h3 className="text-gray-600 text-xs border border-1 border-gray-300
          rounded-xl font-bold text-center px-2 py-0 w-[3.5rem] my-1">Public</h3>

              </div>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              <div className="flex items-center mt-2">
                <span className="flex items-center mr-4 text-sm text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-full mr-1" 
                  style={{ backgroundColor: item.language === 'C++' ? '#f34b7d' : '#3572A5' }} />
                  {item.language}
                </span>
                {item.stars > 0 && (
                  <a href={`${item.url}/stargazers`} className="flex items-center mr-4 text-sm text-gray-500">
                    
                    <CiStar className="text-xl m-1 text-gray-800"/>{item.stars}
                  </a>
                )}
                {item.forks > 0 && (
                  <a href={`${item.url}/forks`} className="flex items-center text-sm text-gray-500">
                    
                    <RiGitForkLine className="text-xl m-1 text-gray-800"/>{item.forks}
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default PinnedRepos;
