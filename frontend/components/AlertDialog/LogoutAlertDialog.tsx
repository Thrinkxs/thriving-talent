/**
 * This module is gonna display a "do you wanna really delete this service to the user"
 * something along those lines
 */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IconLogout } from "@tabler/icons-react";

type LogoutAlertDialogProp = {
  logout: () => void;
  open: Boolean;
};

export function LogoutAlertDialog({ logout, open }: LogoutAlertDialogProp) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className=" flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-button rounded-md cursor-pointer">
          <div>
            <IconLogout size={20} color="white" />{" "}
          </div>
          <span
            style={{
              transitionDelay: `${1 * 300}ms`,
              color: "white",
            }}
            className={`whitespace-pre duration-500  ${
              !open && "opacity-0 translate-x-28 overflow-hidden "
            }`}
          >
            Logout
          </span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => logout()}
            style={{ backgroundColor: "#7366FB" }}
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
