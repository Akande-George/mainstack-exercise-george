import React from "react";
import { Button } from "../ui/button";
import { Wallet as WalletType } from "@/types/api";

interface WalletProps {
  walletData: WalletType | null;
}

const Wallet = ({ walletData }: WalletProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="">
      <div className="text-[#56616B] font-medium text-[14px]">
        Available Balance
      </div>
      <div className="flex justify-start items-end gap-16">
        <div className="font-bold text-[24px] md:text-[36px]">
          {walletData?.currency || "USD"}{" "}
          {formatCurrency(walletData?.balance || 0)}
        </div>
        <Button className="rounded-full font-semibold px-12" size={"xl"}>
          Withdraw
        </Button>
      </div>
    </div>
  );
};

export default Wallet;
