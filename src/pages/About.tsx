
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dumbbell, Smartphone, ShoppingCart, Users, MapPin, Trophy, Heart, Star } from "lucide-react";

const About = () => {
  const services = [
    {
      icon: Dumbbell,
      title: "Fitness Centers",
      description: "Premium gyms in Electronic City and Marathahalli with spacious facilities and state-of-the-art equipment offering diverse training programs.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
      features: ["Modern Equipment", "Personal Training", "Group Classes", "Spacious Facilities"]
    },
    {
      icon: Smartphone,
      title: "Workout App",
      description: "Fitflix Full Body Workout app with 1000+ minutes of training across 10 categories, professional trainer guidance, and planned diet features.",
      image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop",
      features: ["1000+ Minutes Training", "10 Categories", "Professional Guidance", "Equipment Optional"],
      comingSoon: true
    },
    {
      icon: ShoppingCart,
      title: "Nutrition Products",
      description: "Premium supplements including BODEN Vitamin D3, BioPro Whey protein, and Creashroom (creatine & cordyceps blend) for optimal performance.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      features: ["Vitamin D3", "Whey Protein", "Creatine Blends", "Performance Support"]
    },
    {
      icon: Users,
      title: "Fitness Classes",
      description: "Engaging fitness and dance classes led by certified instructors, fostering our supportive 'Fitflix Fam' community experience.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      features: ["Dance Classes", "Certified Instructors", "Community Focus", "Fitflix Fam"]
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Premium Gym Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop')"
        }}
      />
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary/30">About Fitflix</Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              About <span className="text-transparent bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text">Fitflix</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Fitflix is a comprehensive fitness brand that encompasses various aspects of health and wellness. 
              We offer fitness centers, workout apps, and nutrition products designed to provide variety, 
              community support, and accessible fitness solutions for everyone.
            </p>
          </div>

          {/* Services Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Our Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover the complete Fitflix ecosystem designed to support every aspect of your fitness journey
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className={`group overflow-hidden hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 bg-gradient-to-b from-background/80 to-primary/5 backdrop-blur-sm ${service.comingSoon ? 'opacity-75' : ''}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      {service.comingSoon && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-yellow-500 text-yellow-900 border-yellow-400">
                            Coming Soon
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center gap-2 text-white">
                          <div className="p-2 bg-primary/80 rounded-full backdrop-blur-sm">
                            <Icon className="w-5 h-5" />
                          </div>
                          <h3 className="text-lg font-bold">{service.title}</h3>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {service.description}
                        {service.comingSoon && (
                          <span className="block mt-2 text-sm text-yellow-600 font-medium">
                            📱 App launching soon - stay tuned!
                          </span>
                        )}
                      </p>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-primary mb-2">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Key Aspects */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <Card className="text-center p-6 border-primary/10 hover:border-primary/30 bg-gradient-to-b from-background/80 to-primary/5 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Focus on Variety</h3>
              <p className="text-muted-foreground leading-relaxed">
                Wide range of fitness and nutrition options to cater to different needs and preferences
              </p>
            </Card>
            
            <Card className="text-center p-6 border-primary/10 hover:border-primary/30 bg-gradient-to-b from-background/80 to-primary/5 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Focus</h3>
              <p className="text-muted-foreground leading-relaxed">
                Building the supportive "Fitflix Fam" community that motivates and connects fitness enthusiasts
              </p>
            </Card>
            
            <Card className="text-center p-6 border-primary/10 hover:border-primary/30 bg-gradient-to-b from-background/80 to-primary/5 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Accessibility</h3>
              <p className="text-muted-foreground leading-relaxed">
                Available through multiple platforms including mobile app, Instagram, and physical locations
              </p>
            </Card>
          </div>

          {/* Founder Vision */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12 mb-20 border border-primary/10 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Meet Our Founder</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The visionary behind Fitflix who is dedicated to transforming the fitness industry
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="w-32 h-32 mx-auto lg:mx-0 mb-6">
                  <img 
                    src="src/assets/1714407900720.jpeg" 
                    alt="Founder" 
                    className="w-full h-full object-cover rounded-full border-4 border-primary/20"
                  />
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-1">Rahul Raju</h3>
                  <p className="text-primary font-medium">Founder @ Fitflix</p>
                  <p className="text-sm text-muted-foreground">Leading Start-up Ventures</p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "When I started Fitflix, my vision was to create a comprehensive fitness ecosystem that serves every aspect of health and wellness. 
                  From premium gym facilities to innovative workout apps and high-quality nutrition products, we wanted to provide variety and accessibility 
                  that traditional fitness brands couldn't match."
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "What makes Fitflix special is our community focus - the 'Fitflix Fam' isn't just a marketing term, it's the heart of everything we do. 
                  Whether you're training in our Electronic City gym, following our upcoming app workouts, or using our nutrition products, you're part of a 
                  supportive community that celebrates every victory. We're building something that truly transforms lives, one workout at a time."
                </p>
                <Button className="btn-fitness">
                  Join the Fitflix Fam
                </Button>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 border border-primary/20 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-4">Ready to Join the Fitflix Experience?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Visit our gyms, explore our nutrition products, and stay tuned for our upcoming workout app. Your fitness journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-fitness px-8 py-3">
                Find a Gym Near You
              </Button>
              <Button variant="outline" className="px-8 py-3 border-primary/20 hover:bg-primary/5" disabled>
                App Coming Soon
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
