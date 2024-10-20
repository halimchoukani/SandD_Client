import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Button, Input } from "./ui/index";
import Header from "./header";
import Footer from "./footer";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Product, setProduct] = useState(null); // Initialize as null to handle loading state
  const [bidAmount, setBidAmount] = useState("");
  const [currentBid, setCurrentBid] = useState(1000);
  const [auctionEnd, setAuctionEnd] = useState(null); // State for auction end time

  useEffect(() => {
    document.title = "S&D - Product"; // Change the page title
    getProduct(); // Fetch product details when the component mounts
  }, [id]); // Add id as a dependency to refetch if the id changes

  const getProduct = async () => {
    try {
      const res = await fetch(`http://localhost:8089/api/auction/${id}`);
      if (res.ok) {
        const data = await res.json();
        console.log("API response:", data);

        if (typeof data === "object") {
          setProduct(data);
          setCurrentBid(data.currentPrice);
          setAuctionEnd(new Date(data.auctionEnd)); // Assuming auctionEnd is in the response
        } else {
          console.error("Invalid response: product is not an object");
          setProduct(null); // Reset product to null if response is invalid
        }
      } else {
        navigate("/404");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleBidChange = (e) => setBidAmount(e.target.value);

  const handleBidSubmit = () => {
    if (parseFloat(bidAmount) > currentBid) {
      setCurrentBid(parseFloat(bidAmount));
      setBidAmount("");
      alert("Bid placed successfully!");
    } else {
      alert("Bid must be higher than the current bid.");
    }
  };

  // Function to calculate remaining time
  const getRemainingTime = () => {
    if (!Product.endTime) return "N/A"; // Handle case if auctionEnd is not set
    const now = new Date();
    const auctionEnd = new Date(Product.endTime);
    const remainingTime = auctionEnd - now;

    if (remainingTime <= 0) return "Auction has ended"; // Auction ended

    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    return `${hours} hours, ${minutes} minutes`;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            {Product &&
              Product.imageUrl && ( // Ensure Product and imageUrl are available before rendering
                <img
                  src={Product.imageUrl} // Update to use Product.imageUrl from API response
                  alt={Product.title} // Update alt text to be more dynamic
                  className="w-full h-auto object-cover rounded"
                />
              )}
          </div>

          {/* Product Details */}
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            {Product ? (
              <>
                <h1 className="text-3xl font-bold mb-4 text-blue-400">
                  {Product.title}
                </h1>
                <p className="text-gray-300 mb-6">{Product.description}</p>
                <div className="bg-gray-700 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-300">
                      Current Bid:
                    </span>
                    <span className="text-2xl font-bold text-green-400">
                      ${currentBid.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Auction ends in {getRemainingTime()}</span>
                  </div>
                </div>
                <div className="flex space-x-4 mb-6">
                  <Input
                    value={bidAmount}
                    onChange={handleBidChange}
                    className="flex-grow bg-gray-700 text-white border-gray-600"
                    placeholder="Enter your bid"
                  />
                  <Button
                    onClick={handleBidSubmit}
                    disabled={!bidAmount || parseFloat(bidAmount) <= currentBid}
                    className="bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-600 disabled:text-gray-400"
                  >
                    Place Bid
                  </Button>
                </div>
                <div className="border-t border-gray-700 pt-6">
                  <h2 className="text-xl font-semibold mb-4 text-blue-400">
                    Seller Information
                  </h2>
                  {Product.seller && ( // Check if seller exists before rendering
                    <div className="flex items-center space-x-4">
                      <img
                        src={`http://localhost:8089/api/user/upload/avatar/${Product.seller.imageUrl}`}
                        alt="Seller Avatar"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-200">
                          {Product.seller.firstname +
                            " " +
                            Product.seller.lastname}
                        </p>
                        <p className="text-sm text-gray-400">
                          Member since{" "}
                          {new Date(Product.seller.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <p className="text-gray-300">Loading product details...</p> // Loading state
            )}
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-gray-800 p-6 rounded-lg shadow mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            Product Description
          </h2>
          <p className="text-gray-300 mb-4">
            {Product ? Product.description : "No description available."}{" "}
            {/* Provide a fallback */}
          </p>
          {/* Additional product features */}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
