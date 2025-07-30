
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Medal, 
  Crown, 
  Users, 
  TrendingUp, 
  Star,
  Target,
  Zap,
  Calendar,
  Award
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Leaderboards = () => {
  const [activeCategory, setActiveCategory] = useState("weekly");

  const categories = [
    { id: "weekly", label: "Weekly", icon: Calendar },
    { id: "monthly", label: "Monthly", icon: Target },
    { id: "alltime", label: "All Time", icon: Crown }
  ];

  const weeklyLeaders = [
    {
      rank: 1,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      points: 2840,
      workouts: 12,
      streak: 15,
      badge: "🔥 Fire Streak",
      growth: "+12%"
    },
    {
      rank: 2,
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      points: 2650,
      workouts: 10,
      streak: 8,
      badge: "💪 Power Lifter",
      growth: "+8%"
    },
    {
      rank: 3,
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      points: 2420,
      workouts: 11,
      streak: 12,
      badge: "🏃‍♀️ Cardio Queen",
      growth: "+15%"
    },
    {
      rank: 4,
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      points: 2180,
      workouts: 9,
      streak: 6,
      badge: "🎯 Goal Crusher",
      growth: "+5%"
    },
    {
      rank: 5,
      name: "Lisa Park",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      points: 1950,
      workouts: 8,
      streak: 10,
      badge: "🧘‍♀️ Zen Master",
      growth: "+10%"
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "Week Warrior",
      description: "Complete 7 workouts in a week",
      icon: Trophy,
      color: "text-fitness-orange",
      bgColor: "bg-fitness-orange/10",
      progress: 85,
      unlocked: false
    },
    {
      id: 2,
      title: "Consistency King",
      description: "Maintain a 30-day streak",
      icon: Crown,
      color: "text-primary",
      bgColor: "bg-primary/10",
      progress: 100,
      unlocked: true
    },
    {
      id: 3,
      title: "Calorie Crusher",
      description: "Burn 500+ calories in one session",
      icon: Zap,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      progress: 60,
      unlocked: false
    },
    {
      id: 4,
      title: "Social Butterfly",
      description: "Work out with 5 different people",
      icon: Users,
      color: "text-fitness-pink",
      bgColor: "bg-fitness-pink/10",
      progress: 40,
      unlocked: false
    }
  ];

  const myStats = {
    currentRank: 8,
    totalUsers: 1247,
    points: 1680,
    weeklyGrowth: "+7%",
    achievements: 12,
    streak: 5
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-2xl font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
    if (rank === 3) return "bg-gradient-to-r from-amber-400 to-amber-600 text-white";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-8">
      {/* My Performance Summary */}
      <Card className="border border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Your Performance
          </CardTitle>
          <CardDescription>
            Your current standing in the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-black text-primary mb-1">#{myStats.currentRank}</div>
              <div className="text-xs text-muted-foreground">Current Rank</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-secondary mb-1">{myStats.points}</div>
              <div className="text-xs text-muted-foreground">Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-fitness-green mb-1">{myStats.weeklyGrowth}</div>
              <div className="text-xs text-muted-foreground">Weekly Growth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-fitness-orange mb-1">{myStats.achievements}</div>
              <div className="text-xs text-muted-foreground">Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-fitness-pink mb-1">{myStats.streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-accent mb-1">{myStats.totalUsers}</div>
              <div className="text-xs text-muted-foreground">Total Users</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Categories */}
      <div className="flex justify-center">
        <div className="flex bg-muted/30 rounded-2xl p-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "ghost"}
                onClick={() => setActiveCategory(category.id)}
                className="rounded-xl"
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Leaderboard */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-fitness-orange" />
            Weekly Champions
          </CardTitle>
          <CardDescription>
            Top performers this week - where will you rank?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyLeaders.map((leader) => (
              <div 
                key={leader.rank}
                className={`flex items-center justify-between p-4 rounded-2xl ${
                  leader.rank <= 3 
                    ? 'bg-gradient-to-r from-muted/50 to-muted/30 border border-primary/20' 
                    : 'bg-muted/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12">
                    {getRankIcon(leader.rank)}
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={leader.avatar} alt={leader.name} />
                    <AvatarFallback>{leader.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      {leader.name}
                      {leader.rank <= 3 && (
                        <Badge className={getRankBadge(leader.rank)}>
                          Top {leader.rank}
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {leader.badge}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-lg text-primary">
                    {leader.points.toLocaleString()} pts
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {leader.workouts} workouts • {leader.streak} day streak
                  </div>
                  <Badge variant="outline" className="mt-1 text-fitness-green border-fitness-green/30">
                    {leader.growth}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" />
            Achievements
          </CardTitle>
          <CardDescription>
            Unlock badges and rewards as you progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-2xl border ${
                    achievement.unlocked 
                      ? 'border-primary/50 bg-primary/5' 
                      : 'border-border bg-muted/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${achievement.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${achievement.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        {achievement.unlocked && (
                          <Badge variant="default" className="text-xs">
                            Unlocked!
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {achievement.description}
                      </p>
                      <div className="space-y-2">
                        <Progress value={achievement.progress} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {achievement.progress}% complete
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboards;
