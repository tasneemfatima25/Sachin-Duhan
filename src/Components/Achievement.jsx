import React from 'react';

const achievements = [
  {
    title: "Achievement 1",
    image: "https://github.githubassets.com/assets/quickdraw-default--light-8f798b35341a.png",
    description: "Description of Achievement 1",
  },
  {
    title: "Achievement 2",
    image: "https://github.githubassets.com/assets/yolo-default-be0bbff04951.png",
    description: "Description of Achievement 2",
  },
  {
    title: "Achievement 3",
    image: "https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png",
    description: "Description of Achievement 3",
  },
  {
    title: "Achievement 4",
    image: "https://github.githubassets.com/assets/starstruck-default--light-a594e2a027e0.png",
    description: "Description of Achievement 4",
  },
];

const Achievements = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 hover:shadow-lg">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              className="w-16 h-16 rounded-md mb-2"
              src={achievement.image}
              alt={achievement.title}
            />
            <h3 className="text-lg font-semibold">{achievement.title}</h3>
            <p className="text-sm text-gray-500">{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
