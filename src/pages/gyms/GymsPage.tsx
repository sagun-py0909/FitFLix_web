import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGyms } from '@/hooks/useApi';
import { SearchFilters } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  Filter,
  Grid,
  List,
  Phone,
  Mail
} from 'lucide-react';

export const GymsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  
  const navigate = useNavigate();
  const { data: gymsResponse, isLoading, error } = useGyms(filters);

  const gyms = gymsResponse?.data || [];

  const filteredGyms = gyms.filter(gym =>
    gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gym.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGymClick = (gymId: string) => {
    navigate(`/gyms/${gymId}`);
  };

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
          <CardContent className="pt-6 text-center">
            <p className="text-destructive">Failed to load gyms. Please try again.</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Discover Gyms</h1>
          <p className="text-muted-foreground">
            Find the perfect gym for your fitness journey
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search gyms by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value as any }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Radius (km)</label>
                  <Select onValueChange={(value) => setFilters(prev => ({ ...prev, radius: parseInt(value) }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Within..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 km</SelectItem>
                      <SelectItem value="10">10 km</SelectItem>
                      <SelectItem value="25">25 km</SelectItem>
                      <SelectItem value="50">50 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={() => setFilters({})}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredGyms.length}</span> gyms found
          </p>
        </div>
      </div>

      {/* Gyms Grid/List */}
      {filteredGyms.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No gyms found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredGyms.map((gym) => (
            <Card 
              key={gym.gym_id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleGymClick(gym.gym_id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{gym.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">4.5</span>
                      <span className="text-sm text-muted-foreground">(120 reviews)</span>
                    </div>
                  </div>
                  <Badge variant="secondary">Verified</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{gym.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {formatTime(gym.opening_time)} - {formatTime(gym.closing_time)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{gym.phone_number}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{gym.email}</span>
                    </div>
                  </div>
                </div>

                {gym.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {gym.description}
                  </p>
                )}

                {gym.gym_amenities && gym.gym_amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {gym.gym_amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity.amenity_id} variant="outline" className="text-xs">
                        {amenity.name}
                      </Badge>
                    ))}
                    {gym.gym_amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{gym.gym_amenities.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGymClick(gym.gym_id);
                    }}
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle directions
                    }}
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};