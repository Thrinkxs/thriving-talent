"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { PersonalJobResponse } from "@/lib/types/response-types/response-types";

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

export const recruiterJobColumns: ColumnDef<PersonalJobResponse>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "description",
    header: "Description",
  },

  {
    accessorKey: "location",
    header: "Location",
  },

  {
    accessorKey: "type",
    header: "Employment type",
  },

  {
    accessorKey: "jobType",
    header: "Availability",
    cell: ({ row }) => {
      const jobTypeStatus = row.original;
      let statusColor = ""; // Initialize an empty string for the color class

      // Set the color class based on jobTypeStatus status
      if (jobTypeStatus.type === JobTypes.FULL_TIME) {
        statusColor = "bg-green-100 text-green-700";
      } else if (jobTypeStatus.type === JobTypes.PART_TIME) {
        statusColor = "bg-indigo-100 text-indigo-700";
      } else if (jobTypeStatus.type === JobTypes.NEGOTIABLE) {
        statusColor = "bg-orange-100 text-oranger-700";
      }

      return (
        <div className={`rounded-md p-2 ${statusColor}`}>
          {jobTypeStatus.type}
        </div>
      );
    },
  },

  //   {
  //     id: "actions",
  //     cell: ({ row }) => {
  //       const candidate = row.original;
  //       /**
  //        * TODO: add functionality to delete and edit a job
  //        */
  //       return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //             <Link href={`/dashboard/recruiter/candidate/${candidate._id}`}>
  //               <DropdownMenuItem>Delete Job</DropdownMenuItem>
  //             </Link>
  //             <DropdownMenuSeparator />
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       );
  //     },
  //   },
];
