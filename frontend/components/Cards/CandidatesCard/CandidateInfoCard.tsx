import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

interface PersonalInfo {
  label: string;
  value: string;
  icon: React.ComponentType<any>;
}

interface CandidateInfoCardProps {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  email: string;
  personalInfo: PersonalInfo[];
  onScheduleInterview?: () => void;
}

const CandidateInfoCard: React.FC<CandidateInfoCardProps> = ({
  image,
  name,
  email,
  personalInfo,
  onScheduleInterview,
}) => {
  return (
    <div className="bg-white p-6 rounded-3xl w-80">
      <div className="justify-self-center">
        <Image
          src={image.src}
          alt={image.alt}
          width={200}
          height={200}
          className="rounded-full w-20 h-20 object-cover"
        />
      </div>
      <div className="mt-4 flex justify-center">
        <h4 className="font-bold">{name}</h4>
      </div>
      <div className="mt-1 flex justify-center">
        <p className="text-gray-400 text-sm">{email}</p>
      </div>
      <div className="mt-8 flex justify-center">
        <Button
          className="bg-thrive-blue hover:bg-thrive-blue/80 text-white rounded-3xl"
          onClick={onScheduleInterview}
        >
          Schedule Interview
        </Button>
      </div>
      <hr className="mt-4 text-gray-400" />
      <div className="mt-2">
        <h5 className="font-bold">Personal Info</h5>
        {personalInfo.map((info, index) => {
          const IconComponent = info.icon;
          return (
            <div key={index} className="mt-5 flex gap-5">
              <div className="bg-thrive-badge-background rounded-md p-3 inline-flex items-center justify-center">
                <IconComponent size={20} color="black" stroke={2} />
              </div>
              <div>
                <p className="text-gray-400 text-xs font-normal">
                  {info.label}
                </p>
                <p className="font-semibold text-sm">{info.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CandidateInfoCard;
