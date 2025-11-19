// components/candidates/search-filter-bar.tsx
"use client";

import React from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearchFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  address: string;
  onAddressChange: (value: string) => void;
  activeFilters: {
    gender: string[];
    status: string[];
  };
  onRemoveFilter: (filterType: "gender" | "status", value: string) => void;
  onClearAllFilters: () => void;
  onOpenFilterModal: () => void;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  search,
  onSearchChange,
  address,
  onAddressChange,
  activeFilters,
  onRemoveFilter,
  onClearAllFilters,
  onOpenFilterModal,
}) => {
  const allFilters = [
    ...activeFilters.gender.map((g) => ({ type: "gender" as const, value: g })),
    ...activeFilters.status.map((s) => ({ type: "status" as const, value: s })),
  ];

  return (
    <div className="space-y-4">
      {/* Search Inputs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Filter by address..."
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={onOpenFilterModal}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {allFilters.length > 0 && (
            <Badge
              variant="secondary"
              className="ml-1 h-5 w-5 p-0 flex items-center justify-center"
            >
              {allFilters.length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Active Filters */}
      {allFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500">Active filters:</span>
          {allFilters.map((filter) => (
            <Badge
              key={`${filter.type}-${filter.value}`}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {filter.value}
              <button
                onClick={() => onRemoveFilter(filter.type, filter.value)}
                className="ml-1 hover:bg-gray-300 rounded-full"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAllFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};
