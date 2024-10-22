import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Button, Input } from "../components/ui/index";
import Header from "../components/header";
import Footer from "../components/footer";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Auction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [currentBid, setCurrentBid] = useState(1000);
  const [auctionEnd, setAuctionEnd] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);

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
        const response = await fetch(`/api/user/get/${decoded.sub}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
      const res = await fetch(`/api/auction/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (typeof data === "object") {
          setProduct(data);
          setCurrentBid(data.currentPrice);
          setAuctionEnd(new Date(data.auctionEnd));
          const res2 = await fetch(`/api/images/auction/${id}`);
          if (res2.ok) {
            const d = await res2.json();
            setImages(d || []);
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
      const res = await fetch(`/api/bid/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auction: { id },
          buyer: { id: user.id },
          amount: parseFloat(bidAmount),
        }),
      });

      if (res.ok) {
        setCurrentBid(parseFloat(bidAmount));
        setBidAmount("");
        alert("Bid placed successfully!");
      } else {
        alert("Error placing bid.");
      }
    } catch (error) {
      console.error("Error adding bid:", error);
    }
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    addBid();
  };

  const getRemainingTime = () => {
    if (!auctionEnd) return "N/A";
    const now = new Date();
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

  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (images.length > 0) {
      setActiveImage(`/api/images/upload/auction/${images[0]?.url}`);
    }
  }, [images]);
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            {/* {Product && images && (
              <img
                src={`/api/images/upload/auction/${images[0].url}`}
                alt={Product.title}
                className="w-full h-auto object-cover rounded"
              />
            )} */}
            {activeImage ? (
              <div className="grid gap-4">
                <div>
                  <img
                    className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
                    src={activeImage}
                    alt="Auction Product"
                  />
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {images.map(({ url }, index) => (
                    <div key={index}>
                      <img
                        onClick={() =>
                          setActiveImage(`/api/images/upload/auction/${url}`)
                        }
                        src={`/api/images/upload/auction/${url}`}
                        className="object-cover object-center h-20 max-w-full rounded-lg cursor-pointer"
                        alt="gallery-image"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>Loading images...</p>
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
                        src={`/api/user/upload/avatar/${Product.seller.imageUrl}`}
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
