import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Clock, ArrowUpDown } from "lucide-react"
import { Button, Input, Select, Card, CardContent, CardFooter } from './ui'
import Header from './header'
import Footer from './footer'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Auctions() {
    useEffect(() => {
        document.title = "S&D - Bids"; // Change the page title
      }, []);
      useGSAP(() => {
        gsap.from(".card", {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
        });
      });

  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('endingSoon')

  // Mock data for auctions
  const auctions = [
    { id: 1, title: "Vintage Rolex Submariner", category: "Watches", currentBid: 5000, endTime: "2024-03-15T14:00:00Z", image: "https://www.bobswatches.com/rolex-blog/wp-content/uploads/2020/12/Rolex_Submariner_5513_5D3_9227-2-1.jpg" },
    { id: 2, title: "Rare First Edition Book", category: "Books", currentBid: 1000, endTime: "2024-03-14T10:00:00Z", image: "https://www.bobswatches.com/rolex-blog/wp-content/uploads/2020/12/Rolex_Submariner_5513_5D3_9227-2-1.jpg" },
    { id: 3, title: "Antique Victorian Desk", category: "Furniture", currentBid: 2500, endTime: "2024-03-16T18:00:00Z", image: "https://www.bobswatches.com/rolex-blog/wp-content/uploads/2020/12/Rolex_Submariner_5513_5D3_9227-2-1.jpg" },
    { id: 4, title: "1967 Ford Mustang", category: "Cars", currentBid: 25000, endTime: "2024-03-20T12:00:00Z", image: "https://www.bobswatches.com/rolex-blog/wp-content/uploads/2020/12/Rolex_Submariner_5513_5D3_9227-2-1.jpg" },
    { id: 5, title: "Original Andy Warhol Print", category: "Art", currentBid: 15000, endTime: "2024-03-18T16:00:00Z", image: "https://www.bobswatches.com/rolex-blog/wp-content/uploads/2020/12/Rolex_Submariner_5513_5D3_9227-2-1.jpg" },
    { id: 6, title: "Signed Basketball Jersey", category: "Sports Memorabilia", currentBid: 500, endTime: "2024-03-17T20:00:00Z", image: "https://www.bobswatches.com/rolex-blog/wp-content/uploads/2020/12/Rolex_Submariner_5513_5D3_9227-2-1.jpg" },
  ]

  const filteredAuctions = auctions
    .filter(auction => 
      auction.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === 'all' || auction.category === category)
    )
    .sort((a, b) => {
      if (sortBy === 'endingSoon') {
        return new Date(a.endTime) - new Date(b.endTime)
      } else if (sortBy === 'highestBid') {
        return b.currentBid - a.currentBid
      }
      return 0
    })

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Watches', label: 'Watches' },
    { value: 'Books', label: 'Books' },
    { value: 'Furniture', label: 'Furniture' },
    { value: 'Cars', label: 'Cars' },
    { value: 'Art', label: 'Art' },
    { value: 'Sports Memorabilia', label: 'Sports Memorabilia' },
  ]

  const sortOptions = [
    { value: 'endingSoon', label: 'Ending Soon' },
    { value: 'highestBid', label: 'Highest Bid' },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-500">Current Auctions</h1>

        {/* Search and Filter Section */}
        <Card className="mb-8 bg-transparent border-none">
          <CardContent className="">
            <div className="h-full flex flex-col gap-4 justify-center items-center md:flex-row md:items-center">
              <div className="flex-grow">
                <div className="relative">
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    placeholder="Search auctions..."
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-gray-400" />
                <Select
                  value={category}
                  onValueChange={setCategory}
                  options={categoryOptions}
                  className="w-40 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="flex items-center space-x-4">
                <ArrowUpDown className="h-5 w-5 text-gray-400" />
                <Select
                  value={sortBy}
                  onValueChange={setSortBy}
                  options={sortOptions}
                  className="w-40 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auctions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAuctions.map((auction) => (
            <Card key={auction.id} className="bg-gray-800 overflow-hidden card opacity-1">
              <img src={auction.image} alt={auction.title} className="w-full h-48 object-cover" />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-white">{auction.title}</h2>
                <p className="text-gray-400 mb-2">{auction.category}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-green-400">${auction.currentBid.toLocaleString()}</span>
                  <span className="text-sm text-gray-400 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(auction.endTime).toLocaleString()}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/auction/${auction.id}`} className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">View Auction</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredAuctions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No auctions found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}