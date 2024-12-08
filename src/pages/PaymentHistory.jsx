import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/footer";
import Header from "../components/header";
import { Context } from "../App";

export default function PaymentHistory() {
  const [initialPayments, setInitialPayments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [expandedTransaction, setExpandedTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const { isSignedIn, setIsSignedIn, user } = useContext(Context);

  useEffect(() => {
    const filtered = initialPayments.filter(
      (transaction) =>
        transaction.user.firstname
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        (filter === "all" || transaction.type === filter)
    );
    setTransactions(filtered);
  }, [searchTerm, filter]);

  useEffect(() => {
    const fetchPayments = async () => {
      if (user) {
        const res = await fetch(`/api/payment/secure/get/user/${user.id}`);
        if (res.ok) {
          const ArrayResult = await res.json();
          const finalResult = ArrayResult.map((deposit) => ({
            ...deposit,
            type: "deposit",
          }));
          setTransactions(finalResult);
          setInitialPayments(finalResult);
        }
      }
    };
    fetchPayments();
  }, [user]);

  const toggleTransaction = (id) => {
    setExpandedTransaction(expandedTransaction === id ? null : id);
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const renderTransaction = (transaction) => (
    <motion.div
      key={transaction.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mb-4 bg-slate-800 rounded-lg overflow-hidden shadow-md"
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src={transaction.user.imageUrl || `/default-avatar.png`}
              alt="Seller Avatar"
              className="w-10 h-10 rounded-full"
            />

            <div>
              <p className="text-sm font-medium text-slate-100">
                {transaction.user.lastname} {transaction.user.firstname}
              </p>
              <p className="text-xs text-slate-400">
                {formatDate(transaction.paymentTime)}
              </p>
            </div>
          </div>
          <div className="text-right flex items-center space-x-2">
            <p
              className={`text-sm font-bold ${
                transaction.type === "deposit"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {transaction.type === "deposit" ? "↑" : "↓"}{" "}
              {formatAmount(transaction.amount)}
            </p>
            <button
              onClick={() => toggleTransaction(transaction.id)}
              className="text-slate-400 hover:text-slate-100"
            >
              {expandedTransaction === transaction.id ? "▲" : "▼"}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {expandedTransaction === transaction.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-slate-700 text-sm text-slate-300"
            >
              <p>Transaction ID: {transaction.id}</p>
              <p>
                Type:{" "}
                {transaction.type === "deposit" ? "Deposit" : "Withdrawal"}
              </p>
              <p>Category: {transaction.category}</p>
              <p>Date: {formatDate(transaction.paymentTime)}</p>
              <p>Status: {transaction.status}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"></div>

        <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
          <div className="w-full max-w-4xl mx-auto bg-slate-900 rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-6">
              Account Funding and Withdrawal History
            </h1>
            <div className="flex space-x-4 mb-6">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-2 top-2.5 text-slate-400">
                  🔍
                </span>
              </div>
              <button
                onClick={() =>
                  setFilter(
                    filter === "all"
                      ? "deposit"
                      : filter === "deposit"
                      ? "withdraw"
                      : "all"
                  )
                }
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-slate-100 hover:bg-slate-700"
              >
                {filter === "all"
                  ? "All"
                  : filter === "deposit"
                  ? "Deposits"
                  : "Withdrawals"}
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <button
                onClick={() => setFilter("all")}
                className={`mr-2 px-4 py-2 rounded-md ${
                  filter === "all" ? "bg-blue-600" : "bg-slate-800"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("deposit")}
                className={`mr-2 px-4 py-2 rounded-md ${
                  filter === "deposit" ? "bg-blue-600" : "bg-slate-800"
                }`}
              >
                Deposits
              </button>
              <button
                onClick={() => setFilter("withdraw")}
                className={`px-4 py-2 rounded-md ${
                  filter === "withdraw" ? "bg-blue-600" : "bg-slate-800"
                }`}
              >
                Withdrawals
              </button>
            </div>
            <div className="space-y-4">
              {transactions.map(renderTransaction)}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
