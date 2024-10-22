import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Clock } from "lucide-react";
import { Button, Input, Card, CardContent, CardFooter } from "../components/ui";
import Header from "../components/header";
import Footer from "../components/footer";
import gsap from "gsap";

export default function Auctions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [auctions, setAuctions] = useState([]);

  const getAuctions = async () => {
    try {
      const res = await fetch(`/api/auction/all`, {
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

        // Check if the data is an array
        setAuctions(newData);
      } else {
        console.error("Invalid response: auctions is not an array");
        setAuctions([]); // Reset auctions to an empty array if response is invalid
      }
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  useEffect(() => {
    document.title = "S&D - Auctions"; // Change the page title
    getAuctions();
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

  // Filtering auctions by search term and category
  const filteredAuctions = auctions.filter((auction) =>
    auction.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            </div>
          </CardContent>
        </Card>

        {/* Auctions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAuctions.map((auction) => (
            <Card key={auction.id} className="bg-gray-800 overflow-hidden card">
              <img
                src={`/api/images/upload/auction/${auction.url}`}
                alt={auction.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-white">
                  {auction.title}
                </h2>
                <p className="text-gray-400 mb-2">{auction.category}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-green-400 overflow-hidden text-ellipsis whitespace-nowrap">
                    $
                    {auction.startPrice
                      ? auction.currentPrice.toLocaleString()
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
