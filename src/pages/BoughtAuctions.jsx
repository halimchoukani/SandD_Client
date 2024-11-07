import { useState, useEffect, useContext } from "react";
import { CheckCircle, Clock, Clock1, Search, Truck } from "lucide-react";
import { Input, Card, CardContent } from "../components/ui";
import Header from "../components/header";
import Footer from "../components/footer";
import gsap from "gsap";
import { Context } from "../App";

const AS = [
    
];

export default function AuctionBought() {
  const [boughtAuctions, setBoughtAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(Context);
  const [mockBoughtAuctions , Initialise ] = useState(AS);
  const [filteredAuctions , setFilteredAuctions ] = useState([]);
  useEffect(() => {
    document.title = "S&D - Bought Auctions";
    setTimeout(() => {
      setBoughtAuctions(mockBoughtAuctions);
    }, 500);

    const fetchBoughtUser = async() =>  {
        const res = await fetch(`/api/transaction/bought/user/${user.id}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
            const newData = await Promise.all(
              data.map(async (transaction) => {
                const res2 = await fetch(`/api/images/auction/${transaction.auction.id}`);
                if (res2.ok) {
                  const imageData = await res2.json();
                  if (imageData.length > 0) {
                    return { ...transaction, auctionImageUrl: imageData[0].url };
                  }
                }
                return transaction;
              })
            );
            Initialise(newData);
            setBoughtAuctions(newData);
            setFilteredAuctions(newData);
            console.log(newData);
        }
    }
    if(user.id){
        fetchBoughtUser();
    }
  },[user]);

  useEffect(() => {
    if (boughtAuctions.length > 0) {
      gsap.fromTo(
        ".auction-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
    }
  }, [boughtAuctions]);

  useEffect(()=>{
    setFilteredAuctions(
    boughtAuctions.filter( transaction =>
        transaction.auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.auction.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  },[searchTerm]);


  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-500">
          Your Bought Auctions
        </h1>

        <div className="mb-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search auctions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-6">
          {filteredAuctions.map((transaction) => (
            <Card key={transaction.auction.id} className="bg-gray-800 overflow-hidden auction-card">
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
                        Sold Price: ${transaction.amount.toLocaleString()}
                      </span>
                      <div className="flex items-center text-yellow-500">
                        <Truck className="h-5 w-5 mr-2" />
                        <span>
                          Status: {transaction.delivery_status || "Pending"}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2 text-blue-400">Seller Information</h3>
                      <div className="flex items-center space-x-4">
                        <img
                          src={`/api/user/upload/avatar/${transaction.seller.imageUrl}`}
                          alt="Seller Avatar"
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-gray-200">
                            {transaction.auction.seller.firstname} {transaction.auction.seller.lastname}
                          </p>
                          <p className="text-sm text-gray-400">
                            Member since {new Date(transaction.auction.seller.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-gray-600 rounded-lg shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                        <div className="flex items-center text-sm text-gray-100 space-x-2">
                          <Clock1 className="w-4 h-4 text-green-500" />
                          <span className="font-medium">Auction Started:</span>
                          <span>
                            {new Date(
                              transaction.auction.startTime
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-100 space-x-2">
                          <CheckCircle className="w-4 h-4 text-red-500" />
                          <span className="font-medium">Auction Ended:</span>
                          <span>
                            {new Date(
                              transaction.auction.endTime
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAuctions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">
              No auctions found matching your search.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}