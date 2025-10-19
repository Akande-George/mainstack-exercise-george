"use client";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { fetchUser, fetchWallet, fetchTransactions } from "@/services/api";
import TransactionsChart from "@/components/Charts/Transactions";
import Ledger from "@/components/Dashboard/Ledger";
import Wallet from "@/components/Dashboard/Wallet";
import TableHeader from "@/components/Reusables/TableHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TimeCard from "@/components/Reusables/TimeCard";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import TransactionData from "@/components/Dashboard/TransactionData";
import { User, Wallet as WalletType, Transaction } from "@/types/api";
import Loader from "@/components/ui/loader";

export default function Home() {
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [multiSelectOpen, setMultiSelectOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [statusSelectOpen, setStatusSelectOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [userData, setUserData] = useState<User | null>(null);
  const [walletData, setWalletData] = useState<WalletType | null>(null);
  const [transactionData, setTransactionData] = useState<Transaction[] | null>(
    null
  );
  const [filteredTransactionData, setFilteredTransactionData] = useState<
    Transaction[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const options = [
    "Store Transactions",
    "Get Tipped",
    "Withdrawals",
    "Chargebacks",
    "Cashbacks",
    "Refer & Earn",
  ];

  const statusOptions = ["Successful", "Pending", "Failed"];

  const handleCheckboxChange = (item: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    }
  };

  const handleStatusCheckboxChange = (item: string, checked: boolean) => {
    if (checked) {
      setSelectedStatus([...selectedStatus, item]);
    } else {
      setSelectedStatus(selectedStatus.filter((i) => i !== item));
    }
  };

  const handleTimeCardClick = (timeRange: string) => {
    const now = new Date();
    let start: Date;

    switch (timeRange) {
      case "Today":
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        setStartDate(start);
        setEndDate(now);
        break;
      case "Last 7 days":
        start = new Date(now);
        start.setDate(start.getDate() - 7);
        setStartDate(start);
        setEndDate(now);
        break;
      case "This month":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        setStartDate(start);
        setEndDate(now);
        break;
    }
  };

  const clearFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedItems([]);
    setSelectedStatus([]);

    // Reset filtered data to show all transactions
    setFilteredTransactionData(transactionData);
  };

  const applyFilters = () => {
    if (!transactionData) return;

    let filtered = [...transactionData];

    // Filter by date range
    if (startDate || endDate) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date);

        if (startDate && endDate) {
          return transactionDate >= startDate && transactionDate <= endDate;
        } else if (startDate) {
          return transactionDate >= startDate;
        } else if (endDate) {
          return transactionDate <= endDate;
        }
        return true;
      });
    }

    // Filter by transaction type
    if (selectedItems.length > 0) {
      filtered = filtered.filter((transaction) => {
        // Map transaction types to filter options
        if (
          selectedItems.includes("Withdrawals") &&
          transaction.type === "withdrawal"
        ) {
          return true;
        }
        if (
          transaction.metadata?.product_name &&
          (selectedItems.includes("Store Transactions") ||
            selectedItems.includes("Get Tipped") ||
            selectedItems.includes("Cashbacks") ||
            selectedItems.includes("Refer & Earn"))
        ) {
          return true;
        }
        return false;
      });
    }

    // Filter by status
    if (selectedStatus.length > 0) {
      filtered = filtered.filter((transaction) => {
        return selectedStatus.some(
          (status) => transaction.status.toLowerCase() === status.toLowerCase()
        );
      });
    }

    setFilteredTransactionData(filtered);
    setSheetOpen(false);
  };

  // Initialize filtered data when transaction data loads
  useEffect(() => {
    if (transactionData) {
      setFilteredTransactionData(transactionData);
    }
  }, [transactionData]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [user, wallet, transactions] = await Promise.all([
          fetchUser(),
          fetchWallet(),
          fetchTransactions(),
        ]);

        setUserData(user);
        setWalletData(wallet);
        setTransactionData(transactions);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Error loading data: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 lg:gap-12">
            {/* Left Section - Wallet & Chart */}
            <div className="lg:col-span-5 space-y-6">
              <Wallet walletData={walletData} />
              <div className="pt-4 lg:pt-8">
                <TransactionsChart transactionData={filteredTransactionData} />
              </div>
            </div>

            {/* Right Section - Ledger */}
            <div className="lg:col-span-2 order-first lg:order-last">
              <Ledger walletData={walletData} />
            </div>
          </div>

          {/* Table Header & Filters */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <TableHeader
              transactionData={transactionData}
              filteredCount={filteredTransactionData?.length}
              isFiltered={
                selectedItems.length > 0 ||
                selectedStatus.length > 0 ||
                startDate !== undefined ||
                endDate !== undefined
              }
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger className="w-full sm:w-auto">
                  <Button
                    className="bg-[#EFF1F6] text-[14px] sm:text-[16px] text-[#131316] rounded-full py-3 sm:py-4 px-4 sm:px-6 font-semibold hover:text-white w-full sm:w-auto"
                    size={undefined}
                  >
                    Filter
                    {(selectedItems.length > 0 ||
                      selectedStatus.length > 0 ||
                      startDate ||
                      endDate) && (
                      <span className="ml-1 bg-[#131316] text-white text-[10px] px-2 py-1 rounded-full">
                        {filteredTransactionData?.length || 0}
                      </span>
                    )}
                    <Image
                      src="/carret-icon-down.svg"
                      alt="Filter"
                      width={10.68}
                      height={6.02}
                      className="ml-2"
                    />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:w-[400px] h-full rounded-none sm:rounded-[20px] sm:m-2 sm:h-[98vh]">
                  <SheetHeader>
                    <SheetTitle>
                      <div className="text-[#131316] text-[20px] sm:text-[24px] font-bold">
                        Filter
                      </div>
                    </SheetTitle>
                    <SheetDescription>
                      <div className="pt-4 sm:pt-6 space-y-4 sm:space-y-5 h-full flex flex-col">
                        <div className="flex-1 space-y-4 sm:space-y-5">
                          {/* Time Cards */}
                          <div className="flex flex-wrap sm:flex-nowrap justify-start gap-2 items-center overflow-x-auto">
                            <TimeCard
                              time="Today"
                              onClick={() => handleTimeCardClick("Today")}
                            />
                            <TimeCard
                              time="Last 7 days"
                              onClick={() => handleTimeCardClick("Last 7 days")}
                            />
                            <TimeCard
                              time="This month"
                              onClick={() => handleTimeCardClick("This month")}
                            />
                          </div>

                          {/* Date Range */}
                          <div>
                            <Label htmlFor="date" className="px-1">
                              <div className="text-[#131316] text-[14px] font-semibold mb-2">
                                Date Range
                              </div>
                            </Label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <Popover
                                  open={startOpen}
                                  onOpenChange={setStartOpen}
                                >
                                  <PopoverTrigger asChild>
                                    <Button className="w-full justify-between h-[48px] font-normal bg-[#EFF1F6] hover:bg-[#EFF1F6] border border-[#EFF1F6] text-[#131316] hover:text-[#131316]">
                                      <span className="truncate">
                                        {startDate
                                          ? startDate.toLocaleDateString()
                                          : "Start date"}
                                      </span>
                                      <ChevronDownIcon
                                        color="#31373D"
                                        className="ml-2 flex-shrink-0"
                                      />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto overflow-hidden p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={startDate}
                                      captionLayout="dropdown"
                                      onSelect={(date) => {
                                        setStartDate(date);
                                        setStartOpen(false);
                                      }}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div>
                                <Popover
                                  open={endOpen}
                                  onOpenChange={setEndOpen}
                                >
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full justify-between font-normal h-[48px] bg-[#EFF1F6] hover:bg-[#EFF1F6] border border-[#EFF1F6] text-[#131316] hover:text-[#131316]"
                                    >
                                      <span className="truncate">
                                        {endDate
                                          ? endDate.toLocaleDateString()
                                          : "End date"}
                                      </span>
                                      <ChevronDownIcon className="ml-2 flex-shrink-0" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto overflow-hidden p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={endDate}
                                      captionLayout="dropdown"
                                      onSelect={(date) => {
                                        setEndDate(date);
                                        setEndOpen(false);
                                      }}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                          </div>

                          {/* Transaction Type */}
                          <div>
                            <Label className="px-1">
                              <div className="text-[#131316] text-[14px] font-semibold mb-2">
                                Transaction Type
                              </div>
                            </Label>
                            <Popover
                              open={multiSelectOpen}
                              onOpenChange={setMultiSelectOpen}
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-between font-normal h-[48px] bg-[#EFF1F6] hover:bg-[#EFF1F6] border border-[#EFF1F6] text-[#131316] hover:text-[#131316]"
                                >
                                  <Input
                                    readOnly
                                    value={selectedItems.join(", ")}
                                    placeholder="Select transaction types"
                                    className="border-none bg-transparent p-0 h-auto focus-visible:ring-0 cursor-pointer truncate"
                                  />
                                  <ChevronDownIcon
                                    color="#31373D"
                                    className="ml-2 flex-shrink-0"
                                  />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-[300px] sm:w-[352px] p-2"
                                align="start"
                              >
                                <div className="p-2 sm:p-4 space-y-4 sm:space-y-8">
                                  {options.map((option) => (
                                    <div
                                      key={option}
                                      className="flex items-center space-x-2"
                                    >
                                      <Checkbox
                                        id={option}
                                        checked={selectedItems.includes(option)}
                                        onCheckedChange={(checked) =>
                                          handleCheckboxChange(
                                            option,
                                            checked as boolean
                                          )
                                        }
                                      />
                                      <Label
                                        htmlFor={option}
                                        className="text-[14px] sm:text-[16px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                      >
                                        {option}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>

                          {/* Transaction Status */}
                          <div>
                            <Label className="px-1">
                              <div className="text-[#131316] text-[14px] font-semibold mb-2">
                                Transaction Status
                              </div>
                            </Label>
                            <Popover
                              open={statusSelectOpen}
                              onOpenChange={setStatusSelectOpen}
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-between font-normal h-[48px] bg-[#EFF1F6] hover:bg-[#EFF1F6] border border-[#EFF1F6] text-[#131316] hover:text-[#131316]"
                                >
                                  <Input
                                    readOnly
                                    value={selectedStatus.join(", ")}
                                    placeholder="Select transaction status"
                                    className="border-none bg-transparent p-0 h-auto focus-visible:ring-0 cursor-pointer truncate"
                                  />
                                  <ChevronDownIcon
                                    color="#31373D"
                                    className="ml-2 flex-shrink-0"
                                  />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-[300px] sm:w-[352px] p-2"
                                align="start"
                              >
                                <div className="p-2 sm:p-4 space-y-4 sm:space-y-8">
                                  {statusOptions.map((option) => (
                                    <div
                                      key={option}
                                      className="flex items-center space-x-2"
                                    >
                                      <Checkbox
                                        id={option}
                                        checked={selectedStatus.includes(
                                          option
                                        )}
                                        onCheckedChange={(checked) =>
                                          handleStatusCheckboxChange(
                                            option,
                                            checked as boolean
                                          )
                                        }
                                      />
                                      <Label
                                        htmlFor={option}
                                        className="text-[14px] sm:text-[16px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                      >
                                        {option}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>

                        {/* Filter Actions */}
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center items-center mt-auto pt-6">
                          <Button
                            variant="outline"
                            className="text-[#131316] rounded-full py-2 px-8 sm:px-16 font-semibold text-[14px] sm:text-[16px] w-full sm:w-auto"
                            onClick={clearFilters}
                          >
                            Clear
                          </Button>
                          <Button
                            className="rounded-full py-2 px-8 sm:px-16 font-semibold text-[14px] sm:text-[16px] w-full sm:w-auto"
                            onClick={applyFilters}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <Button
                className="bg-[#EFF1F6] text-[14px] sm:text-[16px] text-[#131316] rounded-full py-3 sm:py-4 px-4 sm:px-6 font-semibold hover:text-white w-full sm:w-auto"
                size={undefined}
              >
                Export List
                <Image
                  src="/download-icon.svg"
                  alt="Download"
                  width={16}
                  height={16}
                  className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                />
              </Button>
            </div>
          </div>

          <hr className="border-t border-[#EFF1F6]" />

          {/* Transaction Data */}
          <div>
            <TransactionData
              transactionData={filteredTransactionData}
              onClearFilters={clearFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
