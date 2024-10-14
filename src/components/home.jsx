import { useEffect } from "react";
import Footer from "./footer";
import Header from "./header";
import { Button } from "./ui/index";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/index";
import Hero from "./hero";
import { Link } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    document.title = "S&D - Home"; // Change the page title
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="flex-1">
        <Hero />
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 px-4 md:px-6">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-400">
              Featured Auctions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card
                  key={i}
                  className="overflow-hidden bg-gray-800 border-gray-700"
                >
                  <CardHeader className="p-0">
                    <img
                      src={`https://www.bobswatches.com/rolex-blog/wp-content/uploads/2020/12/Rolex_Submariner_5513_5D3_9227-2-1.jpg`}
                      alt={`Featured auction ${i}`}
                      className="object-cover w-full h-48"
                      width={400}
                      height={200}
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-xl mb-2 text-blue-400">
                      Vintage Watch Collection
                    </CardTitle>
                    <p className="text-sm text-gray-400 mb-2">
                      Current Bid: $1,500
                    </p>
                    <p className="text-sm text-gray-300">Ends in 2 days</p>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600">
                      Place Bid
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link to="/auctions">
              <Button
                variant="outline"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900"
              >
                View All Auctions
              </Button>
              
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-400">
                  Why Choose S&D?
                </h2>
                <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We provide a secure platform for buyers and sellers to
                  connect, with a wide range of unique items and transparent
                  bidding processes.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <Button
                  variant="div"
                  className="h-auto p-0 text-lg text-blue-400 hover:text-blue-300"
                >
                  Secure Transactions
                </Button>
                <Button
                  variant="div"
                  className="h-auto p-0 text-lg text-blue-400 hover:text-blue-300"
                >
                  Expert Authentication
                </Button>
                <Button
                  variant="div"
                  className="h-auto p-0 text-lg text-blue-400 hover:text-blue-300"
                >
                  Global Reach
                </Button>
                <Button
                  variant="div"
                  className="h-auto p-0 text-lg text-blue-400 hover:text-blue-300"
                >
                  24/7 Customer Support
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
