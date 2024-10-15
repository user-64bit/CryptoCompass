"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { GradientFontTitle } from "@/components/gradient-font-title";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  image?: string;
  email?: string;
}

export const Header = ({ image, email }: HeaderProps) => {
  return (
    <div className="flex justify-between py-4 border-b">
      <div className="flex items-center cursor-pointer">
        <Image
          src="/logo.png"
          width={55}
          height={55}
          alt="Logo"
          className="rounded-full"
        />
        <span className="text-2xl font-bold ml-2">
          <GradientFontTitle text="Crypto Compass" className="" />
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-14 w-14 cursor-pointer">
            <AvatarImage src={image} alt="@user-64bit" />
            <AvatarFallback>CC</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="font-medium text-white text-muted-foreground">
            {email}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={async () => await signOut()}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
