"use client";

import { useEffect, useState } from "react";
import { IconBriefcaseFilled } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateJobForm from "@/components/Forms/JobForm/CreateJobForm";

const CreateJobDialogButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(!isOpen);
        }}
      >
        <DialogTrigger className="block px-4 py-2 text-sm bg-black hover:bg-black/80 rounded-xl">
          <IconBriefcaseFilled size={20} color="white" stroke={2} />
        </DialogTrigger>
        <DialogContent className="w-[300px] min-[500px]:w-[400px] min-[600px]:w-full">
          <DialogHeader>
            <DialogTitle>Create new Job</DialogTitle>
          </DialogHeader>
          <CreateJobForm
          // closeDialog={() => setIsOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateJobDialogButton;
