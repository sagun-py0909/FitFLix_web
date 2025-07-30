import { User, LoginForm, RegisterForm, ApiResponse } from '@/types';
import { apiClient } from './api';

export class AuthService {
  // Authentication methods
  static async login(credentials: LoginForm): Promise<ApiResponse<{ user: User }>> {
    const response = await apiClient.post<{ user: User }>('/auth/login', credentials);
    
    if (response.success && response.data?.user) {
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      // Note: JWT token is handled via HTTP-only cookies
    }
    
    return response;
  }

  static async register(userData: RegisterForm): Promise<ApiResponse<{ user: User }>> {
    const response = await apiClient.post<{ user: User }>('/auth/register', userData);
    
    if (response.success && response.data?.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  static async logout(): Promise<ApiResponse> {
    const response = await apiClient.post('/auth/logout');
    
    // Clear local storage
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    
    return response;
  }

  static async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    return await apiClient.get<{ user: User }>('/auth/me');
  }

  static async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse> {
    return await apiClient.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  }

  static async forgotPassword(email: string): Promise<ApiResponse> {
    return await apiClient.post('/auth/forgot-password', { email });
  }

  static async resetPassword(token: string, newPassword: string): Promise<ApiResponse> {
    return await apiClient.post('/auth/reset-password', {
      token,
      newPassword,
    });
  }

  static async refreshToken(refreshToken: string): Promise<ApiResponse<{ user: User }>> {
    return await apiClient.post<{ user: User }>('/auth/refresh-token', {
      refreshToken,
    });
  }

  // Utility methods
  static getStoredUser(): User | null {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  static isAuthenticated(): boolean {
    return !!this.getStoredUser();
  }

  static hasRole(role: string): boolean {
    const user = this.getStoredUser();
    return user?.role === role;
  }

  static clearAuth(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
  }
}