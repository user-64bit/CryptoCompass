"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Item = {
  pkey_id: string;
  name: string;
  nickName: string;
  blockchain: string;
  balance: string;
};

export const columns: ColumnDef<Item>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "nickName",
    header: () => <div className="text-center">Nick Name</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("nickName")}</div>
    ),
  },
  {
    accessorKey: "blockchain",
    header: () => <div className="text-center">Blockchain</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("blockchain")}</div>
    ),
  },
  {
    accessorKey: "balance",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button variant="ghost" onClick={() => column.toggleSorting()}>
            Balance ($)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">{row.getValue("balance")}</div>
      );
    },
  },
];
