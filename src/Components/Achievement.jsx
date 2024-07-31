import React, { useState } from 'react';

const achievements = [
  {
    title: "Quickdraw",
    image: "https://github.githubassets.com/assets/quickdraw-default--light-8f798b35341a.png",
    description: "Gitty up!.",
  },
  {
    title: "YOLO",
    image: "https://github.githubassets.com/assets/yolo-default-be0bbff04951.png",
    description: "You want it? You merge it.",
  },
  {
    title: "Pull Shark",
    image: "https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png",
    description: "@sachin-duhan opened pull requests that have been merged.",
  },
  {
    title: "Starstruck",
    image: "https://github.githubassets.com/assets/starstruck-default--light-a594e2a027e0.png",
    description: "@sachin-duhan created a repository that has many stars.",
  },
];

const Achievements = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const openModal = (achievement) => {
    setSelectedAchievement(achievement);
  };

  const closeModal = () => {
    setSelectedAchievement(null);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer mt-6">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="flex flex-col py-10 items-center rounded-xl hover:shadow-xl border border-gray-200"
            onClick={() => openModal(achievement)}
          >
            <img
              className="w-32 h-32 rounded-md mb-2"
              src={achievement.image}
              alt={achievement.title}
            />
            <h3 className="text-xl font-semibold">{achievement.title}</h3>
          </div>
        ))}
      </div>

      {selectedAchievement && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/4">
            <div className="flex flex-col items-center">
              <img
                className="w-24 h-24 rounded-md mb-2"
                src={selectedAchievement.image}
                alt={selectedAchievement.title}
              />
              <h3 className="text-2xl font-semibold">{selectedAchievement.title}</h3>
              <p className="text-gray-600 mt-2">{selectedAchievement.description}</p>
              <button
                className="mt-4 px-4 text-black text-md bg-gray-100 hover:bg-gray-200 rounded-lg border
         hover:border-gray-300 border-gray-200 border-1 py-1 px-4 "
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;
