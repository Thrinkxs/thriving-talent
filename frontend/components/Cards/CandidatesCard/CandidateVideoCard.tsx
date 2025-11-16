import React from "react";

interface CandidateVideoCardProps {
  videoURL: string;
}
const CandidateVideoCard = ({ videoURL }: { videoURL: string }) => {
  return (
    <div className="w-80">
      <video controls width="320" height="315" className="rounded-lg">
        <source src={videoURL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default CandidateVideoCard;
