
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface GuestSummaryProps {
  totalInvited: number;
  attending: number;
  notAttending: number;
  pending: number;
}

export function GuestSummary({
  totalInvited,
  attending,
  notAttending,
  pending,
}: GuestSummaryProps) {
  const attendingPercentage = totalInvited > 0 ? (attending / totalInvited) * 100 : 0;
  const notAttendingPercentage = totalInvited > 0 ? (notAttending / totalInvited) * 100 : 0;
  const pendingPercentage = totalInvited > 0 ? (pending / totalInvited) * 100 : 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Guest Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium">Attending</span>
              <span className="text-sm font-medium text-weday-primary">
                {attending}
              </span>
            </div>
            <Progress value={attendingPercentage} className="h-2 bg-muted" />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium">Not Attending</span>
              <span className="text-sm font-medium text-destructive">
                {notAttending}
              </span>
            </div>
            <Progress value={notAttendingPercentage} className="h-2 bg-muted" color="destructive" />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium">Pending</span>
              <span className="text-sm font-medium text-muted-foreground">
                {pending}
              </span>
            </div>
            <Progress value={pendingPercentage} className="h-2 bg-muted" color="secondary" />
          </div>

          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Invited</span>
              <span className="text-sm font-medium">{totalInvited}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Button variant="link" size="sm" asChild>
            <Link to="/guests" className="flex items-center">
              Manage Guests
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
