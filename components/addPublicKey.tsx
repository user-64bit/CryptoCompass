"use client";

import { addPublicKeyAction } from "@/actions/addPublicKey";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { validationMessage } from "./validationMessage";
import { Spinner } from "./spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
const blockchainOptions = [
  // "Bitcoin",
  "Ethereum",
  // "Solana",
];

export const AddPublicKey = ({
  groupName,
  groupId,
  isCentered = false,
}: {
  groupName: string;
  groupId: string;
  isCentered?: boolean;
}) => {
  const [publicKey, setPublicKey] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [nickName, setNickName] = useState("");
  const [blockchain, setBlockchain] = useState("Ethereum");
  const session = useSession();
  const router = useRouter();

  const handleAddPublicKey = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!publicKey) {
      return;
    }
    setIsAdding(true);
    const group = await addPublicKeyAction({
      userId: session.data?.user?.email!,
      nickName,
      groupId,
      publicKey,
      blockchain,
    });
    // Todo: add a delay to avoid rate limit
    const delay = publicKey.split(",").map((key) => key.trim()).length;
    const promise = new Promise((resolve) => setTimeout(resolve, delay * 1500));
    try {
      await Promise.all([group, promise]);
      toast("Public Key has been added(if it was not already there)...");
    } catch (err) {
      console.error(err);
      toast("Error creating group", {
        description: "Please try again later",
      });
    } finally {
      setPublicKey("");
      setIsDialogOpen(false);
      setIsAdding(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className={
            isCentered
              ? "bg-gradient-to-br from-purple-500 to-blue-500 font-bold hover:opacity-80 text-white"
              : ""
          }
          size={isCentered ? "lg" : "default"}
        >
          Add Publickey
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add PublicKey to Group #{groupName}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Please put single public key
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nickName" className="font-semibold">
              Nick Name
            </Label>
            <Input
              id="nickName"
              value={nickName}
              onChange={(e) => {
                e.preventDefault();
                setNickName(e.target.value);
              }}
              className="col-span-3"
              placeholder="nickName (optional)"
            />
          </div>
          <div className="space-y-2">
            <Select value={blockchain} onValueChange={setBlockchain}>
              <SelectTrigger className="w-full">
                <SelectValue>{blockchain}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {blockchainOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pkey" className="font-semibold">
              Public key
            </Label>
            <Input
              id="pkey"
              value={publicKey}
              onChange={(e) => {
                e.preventDefault();
                setPublicKey(e.target.value);
              }}
              className="col-span-3"
              placeholder="pb_key"
            />
            {validationMessage(publicKey)}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={(e) => handleAddPublicKey(e)}
            disabled={!publicKey}
          >
            {isAdding ? <Spinner /> : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
