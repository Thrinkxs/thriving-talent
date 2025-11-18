/**
 * candidate or intern detail page
 */

"use client";

import CandidateInfoCard from "@/components/Cards/CandidatesCard/CandidateInfoCard";
import CandidateOverViewCard from "@/components/Cards/CandidatesCard/CandidateOverViewCard";
import CandidateVideoCard from "@/components/Cards/CandidatesCard/CandidateVideoCard";
import {
  IconGenderAndrogyne,
  IconPhoneFilled
} from "@tabler/icons-react";

import { useFetchInternById } from "@/hooks/intern/intern";
import { useParams } from "next/navigation";
import React from "react";
import { TbLoader2 } from "react-icons/tb";

const CandidateDetailPage = () => {
  const params = useParams();
  const candidateId = params.candidateId as string;
  const { data, isLoading } = useFetchInternById(candidateId);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center">
          <TbLoader2 className="animate-spin text-thrive-blue" />
        </div>
      ) : (
        <div className="space-y-6 lg:flex gap-6">
          <CandidateInfoCard
            image={{
              src: data?.profileImage || "https://profileimage.com",
              alt: "Candidate profile picture",
            }}
            name={data?.fullName || "No name found"}
            email={data?.email || "no email found"}
            onScheduleInterview={() =>
              console.log("Schedule interview clicked")
            }
            personalInfo={[
              {
                label: "Gender",
                value: data?.gender || "",
                icon: IconGenderAndrogyne,
              },
              // {
              //   label: "Birthday",
              //   value: "May 17 1996",
              //   icon: IconCake,
              // },
              {
                label: "Phone Number",
                value: data?.phone || "",
                icon: IconPhoneFilled,
              },
              // {
              //   label: "Address",
              //   value: "Tokyo",
              //   icon: IconMapPins,
              // },
            ]}
          />
          <CandidateOverViewCard
            resumeURL={data?.resume || "No resume found"}
          />
          <CandidateVideoCard videoURL={data?.introVideo || ""} />
        </div>
      )}
    </div>
  );
};

export default CandidateDetailPage;
