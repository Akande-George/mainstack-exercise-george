import Image from "next/image";
import React from "react";
import MenuList from "../Reusables/MenuList";
import ProfileDropdown from "../Reusables/MenuDropDowns/ProfileDropdown";
import AppsDropdown from "../Reusables/MenuDropDowns/AppsDropdown";

const AppHeader = () => {
  return (
    <div className="py-3 px-6 shadow-md rounded-full">
      <div className="flex justify-between items-center">
        <div>
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </div>
        <div className="flex justify-center items-center gap-2">
          <MenuList icon="/home-icon.svg" label="Home" />
          <MenuList icon="/analytics-icon.svg" label="Analytics" />
          <MenuList
            icon="/payments-icon.svg"
            label="Revenue"
            otherStyles="text-white bg-[#131316] hover:bg-[#131316]"
          />
          <MenuList icon="/crm-icon.svg" label="CRM" />
          {/* <MenuList icon="/apps-icon.svg" label="Apps" /> */}
          <AppsDropdown />
        </div>
        <div className="flex justify-center items-center gap-4">
          <Image
            src="/notifications-icon.svg"
            alt="notifications"
            width={20}
            height={20}
          />
          <Image src="/chat-icon.svg" alt="chat" width={20} height={20} />
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
