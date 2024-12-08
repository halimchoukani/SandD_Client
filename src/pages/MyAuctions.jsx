import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Clock, Trash2, Eye } from "lucide-react";
import { Input, Card, CardContent } from "../components/ui";
import Header from "../components/header";
import Footer from "../components/footer";
import gsap from "gsap";
import { jwtDecode } from "jwt-decode";
import useGetUser from "./hooks/useGetUser";

export default function MyAuctions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [auctions, setAuctions] = useState([]);
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { user: userData, loading, error: fetchError } = useGetUser();

  // Set the user data and loading state when userData changes
  useEffect(() => {
    if (userData) {
      setUser(userData);
      setId(userData.id);
      setIsLoading(false);
    }
    if (fetchError) {
      setError(fetchError.message);
      setIsLoading(false);
    }
  }, [userData, fetchError]);

  useEffect(() => {
    if (id) {
      const getAuctions = async () => {
        try {
          const res = await fetch(`/api/auction/user/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();

          if (Array.isArray(data)) {
            const newData = await Promise.all(
              data.map(async (auction) => {
                const res2 = await fetch(`/api/images/auction/${auction.id}`);
                if (res2.ok) {
                  const imageData = await res2.json();
                  if (imageData.length > 0) {
                    return { ...auction, url: imageData[0].url };
                  }
                }
                return auction;
              })
            );
            setAuctions(newData.reverse());
          } else {
            console.error("Invalid response: auctions is not an array");
            setAuctions([]);
          }
        } catch (error) {
          console.error("Error fetching auctions:", error);
        }
      };

      getAuctions();
    }
  }, [id]); // Trigger fetching auctions only after `id` is set

  useEffect(() => {
    document.title = "S&D - My Auctions"; // Change the page title
  }, []);

  useEffect(() => {
    if (auctions.length > 0) {
      gsap.fromTo(
        ".card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
    }
  }, [auctions]);

  // Filtering auctions by search term
  const filteredAuctions = auctions.filter((auction) =>
    auction.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-500">My Auctions</h1>

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
                    placeholder="Search auctions..."
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Auctions Grid */}
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
                        Image{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-white capitalize "
                      >
                        {" "}
                        Title{" "}
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
                        Status{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-white capitalize"
                      >
                        {" "}
                        End Time{" "}
                      </th>
                      <th
                        scope="col"
                        className="p-5 text-left text-sm leading-6 font-semibold text-white capitalize"
                      >
                        {" "}
                        Actions{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300 ">
                    {filteredAuctions.map((auction) => (
                      <tr
                        key={auction.id}
                        className="bg-gray-900 hover:bg-gray-700 cursor-pointer card"
                      >
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white ">
                          <span className="text-sm text-gray-400 flex items-center">
                            {auction.id}
                          </span>
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white">
                          <img
                            src={`/api/images/upload/auction/${auction.url}`}
                            alt={auction.title}
                            className="w-[50px] h-[50px] object-cover rounded-full"
                          />
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white">
                          <h2 className="text-xl font-semibold mb-2 text-white">
                            {auction.title}
                          </h2>
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white">
                          <span className="font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                            $
                            {auction.startPrice
                              ? auction.currentPrice.toLocaleString()
                              : "N/A"}
                          </span>
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white">
                          <span
                            className={`font-bold ${
                              auction.status === "OPEN"
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {auction.status === "OPEN" ? "OPEN" : "CLOSE"}
                          </span>
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white">
                          <span className="text-sm text-gray-400 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(auction.endTime).toLocaleString()}
                          </span>
                        </td>
                        <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white flex flex-row items-center justify-evenly">
                          <Link to={`/auction/${auction.id}`}>
                            <Eye color="#2bbfe3" />
                          </Link>
                          <Trash2 color="rgb(255,76,76)" />
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

        {filteredAuctions.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">
              No auctions found matching your criteria.
            </p>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">Loading auctions...</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
