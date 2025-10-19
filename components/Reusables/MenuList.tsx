import Link from "next/link";
import React from "react";
import Image from "next/image";

const MenuList = ({
  icon,
  label,
  otherStyles,
}: {
  icon: React.ComponentProps<typeof Image>["src"];
  label: string;
  otherStyles?: string;
}) => {
  return (
    <Link
      href="#"
      className={`flex items-center gap-2 font-semibold text-[16px] text-[#56616B] hover:bg-[#EFF1F6] rounded-[200px] py-3 px-5 ${otherStyles}`}
    >
      <Image src={icon} alt={`${label} icon`} width={20} height={20} />
      {label}
    </Link>
  );
};

export default MenuList;
