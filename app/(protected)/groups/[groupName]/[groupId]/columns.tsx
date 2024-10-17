"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import Link from "next/link";

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
    accessorKey: "nickName",
    header: "Nickname",
  },
  {
    accessorKey: "name",
    header: "Public Address",
    cell: ({ row }) => {
      return (
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="hover:text-blue-400 hover:underline"
                  href={`https://platform.arkhamintelligence.com/explorer/address/${row.getValue("name")}`}
                  target="_blank"
                >
                  <p className="flex gap-x-2">
                    {row.getValue("name")}
                    <ExternalLink className="w-4 h-4" />
                  </p>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {row.getValue("nickName")}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
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
