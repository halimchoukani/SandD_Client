import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Button, Input } from "./ui/index";
import Header from "./header";
import Footer from "./footer";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [currentBid, setCurrentBid] = useState(1000);
  const [auctionEnd, setAuctionEnd] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [images,setImages] = useState(null);

  useEffect(() => {
    document.title = "AuctionMaster - Profile";
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


        setUser(userData);
      } catch (err) {
        setError(
          "An error occurred while fetching your profile. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    document.title = "S&D - Product";
    getProduct();
  }, [id]);

  const getProduct = async () => {
    try {
      const res = await fetch(`http://localhost:8089/api/auction/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (typeof data === "object") {
          setProduct(data);
          setCurrentBid(data.currentPrice);
          setAuctionEnd(new Date(data.auctionEnd));
          const res2 = await fetch(`http://localhost:8089/api/images/auction/${id}`);
          if(res2.ok){
            const d = await res2.json();
            setImages(d);
          }
        } else {
          console.error("Invalid response: product is not an object");
          setProduct(null);
        }
      } else {
        navigate("/404");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleBidChange = (e) => setBidAmount(e.target.value);

  const addBid = async () => {
    if (parseFloat(bidAmount) <= currentBid) {
      alert("Bid must be higher than the current bid.");
      return;
    }

    try {
      console.log("user", user.id);
      console.log("auction", id);
      console.log("amount", parseFloat(bidAmount));

      const res = await fetch(`http://localhost:8089/api/bid/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auction: {
            id: id,
          },
          buyer: {
            id: user.id,
          },
          amount: parseFloat(bidAmount),
        }),
      });

      if (res.ok) {
        const result = await res.json();
        console.log("Bid placed:", result);
        setCurrentBid(parseFloat(bidAmount)); // Update current bid state
        setBidAmount(""); // Reset bid amount input
        alert("Bid placed successfully!");
      } else {
        console.log();
      }
    } catch (error) {
      console.error("Error adding bid:", error);
    }
  };

  const handleBidSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    addBid(); // Call the addBid function
  };

  const getRemainingTime = () => {
    if (!Product?.endTime) return "N/A";
    const now = new Date();

    const auctionEnd = new Date(Product.endTime);
    
    const remainingTime = auctionEnd - now;

    if (remainingTime <= 0) return "Auction has ended";
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    return `${days} days, ${hours} hours, ${minutes} minutes`;
  };

  return (
    
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            {Product && images && (
              <img
                src={`http://localhost:8089/api/images/upload/auction/${images[0].url}`}
                alt={Product.title}
                className="w-full h-auto object-cover rounded"
              />
            )}

            
          </div>

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
                <form
                  className="flex space-x-4 mb-6"
                  onSubmit={handleBidSubmit}
                >
                  <Input
                    value={bidAmount}
                    onChange={handleBidChange}
                    className="flex-grow bg-gray-700 text-white border-gray-600"
                    placeholder="Enter your bid"
                    type="number" // Ensure it's a number input
                  />
                  <Button
                    type="submit"
                    disabled={!bidAmount || parseFloat(bidAmount) <= currentBid}
                    className="bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-600 disabled:text-gray-400"
                  >
                    Place Bid
                  </Button>
                </form>
                <div className="border-t border-gray-700 pt-6">
                  <h2 className="text-xl font-semibold mb-4 text-blue-400">
                    Seller Information
                  </h2>
                  {Product.seller && (
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
              <p className="text-gray-300">Loading product details...</p>
            )}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">
            Product Description
          </h2>
          <p className="text-gray-300 mb-4">
            {Product ? Product.description : "No description available."}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
