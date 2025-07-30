import React from 'react';
import { Link } from 'react-router-dom';
import { useUserMemberships, useCancelMembership } from '@/hooks/useApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  CreditCard, 
  Calendar, 
  MapPin, 
  Clock, 
  AlertTriangle,
  Plus,
  MoreVertical,
  RefreshCw
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'react-hot-toast';

export const MembershipsPage: React.FC = () => {
  const { data: membershipsResponse, isLoading, error, refetch } = useUserMemberships();
  const cancelMembership = useCancelMembership();

  const memberships = membershipsResponse?.data || [];
  const activeMemberships = memberships.filter(m => m.status === 'active');
  const expiredMemberships = memberships.filter(m => m.status === 'expired');

  const handleCancelMembership = async (membershipId: string) => {
    if (!confirm('Are you sure you want to cancel this membership?')) {
      return;
    }

    try {
      await cancelMembership.mutateAsync(membershipId);
      toast.success('Membership cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel membership');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getDaysUntilExpiry = (endDate: string) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'expired':
        return 'bg-red-500';
      case 'cancelled':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center space-y-4">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
            <div>
              <h3 className="font-semibold">Failed to load memberships</h3>
              <p className="text-sm text-muted-foreground">
                Please try again or contact support if the problem persists.
              </p>
            </div>
            <Button onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Memberships</h1>
          <p className="text-muted-foreground">
            Manage your gym subscriptions and access
          </p>
        </div>
        <Button asChild>
          <Link to="/gyms">
            <Plus className="h-4 w-4 mr-2" />
            Find New Gym
          </Link>
        </Button>
      </div>

      {/* Active Memberships */}
      {activeMemberships.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Active Memberships</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeMemberships.map((membership) => {
              const daysLeft = getDaysUntilExpiry(membership.end_date);
              const isExpiringSoon = daysLeft <= 7;

              return (
                <Card key={membership.membership_id} className="relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{membership.gym.name}</CardTitle>
                        <Badge className={getStatusColor(membership.status)}>
                          {membership.status}
                        </Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleCancelMembership(membership.membership_id)}
                            className="text-destructive"
                          >
                            Cancel Membership
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{membership.gym.address}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{membership.plan.plan_name}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Expires: {formatDate(membership.end_date)}
                        </span>
                      </div>
                    </div>

                    {isExpiringSoon && (
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Digital Pass</span>
                        <code className="text-sm bg-background px-2 py-1 rounded">
                          {membership.digital_pass_code}
                        </code>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" asChild>
                        <Link to={`/gyms/${membership.gym_id}`}>
                          View Gym
                        </Link>
                      </Button>
                      <Button className="flex-1">
                        Renew
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Expired Memberships */}
      {expiredMemberships.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Past Memberships</h2>
          <div className="space-y-4">
            {expiredMemberships.map((membership) => (
              <Card key={membership.membership_id} className="opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-semibold">{membership.gym.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {membership.plan.plan_name} • Expired {formatDate(membership.end_date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-muted-foreground">
                        {membership.status}
                      </Badge>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/gyms/${membership.gym_id}`}>
                          Rejoin
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* No Memberships */}
      {memberships.length === 0 && (
        <Card className="text-center py-12">
          <CardContent className="space-y-4">
            <CreditCard className="h-16 w-16 text-muted-foreground mx-auto" />
            <div>
              <h3 className="text-xl font-semibold mb-2">No memberships yet</h3>
              <p className="text-muted-foreground mb-6">
                Start your fitness journey by finding a gym near you
              </p>
              <Button asChild size="lg">
                <Link to="/gyms">
                  <Plus className="h-4 w-4 mr-2" />
                  Find Gyms
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};