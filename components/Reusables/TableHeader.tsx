import React from "react";
import { Transaction } from "@/types/api";

interface TableHeaderProps {
  transactionData: Transaction[] | null;
  filteredCount?: number;
  isFiltered?: boolean;
}

const TableHeader = ({
  transactionData,
  filteredCount,
  isFiltered,
}: TableHeaderProps) => {
  const getTransactionCount = () => {
    if (isFiltered && filteredCount !== undefined) {
      return filteredCount;
    }
    return transactionData?.length || 0;
  };

  const getSubtitleText = () => {
    if (isFiltered) {
      return `Showing ${getTransactionCount()} filtered transactions`;
    }
    return "Your transactions for the last 7 days";
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold text-[24px]">
            <span className="font-bold">{getTransactionCount()}</span>{" "}
            Transactions
          </div>
          <div className="text-[#56616B] text-[14px]">{getSubtitleText()}</div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default TableHeader;
