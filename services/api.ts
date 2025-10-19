import apiClient from "@/lib/axios";

// User data
export const fetchUser = async () => {
  try {
    const response = await apiClient.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Wallet/Ledger balance
export const fetchWallet = async () => {
  try {
    const response = await apiClient.get("/wallet");
    return response.data;
  } catch (error) {
    console.error("Error fetching wallet:", error);
    throw error;
  }
};

// Transaction data
export const fetchTransactions = async () => {
  try {
    const response = await apiClient.get("/transactions");
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
