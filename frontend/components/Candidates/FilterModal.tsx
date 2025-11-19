// components/candidates/filter-modal.tsx
"use client";

import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    gender: string[];
    status: string[];
  };
  onFilterChange: (filterType: "gender" | "status", value: string) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Gender Filter */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-gray-900">Gender</h3>
            <div className="space-y-2">
              {["Male", "Female", "Prefer not to say"].map((genderOption) => (
                <div key={genderOption} className="flex items-center space-x-2">
                  <Checkbox
                    id={`gender-${genderOption}`}
                    checked={filters.gender.includes(genderOption)}
                    onCheckedChange={() =>
                      onFilterChange("gender", genderOption)
                    }
                  />
                  <Label
                    htmlFor={`gender-${genderOption}`}
                    className="text-sm font-normal"
                  >
                    {genderOption}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-gray-900">Status</h3>
            <div className="space-y-2">
              {["active", "suspended"].map((statusOption) => (
                <div key={statusOption} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${statusOption}`}
                    checked={filters.status.includes(statusOption)}
                    onCheckedChange={() =>
                      onFilterChange("status", statusOption)
                    }
                  />
                  <Label
                    htmlFor={`status-${statusOption}`}
                    className="text-sm font-normal capitalize"
                  >
                    {statusOption}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Apply Filters</Button>
        </div>
      </div>
    </div>
  );
};
