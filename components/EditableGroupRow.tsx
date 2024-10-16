"use client";

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { modifyBlockChain } from "@/actions/modifyBlockChain";
import { ExternalLink, Loader2 } from "lucide-react";
import { Spinner } from "./spinner";
import Link from "next/link";
// import { LoadingSpinner } from './loading-spinner'

const blockchainOptions = [
  "Bitcoin",
  "Ethereum",
  "Solana",
  "Cardano",
  "Polkadot",
  "Unknown",
];

export function EditableGroupRow({
  id,
  groupId,
  index,
  publicKey,
  initialBlockchain,
  balance,
}: {
  id: string;
  groupId: string;
  index: number;
  publicKey: string;
  initialBlockchain: string;
  balance: string;
}) {
  const [blockchain, setBlockchain] = useState(initialBlockchain);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = async (value: string) => {
    setIsLoading(true);
    setBlockchain(value);

    const updatePromise = modifyBlockChain({ id, groupId, blockchain: value });
    const timerPromise = new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      await Promise.all([updatePromise, timerPromise]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell className="flex hover:text-blue-500 hover:underline cursor-pointer">
        <Link target="_blank" href={`https://platform.arkhamintelligence.com/explorer?query=${publicKey}`}>
          {publicKey}
        </Link>
        <ExternalLink className="w-4 h-4 ml-2" />
      </TableCell>
      {!isLoading ? (
        <TableCell>
          <Select value={blockchain} onValueChange={handleOnChange}>
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
        </TableCell>
      ) : (
        <TableCell className="flex justify-center items-center">
          <Spinner />
        </TableCell>
      )}
      <TableCell className="text-right">{balance}</TableCell>
    </TableRow>
  );
}
