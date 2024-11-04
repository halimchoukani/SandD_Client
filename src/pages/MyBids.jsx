import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Clock, Trash2, Eye } from "lucide-react";
import { Input, Card, CardContent } from "../components/ui";
import Header from "../components/header";
import Footer from "../components/footer";
import gsap from "gsap";
import useBids from "./hooks/useBids";
import { Context } from "../App";

export default function MyBids() {
  const { isSignedIn, user } = useContext(Context);

  const [bids, setBids] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("User fromcontext :", user); // Debugging user value
      setUserId(user.id);
    } else {
      console.log("User is null, userId not set");
    }
  }, [user]);

  // Always call useBids, passing userId only when it exists
  const { bids: bidsByUser, loading: isLoading, error } = useBids(userId);

  useEffect(() => {
    if (bidsByUser?.length > 0) {
      gsap.fromTo(
        ".card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
    }
  }, [bidsByUser]);

  const filtredBids =
    bidsByUser?.filter((bid) =>
      bid.auction.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-500">My Bids</h1>

        {/* Search Section */}
        <Card className="mb-8 bg-transparent border-none">
          <CardContent>
            <div className="h-full flex flex-col gap-4 justify-center items-center md:flex-row md:items-center">
              <div className="flex-grow">
                <div className="relative">
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    placeholder="Search bids..."
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Bids Grid */}
        <div className="flex flex-col">
          <div className=" overflow-x-auto pb-3">
            <div className="min-w-full inline-block align-middle">
              <div className="border rounded-xl border-gray-700 ">
                <table className="min-w-full  rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-gray-600">
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-white capitalize"
                      >
                        {" "}
                        id{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-white capitalize"
                      >
                        {" "}
                        Auction id{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-white capitalize"
                      >
                        {" "}
                        Auction Title{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-white capitalize "
                      >
                        {" "}
                        Auction State{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-white capitalize"
                      >
                        {" "}
                        Price{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-white capitalize"
                      >
                        {" "}
                        Current Price{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-white capitalize"
                      >
                        {" "}
                        Auction End Time{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300 ">
                    {filtredBids.map((bid) => (
                      <tr
                        key={bid.id}
                        className="bg-gray-900 hover:bg-gray-700 cursor-pointer card"
                        onClick={() => navigate(`/auction/${bid.auction.id}`)}
                      >
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white ">
                          <span className="text-sm text-gray-400 flex items-center">
                            {bid.id}
                          </span>
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white">
                          <h2 className="text-xl font-semibold mb-2 text-white">
                            {bid.auction.id}
                          </h2>
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white">
                          <h2 className="text-xl font-semibold mb-2 text-white">
                            {bid.auction.title}
                          </h2>
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white">
                          <span
                            className={`font-bold ${
                              bid.auction.status === "OPEN"
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {bid.auction.status === "OPEN" ? "OPEN" : "CLOSE"}
                          </span>
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white">
                          <span className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                            ${bid.amount ? bid.amount.toLocaleString() : "N/A"}
                          </span>
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white">
                          <span className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                            $
                            {bid.auction.currentPrice
                              ? bid.auction.currentPrice.toLocaleString()
                              : "N/A"}
                          </span>
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white">
                          <span className="text-sm text-gray-400 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(bid.auction.endTime).toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full rounded-lg overflow-hidden">
          <div className="w-full">
            <ul className="w-full"></ul>
          </div>
        </div>

        {filtredBids.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">
              No Bids found matching your criteria.
            </p>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">Loading bids...</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
