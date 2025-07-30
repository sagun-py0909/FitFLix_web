<<<<<<< HEAD
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute, PublicRoute } from '@/components/layout/ProtectedRoute';
import { ErrorBoundary } from '@/components/ui/error-boundary';

// Pages
import Home from './pages/Home';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { OnboardingPage } from './pages/onboarding/OnboardingPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { GymsPage } from './pages/gyms/GymsPage';
import { GymDetailsPage } from './pages/gyms/GymDetailsPage';
import { MembershipsPage } from './pages/memberships/MembershipsPage';
import { NutritionPage } from './pages/nutrition/NutritionPage';
import { ChatPage } from './pages/chat/ChatPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { AboutPage } from './pages/static/AboutPage';
import { ContactPage } from './pages/static/ContactPage';
import { FAQPage } from './pages/static/FAQPage';
import About from './pages/About';
import NotFound from './pages/NotFound';
=======
// src/App.tsx
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import DiscoverGym from "./pages/DiscoverGym";
import GymDetails from "./pages/GymDetails";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import  Footer  from './components/Footer';
>>>>>>> ed336ac2b9775814e9072f8db356b58b28a96b2a

const queryClient = new QueryClient();

const App = () => (
<<<<<<< HEAD
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="faqs" element={<FAQPage />} />
              <Route path="gyms" element={<GymsPage />} />
              <Route path="gyms/:id" element={<GymDetailsPage />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/auth/login" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />
            <Route path="/auth/register" element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            } />

            {/* Protected Routes */}
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            } />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="memberships" element={<MembershipsPage />} />
              <Route path="nutrition" element={<NutritionPage />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<div>Settings Page</div>} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
=======
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover-gym" element={<DiscoverGym />} />
          <Route path="/gym/:id" element={<GymDetails />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
>>>>>>> ed336ac2b9775814e9072f8db356b58b28a96b2a
