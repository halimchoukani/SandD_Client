import { useEffect, useState } from "react";
import { Button } from "./ui/index";
import { Gavel, User, Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Header() {
  const [toggleNotif, settoggleNotif] = useState(false);

  const toggleVisibility = () => {
    settoggleNotif(!toggleNotif);
  };

  useEffect(() => {
    if (toggleNotif) {
      gsap.to("#notification", {
        opacity: 1,
        height: "auto",
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
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white relative"
          >
            <Bell className="h-6 w-6" onClick={toggleVisibility} />
            <span className="sr-only">Notifications</span>
            {toggleNotif && (
              <div
                className="absolute lg:w-[400px] md:w-[300px] sm:w-[250px] w-[200px] top-12 p-4 right-0 h-0 opacity-0 origin-top-right rounded-md border border-gray-600 bg-gray-900"
                id="notification"
                onBlur={toggleVisibility}
              >
                <h3 className="text-lg font-bold text-blue-400">
                  Notifications
                </h3>
                <ul className="w-full flex flex-col">
                  <li className="notifications-list hover:bg-gray-800 p-2 rounded-md">
                    <div className="flex flex-row justify-between items-start">
                      <img
                        src="https://media.wired.com/photos/5926b0c2af95806129f504df/master/w_2560%2Cc_limit/JohnWick2.jpg"
                        className="rounded-full w-[40px] h-[40px]"
                        alt="John Wick"
                      />
                      <div className="w-[80%] flex flex-col justify-start items-start">
                        <p className="text-left text-sm font-semibold">
                          John Wick added new auction:1969 Mustang Car
                        </p>

                        <span className="text-xs text-gray-500">
                          2 hours ago
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="notifications-list hover:bg-gray-800 p-2 rounded-md">
                    <div className="flex flex-row justify-between items-start">
                      <img
                        src="https://media.wired.com/photos/5926b0c2af95806129f504df/master/w_2560%2Cc_limit/JohnWick2.jpg"
                        className="rounded-full w-[40px] h-[40px]"
                        alt="John Wick"
                      />
                      <div className="w-[80%] flex flex-col justify-start items-start">
                        <p className="text-left text-sm font-semibold">
                          John Wick added new auction:1969 Mustang Car
                        </p>

                        <span className="text-xs text-gray-500">
                          2 hours ago
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="notifications-list hover:bg-gray-800 p-2 rounded-md">
                    <div className="flex flex-row justify-between items-start">
                      <img
                        src="https://media.wired.com/photos/5926b0c2af95806129f504df/master/w_2560%2Cc_limit/JohnWick2.jpg"
                        className="rounded-full w-[40px] h-[40px]"
                        alt="John Wick"
                      />
                      <div className="w-[80%] flex flex-col justify-start items-start">
                        <p className="text-left text-sm font-semibold">
                          John Wick added new auction:1969 Mustang Car
                        </p>

                        <span className="text-xs text-gray-500">
                          2 hours ago
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="notifications-list hover:bg-gray-800 p-2 rounded-md">
                    <div className="flex flex-row justify-between items-start">
                      <img
                        src="https://media.wired.com/photos/5926b0c2af95806129f504df/master/w_2560%2Cc_limit/JohnWick2.jpg"
                        className="rounded-full w-[40px] h-[40px]"
                        alt="John Wick"
                      />
                      <div className="w-[80%] flex flex-col justify-start items-start">
                        <p className="text-left text-sm font-semibold">
                          John Wick added new auction:1969 Mustang Car
                        </p>

                        <span className="text-xs text-gray-500">
                          2 hours ago
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white"
          >
            <User className="h-6 w-6" />
            <span className="sr-only">Account</span>
          </Button>

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

      {/* Add dropdown menu here if needed */}
    </header>
  );
}

export default Header;
