import React from "react";
import LedgerCard from "../Reusables/LedgerCard";
import { Wallet as WalletType } from "@/types/api";

interface LedgerProps {
  walletData: WalletType | null;
}

const Ledger = ({ walletData }: LedgerProps) => {
  return (
    <div className="space-y-6">
      <LedgerCard
        amount={walletData?.ledger_balance || 0}
        label="Ledger Balance"
        currency={walletData?.currency || "USD"}
      />
      <LedgerCard
        amount={walletData?.total_payout || 0}
        label="Total Payout"
        currency={walletData?.currency || "USD"}
      />
      <LedgerCard
        amount={walletData?.total_revenue || 0}
        label="Total Revenue"
        currency={walletData?.currency || "USD"}
      />
      <LedgerCard
        amount={walletData?.pending_payout || 0}
        label="Pending Payout"
        currency={walletData?.currency || "USD"}
      />
    </div>
  );
};

export default Ledger;
