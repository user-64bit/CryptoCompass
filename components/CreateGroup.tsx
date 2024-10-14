import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";

export const CreateGroup = () => {

  const handleCrateGroup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // Todo: make db call and create group
    /*
      // Ruff model idea:
      model Group {
        id: string
        name: string
        publicKeys: PublicKey[]
      }
      model PublicKey {
        id: string
        groupId: string
        publicKey: string
      }
    */
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="bg-gradient-to-br from-purple-500 to-blue-500 font-bold hover:opacity-80 text-white"
            size={"xl"}
          >
            Create Group
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Group</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name" className="font-semibold">
                Name
              </Label>
              <Input id="name" value="" className="col-span-3" placeholder="Group Name" />
            </div>
            <div>
              <Label htmlFor="pkey" className="font-semibold">
                Public key(s)
              </Label>
              <Textarea id="pkey" value="" className="col-span-3" placeholder="pb_key1, pb_key2, ..." />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={(e) => handleCrateGroup(e)}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
