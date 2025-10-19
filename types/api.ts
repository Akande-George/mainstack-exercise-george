export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Wallet {
  balance: number;
  currency: string;
  ledger_balance?: number;
  total_payout?: number;
  total_revenue?: number;
  pending_payout?: number;
}

export interface Transaction {
  id: string;
  amount: number;
  type: string;
  status: string;
  date: string;
  metadata?: {
    name?: string;
    description?: string;
    product_name?: string;
  };
}
