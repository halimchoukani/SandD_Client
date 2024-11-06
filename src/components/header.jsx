import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "./ui/index";
import { Gavel, User, Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Context } from "../App";

function Header() {
  const [toggleNotif, settoggleNotif] = useState(false);
  const [bids, setBids] = useState([]);
  const notifRef = useRef(null);
  const buttonRef = useRef(null); // Ref for the Bell icon
  const { isSignedIn, setIsSignedIn, user, setUser } = useContext(Context);
  const getBids = async () => {
    try {
      const res = await fetch(`/api/bids/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        setBids(data);
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
      gsap.from("#notification", {
        height: "0",
        duration: 0.5,
      });
      gsap.to("#notification", {
        opacity: 1,
        height: "300px",
        duration: 0.5,
        display: "block",
      });

      gsap.from(".notifications-list", {
        opacity: 0,
        x: -20,
        duration: 0.2,
        delay: 0.1,
        stagger: 0.1,
      });
    } else {
      gsap.to("#notification", {
        opacity: 0,
        height: 0,
        duration: 0.5,
        display: "none",
      });
    }
  }, [toggleNotif]);

  useEffect(() => {
    getBids();
  }, []);

  // Close notification when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        settoggleNotif(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (event) => {
      if (
        notifRef.current &&
        notifRef.current.scrollHeight > notifRef.current.clientHeight
      ) {
        // Allow scrolling only when content overflows
        event.stopPropagation();
      }
    };

    if (notifRef.current) {
      notifRef.current.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (notifRef.current) {
        notifRef.current.removeEventListener("wheel", handleWheel);
      }
    };
  }, [toggleNotif]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 box-content">
      <div className="flex flex-row h-16 items-center justify-between px-5 md:px-10">
        <Link to="/" className="flex items-center gap-2">
          <Gavel className="h-6 w-6 text-blue-400" />
          <span className="font-bold text-blue-400">S&D</span>
        </Link>

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

        <div className="flex items-center gap-3 ">
          {user && <span>{user.amount.toFixed(2)} DT</span>}
          <Button
            ref={buttonRef} // Ref for the Bell icon button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white relative"
            onClick={toggleVisibility}
          >
            <Bell className="h-6 w-6" />
            <span className="sr-only">Notifications</span>
            {toggleNotif && (
              <div
                ref={notifRef} // Attach ref to the notification dropdown
                className="absolute lg:w-[400px] md:w-[300px] sm:w-[250px] w-[200px] top-12 p-4 right-0 origin-top-right rounded-md border border-gray-600 bg-gray-900 overflow-y-auto max-h-72"
                id="notification"
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
                            src={`/api/user/upload/avatar/${bid.buyer.imageUrl}`}
                            className="rounded-full w-[40px] h-[40px]"
                            alt={`${bid.buyer.firstname} ${bid.buyer.lastname}`}
                          />
                          <div className="w-[80%] flex flex-col justify-start items-start">
                            <p className="text-left text-sm font-semibold">
                              <b>
                                {bid.buyer.firstname + " " + bid.buyer.lastname}
                              </b>{" "}
                              participated in: {bid.auction.title} with: $
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
              {user && user.imageUrl ? (
                <img
                  src={`/api/user/upload/avatar/${user.imageUrl}`}
                  alt={user.firstname}
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <User className="h-6 w-6" />
              )}
              <span className="sr-only">Account</span>
            </Button>
          </Link>

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
