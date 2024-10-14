import { useEffect, useState } from 'react'

import {  Clock, Eye, Heart, Share2 } from "lucide-react"
import { Button, Input } from './ui/index'
import Header from './header'
import Footer from './footer'

export default function ProductPage() {
    useEffect(() => {
        document.title = "S&D - Product"; // Change the page title
      }, []);
  const [bidAmount, setBidAmount] = useState('')
  const [currentBid, setCurrentBid] = useState(1000)

  const handleBidChange = (e) => setBidAmount(e.target.value)

  const handleBidSubmit = () => {
    if (parseFloat(bidAmount) > currentBid) {
      setCurrentBid(parseFloat(bidAmount))
      setBidAmount('')
      alert('Bid placed successfully!')
    } else {
      alert('Bid must be higher than the current bid.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <img
              src="https://www.bobswatches.com/rolex-blog/wp-content/uploads/2020/12/Rolex_Submariner_5513_5D3_9227-2-1.jpg"
              alt="Vintage Watch"
              className="w-full h-auto object-cover rounded"
            />
          </div>

          {/* Product Details */}
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-4 text-blue-400">Vintage Rolex Submariner</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
              <span className="flex items-center"><Eye className="h-4 w-4 mr-1" /> 1.5k views</span>
              <span className="flex items-center"><Heart className="h-4 w-4 mr-1" /> 120 watchers</span>
              <button className="flex items-center text-blue-400 hover:text-blue-300">
                <Share2 className="h-4 w-4 mr-1" /> Share
              </button>
            </div>
            <p className="text-gray-300 mb-6">
              A rare 1967 Rolex Submariner in excellent condition. This timepiece features a black dial, 
              date function, and comes with original box and papers.
            </p>
            <div className="bg-gray-700 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-300">Current Bid:</span>
                <span className="text-2xl font-bold text-green-400">${currentBid.toLocaleString()}</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                <span>Auction ends in 2 days, 5 hours</span>
              </div>
            </div>
            <div className="flex space-x-4 mb-6">
              <Input
                value={bidAmount}
                onChange={handleBidChange}
                className="flex-grow bg-gray-700 text-white border-gray-600"
                placeholder="Enter your bid"
              />
              <Button 
                onClick={handleBidSubmit} 
                disabled={!bidAmount || parseFloat(bidAmount) <= currentBid}
                className="bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-600 disabled:text-gray-400"
              >
                Place Bid
              </Button>
            </div>
            <div className="border-t border-gray-700 pt-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-400">Seller Information</h2>
              <div className="flex items-center space-x-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzx7NtTmm07GLG0S4ZCliy-i8ZDtyFJl-y-w&s"
                  alt="Seller Avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-200">John Doe</p>
                  <p className="text-sm text-gray-400">Member since 2018 • 100% positive feedback</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-gray-800 p-6 rounded-lg shadow mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Product Description</h2>
          <p className="text-gray-300 mb-4">
            This 1967 Rolex Submariner (Ref. 1680) is a true collector^s item. Key features include:
          </p>
          <ul className="list-disc pl-5 mb-4 text-gray-300">
            <li>Original black dial with date function</li>
            <li>40mm stainless steel case</li>
            <li>Automatic movement</li>
            <li>Waterproof to 200 meters</li>
            <li>Comes with original box and papers</li>
          </ul>
          <p className="text-gray-300">
            The watch is in excellent condition, showing minimal signs of wear consistent with its age. 
            This is a rare opportunity to own a piece of horological history.
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}