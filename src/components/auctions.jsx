import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Clock, ArrowUpDown } from "lucide-react";
import { Button, Input, Select, Card, CardContent, CardFooter } from "./ui";
import Header from "./header";
import Footer from "./footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Auctions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("endingSoon");
  const [auctions, setAuctions] = useState([]);

  const getAuctions = async () => {
    try {
      const res = await fetch(`http://localhost:8089/api/auction/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      console.log("API response:", data); // Log the response data

      // Check if the data is an array
      if (Array.isArray(data)) {
        setAuctions(data);
      } else {
        console.error("Invalid response: auctions is not an array");
        setAuctions([]); // Reset auctions to an empty array if response is invalid
      }
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  useEffect(() => {
    document.title = "S&D - Bids"; // Change the page title
    getAuctions();
  }, []);

  useGSAP(() => {
    if (auctions.length > 0) {
      gsap.from(".card", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
      });
    }
  }, [auctions]);

  // Filtering auctions by search term and category
  const filteredAuctions = auctions
    .filter((auction) =>
      auction.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((auction) =>
      category === "all" ? true : auction.category === category
    );

  // Sorting auctions
  filteredAuctions.sort((a, b) => {
    if (sortBy === "endingSoon") {
      return new Date(a.end_time) - new Date(b.end_time);
    } else if (sortBy === "highestBid") {
      return b.current_price - a.current_price;
    }
    return 0;
  });

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "Watches", label: "Watches" },
    { value: "Books", label: "Books" },
    { value: "Furniture", label: "Furniture" },
    { value: "Cars", label: "Cars" },
    { value: "Art", label: "Art" },
    { value: "Sports Memorabilia", label: "Sports Memorabilia" },
  ];

  const sortOptions = [
    { value: "endingSoon", label: "Ending Soon" },
    { value: "highestBid", label: "Highest Bid" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-500">
          Current Auctions
        </h1>

        {/* Search and Filter Section */}
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
              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-gray-400" />
                <Select
                  value={category}
                  onChange={setCategory} // Updated prop name
                  options={categoryOptions}
                  className="w-40 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="flex items-center space-x-4">
                <ArrowUpDown className="h-5 w-5 text-gray-400" />
                <Select
                  value={sortBy}
                  onChange={setSortBy} // Updated prop name
                  options={sortOptions}
                  className="w-40 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auctions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAuctions.map((auction) => (
            <Card key={auction.id} className="bg-gray-800 overflow-hidden card">
              <img
                src={auction.image}
                alt={auction.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-white">
                  {auction.title}
                </h2>
                <p className="text-gray-400 mb-2">{auction.category}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-green-400">
                    $
                    {auction.startPrice
                      ? auction.startPrice.toLocaleString()
                      : "N/A"}
                  </span>
                  <span className="text-sm text-gray-400 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(auction.endTime).toLocaleString()}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/auction/${auction.id}`} className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    View Auction
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredAuctions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">
              No auctions found matching your criteria.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
