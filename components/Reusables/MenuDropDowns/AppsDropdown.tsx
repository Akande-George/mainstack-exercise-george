"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import MenuListThree from "../MenuListThree";
import { ChevronDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="">
        <DropdownMenu onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            {!isOpen ? (
              <div
                className={`flex items-center gap-2 font-semibold text-[16px] text-[#56616B] hover:bg-[#EFF1F6] rounded-full py-3 px-5 cursor-pointer`}
              >
                <Image src="/apps-icon.svg" alt="test" width={20} height={20} />
                Apps
              </div>
            ) : (
              <div className="flex justify-center items-center text-[16px] text-[#FFFFFF] bg-[#131316] rounded-full cursor-pointer">
                <div
                  className={`flex items-center gap-2 font-semibold rounded-full py-3 px-5`}
                >
                  <Image
                    src="/apps-white-icon.svg"
                    alt="test"
                    width={20}
                    height={20}
                  />
                  Apps
                </div>
                <div className="font-semibold px-4 py-3 flex justify-start items-center gap-2">
                  Link in Bio
                  <ChevronDown color="#FFFFFF" size={18} />
                </div>
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[380px] p-3 border-none rounded-[20px]">
            <DropdownMenuItem className="hover:bg-transparent focus:bg-transparent p-0">
              <MenuListThree
                icon="/link-colored.svg"
                label="Link in Bio"
                text="Manage your link Bio"
              />
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-transparent focus:bg-transparent p-0">
              <MenuListThree
                icon="/products-colored.svg"
                label="Store"
                text="Manage your store activities"
              />
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-transparent focus:bg-transparent p-0">
              <MenuListThree
                icon="/folder-colored.svg"
                label="Media Kit"
                text="Manage your media Kit"
              />
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-transparent focus:bg-transparent p-0">
              <MenuListThree
                icon="/paper-colored.svg"
                label="Invoicing"
                text="Manage your invoices"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AppsDropdown;
