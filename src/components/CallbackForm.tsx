import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, User, MapPin, X } from "lucide-react";

interface CallbackFormProps {
  isOpen: boolean;
  onClose: () => void;
  prefillLocation?: string;
  gymId?: number;
}

const CallbackForm = ({ isOpen, onClose, prefillLocation, gymId }: CallbackFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    preferredLocation: prefillLocation || "",
  });

  const gymLocations = [
    "Fitflix Gym - ITI Layout, Bangalore",
    "Fitflix Gym - Electronic City Phase I, Bengaluru", 
    "Fitflix Gym - Whitefield, Bengaluru",
    "Fitflix Gym - Anna Nagar, Chennai",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submissionData = {
      ...formData,
      gymId: gymId || null,
      timestamp: new Date().toISOString(),
    };
    
    console.log("Callback Form Submitted:", submissionData);
    
    // Reset form
    setFormData({
      name: "",
      phoneNumber: "",
      preferredLocation: prefillLocation || "",
    });
    
    // Close form
    onClose();
    
    // You could also show a success toast here
    alert("Thank you! We'll call you back within 24 hours.");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Request Callback
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Fill out the form below and we'll call you back within 24 hours to discuss membership options.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="w-full"
              />
            </div>

            {/* Phone Number Field */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                required
                className="w-full"
              />
            </div>

            {/* Preferred Location Field */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Preferred Location *
              </Label>
              {prefillLocation ? (
                <div className="p-3 bg-primary/10 border rounded-md">
                  <p className="text-sm font-medium text-primary">{prefillLocation}</p>
                  <p className="text-xs text-muted-foreground">Location auto-selected from gym profile</p>
                </div>
              ) : (
                <Select
                  value={formData.preferredLocation}
                  onValueChange={(value) => handleInputChange("preferredLocation", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred gym location" />
                  </SelectTrigger>
                  <SelectContent>
                    {gymLocations.map((location, index) => (
                      <SelectItem key={index} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={!formData.name || !formData.phoneNumber || !formData.preferredLocation}
              >
                Request Callback
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CallbackForm;
