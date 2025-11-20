"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PersonalJobResponse } from "@/lib/types/response-types/response-types";
import { JobTypes } from "@/lib/types/job-types/job-types";

export const employerJobColumns: ColumnDef<PersonalJobResponse>[] = [
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
      let statusColor = "";

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
  //             <Link href={`/dashboard/employer/candidate/${candidate._id}`}>
  //               <DropdownMenuItem>Delete Job</DropdownMenuItem>
  //             </Link>
  //             <DropdownMenuSeparator />
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       );
  //     },
  //   },
];
