import { useState, useEffect, useContext } from "react";
import { CheckCircle, Clock, Clock1, Search, Truck } from "lucide-react";
import { Input, Card, CardContent } from "../components/ui";
import Header from "../components/header";
import Footer from "../components/footer";
import gsap from "gsap";
import { Context } from "../App";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(Context);

  useEffect(() => {
    document.title = "S&D - Admin Transactions";
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/transaction/all");
      const data = await response.json();
      if (Array.isArray(data)) {
        const transactionsWithImages = await Promise.all(
          data.map(async (transaction) => {
            const imageRes = await fetch(
              `/api/images/auction/${transaction.auction.id}`
            );
            if (imageRes.ok) {
              const imageData = await imageRes.json();
              if (imageData.length > 0) {
                return { ...transaction, auctionImageUrl: imageData[0].url };
              }
            }
            return transaction;
          })
        );
        setTransactions(transactionsWithImages.reverse());
        setFilteredTransactions(transactionsWithImages);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (transactions.length > 0) {
      gsap.fromTo(
        ".transaction-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
    }
  }, [filteredTransactions]);

  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      const matchesSearch =
        transaction.auction.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.auction.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.buyer.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.seller.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (transaction.transportor &&
          (transaction.transportor.username
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            transaction.transportor.firstname
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            transaction.transportor.lastname
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            transaction.transportor.email
              .toLowerCase()
              .includes(searchTerm.toLowerCase())));

      const matchesStatus =
        statusFilter === "ALL" || transaction.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
    setFilteredTransactions(filtered);
  }, [searchTerm, statusFilter, transactions]);

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-500";
      case "INPROGRESS":
        return "text-yellow-500";
      case "CANCELLED":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const renderUserInfo = (user, role) => (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-blue-400">
        {role} Information
      </h3>
      <div className="flex items-center space-x-4">
        <img
          src={user.imageUrl || `/default-avatar.png`}
          alt={`${role} Avatar`}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold text-gray-200">
            {user.firstname} {user.lastname}
          </p>
          <p className="text-sm text-gray-400">{user.email}</p>
          <p className="text-sm text-gray-400">@{user.username}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-500">
          Admin Transactions
        </h1>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            defaultValue="ALL"
            className="w-full md:w-[200px] bg-gray-800 border-gray-700 text-white rounded-md p-2"
          >
            <option value="ALL">All Statuses</option>
            <option value="COMPLETED">Completed</option>
            <option value="INPROGRESS">In Progress</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">Loading transactions...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTransactions.map((transaction) => (
              <Card
                key={transaction.id}
                className="bg-gray-800 overflow-hidden transaction-card"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                      <img
                        src={`/api/images/upload/auction/${transaction.auctionImageUrl}`}
                        alt={transaction.auction.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h2 className="text-2xl font-semibold mb-2 text-white">
                        {transaction.auction.title}
                      </h2>
                      <div className="flex flex-wrap justify-between items-center mb-4">
                        <span className="font-bold text-green-400 text-xl mb-2 md:mb-0">
                          Amount: {transaction.amount.toLocaleString()}TND
                        </span>
                        <div
                          className={`flex items-center ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          <CheckCircle className="h-5 w-5 mr-2" />
                          <span>Status: {transaction.status}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {renderUserInfo(transaction.buyer, "Buyer")}
                        {renderUserInfo(transaction.seller, "Seller")}
                      </div>
                      {transaction.transportor && (
                        <div className="mt-4">
                          {renderUserInfo(
                            transaction.transportor,
                            "Transporter"
                          )}
                        </div>
                      )}
                      <div className="mt-4 p-4 bg-gray-600 rounded-lg shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                          <div className="flex items-center text-sm text-gray-100 space-x-2">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">
                              Transaction Date:
                            </span>
                            <span>
                              {new Date(
                                transaction.transaction_date
                              ).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-100 space-x-2">
                            <Truck className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium">
                              Delivery Status:
                            </span>
                            <span>
                              {transaction.delivery_status || "Pending"}
                            </span>
                          </div>
                        </div>
                      </div>
                      {transaction.delivery_adress && (
                        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                          <h4 className="font-semibold text-blue-400 mb-2">
                            Delivery Address:
                          </h4>
                          <p className="text-gray-300">
                            {transaction.delivery_adress}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">
              No transactions found matching your search.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
