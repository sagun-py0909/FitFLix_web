
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, Clock, Star, Users, Wifi, Car, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CallbackForm from "@/components/CallbackForm";

interface Gym {
  id: number;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  phone_number: string;
  email: string;
  opening_time: string;
  closing_time: string;
  holiday_dates: string[];
  description: string;
  rating: number;
  amenities: string[];
  is_deleted: boolean;
  verified: boolean;
}

const DiscoverGym = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [callbackFormOpen, setCallbackFormOpen] = useState(false);
  const navigate = useNavigate();

  // Local gym data stored in useState
  const [gyms] = useState([
    {
      id: 1,
      name: "Fitflix Gym - ITI Layout, Bangalore",
      address: "No. 294, 1st Floor, Above Bhagayalakshmi Super Market, 5th Main, 4th Cross Road, Iti Layout-560050, Bangalore",
      latitude: "12.9423",
      longitude: "77.5649",
      phone_number: "+91 75103 82782",
      email: "info@fitflix.in",
      opening_time: "1970-01-01T06:00:00.000Z",
      closing_time: "1970-01-01T22:00:00.000Z",
      holiday_dates: [],
      description: "Fitflix Gym in ITI Layout, Bangalore is known for its commitment to helping members achieve their health and fitness goals. Offers Gym, Cardio, Crossfit, Strengthening Exercises, and Personal Trainers.",
      rating: 4.5,
      amenities: ["Gym", "Cardio", "Crossfit", "Personal Training"],
      is_deleted: false,
      verified: true,
    },
    {
      id: 2,
      name: "Fitflix Gym - Electronic City Phase I, Bengaluru",
      address: "94, 3rd floor above Domino's, Opp- Ajmera Infinity, Neeladri Road, EC Phase, 1, Bengaluru, Karnataka 560100",
      latitude: "12.8441",
      longitude: "77.6675",
      phone_number: "+91 75103 82782",
      email: "info@fitflix.in",
      opening_time: "1970-01-01T06:30:00.000Z",
      closing_time: "1970-01-01T22:30:00.000Z",
      holiday_dates: [],
      description: "Fitflix Gym Electronic City Phase I offers facilities like Parking, Personal Training, Group Classes, Free Trial, Shower, Nutritional Support, Locker room, Certified Trainers.",
      rating: 4.8,
      amenities: ["Parking", "Personal Training", "Group Classes", "Shower", "Locker room"],
      is_deleted: false,
      verified: true,
    },
    {
      id: 3,
      name: "Fitflix Gym - Whitefield, Bengaluru",
      address: "2nd FLOOR, THULIP SPA, FITFLIX GYMS, ITPL Main Rd, opp. to SHERATON HOTEL, above HYDERABAD HOUSE, Bengaluru, Karnataka 560048",
      latitude: "12.9728",
      longitude: "77.7499",
      phone_number: "+91 75103 82782",
      email: "info@fitflix.in",
      opening_time: "1970-01-01T05:00:00.000Z",
      closing_time: "1970-01-01T22:30:00.000Z",
      holiday_dates: [],
      description: "Fitflix Gym Whitefield offers various fitness options including Gym. Known for top-notch amenities and experienced professionals.",
      rating: 4.7,
      amenities: ["Gym", "Premium Equipment", "Experienced Trainers"],
      is_deleted: false,
      verified: true,
    },
    {
      id: 4,
      name: "Fitflix Gym - Anna Nagar, Chennai",
      address: "FITFLIX GYM ANNANAGAR, Karuna conclave, 4th Ave, Shanthi Colony, Anna Nagar, Chennai, Tamil Nadu, 600040",
      latitude: "13.0874",
      longitude: "80.2171",
      phone_number: "+91 75103 82782",
      email: "info@fitflix.in",
      opening_time: "1970-01-01T05:30:00.000Z",
      closing_time: "1970-01-01T23:00:00.000Z",
      holiday_dates: [],
      description: "Fitflix Gym Anna Nagar is a premium gym in Chennai, praised for its spaciousness, good equipment, ambiance, friendly trainers, and variety of classes.",
      rating: 4.9,
      amenities: ["Spacious", "Premium Equipment", "Group Classes", "Yoga"],
      is_deleted: false,
      verified: true,
    },
  ]);

  const [loading] = useState(false); // No longer loading from API
  const [error] = useState(""); // No API errors

  const filteredGyms = gyms.filter(gym =>
    gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gym.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (gym: Gym) => {
    navigate(`/gym/${gym.id}`);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Discover Your <span className="text-primary">Perfect</span>{" "}
            <span className="text-secondary">Gym</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Find the best fitness centers in your area with AI-powered recommendations and detailed insights
          </p>
        </div>
        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search gyms by name, location, or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Gyms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Gyms</SelectItem>
                <SelectItem value="strength">Strength Training</SelectItem>
                <SelectItem value="yoga">Yoga & Wellness</SelectItem>
                <SelectItem value="powerlifting">Powerlifting</SelectItem>
                <SelectItem value="cardio">HIIT & Cardio</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <p className="text-muted-foreground">
            <span className="text-primary font-semibold">{filteredGyms.length}</span> gyms found
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
        </div>
        {/* Gym Cards or Loading/Error */}
        {loading ? (
          <div className="text-center py-12">Loading gyms...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : (
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {filteredGyms.map((gym) => (
              <Card key={gym.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Dumbbell className="h-16 w-16 text-primary/40" />
                  </div>
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">{gym.name}</Badge>
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      {gym.email}
                    </Badge>
                    {(!gym.is_deleted && gym.verified) && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500 text-xs">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg sm:text-xl font-bold">{gym.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{gym.rating || "-"}</span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>{gym.address}</span>
                      <span>•</span>
                      <span>{gym.phone_number}</span>
                      <Users className="h-4 w-4 ml-2 flex-shrink-0" />
                      <span>{gym.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span>{gym.opening_time ? `${gym.opening_time.substring(11,16)} - ${gym.closing_time?.substring(11,16)}` : "Not available"}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">{gym.description ? "Description" : "Amenities"}</p>
                    <div className="flex flex-wrap gap-1">
                      {gym.description ? (
                        <span className="text-xs text-muted-foreground">{gym.description}</span>
                      ) : (
                        gym.amenities && gym.amenities.map((amenity: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      className="flex-1 btn-fitness"
                      onClick={() => handleViewDetails(gym)}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setCallbackFormOpen(true)}
                    >
                      Request Callback
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Callback Form */}
        <CallbackForm
          isOpen={callbackFormOpen}
          onClose={() => setCallbackFormOpen(false)}
        />
      </div>
    </div>
  );
};

export default DiscoverGym;
