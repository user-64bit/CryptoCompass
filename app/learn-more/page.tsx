"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LearnMore() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-1/2">
        <h1 className="text-2xl z-20 md:text-3xl lg:text-5xl font-bold text-center">
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="">Crypto Compass</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span className="">Crypto Compass</span>
            </div>
          </div>
        </h1>
        <p className="text-lg text-center">
          Easily connect your wallet to view all your cryptocurrencies, NFTs,
          and token balances in one place. Our platform provides a simple and
          secure way to keep track of your digital assets, offering real-time
          insights into your portfolio. Whether you&apos;re managing tokens or
          exploring NFTs, we&apos;ve got you covered with a clean, intuitive
          dashboard designed for seamless user experience.
        </p>
        <p className="text-center text-muted-foreground">
          Don't worry, We don't sell your data.
        </p>
      </div>
      <Button
        className="font-bold mt-3"
        size={"xl"}
        variant={"secondary"}
        onClick={() => router.push("/how-to-use")}
      >
        How to use?
      </Button>
    </div>
  );
}
