/**
 * candidate or intern detail page
 */

"use client";

import CandidateInfoCard from "@/components/Cards/CandidatesCard/CandidateInfoCard";
import CandidateOverViewCard from "@/components/Cards/CandidatesCard/CandidateOverViewCard";
import CandidateVideoCard from "@/components/Cards/CandidatesCard/CandidateVideoCard";
import { useFetchInternById } from "@/hooks/intern/intern";
import { useParams } from "next/navigation";
import React from "react";

const CandidateDetailPage = () => {
  const params = useParams();
  const candidateId = params.candidateId as string;
  const { data, isLoading } = useFetchInternById(candidateId);

  console.log("the fetched intern id", data);

  return (
    <div>
      <div className="space-y-6 lg:flex gap-6">
        <CandidateInfoCard />
        <CandidateOverViewCard />
        <CandidateVideoCard videoURL="https://dkwyrpnldnrcxphesnfl.supabase.co/storage/v1/object/public/TT/mixkit-a-young-smiling-woman-wearing-a-towel-robe-applying-skincare-51168-hd-ready.mp4" />
      </div>
    </div>
  );
};

export default CandidateDetailPage;
