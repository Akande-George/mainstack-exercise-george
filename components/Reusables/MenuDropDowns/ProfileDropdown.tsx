import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import MenuListTwo from "../MenuListTwo";
import {
  User,
  Settings,
  History,
  EqualSquareIcon,
  AppWindow,
  Bug,
  SwitchCamera,
  LogOut,
} from "lucide-react";

const ProfileDropdown = () => {
  return (
    <div className="bg-[#EFF1F6] p-2 rounded-full">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="p-3 rounded-full bg-[#131316] w-[32px] h-[32px] flex items-center justify-center text-white">
              OJ
            </div>
            <Image
              src="/menu-icon.svg"
              alt="menu icon"
              width={24}
              height={24}
              className="pr-1"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[380px] p-3 border-none rounded-[20px]">
          <DropdownMenuLabel>
            <div className="flex justify-start items-center gap-3">
              <div className="p-3 rounded-full bg-[#131316] w-[32px] h-[32px] flex items-center justify-center text-white">
                OJ
              </div>
              <div>
                <div className="font-semibold">Olivier Jones</div>
                <div className="text-[12px]">olivierjones@gmail.com</div>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <MenuListTwo icon={Settings} label="Settings" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MenuListTwo icon={History} label="Purchase History" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MenuListTwo icon={EqualSquareIcon} label="Refer and Earn" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MenuListTwo icon={AppWindow} label="Integration" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MenuListTwo icon={Bug} label="Report Bug" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MenuListTwo icon={SwitchCamera} label="Switch Account" />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MenuListTwo icon={LogOut} label="Sign Out" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
