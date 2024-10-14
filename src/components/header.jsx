import { useEffect, useState } from "react";
import { Button } from "./ui/index";
import { Gavel, User, Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link
import gsap from "gsap";
function Header() {
  const [toggleNotif, settoggleNotif] = useState(false);

  const toggleVisibility = () => {
    settoggleNotif(!toggleNotif);
  };
  useEffect(()=>{
    gsap.to("#notification",{
      opacity :1 ,
      height:"auto",
      duration : .5
    })
    gsap.from(".notifications-list",{
      opacity :0 ,
      x:-20,
      duration : .2,
      delay:.4,
      stagger:.1,
    })
  },[toggleNotif])
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
      <div className="flex flex-row h-16 items-center justify-between p-5">
        <Link to="/" className="flex items-center gap-2">
          <Gavel className="h-6 w-6 text-blue-400" />
          <span className="font-bold text-blue-400">S&D</span>
        </Link>
        <nav className="flex gap-10">
          <Link
            className="text-base font-medium text-white hover:text-blue-400 hover:underline underline-offset-4 cursor-pointer"
            to="/auctions"
          >
            Auctions
          </Link>
          <Link
            className="text-base font-medium text-white hover:text-blue-400 hover:underline underline-offset-4 cursor-pointer"
            to="/sell"
          >
            Sell
          </Link>
          <Link
            className="text-base font-medium text-white hover:text-blue-400 hover:underline underline-offset-4 cursor-pointer"
            to="/about"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white relative"
          >
            <Bell className="h-6 w-6" onClick={toggleVisibility} />
            <span className="sr-only">Notifications</span>
            {toggleNotif && (
              <div className="absolute w-[500px] h-0 opacity-0 origin-center top-12 p-4 right-0   rounded-md border border-gray-600 bg-gray-900" id="notification">
                <h3 className="text-lg font-bold text-blue-400">Notifications</h3>
                <ul className="">
                  <li className="notifications-list opacity-1 mt-9">
                    <div className="flex flex-row items-center justify-between w-full">
                      <div className="w-auto h-full flex ">
                      <img src="https://media.wired.com/photos/5926b0c2af95806129f504df/master/w_2560%2Cc_limit/JohnWick2.jpg" className="rounded-full w-[60px] aspect-square" alt="" />
                      </div>
                      <div className="flex flex-col justify-center items-start w-[80%]">
                        <div className="text-start"> <b>John Wick added new auction :</b> an 1969 mustang car</div>
                        <div className="font-light">2 hours ago</div>
                      </div>
                    
                    </div>
                    </li>
                    <li className="notifications-list opacity-1 mt-9">
                    <div className="flex flex-row items-center justify-between w-full">
                      <div className="w-auto h-full flex ">
                      <img src="https://media.wired.com/photos/5926b0c2af95806129f504df/master/w_2560%2Cc_limit/JohnWick2.jpg" className="rounded-full w-[60px] aspect-square" alt="" />
                      </div>
                      <div className="flex flex-col justify-center items-start w-[80%]">
                        <div className="text-start"> <b>John Wick added new auction :</b> an 1969 mustang car</div>
                        <div className="font-light">2 hours ago</div>
                      </div>
                    
                    </div>
                    </li>
                    <li className="notifications-list opacity-1 mt-9">
                    <div className="flex flex-row items-center justify-between w-full">
                      <div className="w-auto h-full flex ">
                      <img src="https://media.wired.com/photos/5926b0c2af95806129f504df/master/w_2560%2Cc_limit/JohnWick2.jpg" className="rounded-full w-[60px] aspect-square" alt="" />
                      </div>
                      <div className="flex flex-col justify-center items-start w-[80%]">
                        <div className="text-start"> <b>John Wick added new auction :</b> an 1969 mustang car</div>
                        <div className="font-light">2 hours ago</div>
                      </div>
                    
                    </div>
                    </li>
                    <li className="notifications-list opacity-1 mt-9">
                    <div className="flex flex-row items-center justify-between w-full">
                      <div className="w-auto h-full flex ">
                      <img src="https://media.wired.com/photos/5926b0c2af95806129f504df/master/w_2560%2Cc_limit/JohnWick2.jpg" className="rounded-full w-[60px] aspect-square" alt="" />
                      </div>
                      <div className="flex flex-col justify-center items-start w-[80%]">
                        <div className="text-start"> <b>John Wick added new auction :</b> an 1969 mustang car</div>
                        <div className="font-light">2 hours ago</div>
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
