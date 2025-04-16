
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: Date;
}

interface TaskListProps {
  tasks: Task[];
  onTaskToggle: (id: string, completed: boolean) => void;
}

export function TaskList({ tasks, onTaskToggle }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by completion status (incomplete first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Then sort by due date (earlier first)
    return a.dueDate.getTime() - b.dueDate.getTime();
  });

  const upcomingTasks = sortedTasks.slice(0, 5);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingTasks.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No tasks yet. Add some tasks to get started!
          </p>
        ) : (
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={task.id}
                    checked={task.completed}
                    onCheckedChange={(checked) =>
                      onTaskToggle(task.id, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={task.id}
                    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                      task.completed ? "text-muted-foreground line-through" : ""
                    }`}
                  >
                    {task.title}
                  </label>
                </div>
                <span className="text-xs text-muted-foreground">
                  {task.dueDate.toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 text-center">
          <Button variant="link" size="sm" asChild>
            <Link to="/tasks" className="flex items-center">
              View all tasks
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
