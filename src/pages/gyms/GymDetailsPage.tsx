import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGym, useInitializePayment, useVerifyPayment } from '@/hooks/useApi';
import { RazorpayService } from '@/lib/razorpay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingSpinner, LoadingPage } from '@/components/ui/loading-spinner';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Star,
  Wifi,
  Car,
  Dumbbell,
  Users,
  CreditCard,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export const GymDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const { data: gymResponse, isLoading, error } = useGym(id!);
  const initializePayment = useInitializePayment();
  const verifyPayment = useVerifyPayment();

  const gym = gymResponse?.data;

  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
    } catch {
      return 'N/A';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const handlePurchaseMembership = async (planId: string) => {
    if (!gym) return;

    try {
      setIsProcessingPayment(true);
      
      // Initialize payment
      const paymentResponse = await initializePayment.mutateAsync({
        gym_id: gym.gym_id,
        plan_id: planId,
        plan_type: 'monthly', // This should come from the plan
      });

      if (!paymentResponse.success || !paymentResponse.data) {
        throw new Error('Failed to initialize payment');
      }

      // Process payment with Razorpay
      await RazorpayService.initiatePayment(
        paymentResponse.data,
        async (response) => {
          try {
            // Verify payment
            await verifyPayment.mutateAsync({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            toast.success('Membership purchased successfully!');
            navigate('/memberships');
          } catch (error) {
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        () => {
          toast.error('Payment cancelled');
        }
      );
    } catch (error: any) {
      toast.error(error.message || 'Failed to process payment');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (isLoading) {
    return <LoadingPage message="Loading gym details..." />;
  }

  if (error || !gym) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <p className="text-destructive">Gym not found or failed to load.</p>
            <Button onClick={() => navigate('/gyms')} className="mt-4">
              Back to Gyms
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Back Button */}
      <Button
        variant="outline"
        onClick={() => navigate('/gyms')}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Gyms
      </Button>

      {/* Gym Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{gym.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.5</span>
                <span className="text-muted-foreground">(120 reviews)</span>
              </div>
              <Badge variant="secondary">Verified</Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
            <Button>
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{gym.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{formatTime(gym.opening_time)} - {formatTime(gym.closing_time)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{gym.phone_number}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="plans">Membership Plans</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About This Gym</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {gym.description || 'No description available.'}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Operating Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>{formatTime(gym.opening_time)} - {formatTime(gym.closing_time)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>6:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>7:00 AM - 9:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{gym.phone_number}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{gym.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm">{gym.address}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="amenities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Facilities & Amenities</CardTitle>
              <CardDescription>
                Everything you need for a complete workout experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              {gym.gym_amenities && gym.gym_amenities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gym.gym_amenities.map((amenity) => (
                    <div key={amenity.amenity_id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No amenities information available.</p>
              )}
            </CardContent>
          </Card>

          {gym.gym_classes_services && gym.gym_classes_services.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Classes & Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gym.gym_classes_services.map((service) => (
                    <div key={service.service_id} className="border rounded-lg p-4">
                      <h4 className="font-semibold">{service.name}</h4>
                      {service.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {service.description}
                        </p>
                      )}
                      {service.price && (
                        <p className="text-sm font-medium text-primary mt-2">
                          {formatPrice(service.price)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Membership Plans</CardTitle>
              <CardDescription>
                Choose the plan that fits your fitness goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              {gym.membership_plans && gym.membership_plans.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gym.membership_plans.map((plan) => (
                    <Card 
                      key={plan.plan_id} 
                      className={`relative ${selectedPlan === plan.plan_id ? 'ring-2 ring-primary' : ''}`}
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {plan.plan_name}
                          <Badge variant="outline">{plan.plan_type}</Badge>
                        </CardTitle>
                        <div className="space-y-1">
                          <div className="text-3xl font-bold">
                            {formatPrice(plan.price)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            for {plan.duration_days} days
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          {plan.description}
                        </p>
                        
                        {plan.features && plan.features.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="font-medium">Features:</h5>
                            <ul className="space-y-1">
                              {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <Button
                          className="w-full"
                          onClick={() => handlePurchaseMembership(plan.plan_id)}
                          disabled={isProcessingPayment}
                        >
                          {isProcessingPayment && selectedPlan === plan.plan_id ? (
                            <>
                              <LoadingSpinner size="sm" className="mr-2" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="h-4 w-4 mr-2" />
                              Purchase Plan
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No membership plans available at this time.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gallery</CardTitle>
              <CardDescription>
                Take a virtual tour of our facilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              {gym.gym_media && gym.gym_media.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gym.gym_media.map((media) => (
                    <div key={media.media_id} className="space-y-2">
                      {media.media_type === 'image' ? (
                        <img
                          src={media.media_url}
                          alt={media.caption || 'Gym image'}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ) : (
                        <video
                          src={media.media_url}
                          controls
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                      {media.caption && (
                        <p className="text-sm text-muted-foreground">{media.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No gallery images available.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};