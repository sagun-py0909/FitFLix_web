import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserMemberships, useDailyNutrition } from '@/hooks/useApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Dumbbell, 
  Calendar, 
  TrendingUp, 
  Target, 
  Apple, 
  MessageCircle,
  CreditCard,
  MapPin,
  Clock,
  Award,
  Zap
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { data: memberships, isLoading: membershipsLoading } = useUserMemberships();
  const { data: nutrition, isLoading: nutritionLoading } = useDailyNutrition();

  const activeMemberships = memberships?.data?.filter(m => m.status === 'active') || [];
  const todayNutrition = nutrition?.data;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getUserName = () => {
    if (user?.first_name) {
      return user.first_name;
    }
    if (user?.username) {
      return user.username;
    }
    return 'there';
  };

  const quickActions = [
    {
      title: 'Find Gyms',
      description: 'Discover gyms near you',
      icon: MapPin,
      href: '/gyms',
      color: 'bg-blue-500',
    },
    {
      title: 'Log Meal',
      description: 'Track your nutrition',
      icon: Apple,
      href: '/nutrition',
      color: 'bg-green-500',
    },
    {
      title: 'AI Coach',
      description: 'Get fitness advice',
      icon: MessageCircle,
      href: '/chat',
      color: 'bg-purple-500',
    },
    {
      title: 'Memberships',
      description: 'Manage subscriptions',
      icon: CreditCard,
      href: '/memberships',
      color: 'bg-orange-500',
    },
  ];

  const stats = [
    {
      title: 'Active Memberships',
      value: activeMemberships.length,
      icon: Dumbbell,
      color: 'text-blue-500',
    },
    {
      title: 'Calories Today',
      value: todayNutrition?.total_calories || 0,
      icon: Zap,
      color: 'text-green-500',
    },
    {
      title: 'Workout Streak',
      value: '5 days', // This would come from workout tracking
      icon: Award,
      color: 'text-purple-500',
    },
    {
      title: 'Goals Achieved',
      value: '3/5', // This would come from goal tracking
      icon: Target,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          {getGreeting()}, {getUserName()}! 👋
        </h1>
        <p className="text-muted-foreground">
          Ready to crush your fitness goals today?
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Jump into your fitness routine
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} to={action.href}>
                  <Card className="hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer">
                    <CardContent className="p-4 text-center space-y-3">
                      <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mx-auto`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Memberships */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Active Memberships
            </CardTitle>
            <CardDescription>
              Your current gym subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {membershipsLoading ? (
              <div className="flex items-center justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : activeMemberships.length > 0 ? (
              <div className="space-y-4">
                {activeMemberships.slice(0, 2).map((membership) => (
                  <div key={membership.membership_id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{membership.gym.name}</h4>
                      <Badge variant="secondary">{membership.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {membership.plan.plan_name}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Expires: {new Date(membership.end_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
                {activeMemberships.length > 2 && (
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/memberships">View All Memberships</Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <p className="font-medium">No active memberships</p>
                  <p className="text-sm text-muted-foreground">
                    Find a gym and start your fitness journey
                  </p>
                </div>
                <Button asChild>
                  <Link to="/gyms">Find Gyms</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Today's Nutrition */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-5 w-5" />
              Today's Nutrition
            </CardTitle>
            <CardDescription>
              Track your daily intake
            </CardDescription>
          </CardHeader>
          <CardContent>
            {nutritionLoading ? (
              <div className="flex items-center justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : todayNutrition ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {todayNutrition.total_calories}
                    </p>
                    <p className="text-sm text-muted-foreground">Calories</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-500">
                      {todayNutrition.total_protein_g}g
                    </p>
                    <p className="text-sm text-muted-foreground">Protein</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Daily Goal Progress</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} />
                </div>

                <Button variant="outline" asChild className="w-full">
                  <Link to="/nutrition">View Details</Link>
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <Apple className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <p className="font-medium">No meals logged today</p>
                  <p className="text-sm text-muted-foreground">
                    Start tracking your nutrition
                  </p>
                </div>
                <Button asChild>
                  <Link to="/nutrition">Log Meal</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Your latest fitness activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Apple className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Logged breakfast</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Dumbbell className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Completed workout</p>
                <p className="text-sm text-muted-foreground">Yesterday</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-3 border rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Asked AI coach about nutrition</p>
                <p className="text-sm text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};