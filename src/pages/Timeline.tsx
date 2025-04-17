
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mock timeline events for initial display
const mockEvents = [
  {
    id: 1,
    title: "Venue Booking Deadline",
    date: "2025-06-15",
    time: "12:00",
    category: "venue",
    description: "Final date to confirm venue booking and pay deposit",
    completed: true
  },
  {
    id: 2,
    title: "Send Save the Date Cards",
    date: "2025-07-01",
    time: "",
    category: "planning",
    description: "Mail out save the date cards to all guests",
    completed: false
  },
  {
    id: 3,
    title: "First Dress Fitting",
    date: "2025-07-15",
    time: "14:30",
    category: "attire",
    description: "First fitting appointment at Elegance Bridal",
    completed: false
  },
  {
    id: 4,
    title: "Food Tasting",
    date: "2025-08-10",
    time: "18:00",
    category: "catering",
    description: "Sample menu options with caterer",
    completed: false
  },
  {
    id: 5,
    title: "Finalize Guest List",
    date: "2025-08-22",
    time: "",
    category: "planning",
    description: "Complete final guest list for invitations",
    completed: false
  }
];

// Category badge colors
const categoryColors: Record<string, string> = {
  venue: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
  planning: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  attire: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100",
  catering: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  music: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  photography: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
  flowers: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
  other: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
};

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  category: string;
  description: string;
  completed: boolean;
}

const Timeline = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch with a slight delay
    const timer = setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleEventStatus = (id: number) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, completed: !event.completed } : event
    ));
  };

  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Layout>
      <div className="container mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Wedding Timeline</h1>
            <p className="text-muted-foreground">Track important dates and deadlines for your wedding</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            Add Event
          </Button>
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-1">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="bg-muted/30 h-24" />
                <CardContent className="h-24 mt-4" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* Timeline vertical line */}
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-weday-primary/20 hidden md:block"></div>
            
            <div className="space-y-6">
              {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map(event => (
                <Card 
                  key={event.id} 
                  className={`transition-all border-l-4 ${
                    event.completed ? 'border-l-green-500 bg-green-50/30 dark:bg-green-900/10' : 'border-l-weday-primary'
                  } hover:shadow-md`}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-32 md:flex-shrink-0 flex flex-col items-center justify-center p-4 md:border-r border-border">
                      <div className="flex flex-row md:flex-col items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-weday-primary" />
                        <span className="font-medium">{formatDate(event.date)}</span>
                        {event.time && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.time}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <CardContent className="flex-1 p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className={`text-xl font-semibold ${event.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {event.title}
                          </h3>
                          <CardDescription className="mt-1">
                            {event.description}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2 self-start">
                          <Badge className={`${categoryColors[event.category] || categoryColors.other}`}>
                            {event.category}
                          </Badge>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => toggleEventStatus(event.id)}
                            className={event.completed ? "bg-green-100 dark:bg-green-900/20" : ""}
                          >
                            {event.completed ? "Completed" : "Mark Complete"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Timeline;
