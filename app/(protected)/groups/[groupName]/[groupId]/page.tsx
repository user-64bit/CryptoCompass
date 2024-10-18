import { getGroupItemsAction } from "@/actions/getGroupItems";
import { AddPublicKey } from "@/components/addPublicKey";
import { DropGroup } from "@/components/dropGroup";
import { RefreshDB } from "@/components/refreshDB";
import { getServerSession } from "next-auth";
import { columns } from "./columns";
import { DataTable } from "./data-table";

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
  const dataItems = items.map((item) => {
    return {
      pkey_id: item.id,
      name: item.name,
      nickName: item.nickName,
      blockchain: item.blockchain,
      balance: (
        parseFloat(item.cryptoToUSD) * parseFloat(item.balanceCrypto)
      ).toFixed(2),
    };
  });

  return (
    <div className="mx-auto py-10">
      <h2 className="text-center text-2xl font-bold pb-5 underline">
        Group: #{params.groupName.split("-").join(" ")}
      </h2>
      {items.length > 0 ? (
        <div className="flex justify-between pb-5">
          <AddPublicKey groupName={params.groupName} groupId={params.groupId} />
          <div className="flex gap-x-2">
            <RefreshDB items={items} />
            <DropGroup groupId={params.groupId} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[calc(100vh-250px)]">
          <div className="text-center">
            <p className="text-sm text-muted-foreground pb-4">
              [All Your PublicKeys will be shown in tabular format.]
            </p>
            <AddPublicKey
              groupName={params.groupName}
              groupId={params.groupId}
              isCentered={true}
            />
            <DropGroup className="ml-4" groupId={params.groupId} size={"lg"} />
          </div>
        </div>
      )}
      {items.length > 0 && (
        <DataTable
          columns={columns}
          data={dataItems}
          userId={session?.user?.email!}
          groupId={params.groupId}
        />
      )}
    </div>
  );
}
