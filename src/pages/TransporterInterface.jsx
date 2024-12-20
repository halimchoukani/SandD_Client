import React, { useContext, useState } from "react";
import { Check, Loader, Truck, X } from "lucide-react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
} from "../components/ui";
import Header from "../components/header";
import useGetTransactions from "./hooks/useGetTransactions";
import { Context } from "../App";

const TransporterInterface = () => {
  const { user } = useContext(Context);
  const { transactions, setTransactions, loading, error } =
    useGetTransactions();
  const [actionLoading, setActionLoading] = useState(null); // Track which transaction is being acted upon

  const createTransaction = async (id) => {
    setActionLoading(id);
    try {
      const response = await fetch(
        `/api/transaction/${id}/started/${user.id}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) throw new Error("Failed to create transaction");
      const data = await response.json();
      console.log(data);
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === id
            ? { ...transaction, status: "INPROGRESS" }
            : transaction
        )
      );
    } catch (err) {
      console.error("Error creating transaction:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const deliverTransaction = async (id) => {
    setActionLoading(id);
    try {
      const response = await fetch(`/api/transaction/delivered/${id}`, {
        method: "PUT",
      });
      if (!response.ok) throw new Error("Failed to deliver transaction");
      const data = await response.json();
      console.log(data);
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === id
            ? { ...transaction, status: "DELIVERED" }
            : transaction
        )
      );
    } catch (err) {
      console.error("Error finishing transaction:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "NotStarted":
        return (
          <Badge variant="secondary" className="text-white bg-orange-500">
            Not Started
          </Badge>
        );
      case "INPROGRESS":
        return (
          <Badge variant="secondary" className="text-white bg-green-500">
            In Progress
          </Badge>
        );
      case "DELIVERED":
        return <Badge variant="secondary">Delivered</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-400 flex items-center">
              <Truck className="mr-2" />
              Transporter Interface
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Available Transactions
              </h3>
              {loading && <p>Loading transactions...</p>}
              {error && <p className="text-red-400">{error}</p>}
              {!loading && !error && transactions && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="px-6 py-3 text-left">Item</th>
                        <th className="px-6 py-3 text-left">Weight</th>
                        <th className="px-6 py-3 text-left">From</th>
                        <th className="px-6 py-3 text-left">To</th>
                        <th className="px-6 py-3 text-left">Date</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-left">Cost</th>
                        <th className="px-6 py-3 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="border-b border-gray-800"
                        >
                          <td className="px-6 py-4">
                            {transaction.auction.title}
                          </td>
                          <td className="px-6 py-4">
                            {transaction.auction.weight} kg
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              {" "}
                              <b>Adress :</b> {transaction.seller.address}
                            </div>
                            <div>
                              <b>Phone Number :</b>{" "}
                              {transaction.seller.phoneNumber}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <b>Adress :</b> {transaction.buyer.address}
                            </div>
                            <div>
                              <b>Phone Number :</b>
                              {transaction.buyer.phoneNumber}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {transaction.creation_date}
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(transaction.status)}
                          </td>
                          <td className="px-6 py-4">
                            {transaction.transporter_price.toFixed(2)} TND
                          </td>
                          <td className="px-6 py-4">
                            {transaction.status === "NotStarted" ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-400 hover:text-green-300"
                                onClick={() =>
                                  createTransaction(transaction.id)
                                } // Use function reference
                                disabled={actionLoading === transaction.id} // Disable button when action is in progress
                              >
                                {actionLoading === transaction.id ? (
                                  <Loader className="h-8 w-8 animate-spin" />
                                ) : (
                                  <Check className="h-8 w-8" />
                                )}
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-400 hover:text-green-300"
                                onClick={() =>
                                  deliverTransaction(transaction.id)
                                } // Use function reference
                                disabled={actionLoading === transaction.id} // Disable button when action is in progress
                              >
                                {actionLoading === transaction.id ? (
                                  <Loader className="h-8 w-8 animate-spin" />
                                ) : (
                                  <p>Done</p>
                                )}
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TransporterInterface;
