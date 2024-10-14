"use client";

import { GradientFontTitle } from "@/components/gradient-font-title";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { WalletIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

export default function Home() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    setTheme("dark");
  }, [])

  if (session.data?.user) {
    router.push("/dashboard");
  }

  return (
    <BackgroundBeamsWithCollision>
      <div>
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          All Your Digital Assets,{" "}
          <GradientFontTitle text="One Dashboard." />
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
            <div
              role="button"
              onClick={async (e) => {
                e.preventDefault();
                await signIn('google', {
                  callbackUrl: '/dashboard'
                });
              }}
            >
              <FaGoogle className="w-8 h-8" />
            </div>
            <div
              role="button"
              onClick={async (e) => {
                e.preventDefault();
                await signIn('github');
              }}
            >
              <GitHubLogoIcon className="w-8 h-8" />
            </div>
            <div>
              <WalletIcon className="w-8 h-8" />
            </div>
          </div>
        </div>

      </div>
    </BackgroundBeamsWithCollision>
  );
}
