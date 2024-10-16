import { getGroupItemsAction } from "@/actions/getGroupItems";
import { AddPublicKey } from "@/components/addPublicKey";
import { EditableGroupRow } from "@/components/EditableGroupRow";
import { RefreshDB } from "@/components/refreshDB";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getServerSession } from "next-auth";

export default async function Group({
  params,
}: {
  params: { groupName: string; groupId: string };
}) {
  const session = await getServerSession();

  const items = await getGroupItemsAction({
    groupId: params.groupId,
    userId: session?.user?.email!,
  });

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center text-2xl font-bold pb-5">
        Group: #{params.groupName.split("-").join(" ")}
      </h2>
      <div className="flex justify-between pb-5">
        <AddPublicKey groupName={params.groupName} groupId={params.groupId}/>
        <RefreshDB items={items} />
      </div>
      <Table>
        <TableCaption>
          A list of public keys of #{params.groupName.split("-").join(" ")}.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Public Key</TableHead>
            <TableHead className="text-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <p>Block Chain*</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    We tried to predict the blockchain, but if we're not correct
                    then you can change it.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TableHead>
            <TableHead className="text-right">Balance($)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((item, index) => (
            <EditableGroupRow
              key={item.id}
              id={item.id}
              groupId={item.groupId}
              index={index}
              publicKey={item.name}
              initialBlockchain={item.blockchain}
              balance={(parseFloat(item.balanceCrypto) * parseFloat(item.cryptoToUSD)).toFixed(2)}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              ${items.reduce((acc, item) => acc + (parseFloat(item.balanceCrypto) * parseFloat(item.cryptoToUSD)), 0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
