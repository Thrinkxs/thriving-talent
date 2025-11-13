import React from "react";
import { FaFilePdf } from "react-icons/fa";

interface CandidateOverViewCardProps {
  resumeURL: string;
}

const CandidateOverViewCard: React.FC<CandidateOverViewCardProps> = ({
  resumeURL,
}) => {
  const hasResume = resumeURL && resumeURL.startsWith("http");

  return (
    <div className="bg-white rounded-3xl p-6 flex-shrink w-80 md:w-[500px]">
      <h2 className="text-2xl font-semibold">Resume</h2>
      <div className="mt-5">
        {hasResume ? (
          <a
            href={resumeURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-thrive-blue hover:underline hover:text-thrive-blue/80 font-medium"
          >
            <FaFilePdf className="text-red-500" />
            <span>View Candidate Resume</span>
          </a>
        ) : (
          <p className="text-sm text-gray-600 italic">No resume uploaded</p>
        )}
      </div>
    </div>
  );
};

export default CandidateOverViewCard;
