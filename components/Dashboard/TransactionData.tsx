import React from "react";
import Image from "next/image";
import { Transaction } from "@/types/api";
import EmptyTransaction from "./EmptyTransaction";

interface TransactionDataProps {
  transactionData: Transaction[] | null;
  onClearFilters?: () => void;
}

const TransactionData = ({
  transactionData,
  onClearFilters,
}: TransactionDataProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "successful":
      case "success":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "failed":
      case "failure":
        return "text-red-600";
      default:
        return "text-[#56616B]";
    }
  };

  const getTransactionDetails = (transaction: Transaction) => {
    if (transaction.metadata?.product_name) {
      return {
        title: transaction.metadata.product_name,
        subtitle: transaction.metadata?.name || transaction.status,
        icon: "/inflow-icon.svg",
        isWithdrawal: false,
      };
    } else {
      return {
        title: "Withdrawal",
        subtitle: transaction.status,
        icon: "/outflow-icon.svg",
        isWithdrawal: true,
      };
    }
  };

  if (!transactionData || transactionData.length === 0) {
    return (
      <div className="">
        <EmptyTransaction onClearFilters={onClearFilters || (() => {})} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactionData.slice(0, 10).map((transaction, index) => {
        const details = getTransactionDetails(transaction);

        return (
          <div
            key={`${transaction.date}-${transaction.amount}-${index}`}
            className="flex justify-between items-center py-4"
          >
            <div className="flex justify-start items-center gap-3">
              <Image
                src={details.icon}
                alt="transaction"
                width={48}
                height={48}
              />
              <div>
                <div className="font-medium text-[#131316] text-[16px]">
                  {details.title}
                </div>
                <div
                  className={`font-medium text-[14px] ${
                    details.isWithdrawal
                      ? getStatusColor(transaction.status)
                      : "text-[#56616B]"
                  } capitalize`}
                >
                  {details.subtitle}
                </div>
              </div>
            </div>
            <div>
              <div className="font-bold text-[16px] text-[#131316] flex justify-end">
                USD {formatCurrency(transaction.amount)}
              </div>
              <div className="font-medium text-[#56616B] text-[14px] flex justify-end">
                {formatDate(transaction.date)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionData;
