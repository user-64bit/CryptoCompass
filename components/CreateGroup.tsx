"use client";

import { createGroupAction } from "@/actions/createGroup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "./spinner";
import { validationMessage } from "./validationMessage";

export const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const session = useSession();
  const router = useRouter();

  const handleCreateGroup = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!groupName) {
      return;
    }
    setIsCreating(true);
    setIsDialogOpen(false);
    let group;
    try {
      group = await createGroupAction({
        name: groupName,
        userId: session.data?.user?.email!,
      });
      toast.success("Group has been created");
    } catch (err) {
      console.error(err);
      toast.error("Error creating group", {
        description: "Please try again later",
      });
    } finally {
      setGroupName("");
      setIsCreating(false);
      router.push(`/groups/${groupName}/${group?.id}`);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-gradient-to-br from-purple-500 to-blue-500 font-bold hover:opacity-80 text-white"
          size="lg"
        >
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Please put your public keys separated by commas(,)
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-semibold">
              Name
            </Label>
            <Input
              id="name"
              value={groupName}
              onChange={(e) => {
                e.preventDefault();
                setGroupName(e.target.value);
              }}
              className="col-span-3"
              placeholder="Group name"
            />
            {validationMessage(groupName)}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleCreateGroup}
            disabled={!groupName}
          >
            {isCreating ? <Spinner /> : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
