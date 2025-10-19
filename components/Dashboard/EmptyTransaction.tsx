import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

interface EmptyTransactionProps {
  onClearFilters: () => void;
}

const EmptyTransaction = ({ onClearFilters }: EmptyTransactionProps) => {
  return (
    <div className="md:w-1/3 mx-auto pb-36">
      <div className="space-y-4">
        <Image
          src="/empty.svg"
          alt="empty transaction"
          width={48}
          height={48}
        />
        <div className="font-bold text-[28px]">
          No matching transaction found for the selected filter
        </div>
        <div>
          Change your filters to see more results, or add a new product.
        </div>
        <div>
          <Button
            className="rounded-full bg-[#EFF1F6] text-[#131316] font-semibold text-[16px]"
            size="xl"
            onClick={onClearFilters}
          >
            Clear Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyTransaction;
