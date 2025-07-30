import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Dumbbell, 
  Smartphone, 
  ShoppingCart, 
  Users, 
  MapPin, 
  Trophy, 
  Heart, 
  Star,
  Target,
  Zap,
  Award
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const services = [
    {
      icon: Dumbbell,
      title: 'Premium Fitness Centers',
      description: 'State-of-the-art gyms across major cities with modern equipment, certified trainers, and diverse workout programs.',
      features: ['Modern Equipment', 'Certified Trainers', 'Group Classes', 'Personal Training'],
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
    },
    {
      icon: Smartphone,
      title: 'AI-Powered Fitness App',
      description: 'Comprehensive workout tracking, nutrition monitoring, and AI-powered coaching for personalized fitness guidance.',
      features: ['Workout Tracking', 'Nutrition Logging', 'AI Coach', 'Progress Analytics'],
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop',
    },
    {
      icon: ShoppingCart,
      title: 'Premium Supplements',
      description: 'High-quality nutrition products including protein powders, vitamins, and performance supplements.',
      features: ['Whey Protein', 'Vitamins', 'Pre-Workout', 'Recovery Supplements'],
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    },
    {
      icon: Users,
      title: 'Community & Support',
      description: 'Join the Fitflix family with group challenges, social features, and community support.',
      features: ['Group Challenges', 'Social Features', 'Expert Support', 'Community Events'],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    },
  ];

  const stats = [
    { number: '50+', label: 'Gym Locations', icon: MapPin },
    { number: '100K+', label: 'Active Members', icon: Users },
    { number: '500+', label: 'Certified Trainers', icon: Award },
    { number: '1M+', label: 'Workouts Completed', icon: Dumbbell },
  ];

  const values = [
    {
      icon: Trophy,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of fitness and wellness.',
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'Building a supportive community that motivates and inspires.',
    },
    {
      icon: Star,
      title: 'Innovation',
      description: 'Leveraging technology to enhance your fitness journey.',
    },
    {
      icon: Target,
      title: 'Results',
      description: 'Focused on helping you achieve your fitness goals.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">About Fitflix</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transforming Lives Through{' '}
            <span className="text-transparent bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text">
              Fitness
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Fitflix is more than just a fitness platform. We're a comprehensive ecosystem 
            designed to support every aspect of your health and wellness journey.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-2">
                  <Icon className="h-8 w-8 text-primary mx-auto" />
                  <div className="text-3xl font-bold">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive range of fitness and wellness services
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
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
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-primary">Key Features:</h4>
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
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              To democratize fitness by making high-quality gym facilities, expert guidance, 
              and wellness resources accessible to everyone. We believe that fitness is not 
              a luxury but a fundamental right, and we're committed to breaking down barriers 
              that prevent people from living their healthiest lives.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-4">
                <Zap className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-xl font-semibold">Accessibility</h3>
                <p className="text-muted-foreground">
                  Making fitness accessible to everyone, regardless of experience level or budget.
                </p>
              </div>
              <div className="space-y-4">
                <Target className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-xl font-semibold">Personalization</h3>
                <p className="text-muted-foreground">
                  Tailored experiences that adapt to your unique goals and preferences.
                </p>
              </div>
              <div className="space-y-4">
                <Heart className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-xl font-semibold">Community</h3>
                <p className="text-muted-foreground">
                  Building connections and support systems that motivate and inspire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of members who have transformed their lives with Fitflix. 
            Your fitness journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/auth/register">Get Started Today</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/gyms">Find a Gym</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};