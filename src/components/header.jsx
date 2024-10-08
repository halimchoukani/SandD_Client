import React from "react";
import { Button } from "./ui/index";

import { Gavel, Search, User, Bell, Menu } from "lucide-react";
function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
      <div className="flex flex-row h-16 items-center justify-between p-5">
        <div href="/" className="flex items-center">
          <Gavel className="h-6 w-6 text-blue-400" />
          <span className="font-bold text-blue-400">AuctionMaster</span>
        </div>
        <nav className="flex gap-10">
          <div
            className="text-base font-medium hover:text-blue-400 hover:underline underline-offset-4 cursor-pointer"
            href="#"
          >
            Auctions
          </div>
          <div
            className="text-base font-medium hover:text-blue-400 hover:underline underline-offset-4 cursor-pointer"
            href="#"
          >
            Sell
          </div>
          <div
            className="text-base font-medium hover:text-blue-400 hover:underline underline-offset-4 cursor-pointer"
            href="#"
          >
            About
          </div>
        </nav>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white"
          >
            <Bell className="h-6 w-6" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white relative"
          >
            <User className="h-6 w-6" />
            <div className="hidden absolute origin-center top-12 p-5 right-[150%] bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 rounded-md border border-gray-600 bg-gray-700">
              <h3 className="text-lg font-bold text-blue-400">Notifications</h3>
              <ul>
                <li>fzefzefzef</li>
                <li>fzefzefzef</li>
                <li>fzefzefzef</li>
                <li>fzefzefzef</li>
              </ul>
            </div>
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
