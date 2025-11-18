"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FilterDates = {
  filterDaily: () => void;
  filterWeekly: () => void;
  filterMonthly: () => void;
  currentSelection: string;
};

export function DropdownMenuRadioGroupDemo({
  filterDaily,
  filterWeekly,
  filterMonthly,
  currentSelection,
}: FilterDates) {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-32 bg-button text-black border border-black white"
        >
          {currentSelection}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>View chart timelines</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top" onClick={filterDaily}>
            Daily
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom" onClick={filterWeekly}>
            Weekly
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="left" onClick={filterMonthly}>
            Monthly
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
