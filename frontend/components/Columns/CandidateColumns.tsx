"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { EmployerApplicantResponse } from "@/lib/types/response-types/response-types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JobTypes } from "@/lib/types/job-types/job-types";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const candidateColumns: ColumnDef<EmployerApplicantResponse>[] = [
  {
    accessorKey: "applicantName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "jobTitle",
    header: "Position",
  },

  {
    accessorKey: "applicantPhone",
    header: "Phone Number",
  },

  {
    accessorKey: "applicantEmail",
    header: "Email",
  },

  {
    accessorKey: "jobLocation",
    header: "Location",
  },

  {
    accessorKey: "jobType",
    header: "Availability",
    cell: ({ row }) => {
      const jobTypeStatus = row.original;
      let statusColor = ""; // Initialize an empty string for the color class

      // Set the color class based on jobTypeStatus status
      if (jobTypeStatus.jobType === JobTypes.FULL_TIME) {
        statusColor = "bg-green-100 text-green-700";
      } else if (jobTypeStatus.jobType === JobTypes.PART_TIME) {
        statusColor = "bg-indigo-100 text-indigo-700";
      } else if (jobTypeStatus.jobType === JobTypes.NEGOTIABLE) {
        statusColor = "bg-orange-100 text-oranger-700";
      }

      return (
        <div className={`rounded-md p-2 ${statusColor}`}>
          {jobTypeStatus.jobType}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const candidate = row.original;
      /**
       * TODO: make it such that they will go to the applicant detail page
       */
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link
              href={`/dashboard/recruiter/candidate/${candidate.applicantId}`}
            >
              <DropdownMenuItem>View Applicant Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
