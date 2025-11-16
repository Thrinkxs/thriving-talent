import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobFilterSheetProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  jobType: string;
  setJobType: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
}

export default function JobFilterSheet({
  open,
  onOpenChange,
  jobType,
  setJobType,
  category,
  setCategory,
  location,
  setLocation,
}: JobFilterSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[400px] p-4">
        <SheetHeader>
          <SheetTitle>Filter Jobs</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label>Job Type</Label>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="negotiable">Negotiable</SelectItem>
                {/* <SelectItem value="remote">Remote</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter className="mt-8">
          <Button
            className="w-full rounded-lg bg-black hover:bg-black/85"
            onClick={() => onOpenChange(false)}
          >
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
