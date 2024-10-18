"use client";

import { dropGroupAction } from "@/actions/dropGroup.";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "./spinner";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const DropGroup = ({
  groupId,
  className,
  size,
}: {
  groupId: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "xl" | "icon" | null | undefined;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDropGroup = async () => {
    setIsLoading(true);
    try {
      await dropGroupAction({ groupId });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      router.push("/dashboard");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={className}
          variant={"destructive"}
          size={size ? size : "default"}
        >
          Delete Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Do you really want to delete this group?</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant={"destructive"}
            onClick={async () => handleDropGroup()}
          >
            {isLoading ? <Spinner /> : "Delete Group"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
