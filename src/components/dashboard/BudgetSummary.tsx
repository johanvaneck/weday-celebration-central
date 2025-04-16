
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface BudgetSummaryProps {
  totalBudget: number;
  amountSpent: number;
  currency?: string;
}

export function BudgetSummary({
  totalBudget,
  amountSpent,
  currency = "$",
}: BudgetSummaryProps) {
  const percentage = totalBudget > 0 ? (amountSpent / totalBudget) * 100 : 0;
  const remaining = totalBudget - amountSpent;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Budget</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-weday-primary text-white">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p className="text-2xl font-bold">{formatCurrency(totalBudget)}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Amount Spent</span>
              <span className="font-medium">{formatCurrency(amountSpent)}</span>
            </div>
            <Progress value={percentage} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <span>Remaining</span>
              <span className="font-medium text-weday-primary">
                {formatCurrency(remaining)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Button variant="link" size="sm" asChild>
            <Link to="/budget" className="flex items-center">
              View Budget Details
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
