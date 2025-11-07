import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JobSearchBarProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  onOpenFilters: () => void;
}

export default function JobSearchBar({
  searchQuery,
  setSearchQuery,
  onOpenFilters,
}: JobSearchBarProps) {
  return (
    <div className="flex flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search by job title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 bg-white border-gray-200"
        />
      </div>
      <Button variant="outline" className="h-12 px-4" onClick={onOpenFilters}>
        <SlidersHorizontal className="h-5 w-5" />
      </Button>
    </div>
  );
}
