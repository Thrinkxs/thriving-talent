"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  SlidersHorizontal,
  Briefcase,
  Users,
  Clock,
  MoreVertical,
  Grid3x3,
  List,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { FAKE_JOBS } from "../../utils/data";

export default function JobsOverview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<null | (typeof FAKE_JOBS)[0]>(
    null
  );
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [expandDescription, setExpandDescription] = useState(false);

  // Filter states
  const [jobType, setJobType] = useState("all");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");

  const filteredJobs = useMemo(() => {
    let filtered = FAKE_JOBS;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Job type filter
    if (jobType !== "all") {
      filtered = filtered.filter((job) => job.type === jobType);
    }

    // Category filter
    if (category !== "all") {
      filtered = filtered.filter((job) => job.category === category);
    }

    // Location filter
    if (location !== "all") {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "newest") {
      filtered = [...filtered].sort((a, b) => a.daysLeft - b.daysLeft);
    } else if (sortBy === "popular") {
      filtered = [...filtered].sort((a, b) => b.applied - a.applied);
    }

    return filtered;
  }, [searchQuery, jobType, category, location, sortBy]);

  const handleJobClick = (job: (typeof FAKE_JOBS)[0]) => {
    setSelectedJob(job);
    // Only show sheet on mobile/tablet, not on desktop
    if (window.innerWidth < 1024) {
      setShowDetails(true);
    }
    setExpandDescription(false);
  };

  return (
    <div className="space-y-6">
      {/* <div>
        <h1 className="text-2xl font-bold text-gray-900">Find Work</h1>
      </div> */}

      {/* Header with tabs and controls */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by job title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-gray-200"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 px-4"
              onClick={() => setShowFilters(true)}
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Jobs for you</span>
              <span className="text-red-600 font-semibold capitalize">
                {sortBy}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500"
                  }`}
                >
                  <Grid3x3 className="h-4 w-4" />
                </button>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 bg-black text-white border-0 h-10 rounded-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="closing">Closing Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Jobs List */}
        <div className="lg:col-span-2 space-y-4">
          {viewMode === "list" ? (
            // List View
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="bg-white border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleJobClick(job)}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-red-600 font-bold text-sm">
                          {job.logo}
                        </span>
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
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
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
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Grid View
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className="bg-white border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleJobClick(job)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-red-600 font-bold text-xs">
                          {job.logo}
                        </span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
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
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredJobs.length === 0 && (
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <p className="text-gray-500">
                  No jobs found matching your criteria
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Job Details Sidebar - Desktop */}
        {selectedJob && (
          <div className="hidden lg:block">
            <Card className="bg-white border-0 shadow-sm sticky top-6">
              <CardContent className="p-6">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-red-600 font-bold text-lg">
                      {selectedJob.logo}
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  {selectedJob.title}
                </h2>
                <p className="text-sm text-gray-600 mb-6 text-center flex items-center justify-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedJob.location}
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      Minimum Qualification
                    </h3>
                    <ul className="space-y-3">
                      {selectedJob.qualifications.map((qual, idx) => (
                        <li
                          key={idx}
                          className="flex gap-2 text-sm text-gray-600"
                        >
                          <span className="text-black mt-1">•</span>
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      About the Job
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {expandDescription
                        ? selectedJob.fullDescription +
                          " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque atque, praesentium quam iure magnam quas enim."
                        : selectedJob.fullDescription}
                    </p>
                    <button
                      onClick={() => setExpandDescription(!expandDescription)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                      {expandDescription ? "Show less" : "Read more"}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandDescription ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <Button className="w-full bg-black hover:bg-gray-900 text-white mt-6">
                  Apply
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Job Details Sheet - Mobile */}
      {selectedJob && (
        <Sheet open={showDetails} onOpenChange={setShowDetails}>
          <SheetContent
            side="right"
            className="w-full sm:max-w-md overflow-y-auto"
          >
            <SheetHeader>
              <SheetTitle className="sr-only">Job Details</SheetTitle>
            </SheetHeader>

            <div className="p-6">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 font-bold text-lg">
                    {selectedJob.logo}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                {selectedJob.title}
              </h2>
              <p className="text-sm text-gray-600 mb-6 text-center flex items-center justify-center gap-1">
                <MapPin className="h-4 w-4" />
                {selectedJob.location}
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Minimum Qualification
                  </h3>
                  <ul className="space-y-3">
                    {selectedJob.qualifications.map((qual, idx) => (
                      <li
                        key={idx}
                        className="flex gap-2 text-sm text-gray-600"
                      >
                        <span className="text-black mt-1">•</span>
                        <span>{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    About the Job
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {expandDescription
                      ? selectedJob.fullDescription +
                        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque atque, praesentium quam iure magnam quas enim."
                      : selectedJob.fullDescription}
                  </p>
                  <button
                    onClick={() => setExpandDescription(!expandDescription)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    {expandDescription ? "Show less" : "Read more"}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        expandDescription ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              <Button className="w-full bg-black hover:bg-gray-900 text-white mt-6">
                Apply
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Filters Sheet */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="right" className="w-[70%] sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>

          <div className="p-6 space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-900 mb-2 block">
                Job Type
              </label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full time">Full Time</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900 mb-2 block">
                Category
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Data">Data</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900 mb-2 block">
                Location
              </label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="san francisco">San Francisco</SelectItem>
                  <SelectItem value="new york">New York</SelectItem>
                  <SelectItem value="seattle">Seattle</SelectItem>
                  <SelectItem value="austin">Austin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setJobType("all");
                  setCategory("all");
                  setLocation("all");
                }}
              >
                Clear All
              </Button>
              <Button
                className="flex-1 bg-black hover:bg-gray-900 text-white"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
