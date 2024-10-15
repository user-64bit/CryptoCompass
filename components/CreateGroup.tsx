"use client";

import { useState } from "react";
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
import { toast } from "sonner";
import { CheckCircle2, XCircle } from "lucide-react";

export const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [publicKeys, setPublicKeys] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    groupName: false,
    publicKeys: false,
  });

  const handleCreateGroup = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!groupName || !publicKeys) {
      return;
    }
    toast("Group has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
    setIsDialogOpen(false);
    setGroupName("");
    setPublicKeys("");
    setTouchedFields({ groupName: false, publicKeys: false });
    // Todo: make db call and create group
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
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const renderValidationMessage = (field: "groupName" | "publicKeys") => {
    const value = field === "groupName" ? groupName : publicKeys;
    if (!touchedFields[field]) return null;

    return value.length > 0 ? (
      <span className="text-green-500 font-semibold flex items-center gap-1">
        <CheckCircle2 className="w-4 h-4" />
        Valid
      </span>
    ) : (
      <span className="text-red-500 font-semibold flex items-center gap-1">
        <XCircle className="w-4 h-4" />
        Required*
      </span>
    );
  };

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setTouchedFields({ groupName: false, publicKeys: false });
    }
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
              onChange={(e) => handleInputChange("groupName", e.target.value)}
              onBlur={() =>
                setTouchedFields((prev) => ({ ...prev, groupName: true }))
              }
              className="col-span-3"
              placeholder="Group name"
              aria-invalid={touchedFields.groupName && groupName.length === 0}
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
              onChange={(e) => handleInputChange("publicKeys", e.target.value)}
              onBlur={() =>
                setTouchedFields((prev) => ({ ...prev, publicKeys: true }))
              }
              className="col-span-3"
              placeholder="pb_key1, pb_key2, ..."
              aria-invalid={touchedFields.publicKeys && publicKeys.length === 0}
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
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
