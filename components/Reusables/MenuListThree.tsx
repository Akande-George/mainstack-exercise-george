import React from "react";
// import { LucideIcon } from "lucide-react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface MenuListThreeProps {
  icon: string;
  label: string;
  text: string;
}

const MenuListThree = ({ icon, label, text }: MenuListThreeProps) => {
  return (
    <div className="py-3 w-full">
      <div className="flex justify-between items-center hover:bg-white gap-3 w-full outline:none focus:bg-white hover:border hover:border-[#EFF1F6] rounded-[15px] p-2 cursor-pointer group">
        <div className="flex justify-start items-center gap-3">
          <div className="flex justify-center items-center p-2 border border-[#EFF1F6] rounded-[10px]">
            <Image src={icon} alt="dot" width={19} height={20} />
          </div>
          <div>
            <div className="text-[#131316] font-medium text-[14px]">
              {label}
            </div>
            <div className="text-[#131316] text-[12px]">{text}</div>
          </div>
        </div>
        <ChevronRight
          size={20}
          color="#56616B"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
      </div>
    </div>
  );
};

export default MenuListThree;
