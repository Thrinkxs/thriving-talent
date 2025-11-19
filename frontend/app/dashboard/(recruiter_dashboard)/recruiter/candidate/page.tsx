"use client";

import React, { useState, useMemo } from "react";
import { useInfiniteFetchAllInterns } from "@/hooks/intern/intern";
import { useInternFiltersStore } from "@/lib/store/intern-filter-store/intern-filter-store";

import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { SearchFilterBar } from "@/components/Candidates/SearchFilterBar";
import { CandidateCard } from "@/components/Candidates/CandidateCard";
import { FilterModal } from "@/components/Candidates/FilterModal";
import InfiniteScrollTrigger from "@/components/InfiniteScrollTrigger/InfiniteScrollTrigger";

const CandidatesPage = () => {
  const {
    search,
    setSearch,
    address,
    setAddress,
    gender,
    setGender,
    status,
    setStatus,
    clearFilters,
  } = useInternFiltersStore();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteFetchAllInterns();

  // Flatten all candidates from pages
  const allCandidates = useMemo(() => {
    return data?.pages.flatMap((page) => page.internsData.data) || [];
  }, [data]);

  // Convert store values to arrays for the modal
  const modalFilters = {
    gender: gender ? [gender] : [],
    status: status ? [status] : [],
  };

  const handleFilterChange = (
    filterType: "gender" | "status",
    value: string
  ) => {
    // For single selection, replace the current value
    if (filterType === "gender") {
      setGender(value === gender ? "" : value);
    } else if (filterType === "status") {
      setStatus(value === status ? "" : value);
    }
  };

  const handleRemoveFilter = (
    filterType: "gender" | "status",
    value: string
  ) => {
    if (filterType === "gender") {
      setGender("");
    } else if (filterType === "status") {
      setStatus("");
    }
  };

  const handleClearAllFilters = () => {
    clearFilters();
  };

  const activeFilters = {
    gender: gender ? [gender] : [],
    status: status ? [status] : [],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Intern Candidates
          </h1>
          <p className="text-gray-600">
            Discover talented interns and find the perfect match for your
            organization
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <SearchFilterBar
            search={search}
            onSearchChange={setSearch}
            address={address}
            onAddressChange={setAddress}
            activeFilters={activeFilters}
            onRemoveFilter={handleRemoveFilter}
            onClearAllFilters={handleClearAllFilters}
            onOpenFilterModal={() => setIsFilterModalOpen(true)}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold">{allCandidates.length}</span>{" "}
            candidates
          </p>
        </div>

        {/* Candidates Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {allCandidates.map((candidate) => (
                <CandidateCard key={candidate._id} candidate={candidate} />
              ))}
            </div>

            {hasNextPage && (
              <InfiniteScrollTrigger onLoadMore={() => fetchNextPage()} />
            )}

            {isFetchingNextPage && (
              <div className="flex justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!isLoading && allCandidates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No candidates found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={handleClearAllFilters} variant="outline">
              Clear all filters
            </Button>
          </div>
        )}

        {/* Filter Modal */}
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          filters={modalFilters}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default CandidatesPage;
