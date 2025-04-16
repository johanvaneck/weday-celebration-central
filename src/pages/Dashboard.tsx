
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CountdownCard } from "@/components/dashboard/CountdownCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { TaskList } from "@/components/dashboard/TaskList";
import { GuestSummary } from "@/components/dashboard/GuestSummary";
import { BudgetSummary } from "@/components/dashboard/BudgetSummary";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { Calendar, CheckSquare, Heart, MessageSquare, Users } from "lucide-react";

const Dashboard = () => {
  // Mock data for demo purposes
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Book venue",
      completed: true,
      dueDate: new Date("2025-05-15"),
    },
    {
      id: "2",
      title: "Send invitations",
      completed: false,
      dueDate: new Date("2025-05-20"),
    },
    {
      id: "3",
      title: "Hire photographer",
      completed: false,
      dueDate: new Date("2025-05-25"),
    },
    {
      id: "4",
      title: "Choose menu",
      completed: false,
      dueDate: new Date("2025-06-01"),
    },
    {
      id: "5",
      title: "Order wedding cake",
      completed: false,
      dueDate: new Date("2025-06-10"),
    },
  ]);

  const handleTaskToggle = (id: string, completed: boolean) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed } : task
      )
    );
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to WeDay, your wedding planning central!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CountdownCard weddingDate={new Date("2025-10-15")} />
        
        <div className="grid gap-4 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <StatCard 
              title="Total Guests" 
              value="86" 
              icon={Users}
              description="56 confirmed" 
            />
            <StatCard 
              title="Tasks" 
              value="24/45" 
              icon={CheckSquare}
              description="53% complete" 
            />
            <StatCard 
              title="Vendors" 
              value="8" 
              icon={Heart}
              description="3 to be booked" 
            />
            <StatCard 
              title="Messages" 
              value="5" 
              icon={MessageSquare}
              description="2 unread" 
            />
          </div>
          
          <ProgressCard 
            title="Planning Progress" 
            completedTasks={24} 
            totalTasks={45} 
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TaskList tasks={tasks} onTaskToggle={handleTaskToggle} />
        <GuestSummary
          totalInvited={86}
          attending={56}
          notAttending={12}
          pending={18}
        />
        <BudgetSummary totalBudget={30000} amountSpent={12500} />
      </div>
    </Layout>
  );
};

export default Dashboard;
