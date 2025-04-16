
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Edit, PlusCircle, Trash } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  category: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  assignedTo?: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Book venue",
      description: "Find and secure a wedding venue for the ceremony and reception",
      dueDate: new Date("2025-05-15"),
      category: "Venue",
      priority: "high",
      completed: true,
    },
    {
      id: "2",
      title: "Send save-the-dates",
      description: "Design and mail save-the-date cards to all guests",
      dueDate: new Date("2025-05-20"),
      category: "Invitations",
      priority: "medium",
      completed: false,
    },
    {
      id: "3",
      title: "Hire photographer",
      description: "Research and book a wedding photographer",
      dueDate: new Date("2025-05-25"),
      category: "Vendors",
      priority: "high",
      completed: false,
    },
    {
      id: "4",
      title: "Choose menu",
      description: "Select reception menu options and schedule tasting",
      dueDate: new Date("2025-06-01"),
      category: "Food",
      priority: "medium",
      completed: false,
    },
    {
      id: "5",
      title: "Order wedding cake",
      description: "Choose design and flavors for the wedding cake",
      dueDate: new Date("2025-06-10"),
      category: "Food",
      priority: "medium",
      completed: false,
    },
    {
      id: "6",
      title: "Book makeup artist",
      description: "Find and secure a makeup artist for the wedding day",
      dueDate: new Date("2025-06-15"),
      category: "Beauty",
      priority: "medium",
      completed: false,
      assignedTo: "Bride",
    },
    {
      id: "7",
      title: "Rent tuxedos",
      description: "Choose and reserve tuxedos for groom and groomsmen",
      dueDate: new Date("2025-06-20"),
      category: "Attire",
      priority: "medium",
      completed: false,
      assignedTo: "Groom",
    },
    {
      id: "8",
      title: "Plan honeymoon",
      description: "Research destinations, book flights and accommodations",
      dueDate: new Date("2025-07-01"),
      category: "Honeymoon",
      priority: "low",
      completed: false,
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    dueDate: new Date(),
    category: "",
    priority: "medium",
    completed: false,
    assignedTo: "",
  });

  const handleAddTask = () => {
    if (editing) {
      setTasks(
        tasks.map((task) =>
          task.id === editing
            ? { ...newTask, id: task.id }
            : task
        )
      );
      setEditing(null);
    } else {
      const task: Task = {
        ...newTask,
        id: Date.now().toString(),
      };
      setTasks([...tasks, task]);
    }
    
    setNewTask({
      title: "",
      description: "",
      dueDate: new Date(),
      category: "",
      priority: "medium",
      completed: false,
      assignedTo: "",
    });
    setOpen(false);
  };

  const handleEditTask = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      setNewTask({
        title: task.title,
        description: task.description || "",
        dueDate: task.dueDate,
        category: task.category,
        priority: task.priority,
        completed: task.completed,
        assignedTo: task.assignedTo || "",
      });
      setEditing(id);
      setOpen(true);
    }
  };

  const handleRemoveTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleCompleted = (id: string, completed: boolean) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed } : task
      )
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const categories = [
    ...new Set(tasks.map((task) => task.category)),
  ].sort();

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true;
    if (activeTab === "completed") return task.completed;
    if (activeTab === "incomplete") return !task.completed;
    return task.category.toLowerCase() === activeTab.toLowerCase();
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "";
    }
  };

  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const completionPercentage = Math.round(
    (completedTasksCount / tasks.length) * 100
  );

  return (
    <Layout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task List</h1>
          <p className="text-muted-foreground">
            Manage your wedding planning to-do list
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editing ? "Edit Task" : "Add New Task"}
              </DialogTitle>
              <DialogDescription>
                {editing
                  ? "Edit the details of your task."
                  : "Add the details of your new task here."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  placeholder="Enter task title"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  placeholder="Add a description"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate.toISOString().split("T")[0]}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        dueDate: new Date(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newTask.category}
                    onChange={(e) =>
                      setNewTask({ ...newTask, category: e.target.value })
                    }
                    placeholder="Venue, Attire, etc."
                    list="categories"
                  />
                  <datalist id="categories">
                    {categories.map((category) => (
                      <option key={category} value={category} />
                    ))}
                  </datalist>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) =>
                      setNewTask({
                        ...newTask,
                        priority: value as "high" | "medium" | "low",
                      })
                    }
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignedTo">Assigned To (Optional)</Label>
                  <Input
                    id="assignedTo"
                    value={newTask.assignedTo}
                    onChange={(e) =>
                      setNewTask({ ...newTask, assignedTo: e.target.value })
                    }
                    placeholder="Bride, Groom, etc."
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="completed"
                  checked={newTask.completed}
                  onCheckedChange={(checked) =>
                    setNewTask({
                      ...newTask,
                      completed: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="completed">Mark as completed</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setOpen(false);
                setEditing(null);
                setNewTask({
                  title: "",
                  description: "",
                  dueDate: new Date(),
                  category: "",
                  priority: "medium",
                  completed: false,
                  assignedTo: "",
                });
              }}>
                Cancel
              </Button>
              <Button onClick={handleAddTask}>
                {editing ? "Save Changes" : "Add Task"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Planning Progress</CardTitle>
              <Badge variant="outline" className="text-weday-primary">
                {completedTasksCount} of {tasks.length} completed
              </Badge>
            </div>
            <CardDescription>
              Track your wedding planning progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {completionPercentage}% Complete
                </span>
                <span className="text-sm text-muted-foreground">
                  {tasks.length - completedTasksCount} tasks remaining
                </span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Tasks</CardTitle>
            <Tabs 
              defaultValue="all" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="mt-3"
            >
              <TabsList className="grid w-full grid-cols-4 md:w-auto md:grid-cols-none md:auto-cols-auto md:flex">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="incomplete">Incomplete</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                {categories.length > 0 && (
                  <Select onValueChange={setActiveTab}>
                    <SelectTrigger className="h-9 rounded-md md:w-[130px]">
                      <SelectValue placeholder="Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            {filteredTasks.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No tasks found.</p>
                <Button variant="link" onClick={() => setOpen(true)} className="mt-2">
                  Add your first task
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`rounded-lg border p-4 transition-colors ${
                      task.completed ? "bg-muted/50" : ""
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Checkbox
                            id={`task-${task.id}`}
                            checked={task.completed}
                            onCheckedChange={(checked) =>
                              handleToggleCompleted(task.id, checked as boolean)
                            }
                            className="mt-1"
                          />
                          <div>
                            <label
                              htmlFor={`task-${task.id}`}
                              className={`font-medium ${
                                task.completed
                                  ? "text-muted-foreground line-through"
                                  : ""
                              }`}
                            >
                              {task.title}
                            </label>
                            {task.description && (
                              <p className="mt-1 text-sm text-muted-foreground">
                                {task.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="ml-6 flex flex-wrap gap-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge variant="outline">{task.category}</Badge>
                          {task.assignedTo && (
                            <Badge variant="secondary">{task.assignedTo}</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                        <div className="text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {formatDate(task.dueDate)}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditTask(task.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveTask(task.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Tasks;
