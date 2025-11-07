import { Briefcase, Clock, MoreVertical, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface JobCardProps {
  job: any;
  onSelect: () => void;
  variant?: "list" | "grid";
}

export default function JobCard({
  job,
  onSelect,
  variant = "list",
}: JobCardProps) {
  return (
    <Card
      className="bg-white border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={onSelect}
    >
      <CardContent className="p-6">
        {variant === "list" ? (
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-red-600 font-bold text-sm">{job.logo}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {job.company}
                  </h3>
                  <p className="text-sm text-gray-600">{job.title}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Save Job</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  {job.type}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {job.applied} Applied
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {job.daysLeft} days left
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {job.description}
              </p>

              <Button className="w-full bg-black hover:bg-gray-900 text-white">
                Apply
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 font-bold text-xs">
                  {job.logo}
                </span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Save Job</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem>Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {job.company}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{job.title}</p>

            <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                {job.type}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {job.applied}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {job.daysLeft}d
              </div>
            </div>

            <p className="text-xs text-gray-600 mb-4 line-clamp-3">
              {job.description}
            </p>
            <Button className="w-full bg-black hover:bg-gray-900 text-white">
              Apply
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
