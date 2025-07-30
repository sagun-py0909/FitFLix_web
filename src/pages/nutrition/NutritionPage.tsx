import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDailyNutrition, useLogNutrition, useDeleteNutrition } from '@/hooks/useApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  Apple, 
  Plus, 
  Trash2, 
  TrendingUp,
  Target,
  Calendar,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'react-hot-toast';

const nutritionSchema = z.object({
  meal_type: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  food_item: z.string().min(1, 'Food item is required'),
  calories_per_serving: z.number().min(1, 'Calories must be at least 1'),
  protein_g: z.number().min(0, 'Protein cannot be negative'),
  carbs_g: z.number().min(0, 'Carbs cannot be negative'),
  fat_g: z.number().min(0, 'Fat cannot be negative'),
  servings: z.number().min(0.1, 'Servings must be at least 0.1'),
});

type NutritionFormData = z.infer<typeof nutritionSchema>;

export const NutritionPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddForm, setShowAddForm] = useState(false);

  const { data: nutritionResponse, isLoading } = useDailyNutrition(selectedDate);
  const logNutrition = useLogNutrition();
  const deleteNutrition = useDeleteNutrition();

  const nutrition = nutritionResponse?.data;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NutritionFormData>({
    resolver: zodResolver(nutritionSchema),
    defaultValues: {
      servings: 1,
    },
  });

  const onSubmit = async (data: NutritionFormData) => {
    try {
      await logNutrition.mutateAsync(data);
      toast.success('Meal logged successfully!');
      reset();
      setShowAddForm(false);
    } catch (error) {
      toast.error('Failed to log meal');
    }
  };

  const handleDeleteEntry = async (entryId: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      await deleteNutrition.mutateAsync(entryId);
      toast.success('Entry deleted successfully');
    } catch (error) {
      toast.error('Failed to delete entry');
    }
  };

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return '🌅';
      case 'lunch':
        return '☀️';
      case 'dinner':
        return '🌙';
      case 'snack':
        return '🍎';
      default:
        return '🍽️';
    }
  };

  const dailyGoals = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
  };

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
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

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Nutrition Tracker</h1>
          <p className="text-muted-foreground">
            Track your daily nutrition and reach your goals
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto"
          />
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Log Meal
          </Button>
        </div>
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Calories</span>
                <Target className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">
                  {nutrition?.total_calories || 0}
                </div>
                <Progress 
                  value={getProgressPercentage(nutrition?.total_calories || 0, dailyGoals.calories)} 
                  className="h-2"
                />
                <div className="text-xs text-muted-foreground">
                  Goal: {dailyGoals.calories} cal
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Protein</span>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-blue-500">
                  {nutrition?.total_protein_g || 0}g
                </div>
                <Progress 
                  value={getProgressPercentage(nutrition?.total_protein_g || 0, dailyGoals.protein)} 
                  className="h-2"
                />
                <div className="text-xs text-muted-foreground">
                  Goal: {dailyGoals.protein}g
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Carbs</span>
                <Apple className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-green-500">
                  {nutrition?.total_carbs_g || 0}g
                </div>
                <Progress 
                  value={getProgressPercentage(nutrition?.total_carbs_g || 0, dailyGoals.carbs)} 
                  className="h-2"
                />
                <div className="text-xs text-muted-foreground">
                  Goal: {dailyGoals.carbs}g
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Fat</span>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-orange-500">
                  {nutrition?.total_fat_g || 0}g
                </div>
                <Progress 
                  value={getProgressPercentage(nutrition?.total_fat_g || 0, dailyGoals.fat)} 
                  className="h-2"
                />
                <div className="text-xs text-muted-foreground">
                  Goal: {dailyGoals.fat}g
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Meal Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Log New Meal</CardTitle>
            <CardDescription>
              Add a meal to your nutrition diary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meal_type">Meal Type</Label>
                  <Select onValueChange={(value) => setValue('meal_type', value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">🌅 Breakfast</SelectItem>
                      <SelectItem value="lunch">☀️ Lunch</SelectItem>
                      <SelectItem value="dinner">🌙 Dinner</SelectItem>
                      <SelectItem value="snack">🍎 Snack</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.meal_type && (
                    <p className="text-sm text-destructive">{errors.meal_type.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="food_item">Food Item</Label>
                  <Input
                    id="food_item"
                    placeholder="e.g., Grilled Chicken Breast"
                    {...register('food_item')}
                    className={errors.food_item ? 'border-destructive' : ''}
                  />
                  {errors.food_item && (
                    <p className="text-sm text-destructive">{errors.food_item.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calories_per_serving">Calories</Label>
                  <Input
                    id="calories_per_serving"
                    type="number"
                    placeholder="250"
                    {...register('calories_per_serving', { valueAsNumber: true })}
                    className={errors.calories_per_serving ? 'border-destructive' : ''}
                  />
                  {errors.calories_per_serving && (
                    <p className="text-sm text-destructive">{errors.calories_per_serving.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="protein_g">Protein (g)</Label>
                  <Input
                    id="protein_g"
                    type="number"
                    step="0.1"
                    placeholder="25"
                    {...register('protein_g', { valueAsNumber: true })}
                    className={errors.protein_g ? 'border-destructive' : ''}
                  />
                  {errors.protein_g && (
                    <p className="text-sm text-destructive">{errors.protein_g.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carbs_g">Carbs (g)</Label>
                  <Input
                    id="carbs_g"
                    type="number"
                    step="0.1"
                    placeholder="10"
                    {...register('carbs_g', { valueAsNumber: true })}
                    className={errors.carbs_g ? 'border-destructive' : ''}
                  />
                  {errors.carbs_g && (
                    <p className="text-sm text-destructive">{errors.carbs_g.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fat_g">Fat (g)</Label>
                  <Input
                    id="fat_g"
                    type="number"
                    step="0.1"
                    placeholder="5"
                    {...register('fat_g', { valueAsNumber: true })}
                    className={errors.fat_g ? 'border-destructive' : ''}
                  />
                  {errors.fat_g && (
                    <p className="text-sm text-destructive">{errors.fat_g.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    type="number"
                    step="0.1"
                    placeholder="1"
                    {...register('servings', { valueAsNumber: true })}
                    className={errors.servings ? 'border-destructive' : ''}
                  />
                  {errors.servings && (
                    <p className="text-sm text-destructive">{errors.servings.message}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={logNutrition.isPending}
                  className="flex-1"
                >
                  {logNutrition.isPending ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Logging...
                    </>
                  ) : (
                    'Log Meal'
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Meal Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Meals</CardTitle>
          <CardDescription>
            Your nutrition entries for {new Date(selectedDate).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {nutrition?.entries && nutrition.entries.length > 0 ? (
            <div className="space-y-4">
              {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => {
                const mealEntries = nutrition.entries.filter(entry => entry.meal_type === mealType);
                if (mealEntries.length === 0) return null;

                return (
                  <div key={mealType} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getMealIcon(mealType)}</span>
                      <h3 className="text-lg font-semibold capitalize">{mealType}</h3>
                      <Badge variant="outline">
                        {mealEntries.reduce((sum, entry) => sum + entry.total_calories, 0)} cal
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      {mealEntries.map((entry) => (
                        <div key={entry.log_id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="space-y-1">
                            <h4 className="font-medium">{entry.food_item}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{entry.total_calories} cal</span>
                              <span>{entry.total_protein_g}g protein</span>
                              <span>{entry.total_carbs_g}g carbs</span>
                              <span>{entry.total_fat_g}g fat</span>
                              <span>{entry.servings} serving{entry.servings !== 1 ? 's' : ''}</span>
                            </div>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleDeleteEntry(entry.log_id)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Apple className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No meals logged today</h3>
              <p className="text-muted-foreground mb-6">
                Start tracking your nutrition by logging your first meal
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Log Your First Meal
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};