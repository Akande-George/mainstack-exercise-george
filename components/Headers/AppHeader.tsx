"use client";
import Image from "next/image";
import React, { useState } from "react";
import MenuList from "../Reusables/MenuList";
import ProfileDropdown from "../Reusables/MenuDropDowns/ProfileDropdown";
import AppsDropdown from "../Reusables/MenuDropDowns/AppsDropdown";
import { Menu, X } from "lucide-react";

const AppHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="py-3 px-3 sm:px-6 shadow-md rounded-[20px] md:rounded-full">
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={36}
            height={36}
            className="w-8 h-8 sm:w-9 sm:h-9"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-center items-center gap-1 xl:gap-2">
          <MenuList icon="/home-icon.svg" label="Home" />
          <MenuList icon="/analytics-icon.svg" label="Analytics" />
          <MenuList
            icon="/payments-icon.svg"
            label="Revenue"
            otherStyles="text-white bg-[#131316] hover:bg-[#131316]"
          />
          <MenuList icon="/crm-icon.svg" label="CRM" />
          <AppsDropdown />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/notifications-icon.svg"
              alt="notifications"
              width={20}
              height={20}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <Image
              src="/chat-icon.svg"
              alt="chat"
              width={20}
              height={20}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <div className="hidden sm:block">
              <ProfileDropdown />
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full hover:bg-[#EFF1F6] transition-colors"
          >
            {isMobileMenuOpen ? (
              <X size={20} className="text-[#56616B]" />
            ) : (
              <Menu size={20} className="text-[#56616B]" />
            )}
          </button>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex justify-center items-center gap-3 xl:gap-4">
          <Image
            src="/notifications-icon.svg"
            alt="notifications"
            width={20}
            height={20}
            className="cursor-pointer hover:opacity-75 transition-opacity"
          />
          <Image
            src="/chat-icon.svg"
            alt="chat"
            width={20}
            height={20}
            className="cursor-pointer hover:opacity-75 transition-opacity"
          />
          <ProfileDropdown />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-[#EFF1F6]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between py-2 px-3 rounded-full hover:bg-[#EFF1F6] transition-colors">
              <MenuList icon="/home-icon.svg" label="Home" />
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-full hover:bg-[#EFF1F6] transition-colors">
              <MenuList icon="/analytics-icon.svg" label="Analytics" />
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-full bg-[#131316] hover:bg-[#131316] transition-colors">
              <MenuList
                icon="/payments-icon.svg"
                label="Revenue"
                otherStyles="text-white bg-[#131316] hover:bg-[#131316]"
              />
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-full hover:bg-[#EFF1F6] transition-colors">
              <MenuList icon="/crm-icon.svg" label="CRM" />
            </div>
            <div className="py-2 px-3">
              <AppsDropdown />
            </div>
            <div className="sm:hidden pt-2 border-t border-[#EFF1F6] mt-2">
              <ProfileDropdown />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppHeader;
