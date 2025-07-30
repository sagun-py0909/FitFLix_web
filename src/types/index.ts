// Core Types
export interface User {
  user_id: string;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  role: 'user' | 'admin';
  created_at: string;
  user_profiles?: UserProfile;
}

export interface UserProfile {
  profile_id: string;
  user_id: string;
  date_of_birth?: string;
  height_cm?: number;
  weight_kg?: number;
  gender?: 'male' | 'female' | 'other';
  primary_fitness_goal?: string;
  dietary_preferences?: string[];
  allergies?: string[];
  profile_picture_url?: string;
  city?: string;
  phone_number?: string;
  created_at: string;
  updated_at: string;
}

export interface Gym {
  gym_id: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  phone_number: string;
  email: string;
  opening_time: string;
  closing_time: string;
  description: string;
  distance?: number;
  gym_amenities: GymAmenity[];
  gym_classes_services: GymService[];
  gym_media: GymMedia[];
  membership_plans: MembershipPlan[];
}

export interface GymAmenity {
  amenity_id: string;
  name: string;
  icon?: string;
}

export interface GymService {
  service_id: string;
  name: string;
  description?: string;
  price?: number;
}

export interface GymMedia {
  media_id: string;
  media_type: 'image' | 'video';
  media_url: string;
  caption?: string;
}

export interface MembershipPlan {
  plan_id: string;
  gym_id: string;
  plan_name: string;
  plan_type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  price: number;
  duration_days: number;
  description: string;
  features: string[];
  is_active: boolean;
}

export interface UserMembership {
  membership_id: string;
  user_id: string;
  gym_id: string;
  plan_id: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'cancelled';
  digital_pass_code: string;
  auto_renew: boolean;
  gym: Pick<Gym, 'gym_id' | 'name' | 'address'>;
  plan: Pick<MembershipPlan, 'plan_id' | 'plan_name' | 'plan_type'>;
}

export interface PaymentOrder {
  order_id: string;
  amount: number;
  currency: string;
  razorpay_key_id: string;
  user_details: {
    name: string;
    email: string;
    contact: string;
  };
}

export interface NutritionEntry {
  log_id: string;
  user_id: string;
  date: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  food_item: string;
  calories_per_serving: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  servings: number;
  total_calories: number;
  total_protein_g: number;
  total_carbs_g: number;
  total_fat_g: number;
  logged_at: string;
}

export interface DailyNutrition {
  date: string;
  total_calories: number;
  total_protein_g: number;
  total_carbs_g: number;
  total_fat_g: number;
  meal_breakdown: {
    breakfast: MacroBreakdown;
    lunch: MacroBreakdown;
    dinner: MacroBreakdown;
    snack: MacroBreakdown;
  };
  entries: NutritionEntry[];
}

export interface MacroBreakdown {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

export interface ChatMessage {
  message_id: string;
  message: string;
  response: string;
  created_at: string;
  response_time_ms: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  username: string;
}

export interface OnboardingForm {
  date_of_birth: string;
  height_cm: number;
  weight_kg: number;
  gender: 'male' | 'female' | 'other';
  primary_fitness_goal: string;
  dietary_preferences: string[];
  allergies: string[];
  city: string;
  phone_number: string;
}

export interface NutritionForm {
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  food_item: string;
  calories_per_serving: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  servings: number;
}

// Utility Types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface SearchFilters {
  latitude?: number;
  longitude?: number;
  radius?: number;
  amenities?: string[];
  priceRange?: [number, number];
  sortBy?: 'distance' | 'price' | 'rating';
}