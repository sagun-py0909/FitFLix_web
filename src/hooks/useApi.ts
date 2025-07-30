import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { 
  Gym, 
  MembershipPlan, 
  UserMembership, 
  PaymentOrder, 
  NutritionEntry, 
  DailyNutrition, 
  ChatMessage,
  UserProfile,
  SearchFilters 
} from '@/types';

// Query Keys
export const queryKeys = {
  gyms: ['gyms'] as const,
  gym: (id: string) => ['gym', id] as const,
  memberships: ['memberships'] as const,
  userMemberships: ['user-memberships'] as const,
  nutrition: ['nutrition'] as const,
  dailyNutrition: (date: string) => ['nutrition', 'daily', date] as const,
  nutritionHistory: ['nutrition', 'history'] as const,
  chatHistory: ['chat', 'history'] as const,
  userProfile: ['user-profile'] as const,
};

// Gym Hooks
export const useGyms = (filters?: SearchFilters) => {
  return useQuery({
    queryKey: [...queryKeys.gyms, filters],
    queryFn: () => apiClient.get<Gym[]>('/gyms', filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGym = (id: string) => {
  return useQuery({
    queryKey: queryKeys.gym(id),
    queryFn: () => apiClient.get<Gym>(`/gyms/${id}`),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Membership Hooks
export const useMembershipPlans = () => {
  return useQuery({
    queryKey: queryKeys.memberships,
    queryFn: () => apiClient.get<MembershipPlan[]>('/memberships'),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const useUserMemberships = () => {
  return useQuery({
    queryKey: queryKeys.userMemberships,
    queryFn: () => apiClient.get<UserMembership[]>('/users/me/memberships'),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useSubscribeMembership = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { gym_id: string; plan_id: string; plan_type: string }) =>
      apiClient.post<UserMembership>('/users/me/memberships', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userMemberships });
    },
  });
};

export const useCancelMembership = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (membershipId: string) =>
      apiClient.delete(`/users/me/memberships/${membershipId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userMemberships });
    },
  });
};

// Payment Hooks
export const useInitializePayment = () => {
  return useMutation({
    mutationFn: (data: { gym_id: string; plan_id: string; plan_type: string }) =>
      apiClient.post<PaymentOrder>('/payments/initialize', data),
  });
};

export const useVerifyPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    }) => apiClient.post('/payments/verify', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userMemberships });
    },
  });
};

// Nutrition Hooks
export const useLogNutrition = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<NutritionEntry, 'log_id' | 'user_id' | 'date' | 'total_calories' | 'total_protein_g' | 'total_carbs_g' | 'total_fat_g' | 'logged_at'>) =>
      apiClient.post<NutritionEntry>('/nutrition/log', data),
    onSuccess: (_, variables) => {
      const today = new Date().toISOString().split('T')[0];
      queryClient.invalidateQueries({ queryKey: queryKeys.dailyNutrition(today) });
      queryClient.invalidateQueries({ queryKey: queryKeys.nutritionHistory });
    },
  });
};

export const useDailyNutrition = (date?: string) => {
  const targetDate = date || new Date().toISOString().split('T')[0];
  
  return useQuery({
    queryKey: queryKeys.dailyNutrition(targetDate),
    queryFn: () => apiClient.get<DailyNutrition>('/nutrition/daily', { date: targetDate }),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useNutritionHistory = (days: number = 7) => {
  return useQuery({
    queryKey: [...queryKeys.nutritionHistory, days],
    queryFn: () => apiClient.get('/nutrition/history', { days }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateNutrition = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<NutritionEntry> }) =>
      apiClient.put(`/nutrition/${id}`, data),
    onSuccess: () => {
      const today = new Date().toISOString().split('T')[0];
      queryClient.invalidateQueries({ queryKey: queryKeys.dailyNutrition(today) });
      queryClient.invalidateQueries({ queryKey: queryKeys.nutritionHistory });
    },
  });
};

export const useDeleteNutrition = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/nutrition/${id}`),
    onSuccess: () => {
      const today = new Date().toISOString().split('T')[0];
      queryClient.invalidateQueries({ queryKey: queryKeys.dailyNutrition(today) });
      queryClient.invalidateQueries({ queryKey: queryKeys.nutritionHistory });
    },
  });
};

// Chatbot Hooks
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { message: string; includeContext?: boolean }) =>
      apiClient.post<ChatMessage>('/chatbot/message', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chatHistory });
    },
  });
};

export const useChatHistory = (limit: number = 50) => {
  return useQuery({
    queryKey: [...queryKeys.chatHistory, limit],
    queryFn: () => apiClient.get<{ messages: ChatMessage[] }>('/chatbot/context', { limit }),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useClearChatHistory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => apiClient.delete('/chatbot/history'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chatHistory });
    },
  });
};

// User Profile Hooks
export const useUserProfile = () => {
  return useQuery({
    queryKey: queryKeys.userProfile,
    queryFn: () => apiClient.get<UserProfile>('/user-profile/me'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<UserProfile>) =>
      apiClient.put<UserProfile>('/user-profile/me', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userProfile });
    },
  });
};