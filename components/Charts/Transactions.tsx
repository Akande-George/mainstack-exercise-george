"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "@/types/api";

interface TransactionsChartProps {
  transactionData: Transaction[] | null;
}

const TransactionsChart = ({ transactionData }: TransactionsChartProps) => {
  const processChartData = () => {
    if (!transactionData || transactionData.length === 0) {
      return [];
    }
    const groupedData = transactionData.reduce((acc, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString();

      if (!acc[date]) {
        acc[date] = {
          date,
          amount: 0,
          count: 0,
        };
      }

      acc[date].amount += transaction.amount;
      acc[date].count += 1;

      return acc;
    }, {} as Record<string, { date: string; amount: number; count: number }>);

    return Object.values(groupedData).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  const chartData = processChartData();

  if (!chartData.length) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <div className="text-[#56616B]">No transaction data available</div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="date" />
          <Tooltip
            formatter={(value: number) => [
              `$${value.toLocaleString()}`,
              "Amount",
            ]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#FF5403"
            strokeWidth={1}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionsChart;
