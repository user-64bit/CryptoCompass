import { getGroupItemsAction } from "@/actions/getGroupItems"
import { EditableGroupRow } from "@/components/EditableGroupRow"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { getServerSession } from "next-auth"

export default async function Group({ params }: { params: { groupName: string, groupId: string } }) {
  const session = await getServerSession();

  const Items = await getGroupItemsAction({ groupId: params.groupId, userId: session?.user?.email! });

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center text-2xl font-bold pb-10">Group: #{params.groupName}</h2>
      <Table>
        <TableCaption>A list of public keys of #{params.groupName}.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Public Key</TableHead>
            <TableHead>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p>Block Chain*</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>We tried to predict the blockchain, but if we're not correct then you can change it.</p>
                </TooltipContent>
              </Tooltip>
            </TableHead>
            <TableHead className="text-right">Balance($)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Items?.map((item, index) => (
            <EditableGroupRow
              key={item.id}
              index={index}
              publicKey={item.name}
              initialBlockchain={item.blockchain}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div >
  )
}
