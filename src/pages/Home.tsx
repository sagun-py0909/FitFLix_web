import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowRight, 
  PlayCircle,
  Clock,
  Dumbbell
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import heroImage from "@/assets/hero-fitness.jpg";
import Footer from "@/components/Footer";

const Home = () => {

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url(${heroImage})`
        }}
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="hero-title text-white mb-6">
              WE ARE
              <br />
              <span className="text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text">Fitflix</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Your complete fitness ecosystem - gyms, apps, nutrition, and community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="btn-fitness text-lg px-8 py-4 group"
                asChild
              >
                <Link to="/discover-gym">
                  Explore Programs
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-background text-lg px-8 py-4"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-glow-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
      </section>

      {/* Premium Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black gradient-text mb-6">
              Premium Gym Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              State-of-the-art facilities and cutting-edge equipment for your ultimate workout
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-4">Advanced Equipment & Training</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Access premium strength training equipment, cardio machines, and functional training areas 
                  designed to maximize your workout efficiency and results.
                </p>
                <Button className="btn-fitness">
                  Explore Equipment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-2 backdrop-blur-sm border border-primary/20">
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop" 
                  alt="Modern Gym Equipment" 
                  className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-glow-pulse" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-3xl p-2 backdrop-blur-sm border border-secondary/20">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop" 
                  alt="Group Fitness Classes" 
                  className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary/20 rounded-full blur-xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <h3 className="text-3xl font-bold mb-4">Group Fitness & Personal Training</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Join energizing group fitness classes or work one-on-one with certified personal trainers 
                  to achieve your specific fitness goals faster and safer.
                </p>
                <Button className="btn-fitness">
                  Book Training
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-4xl font-black gradient-text">
                World-Class
                <br />
                Facilities
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Experience luxury fitness with our spacious gym floors, Olympic-grade equipment, 
                swimming pools, sauna, and recovery zones designed for optimal performance.
              </p>
              <Button className="btn-fitness">
                Tour Facilities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="lg:col-span-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=900&h=500&fit=crop" 
                  alt="Premium Gym Facilities" 
                  className="w-full h-[350px] object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl" />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "4", label: "Premium Locations", description: "Electronic City & More" },
              { number: "1000+", label: "Workout Minutes", description: "In our app" },
              { number: "10", label: "Training Categories", description: "Professional guidance" },
              { number: "24/7", label: "App Access", description: "Train anytime" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-5xl font-black text-primary">{stat.number}</div>
                <div className="text-xl font-semibold">{stat.label}</div>
                <div className="text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Ready to Transform?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of fitness enthusiasts who've already started their journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-background hover:bg-white/90 text-lg px-8 py-4 group"
                asChild
              >
                <Link to="/discover-gym">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
              >
                <Clock className="mr-2 h-5 w-5" />
                Book Free Trial
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
      </section>

    </div>
  );
};

export default Home;
