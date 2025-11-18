import { List, Grid3x3 } from "lucide-react";

interface JobSortAndViewControlsProps {
  sortBy: string;
  // setSortBy: (v: string) => void;
  setSortBy: (v: "newest" | "popular") => void;
  viewMode: "list" | "grid";
  setViewMode: (v: "list" | "grid") => void;
}

export default function JobSortAndViewControls({
  sortBy,

  viewMode,
  setViewMode,
}: JobSortAndViewControlsProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <span className="text-gray-600">Jobs for you</span>
        <span className="text-red-600 font-semibold capitalize">{sortBy}</span>
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

        {/* <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-32 bg-black text-white border-0 h-10 rounded-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="closing">Closing Soon</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
    </div>
  );
}
