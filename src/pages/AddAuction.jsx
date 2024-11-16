import { useEffect, useState } from "react";
import { Upload, AlertCircle, Loader, Images, X } from "lucide-react";
import {
  Button,
  Input,
  Textarea,
  Select,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui";
import Header from "../components/header";
import Footer from "../components/footer";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function AddAuction() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "S&D - Add Auction";
  }, []);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startPrice: "",
    participationPrice: "",
    duration: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [images, setImages] = useState(new Array());
  const [imageId, setImagesId] = useState(1);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const i = [...images];
      i.push({ id: imageId, file });
      setImagesId(imageId + 1);

      setTimeout(() => {
        setImages(i);
        setLoading(false);
      }, 2000);
    }
  };
  const removeImage = (id) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic form validation
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.startPrice || isNaN(formData.startPrice))
      newErrors.startPrice = "Valid starting price is required";
    if (formData.startPrice < 1)
      newErrors.startPrice = "Starting price must be at least $1.00";
    if (!formData.participationPrice || isNaN(formData.startPrice))
      newErrors.participationPrice = "Participation price is required";
    if (!formData.duration) newErrors.duration = "Duration is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      let Data = { ...formData };
      Data.currentPrice = Data.startPrice;
      Data.startTime = new Date();
      Data.endTime = new Date(Data.startTime);
      Data.endTime.setDate(Data.startTime.getDate() + Number(Data.duration));
      const token = jwtDecode(localStorage.getItem("token"));
      Data.seller = { id: token.sub };
      Data.status = "OPEN";

      try {
        const res = await fetch("/api/auction/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        });
        if (res.ok) {
          const data = await res.json();

          images.forEach(async (image) => {
            let ImageRequest = new FormData();
            ImageRequest.append("auctionId", data.id);
            ImageRequest.append("file", image.file);
            try {
              const res = await fetch("/api/images/add", {
                method: "POST",
                body: ImageRequest,
              });
              if (res.ok) {
                navigate("/auction/" + data.id);
              }
            } catch (e) {
              console.log(e);
            }
          });
        }
      } catch (e) {
        console.log(e);
      }
      // Reset form after successful submission
      setImages(new Array());
      setFormData({
        title: "",
        description: "",
        startPrice: "",
        duration: "",
        image: null,
      });
      setErrors({});
    }
  };

  const durations = [
    { value: "0", label: "Select duration" },
    { value: "1", label: "1 Day" },
    { value: "3", label: "3 Days" },
    { value: "5", label: "5 Days" },
    { value: "7", label: "7 Days" },
    { value: "10", label: "10 Days" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-400">
              Auction Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300"
                >
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter auction title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                  placeholder="Describe your item"
                  rows={4}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="startPrice"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Starting Price (TDN)
                  </label>
                  <Input
                    id="startPrice"
                    name="startPrice"
                    type="number"
                    value={formData.startPrice}
                    onChange={handleChange}
                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                    placeholder="0.00"
                  />
                  {errors.startPrice && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.startPrice}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="paricipationPrice"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Participating Price (TDN)
                  </label>
                  <Input
                    id="participationPrice"
                    name="participationPrice"
                    type="number"
                    value={formData.participationPrice}
                    onChange={handleChange}
                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                    placeholder="0.00"
                  />
                  {errors.participationPrice && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.participationPrice}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-300"
                >
                  Auction Duration
                </label>
                <Select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={(value) =>
                    handleChange({
                      target: {
                        name: "duration",
                        value: value.currentTarget.value,
                      },
                    })
                  }
                  options={durations}
                  className="mt-1 bg-gray-800 border-gray-700 text-white"
                />
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-500">{errors.duration}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-300"
                >
                  Upload Image
                </label>
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
                </div>

                {images.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preview Images
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {images.map((image) => (
                        <div
                          key={image.id}
                          className="relative bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden"
                        >
                          <img
                            src={URL.createObjectURL(image.file)}
                            alt={`Preview ${image.id}`}
                            className="w-full h-32 object-cover"
                          />
                          <Button
                            onClick={() => removeImage(image.id)}
                            className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full"
                            size="icon"
                          >
                            <X className="w-4 h-4" />
                            <span className="sr-only">Remove image</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
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
              <li>
                Auction duration cannot be changed once the listing is live.
              </li>
              <li>
                High-quality images increase the chances of a successful sale.
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
