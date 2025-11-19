"use client";

import React from "react";
import { MapPin, Mail, Phone, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ThriveTalentDefaultImage from "@/public/default-image/TT_default_Image_2.jpg";
import Image from "next/image";
import Link from "next/link";

export interface Candidate {
  _id: string;
  fullName: string;
  email: string;
  bio: string;
  isVerified: boolean;
  phone: string;
  address?: string;
  status: string;
  gender: string;
  profileImage: string;
  introVideo: string;
  resume: string;
}

interface CandidateCardProps {
  candidate: Candidate;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Image
            width={100}
            height={100}
            src={candidate.profileImage || ThriveTalentDefaultImage}
            alt={candidate.fullName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {candidate.fullName}
              </h3>
              {candidate.isVerified && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Verified
                </Badge>
              )}
            </div>
            <Badge
              variant="outline"
              className={`mt-1 ${
                candidate.status === "active"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              {candidate.status}
            </Badge>
          </div>
        </div>
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200"
        >
          {candidate.gender}
        </Badge>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{candidate.bio}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <Mail className="h-4 w-4 mr-2" />
          {candidate.email}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Phone className="h-4 w-4 mr-2" />
          {candidate.phone}
        </div>
        {candidate.address && (
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            {candidate.address}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center space-x-2">
          {candidate.introVideo && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={candidate.introVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Video className="h-4 w-4 mr-1" />
                Intro Video
              </a>
            </Button>
          )}
          {candidate.resume && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={candidate.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </Button>
          )}
        </div>
        <Link href={`/dashboard/recruiter/candidate/${candidate._id}`}>
          <Button size="sm">View Profile</Button>
        </Link>
      </div>
    </div>
  );
};
