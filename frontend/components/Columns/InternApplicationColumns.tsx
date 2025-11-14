"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { InternApplicationResponse } from "@/lib/types/response-types/response-types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { ApplicationTypes } from "@/lib/types/application-types/application-types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const internApplicationColumns: ColumnDef<InternApplicationResponse>[] =
  [
    {
      accessorKey: "companyName",
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
      accessorKey: "appliedAt",
      header: "Applied On",
      cell: ({ row }) => {
        const appliedAt = row.getValue("appliedAt") as string;
        const formattedDate = new Date(appliedAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        return <div>{formattedDate}</div>;
      },
    },

    {
      accessorKey: "companyEmail",
      header: "Email",
    },

    {
      accessorKey: "jobLocation",
      header: "Location",
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const applicationTypeStatus = row.original;
        let statusColor = ""; // Initialize an empty string for the color class

        // Set the color class based on applicationTypeStatus status
        if (applicationTypeStatus.status === ApplicationTypes.HIRED) {
          statusColor = "bg-green-100 text-green-700";
        } else if (applicationTypeStatus.status === ApplicationTypes.ACCEPTED) {
          statusColor = "bg-indigo-100 text-indigo-700";
        } else if (applicationTypeStatus.status === ApplicationTypes.PENDING) {
          statusColor = "bg-orange-100 text-orange-700";
        } else if (applicationTypeStatus.status === ApplicationTypes.REJECTED) {
          statusColor = "bg-red-100 text-red-700";
        } else if (
          applicationTypeStatus.status === ApplicationTypes.INTERVIEW
        ) {
          statusColor = "bg-purple-100 text-purple-700";
        }

        return (
          <div className={`rounded-md p-2 ${statusColor}`}>
            {applicationTypeStatus.status}
          </div>
        );
      },
    },
  ];
