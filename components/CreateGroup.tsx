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
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "./spinner";

export const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [publicKeys, setPublicKeys] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const session = useSession();
  const router = useRouter();

  const handleCreateGroup = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!groupName || !publicKeys) {
      return;
    }
    setIsCreating(true);
    const group = await createGroupAction({
      name: groupName,
      publicKeys,
      userId: session.data?.user?.email!,
    });
    // Todo: add a delay to avoid rate limit
    const delay = publicKeys.split(",").map((key) => key.trim()).length;
    const promise = new Promise((resolve) => setTimeout(resolve, delay * 1000));
    try {
      await Promise.all([group, promise]);
      toast("Group has been created", {
        description:
          "It will take a few seconds to generate your beatuful group",
      });
    } catch (err) {
      console.error(err);
      toast("Error creating group", {
        description: "Please try again later",
      });
    } finally {
      setGroupName("");
      setPublicKeys("");
      setIsCreating(false);
      setIsDialogOpen(false);
      // Todo: redirect to /Groupid
      router.refresh();
    }
  };
  const handleInputChange = (
    field: "groupName" | "publicKeys",
    value: string,
  ) => {
    if (field === "groupName") {
      setGroupName(value);
    } else {
      setPublicKeys(value);
    }
  };

  const renderValidationMessage = (field: "groupName" | "publicKeys") => {
    const value = field === "groupName" ? groupName : publicKeys;
    return value.length > 0 ? (
      <span className="text-green-500 font-semibold flex items-center gap-1 ml-1">
        ✓
      </span>
    ) : (
      <span className="text-red-500 font-semibold flex items-center gap-1 ml-1">
        ✗
      </span>
    );
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
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
                handleInputChange("groupName", e.target.value);
              }}
              className="col-span-3"
              placeholder="Group name"
            />
            {renderValidationMessage("groupName")}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pkey" className="font-semibold">
              Public key(s)
            </Label>
            <Textarea
              id="pkey"
              value={publicKeys}
              onChange={(e) => {
                e.preventDefault();
                handleInputChange("publicKeys", e.target.value);
              }}
              className="col-span-3"
              placeholder="pb_key1, pb_key2, ..."
            />
            {renderValidationMessage("publicKeys")}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleCreateGroup}
            disabled={!groupName || !publicKeys}
          >
            {isCreating ? <Spinner /> : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
