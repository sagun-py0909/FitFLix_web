import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  color?: "primary" | "secondary" | "accent" | "success";
}

const StatCard = ({ icon: Icon, value, label, color = "primary" }: StatCardProps) => {
  const colorClasses = {
    primary: "text-primary border-primary/20 bg-primary/5",
    secondary: "text-secondary border-secondary/20 bg-secondary/5",
    accent: "text-accent border-accent/20 bg-accent/5",
    success: "text-success border-success/20 bg-success/5",
  };

  return (
    <Card className={`card-fitness border ${colorClasses[color]} group`}>
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="relative">
            <Icon className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="text-3xl font-black mb-2 gradient-text">
          {value}
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          {label}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;