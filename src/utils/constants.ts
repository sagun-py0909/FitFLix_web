// App Constants
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Fitflix',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  razorpayKeyId: import.meta.env.VITE_RAZORPAY_KEY_ID,
  enablePWA: import.meta.env.VITE_ENABLE_PWA === 'true',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  enableChatbot: import.meta.env.VITE_ENABLE_CHATBOT === 'true',
  enableNutritionTracker: import.meta.env.VITE_ENABLE_NUTRITION_TRACKER === 'true',
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  CHANGE_PASSWORD: '/auth/change-password',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  
  // Gyms
  GYMS: '/gyms',
  GYM_DETAILS: (id: string) => `/gyms/${id}`,
  
  // Memberships
  MEMBERSHIPS: '/memberships',
  USER_MEMBERSHIPS: '/users/me/memberships',
  CANCEL_MEMBERSHIP: (id: string) => `/users/me/memberships/${id}`,
  
  // Payments
  INITIALIZE_PAYMENT: '/payments/initialize',
  VERIFY_PAYMENT: '/payments/verify',
  
  // Nutrition
  LOG_NUTRITION: '/nutrition/log',
  DAILY_NUTRITION: '/nutrition/daily',
  NUTRITION_HISTORY: '/nutrition/history',
  UPDATE_NUTRITION: (id: string) => `/nutrition/${id}`,
  DELETE_NUTRITION: (id: string) => `/nutrition/${id}`,
  
  // Chatbot
  SEND_MESSAGE: '/chatbot/message',
  CHAT_HISTORY: '/chatbot/context',
  CLEAR_CHAT: '/chatbot/history',
  
  // Profile
  USER_PROFILE: '/user-profile/me',
  UPDATE_PROFILE: '/user-profile/me',
};

// UI Constants
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const COLORS = {
  primary: 'hsl(var(--primary))',
  secondary: 'hsl(var(--secondary))',
  accent: 'hsl(var(--accent))',
  destructive: 'hsl(var(--destructive))',
  muted: 'hsl(var(--muted))',
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
};

// Validation Constants
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  PHONE_MIN_LENGTH: 10,
  MESSAGE_MIN_LENGTH: 10,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
};

// Feature Flags
export const FEATURES = {
  CHATBOT: APP_CONFIG.enableChatbot,
  NUTRITION_TRACKER: APP_CONFIG.enableNutritionTracker,
  PWA: APP_CONFIG.enablePWA,
  ANALYTICS: APP_CONFIG.enableAnalytics,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access denied. Insufficient permissions.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  PAYMENT_FAILED: 'Payment failed. Please try again.',
  GENERIC_ERROR: 'An unexpected error occurred.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  REGISTER: 'Account created successfully!',
  LOGOUT: 'Logged out successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  PASSWORD_CHANGED: 'Password changed successfully',
  MEMBERSHIP_PURCHASED: 'Membership purchased successfully!',
  MEMBERSHIP_CANCELLED: 'Membership cancelled successfully',
  MEAL_LOGGED: 'Meal logged successfully!',
  MESSAGE_SENT: 'Message sent successfully!',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'user',
  AUTH_TOKEN: 'auth_token',
  THEME: 'theme',
  LANGUAGE: 'language',
  ONBOARDING_COMPLETED: 'onboarding_completed',
};

// Query Keys for React Query
export const QUERY_KEYS = {
  GYMS: ['gyms'],
  GYM: (id: string) => ['gym', id],
  MEMBERSHIPS: ['memberships'],
  USER_MEMBERSHIPS: ['user-memberships'],
  NUTRITION: ['nutrition'],
  DAILY_NUTRITION: (date: string) => ['nutrition', 'daily', date],
  NUTRITION_HISTORY: ['nutrition', 'history'],
  CHAT_HISTORY: ['chat', 'history'],
  USER_PROFILE: ['user-profile'],
};