'use client'

import { useState } from 'react'
import { TableCell, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const blockchainOptions = [
  "Bitcoin",
  "Ethereum",
  "Solana",
  "Cardano",
  "Polkadot",
  "Unknown"
]

export function EditableGroupRow({ index, publicKey, initialBlockchain, balance }: {
  index: number;
  publicKey: string;
  initialBlockchain: string;
  balance: string;
}) {
  const [blockchain, setBlockchain] = useState(initialBlockchain);

  return (
    <TableRow>
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>{publicKey}</TableCell>
      <TableCell>
        <Select value={blockchain} onValueChange={setBlockchain}>
          <SelectTrigger className="w-full">
            <SelectValue>{blockchain}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {blockchainOptions.map((option) => (
              <SelectItem
                key={option}
                value={option}
                onChange={() => { }}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className='text-right'>{balance}</TableCell>
    </TableRow>
  )
}
