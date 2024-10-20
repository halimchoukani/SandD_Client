import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/index";
import { Gavel, User, Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
function Header() {
  const [toggleNotif, settoggleNotif] = useState(false);
  const [bids, setBids] = useState([]);
  const notifRef = useRef(null); // Create a ref for the notification dropdown
  const getBids = async () => {
    try {
      const res = await fetch(`http://localhost:8089/api/bid/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      console.log("API Bids response:", data);

      if (Array.isArray(data)) {
        setBids(data);
        console.log(data);
      } else {
        console.error("Invalid response: bids is not an array");
        setBids([]);
      }
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  const toggleVisibility = () => {
    settoggleNotif(!toggleNotif);
  };

  useEffect(() => {
    if (toggleNotif) {
      gsap.to("#notification", {
        opacity: 1,
        height: "300px",
        duration: 0.5,
      });
      gsap.from(".notifications-list", {
        opacity: 0,
        x: -20,
        duration: 0.2,
        delay: 0.4,
        stagger: 0.1,
      });
    } else {
      gsap.to("#notification", {
        opacity: 0,
        height: 0,
        duration: 0.5,
      });
    }
  }, [toggleNotif]);

  useEffect(() => {
    getBids();
  }, []);

  useEffect(() => {
    const handleWheel = (event) => {
      if (notifRef.current && notifRef.current.contains(event.target)) {
        event.preventDefault(); // Prevent the default scrolling
      }
    };

    if (notifRef.current) {
      notifRef.current.addEventListener("wheel", handleWheel);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (notifRef.current) {
        notifRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, [toggleNotif]); // Run this effect when toggleNotif changes

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 box-content">
      <div className="flex flex-row h-16 items-center justify-between px-5 md:px-10">
        <Link to="/" className="flex items-center gap-2">
          <Gavel className="h-6 w-6 text-blue-400" />
          <span className="font-bold text-blue-400">S&D</span>
        </Link>

        {/* Navigation for larger screens */}
        <nav className="hidden md:flex gap-10">
          <Link
            className="text-base font-medium text-white hover:text-blue-400 hover:underline underline-offset-4"
            to="/auctions"
          >
            Auctions
          </Link>
          <Link
            className="text-base font-medium text-white hover:text-blue-400 hover:underline underline-offset-4"
            to="/sell"
          >
            Sell
          </Link>
          <Link
            className="text-base font-medium text-white hover:text-blue-400 hover:underline underline-offset-4"
            to="/about"
          >
            About
          </Link>
        </nav>

        {/* Notification and User Actions */}
        <div className="flex items-center gap-3 ">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white relative"
          >
            <Bell className="h-6 w-6" onClick={toggleVisibility} />
            <span className="sr-only">Notifications</span>
            {toggleNotif && (
              <div
                ref={notifRef} // Attach the ref to the notification dropdown
                className="absolute lg:w-[400px] md:w-[300px] sm:w-[250px] w-[200px] top-12 p-4 right-0 opacity-0 origin-top-right rounded-md border border-gray-600 bg-gray-900 overflow-y-auto max-h-72"
                id="notification"
                onBlur={toggleVisibility}
              >
                <h3 className="text-lg font-bold text-blue-400">
                  Notifications
                </h3>
                <ul className="w-full flex flex-col">
                  {bids.map((bid) => (
                    <Link to={`/auction/${bid.auction.id}`} key={bid.id}>
                      <li className="notifications-list hover:bg-gray-800 p-2 rounded-md">
                        <div className="flex flex-row justify-between items-start">
                          <img
                            src={`http://localhost:8089/api/user/upload/avatar/${bid.buyer.imageUrl}`}
                            className="rounded-full w-[40px] h-[40px]"
                            alt={`${bid.buyer.firstname} ${bid.buyer.lastname}`}
                          />
                          <div className="w-[80%] flex flex-col justify-start items-start">
                            <p className="text-left text-sm font-semibold">
                              <b>
                                {bid.buyer.firstname + " " + bid.buyer.lastname}
                              </b>{" "}
                              participated in :{bid.auction.title} with : $
                              {bid.amount}
                            </p>
                            <span className="text-xs text-gray-500">
                              2 hours ago
                            </span>
                          </div>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </Button>
          <Link to="/profile">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white"
            >
              <User className="h-6 w-6" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>

          {/* Hamburger Menu for smaller screens */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-300 hover:text-white"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
