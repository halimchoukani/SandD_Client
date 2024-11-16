import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { Button } from "../components/ui/index";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/index";
import Hero from "../components/hero";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

export default function Home() {
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
        setAuctions(newData.reverse());
      } else {
        console.error("Invalid response: auctions is not an array");
        setAuctions([]); // Reset auctions to an empty array if response is invalid
      }
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };
  useEffect(() => {
    document.title = "S&D - Home"; // Change the page title
    getAuctions();
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="flex-1">
        <Hero />
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 px-4 md:px-6">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-400">
              Featured Auctions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.map((auction) => (
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
            <div className="mt-12 text-center">
              <Link to="/auctions">
                <Button
                  variant="outline"
                  className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900"
                >
                  View All Auctions
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-400">
                  Why Choose S&D?
                </h2>
                <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We provide a secure platform for buyers and sellers to
                  connect, with a wide range of unique items and transparent
                  bidding processes.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <Button
                  variant="div"
                  className="h-auto p-0 text-lg text-blue-400 hover:text-blue-300"
                >
                  Secure Transactions
                </Button>
                <Button
                  variant="div"
                  className="h-auto p-0 text-lg text-blue-400 hover:text-blue-300"
                >
                  Expert Authentication
                </Button>
                <Button
                  variant="div"
                  className="h-auto p-0 text-lg text-blue-400 hover:text-blue-300"
                >
                  Global Reach
                </Button>
                <Button
                  variant="div"
                  className="h-auto p-0 text-lg text-blue-400 hover:text-blue-300"
                >
                  24/7 Customer Support
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
