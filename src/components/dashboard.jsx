import  { useEffect, useState } from 'react'
import {  Users, DollarSign, Package,  ArrowRight, TrendingUp, Clock } from 'lucide-react'
import { Button, Input, Card, CardHeader, CardTitle, CardContent, CardFooter, Avatar, Badge } from './ui/index'
import Header from './header'

export default function Dashboard() {
    useEffect(() => {
        document.title = "S&D - Dashboard"; // Change the page title
      }, []);
  const [searchTerm, setSearchTerm] = useState('')

  const stats = [
    { title: 'Total Auctions', value: '1,234', icon: <Package className="h-4 w-4 text-blue-400" />, change: '+20.1%' },
    { title: 'Active Users', value: '5,678', icon: <Users className="h-4 w-4 text-green-400" />, change: '+12.5%' },
    { title: 'Total Revenue', value: '$89,432', icon: <DollarSign className="h-4 w-4 text-yellow-400" />, change: '+15.3%' },
    { title: 'Avg. Bid Value', value: '$567', icon: <TrendingUp className="h-4 w-4 text-purple-400" />, change: '+7.2%' },
  ]

  const recentAuctions = [
    { id: 1, title: "Vintage Watch", currentBid: 1500, endTime: "2h 15m" },
    { id: 2, title: "Antique Vase", currentBid: 800, endTime: "4h 30m" },
    { id: 3, title: "Rare Coin Collection", currentBid: 3000, endTime: "1d 6h" },
  ]

  const activeUsers = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", bids: 23 },
    { id: 2, name: "Bob Smith", email: "bob@example.com", bids: 17 },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", bids: 31 },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
        <Header/>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-8">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-500 mb-4 sm:mb-0">Dashboard</h1>
            <div className="w-full sm:w-auto">
              <Input 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-400">{stat.change} from last month</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Auctions and Active Users */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Recent Auctions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {recentAuctions.map((auction) => (
                    <li key={auction.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">{auction.title}</p>
                        <p className="text-sm text-gray-400">Current Bid: ${auction.currentBid}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-blue-500 text-white">
                          <Clock className="h-3 w-3 mr-1" />
                          {auction.endTime}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                          View
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-blue-400 hover:text-blue-300">
                  View All Auctions
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {activeUsers.map((user) => (
                    <li key={user.id} className="flex items-center space-x-4">
                      <Avatar src={`/placeholder.svg?height=40&width=40`} alt={user.name} className="h-10 w-10" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{user.name}</p>
                        <p className="text-sm text-gray-400 truncate">{user.email}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-500 text-white">
                        {user.bids} bids
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-blue-400 hover:text-blue-300">
                  View All Users
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

    </div>
  )
}