import  { useState } from 'react'
import {  Upload, AlertCircle,Loader  } from "lucide-react"
import { Button, Input, Textarea, Select, Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui'
import Header from './header'
import Footer from './footer'

export default function AddAuction() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    startingPrice: '',
    reservePrice: '',
    duration: '',
    image: null
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLoading(true)

      // Simulate image upload process
      setTimeout(() => {
        setFormData(prevState => ({
          ...prevState,
          image: file
        }))
        setLoading(false)
      }, 2000) // Simulate a 2-second delay for image processing
    }
  }

  const handleSubmit = (e) => {
    console.log("Form submitted:", formData);
    
    e.preventDefault()
    const newErrors = {}

      // Basic form validation
    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.startingPrice || isNaN(formData.startingPrice)) newErrors.startingPrice = "Valid starting price is required"
    if (formData.startingPrice < 1) newErrors.startingPrice = "Starting price must be at least $1.00"
    if (formData.reservePrice < formData.startingPrice) newErrors.reservePrice = "Reserve price must be higher than the starting price"
    if (!formData.duration) newErrors.duration = "Duration is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      // Here you would typically send the form data to your backend
      console.log("Form submitted:", formData)
      alert("Auction created successfully!")
      // Reset form after successful submission
      setFormData({
        title: '',
        category: '',
        description: '',
        startingPrice: '',
        reservePrice: '',
        duration: '',
        image: null
      })
      setErrors({})
    }
  }

  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports' },
    { value: 'art', label: 'Art' },
    { value: 'collectibles', label: 'Collectibles' },
    { value: 'vehicles', label: 'Vehicles' },
  ]

  const durations = [
    { value: '1', label: '1 Day' },
    { value: '3', label: '3 Days' },
    { value: '5', label: '5 Days' },
    { value: '7', label: '7 Days' },
    { value: '10', label: '10 Days' },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header/>

      <main className="container mx-auto px-4 py-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-400">Auction Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter auction title"
                />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
                <Select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={(value) => handleChange({ target: { name: 'category', value: value.currentTarget.value } })}
                  options={categories}
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                />
                {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                  placeholder="Describe your item"
                  rows={4}
                />
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="startingPrice" className="block text-sm font-medium text-gray-300">Starting Price ($)</label>
                  <Input
                    id="startingPrice"
                    name="startingPrice"
                    type="number"
                    value={formData.startingPrice}
                    onChange={handleChange}
                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                    placeholder="0.00"
                  />
                  {errors.startingPrice && <p className="mt-1 text-sm text-red-500">{errors.startingPrice}</p>}
                </div>

                <div>
                  <label htmlFor="reservePrice" className="block text-sm font-medium text-gray-300">Reserve Price ($) (Optional)</label>
                  <Input
                    id="reservePrice"
                    name="reservePrice"
                    type="number"
                    value={formData.reservePrice}
                    onChange={handleChange}
                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-300">Auction Duration</label>
                <Select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={(value) => handleChange({ target: { name: 'duration', value:value.currentTarget.value } })}
                  options={durations}
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                />
                {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-300">Upload Image</label>
                <div className="mt-1 flex items-center">
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  <label
                    htmlFor="image"
                    className="cursor-pointer bg-gray-800 border border-gray-700 rounded-md py-2 px-4 inline-flex items-center text-sm font-medium text-gray-300 hover:bg-gray-700"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Choose file
                  </label>
                  
                  {loading ? (
                    <div className="ml-3 flex items-center">
                      <Loader className="animate-spin h-5 w-5 text-blue-400" />
                      <span className="ml-2 text-sm text-gray-400">Uploading...</span>
                    </div>
                  ) : formData.image && (
                    <span className="ml-3 text-sm text-gray-400">{formData.image.name}</span>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Create Auction
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gray-900 border-gray-800 mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-400 flex items-center">
              <AlertCircle className="mr-2" />
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Ensure all information provided is accurate and complete.</li>
              <li>Starting price must be at least $1.00.</li>
              <li>Reserve price is optional. If set, it must be higher than the starting price.</li>
              <li>Auction duration cannot be changed once the listing is live.</li>
              <li>High-quality images increase the chances of a successful sale.</li>
            </ul>
          </CardContent>
        </Card>
      </main>

      <Footer/>
    </div>
  )
}