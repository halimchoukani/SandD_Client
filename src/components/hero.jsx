import React from "react";
import { Input } from "./ui/index";
import { Search } from "lucide-react";
import { Button } from "./ui/index";

function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-800">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="relative space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-400">
              Discover Unique Treasures
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
              Bid on exclusive items from around the world. Start your auction
              journey today.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <Input
                className="max-w-lg flex-1 bg-gray-700 text-white border-gray-600"
                placeholder="Search auctions"
                type="text"
              />
              <Button
                type="submit"
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
