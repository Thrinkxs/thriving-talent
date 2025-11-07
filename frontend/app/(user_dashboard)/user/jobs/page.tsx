"use client";

import { useMemo, useState } from "react";
import { FAKE_JOBS, JobType } from "@/utils/data";
import JobSearchBar from "@/components/Jobs/JobSearchBar";
import JobSortAndViewControls from "@/components/Jobs/JobSortAndViewControls";
import JobList from "@/components/Jobs/JobList";
import JobDetailsPanel from "@/components/Jobs/JobDetailsPanel";
import JobFilterSheet from "@/components/Jobs/JobFilterSheet";
import JobDetailsSheet from "@/components/Jobs/JobDetailsSheet";

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [expandDescription, setExpandDescription] = useState(false);

  // filter states
  const [jobType, setJobType] = useState("all");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");

  const filteredJobs = useMemo(() => {
    let filtered = FAKE_JOBS;

    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (jobType !== "all")
      filtered = filtered.filter((j) => j.type === jobType);
    if (category !== "all")
      filtered = filtered.filter((j) => j.category === category);
    if (location !== "all") {
      filtered = filtered.filter((j) =>
        j.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (sortBy === "newest")
      filtered = [...filtered].sort((a, b) => a.daysLeft - b.daysLeft);
    if (sortBy === "popular")
      filtered = [...filtered].sort((a, b) => b.applied - a.applied);

    return filtered;
  }, [searchQuery, jobType, category, location, sortBy]);

  const handleJobClick = (job: JobType) => {
    setSelectedJob(job);
    if (window.innerWidth < 1024) setShowDetails(true);
    setExpandDescription(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <JobSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenFilters={() => setShowFilters(true)}
          />
          <JobSortAndViewControls
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <JobList
            jobs={filteredJobs}
            viewMode={viewMode}
            onSelectJob={handleJobClick}
          />
        </div>

        {selectedJob && (
          <JobDetailsPanel
            job={selectedJob}
            expandDescription={expandDescription}
            setExpandDescription={setExpandDescription}
          />
        )}
      </div>

      {selectedJob && (
        <JobDetailsSheet
          job={selectedJob}
          open={showDetails}
          onOpenChange={setShowDetails}
          expandDescription={expandDescription}
          setExpandDescription={setExpandDescription}
        />
      )}

      <JobFilterSheet
        open={showFilters}
        onOpenChange={setShowFilters}
        jobType={jobType}
        setJobType={setJobType}
        category={category}
        setCategory={setCategory}
        location={location}
        setLocation={setLocation}
      />
    </div>
  );
}
