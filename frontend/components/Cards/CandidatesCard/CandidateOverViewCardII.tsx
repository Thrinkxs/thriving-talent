import React from "react";

interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  responsibilities: string[];
}

interface CandidateOverViewCardProps {
  overview: string;
  experience: ExperienceItem[];
}

const CandidateOverViewCardII: React.FC<CandidateOverViewCardProps> = ({
  overview,
  experience,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 flex-shrink w-80 md:w-[500px]">
      <h2 className="text-2xl font-semibold">Overview</h2>
      <div className="mt-5">
        <p className="text-sm text-gray-600">{overview}</p>
      </div>
      <hr className="mt-5 text-gray-500" />
      <div className="mt-5">
        <h2 className="text-2xl font-semibold">Experience</h2>
        {experience.map((exp, index) => (
          <div key={index}>
            <h2 className="font-medium mt-4">{exp.company}</h2>
            <div className="flex gap-10 mt-4 text-gray-600 text-sm">
              <p>{exp.position}</p>
              <p>{exp.period}</p>
            </div>
            <div className="mt-5">
              <ul className="list-decimal list-outside ml-5 space-y-2">
                {exp.responsibilities.map((responsibility, respIndex) => (
                  <li key={respIndex} className="text-gray-600 text-sm">
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateOverViewCardII;
