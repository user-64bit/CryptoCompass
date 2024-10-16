"use client";

import { updateDBAction } from "@/actions/updateDB";
import { Button } from "./ui/button";
import { useState } from "react";
import { Spinner } from "./spinner";

export const RefreshDB = ({ items }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefreshDB = async () => {
    setIsLoading(true);
    try {
      await updateDBAction({ items });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      onClick={async () => handleRefreshDB()}
    >
      {isLoading ? <Spinner /> : "Refresh DB"}
    </Button>
  )
}
