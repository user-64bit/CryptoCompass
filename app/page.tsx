"use client";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { WalletIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

export default function Home() {
  const { setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setTheme("dark");
  }, [])


  return (
    <BackgroundBeamsWithCollision>
      <div>
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          All Your Digital Assets,{" "}
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="">One Dashboard.</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span className="">One Dashboard.</span>
            </div>
          </div>
        </h2>
        <h6>

        </h6>
        <div className="flex flex-col justify-center items-center">
          <Button
            className="font-bold"
            size={"xl"}
            variant={"secondary"}
            onClick={() => router.push("/learn-more")}
          >
            What is Crypto Wallet?
          </Button>
          <div className="flex gap-x-5 mt-4">
            <button>
              <FaGoogle className="w-8 h-8" />
            </button>
            <button>
              <GitHubLogoIcon className="w-8 h-8" />
            </button>
            <button>
              <WalletIcon className="w-8 h-8" />
            </button>
          </div>
        </div>

      </div>
    </BackgroundBeamsWithCollision>
  );
}
