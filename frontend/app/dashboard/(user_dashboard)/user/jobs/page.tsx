"use client";

import JobSearchBar from "@/components/Jobs/JobSearchBar";
import JobSortAndViewControls from "@/components/Jobs/JobSortAndViewControls";
import JobList from "@/components/Jobs/JobList";
import JobDetailsPanel from "@/components/Jobs/JobDetailsPanel";
import JobFilterSheet from "@/components/Jobs/JobFilterSheet";
import JobDetailsSheet from "@/components/Jobs/JobDetailsSheet";
import { useJobsStore } from "@/lib/store/job-store";
import { JobResponse } from "@/lib/types/response-types/response-types";
import { useInfiniteJobs } from "@/hooks/infinte-jobs/infinite-jobs";
import InfiniteScrollTrigger from "@/components/InfiniteScrollTrigger/InfiniteScrollTrigger";
import { Loader2 } from "lucide-react";

export default function JobsPage() {
  const {
    searchQuery,
    setSearchQuery,
    selectedJob,
    setSelectedJob,
    viewMode,
    setViewMode,
    sortBy,
    setSortBy,
    showFilters,
    setShowFilters,
    showDetails,
    setShowDetails,
    expandDescription,
    setExpandDescription,
    jobType,
    setJobType,
    category,
    setCategory,
    location,
    setLocation,
  } = useJobsStore();

  // const { data: jobsData = [], isLoading } = useFetchJobs();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteJobs();

  const jobs = data?.pages.flatMap((page) => page.data) ?? [];

  const filteredJobs = jobs.filter((job) => {
    let matches = true;

    if (jobType !== "all") matches = matches && job.type === jobType;
    // if (category !== "all") matches = matches && job.category === category;
    if (location !== "all")
      matches =
        matches && job.location.toLowerCase().includes(location.toLowerCase());

    return matches;
  });

  const handleJobClick = (job: JobResponse) => {
    setSelectedJob(job);
    if (window.innerWidth < 1024) setShowDetails(true);
    setExpandDescription(false);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
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

              {hasNextPage && (
                <InfiniteScrollTrigger onLoadMore={() => fetchNextPage()} />
              )}

              {isFetchingNextPage && (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              )}
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
      )}
    </>
  );
}
