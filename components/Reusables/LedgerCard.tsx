import Image from "next/image";
import React from "react";

interface LedgerCardProps {
  label: string;
  amount: number;
  currency?: string;
}

const LedgerCard = ({ label, amount, currency = "USD" }: LedgerCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-3 py-1">
      <div className="flex justify-between items-center">
        <div className="text-[#56616B] text-[14px]">{label}</div>
        <Image src="/info-icon.svg" alt="info" width={20} height={20} />
      </div>
      <div className="font-bold text-[28px]">
        {currency} <span className="font-bold">{formatCurrency(amount)}</span>
      </div>
    </div>
  );
};

export default LedgerCard;
