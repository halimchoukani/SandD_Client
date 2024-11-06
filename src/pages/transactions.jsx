import React, { useState, useEffect, useContext } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";

export default function Transaction() {

  const [transactionType, setTransactionType] = useState("deposit")
  const [amount, setAmount] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentBalance, setCurrentBalance] = useState(0);
  const { isSignedIn, setIsSignedIn, user, setUser } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if(user){
        setCurrentBalance(user.amount);
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    // Simulating API call
    localStorage.setItem('paymentAmount', amount);
    navigate('/payment');
  }

  const fees = parseFloat(amount) * 0.015
  const total = transactionType === "deposit" ? parseFloat(amount) - fees : parseFloat(amount) + fees

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />
        <div className="min-h-screen bg-slate-950 text-slate-50 p-6 flex items-center justify-center">
        <div className="w-full max-w-md bg-slate-900 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Transaction</h1>
                <div className="text-right">
                <p className="text-sm text-slate-400">Current Balance</p>
                <p className="text-xl font-bold">{currentBalance}  TND</p>
                </div>
            </div>

            <div className="flex bg-slate-800 rounded-md">
                <button
                onClick={() => setTransactionType("deposit")}
                className={`flex-1 py-2 px-4 rounded-l-md transition-colors duration-200 ${
                    transactionType === "deposit" ? "bg-blue-600" : "hover:bg-slate-700"
                }`}
                >
                Deposit
                </button>
                <button
                onClick={() => setTransactionType("withdraw")}
                className={`flex-1 py-2 px-4 rounded-r-md transition-colors duration-200 ${
                    transactionType === "withdraw" ? "bg-blue-600" : "hover:bg-slate-700"
                }`}
                >
                Withdraw
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                <label htmlFor="amount" className="block text-sm font-medium mb-2">
                    Amount
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400">TND</span>
                    <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-12 py-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    required
                    min="10"
                    max="10000"
                    step="0.01"
                    />
                </div>
                {amount && (
                    <p className="mt-2 text-sm text-slate-400">
                    Fees: ${fees} | Total: ${total}
                    </p>
                )}
                </div>

                <div className="space-y-4">
                <div className="flex items-center">
                    <input
                    type="checkbox"
                    id="agree-terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    required
                    />
                    <label htmlFor="agree-terms" className="ml-2 block text-sm text-slate-300">
                    I agree to the terms and conditions for this transaction
                    </label>
                </div>
                </div>

                <div className="bg-slate-800 p-4 rounded-md">
                <p className="text-sm text-slate-300 mb-2">
                    By proceeding, you agree to use your credit card for this transaction. Your card details will be securely processed.
                </p>
                <p className="text-xs text-slate-400">
                    We use industry-standard encryption to protect your financial information.
                </p>
                </div>

                <button
                type="submit"
                disabled={!agreeTerms || isProcessing || !amount}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-md transition duration-200 flex items-center justify-center"
                >
                {isProcessing ? (
                    <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                    </>
                ) : (
                    `${transactionType === "deposit" ? "Add" : "Withdraw"} Money`
                )}
                </button>
            </form>

            <p className="text-xs text-slate-400 text-center">
                {transactionType === "deposit"
                ? "Funds will be added to your account once processed."
                : "Withdrawal may take 1-3 business days to reflect in your bank account."}
            </p>
            </div>
        </div>
        </div>
    <Footer />
    </div>
  )
}