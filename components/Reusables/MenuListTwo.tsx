import Link from "next/link";
import React from "react";
import { LucideIcon } from "lucide-react";

const MenuListTwo = ({
  icon: Icon,
  label,
  otherStyles,
}: {
  icon: LucideIcon;
  label: string;
  otherStyles?: string;
}) => {
  return (
    <Link
      href="#"
      className={`flex items-center gap-2 font-medium text-[14px] rounded-[200px] py-3 ${otherStyles}`}
    >
      <Icon size={20} color="#56616B" className="mr-2" />
      {label}
    </Link>
  );
};

export default MenuListTwo;
