
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  title: string;
  completedTasks: number;
  totalTasks: number;
}

export function ProgressCard({ title, completedTasks, totalTasks }: ProgressCardProps) {
  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Progress value={percentage} className="h-2" />
          <span className="ml-4 text-sm font-medium">
            {percentage.toFixed(0)}%
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </CardContent>
    </Card>
  );
}
