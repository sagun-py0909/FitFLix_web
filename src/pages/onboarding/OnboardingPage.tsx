import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUpdateUserProfile } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ChevronLeft, ChevronRight, User, Target, MapPin, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';

const onboardingSchema = z.object({
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  height_cm: z.number().min(100, 'Height must be at least 100cm').max(250, 'Height must be less than 250cm'),
  weight_kg: z.number().min(30, 'Weight must be at least 30kg').max(200, 'Weight must be less than 200kg'),
  gender: z.enum(['male', 'female', 'other']),
  primary_fitness_goal: z.string().min(1, 'Please select a fitness goal'),
  dietary_preferences: z.array(z.string()),
  allergies: z.array(z.string()),
  city: z.string().min(1, 'City is required'),
  phone_number: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

const steps = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Fitness Goals', icon: Target },
  { id: 3, title: 'Location & Contact', icon: MapPin },
];

const fitnessGoals = [
  'Weight Loss',
  'Muscle Gain',
  'General Fitness',
  'Strength Training',
  'Endurance',
  'Flexibility',
  'Sports Performance',
  'Rehabilitation',
];

const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Keto',
  'Paleo',
  'Mediterranean',
  'Low Carb',
  'High Protein',
  'Gluten Free',
];

const commonAllergies = [
  'Nuts',
  'Dairy',
  'Gluten',
  'Soy',
  'Eggs',
  'Shellfish',
  'Fish',
  'Sesame',
];

const cities = [
  'Bangalore',
  'Mumbai',
  'Delhi',
  'Chennai',
  'Hyderabad',
  'Pune',
  'Kolkata',
  'Ahmedabad',
];

export const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  
  const navigate = useNavigate();
  const updateProfile = useUpdateUserProfile();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      dietary_preferences: [],
      allergies: [],
    },
  });

  const watchedValues = watch();

  const progress = (currentStep / steps.length) * 100;

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);
    
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step: number): (keyof OnboardingFormData)[] => {
    switch (step) {
      case 1:
        return ['date_of_birth', 'height_cm', 'weight_kg', 'gender'];
      case 2:
        return ['primary_fitness_goal'];
      case 3:
        return ['city', 'phone_number'];
      default:
        return [];
    }
  };

  const onSubmit = async (data: OnboardingFormData) => {
    try {
      await updateProfile.mutateAsync({
        ...data,
        dietary_preferences: selectedDietaryPreferences,
        allergies: selectedAllergies,
      });
      
      toast.success('Profile setup completed!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to save profile. Please try again.');
    }
  };

  const handleDietaryPreferenceChange = (preference: string, checked: boolean) => {
    const updated = checked
      ? [...selectedDietaryPreferences, preference]
      : selectedDietaryPreferences.filter(p => p !== preference);
    
    setSelectedDietaryPreferences(updated);
    setValue('dietary_preferences', updated);
  };

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    const updated = checked
      ? [...selectedAllergies, allergy]
      : selectedAllergies.filter(a => a !== allergy);
    
    setSelectedAllergies(updated);
    setValue('allergies', updated);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <User className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Personal Information</h2>
              <p className="text-muted-foreground">
                Tell us about yourself to personalize your experience
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date_of_birth">Date of Birth</Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  {...register('date_of_birth')}
                  className={errors.date_of_birth ? 'border-destructive' : ''}
                />
                {errors.date_of_birth && (
                  <p className="text-sm text-destructive">{errors.date_of_birth.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height_cm">Height (cm)</Label>
                  <Input
                    id="height_cm"
                    type="number"
                    placeholder="170"
                    {...register('height_cm', { valueAsNumber: true })}
                    className={errors.height_cm ? 'border-destructive' : ''}
                  />
                  {errors.height_cm && (
                    <p className="text-sm text-destructive">{errors.height_cm.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight_kg">Weight (kg)</Label>
                  <Input
                    id="weight_kg"
                    type="number"
                    placeholder="70"
                    {...register('weight_kg', { valueAsNumber: true })}
                    className={errors.weight_kg ? 'border-destructive' : ''}
                  />
                  {errors.weight_kg && (
                    <p className="text-sm text-destructive">{errors.weight_kg.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => setValue('gender', value as any)}>
                  <SelectTrigger className={errors.gender ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-sm text-destructive">{errors.gender.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Target className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Fitness Goals & Preferences</h2>
              <p className="text-muted-foreground">
                Help us customize your fitness journey
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Primary Fitness Goal</Label>
                <Select onValueChange={(value) => setValue('primary_fitness_goal', value)}>
                  <SelectTrigger className={errors.primary_fitness_goal ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select your main fitness goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {fitnessGoals.map((goal) => (
                      <SelectItem key={goal} value={goal.toLowerCase().replace(' ', '_')}>
                        {goal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.primary_fitness_goal && (
                  <p className="text-sm text-destructive">{errors.primary_fitness_goal.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label>Dietary Preferences (Optional)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {dietaryOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`diet-${option}`}
                        checked={selectedDietaryPreferences.includes(option.toLowerCase().replace(' ', '_'))}
                        onCheckedChange={(checked) => 
                          handleDietaryPreferenceChange(option.toLowerCase().replace(' ', '_'), checked as boolean)
                        }
                      />
                      <Label htmlFor={`diet-${option}`} className="text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Allergies (Optional)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {commonAllergies.map((allergy) => (
                    <div key={allergy} className="flex items-center space-x-2">
                      <Checkbox
                        id={`allergy-${allergy}`}
                        checked={selectedAllergies.includes(allergy.toLowerCase())}
                        onCheckedChange={(checked) => 
                          handleAllergyChange(allergy.toLowerCase(), checked as boolean)
                        }
                      />
                      <Label htmlFor={`allergy-${allergy}`} className="text-sm">
                        {allergy}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <MapPin className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Location & Contact</h2>
              <p className="text-muted-foreground">
                Help us find gyms near you and stay connected
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Select onValueChange={(value) => setValue('city', value)}>
                  <SelectTrigger className={errors.city ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground">
                    +91
                  </div>
                  <Input
                    id="phone_number"
                    type="tel"
                    placeholder="9876543210"
                    {...register('phone_number')}
                    className={`rounded-l-none ${errors.phone_number ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.phone_number && (
                  <p className="text-sm text-destructive">{errors.phone_number.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-2xl">
        <Card className="border-primary/10">
          <CardHeader className="text-center space-y-4">
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold">Complete Your Profile</CardTitle>
              <CardDescription>
                Step {currentStep} of {steps.length}
              </CardDescription>
            </div>
            
            <Progress value={progress} className="w-full" />
            
            <div className="flex justify-center space-x-8">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center space-y-2 ${
                      step.id <= currentStep ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        step.id <= currentStep
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-muted-foreground'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium">{step.title}</span>
                  </div>
                );
              })}
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              {renderStepContent()}

              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                {currentStep === steps.length ? (
                  <Button
                    type="submit"
                    disabled={updateProfile.isPending}
                    className="flex items-center gap-2"
                  >
                    {updateProfile.isPending ? (
                      <>
                        <LoadingSpinner size="sm" />
                        Completing...
                      </>
                    ) : (
                      'Complete Setup'
                    )}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};