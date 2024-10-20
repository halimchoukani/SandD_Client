import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Clock, Trash2, Eye, Pencil } from "lucide-react";
import { Button, Input, Card, CardContent, CardFooter } from "./ui";
import Header from "./header";
import Footer from "./footer";
import gsap from "gsap";
import { jwtDecode } from "jwt-decode";

export default function MyAuctions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [auctions, setAuctions] = useState([]);
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const decoded = jwtDecode(token);
        const response = await fetch(
          `http://localhost:8089/api/user/get/${decoded.sub}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const userData = await response.json();
        setId(userData.id);
        setIsLoading(false);
      } catch (err) {
        console.error(
          "An error occurred while fetching your profile. Please try again later.",
          err
        );
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (id) {
      const getAuctions = async () => {
        try {
          const res = await fetch(
            `http://localhost:8089/api/auction/user/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();

          console.log("API response:", data); // Log the response data

          if (Array.isArray(data)) {
            setAuctions(data);
            console.log(data);
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
        <div class="flex flex-col">
          <div class=" overflow-x-auto pb-3">
            <div class="min-w-full inline-block align-middle">
              <div class="border rounded-xl border-gray-700 ">
                <table class="min-w-full  rounded-xl overflow-hidden">
                  <thead>
                    <tr class="bg-gray-600">
                      <th
                        scope="col"
                        class="p-5 text-left text-sm leading-6 font-semibold text-white capitalize"
                      >
                        {" "}
                        id{" "}
                      </th>
                      <th
                        scope="col"
                        class="p-5 text-left text-sm leading-6 font-semibold text-white capitalize"
                      >
                        {" "}
                        Image{" "}
                      </th>
                      <th
                        scope="col"
                        class="p-5 text-left text-sm leading-6 font-semibold text-white capitalize "
                      >
                        {" "}
                        Title{" "}
                      </th>
                      <th
                        scope="col"
                        class="p-5 text-left text-sm leading-6 font-semibold text-white capitalize"
                      >
                        {" "}
                        Current Price{" "}
                      </th>
                      <th
                        scope="col"
                        class="p-5 text-left text-sm leading-6 font-semibold text-white capitalize"
                      >
                        {" "}
                        Status{" "}
                      </th>
                      <th
                        scope="col"
                        class="p-5 text-left text-sm leading-6 font-semibold text-white capitalize"
                      >
                        {" "}
                        End Time{" "}
                      </th>
                      <th
                        scope="col"
                        class="p-5 text-left text-sm leading-6 font-semibold text-white capitalize"
                      >
                        {" "}
                        Actions{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-300 ">
                    {filteredAuctions.map((auction) => (
                      <tr
                        key={auction.id}
                        className="bg-gray-900 hover:bg-gray-700 cursor-pointer card"
                      >
                        <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white ">
                          <span className="text-sm text-gray-400 flex items-center">
                            {auction.id}
                          </span>
                        </td>
                        <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white">
                          <img
                            src={auction.image}
                            alt={auction.title}
                            className="w-50 h-50 object-cover"
                          />
                        </td>
                        <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white">
                          <h2 className="text-xl font-semibold mb-2 text-white">
                            {auction.title}
                          </h2>
                        </td>
                        <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white">
                          <span className="font-bold">
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
                        <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white">
                          <span className="text-sm text-gray-400 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(auction.endTime).toLocaleString()}
                          </span>
                        </td>
                        <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-white flex flex-row items-center justify-evenly">
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
