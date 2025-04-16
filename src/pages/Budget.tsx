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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { DollarSign, Edit, PlusCircle, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Expense {
  id: string;
  name: string;
  category: string;
  estimatedCost: number;
  actualCost?: number;
  paid: boolean;
  notes?: string;
  dueDate?: Date;
  vendor?: string;
}

const Budget = () => {
  const [totalBudget, setTotalBudget] = useState(30000);
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      name: "Venue Rental",
      category: "Venue",
      estimatedCost: 8000,
      actualCost: 8500,
      paid: true,
      vendor: "Elegant Events Venue",
      dueDate: new Date("2025-04-15"),
    },
    {
      id: "2",
      name: "Catering",
      category: "Food & Drinks",
      estimatedCost: 5000,
      actualCost: 5200,
      paid: false,
      notes: "Includes appetizers, main course, and dessert for 100 guests",
      vendor: "Divine Catering",
      dueDate: new Date("2025-09-01"),
    },
    {
      id: "3",
      name: "Photography",
      category: "Photography & Video",
      estimatedCost: 3500,
      paid: false,
      notes: "8 hours of coverage, engagement session included",
      vendor: "Capture Moments Photography",
      dueDate: new Date("2025-08-15"),
    },
    {
      id: "4",
      name: "Wedding Dress",
      category: "Attire",
      estimatedCost: 2000,
      actualCost: 2300,
      paid: true,
      dueDate: new Date("2025-05-30"),
    },
    {
      id: "5",
      name: "Flowers",
      category: "Decor",
      estimatedCost: 2500,
      actualCost: 2500,
      paid: true,
      vendor: "Blooming Bouquets",
      dueDate: new Date("2025-09-10"),
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [editingBudget, setEditingBudget] = useState(false);
  const [newExpense, setNewExpense] = useState<Omit<Expense, "id">>({
    name: "",
    category: "",
    estimatedCost: 0,
    actualCost: undefined,
    paid: false,
    notes: "",
    dueDate: undefined,
    vendor: "",
  });

  const handleSaveBudget = () => {
    setEditingBudget(false);
  };

  const handleAddExpense = () => {
    if (editing) {
      setExpenses(
        expenses.map((expense) =>
          expense.id === editing
            ? { ...newExpense, id: expense.id }
            : expense
        )
      );
      setEditing(null);
    } else {
      const expense: Expense = {
        ...newExpense,
        id: Date.now().toString(),
      };
      setExpenses([...expenses, expense]);
    }
    
    setNewExpense({
      name: "",
      category: "",
      estimatedCost: 0,
      actualCost: undefined,
      paid: false,
      notes: "",
      dueDate: undefined,
      vendor: "",
    });
    setOpen(false);
  };

  const handleEditExpense = (id: string) => {
    const expense = expenses.find((e) => e.id === id);
    if (expense) {
      setNewExpense({
        name: expense.name,
        category: expense.category,
        estimatedCost: expense.estimatedCost,
        actualCost: expense.actualCost,
        paid: expense.paid,
        notes: expense.notes || "",
        dueDate: expense.dueDate,
        vendor: expense.vendor || "",
      });
      setEditing(id);
      setOpen(true);
    }
  };

  const handleRemoveExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleTogglePaid = (id: string, paid: boolean) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id ? { ...expense, paid } : expense
      )
    );
  };

  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined) return "—";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "—";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const categories = [
    ...new Set(expenses.map((expense) => expense.category)),
  ].sort();

  const totalEstimated = expenses.reduce(
    (total, expense) => total + expense.estimatedCost,
    0
  );
  
  const totalActual = expenses.reduce(
    (total, expense) => total + (expense.actualCost || expense.estimatedCost),
    0
  );
  
  const totalPaid = expenses
    .filter((expense) => expense.paid)
    .reduce(
      (total, expense) => total + (expense.actualCost || expense.estimatedCost),
      0
    );

  const remaining = totalBudget - totalActual;
  const percentageUsed = (totalActual / totalBudget) * 100;

  const categoryTotals = categories.map((category) => {
    const categoryExpenses = expenses.filter(
      (expense) => expense.category === category
    );
    const total = categoryExpenses.reduce(
      (sum, expense) => sum + (expense.actualCost || expense.estimatedCost),
      0
    );
    const percentage = (total / totalActual) * 100;
    
    return {
      category,
      total,
      percentage,
    };
  });

  return (
    <Layout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budget</h1>
          <p className="text-muted-foreground">
            Track your wedding expenses and stay on budget
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editing ? "Edit Expense" : "Add New Expense"}
              </DialogTitle>
              <DialogDescription>
                {editing
                  ? "Edit the details of your expense."
                  : "Add the details of your new expense here."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Expense Name</Label>
                <Input
                  id="name"
                  value={newExpense.name}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, name: e.target.value })
                  }
                  placeholder="Venue, Photography, etc."
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newExpense.category}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, category: e.target.value })
                  }
                  placeholder="Venue, Food, etc."
                  list="categories"
                />
                <datalist id="categories">
                  {categories.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="estimatedCost">Estimated Cost</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="estimatedCost"
                      type="number"
                      value={newExpense.estimatedCost}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          estimatedCost: Number(e.target.value),
                        })
                      }
                      placeholder="0"
                      className="pl-7"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="actualCost">Actual Cost (Optional)</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="actualCost"
                      type="number"
                      value={newExpense.actualCost || ""}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          actualCost: e.target.value
                            ? Number(e.target.value)
                            : undefined,
                        })
                      }
                      placeholder="0"
                      className="pl-7"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="vendor">Vendor (Optional)</Label>
                  <Input
                    id="vendor"
                    value={newExpense.vendor}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, vendor: e.target.value })
                    }
                    placeholder="Vendor name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date (Optional)</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={
                      newExpense.dueDate
                        ? newExpense.dueDate.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        dueDate: e.target.value
                          ? new Date(e.target.value)
                          : undefined,
                      })
                    }
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Input
                  id="notes"
                  value={newExpense.notes}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, notes: e.target.value })
                  }
                  placeholder="Add any additional notes"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="paid"
                  checked={newExpense.paid}
                  onCheckedChange={(checked) =>
                    setNewExpense({
                      ...newExpense,
                      paid: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="paid">Mark as paid</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setOpen(false);
                setEditing(null);
                setNewExpense({
                  name: "",
                  category: "",
                  estimatedCost: 0,
                  actualCost: undefined,
                  paid: false,
                  notes: "",
                  dueDate: undefined,
                  vendor: "",
                });
              }}>
                Cancel
              </Button>
              <Button onClick={handleAddExpense}>
                {editing ? "Save Changes" : "Add Expense"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Budget Overview</CardTitle>
              <Dialog open={editingBudget} onOpenChange={setEditingBudget}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Edit Budget
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Total Budget</DialogTitle>
                    <DialogDescription>
                      Adjust your total wedding budget
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="budget">Total Budget</Label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                          $
                        </span>
                        <Input
                          id="budget"
                          type="number"
                          value={totalBudget}
                          onChange={(e) =>
                            setTotalBudget(Number(e.target.value))
                          }
                          className="pl-7"
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSaveBudget}>Save Budget</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <CardDescription>
              Track your overall budget and spending
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                  <p className="text-3xl font-bold">{formatCurrency(totalBudget)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className={`text-2xl font-bold ${
                    remaining >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {formatCurrency(remaining)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Budget Used</span>
                  <span className="text-sm text-muted-foreground">
                    {percentageUsed.toFixed(0)}%
                  </span>
                </div>
                <Progress
                  value={percentageUsed}
                  className="h-2"
                  color={percentageUsed > 100 ? "red" : undefined}
                />
                <div className="flex items-center justify-between text-sm">
                  <span>
                    <span className="font-medium">{formatCurrency(totalActual)}</span> spent of {formatCurrency(totalBudget)}
                  </span>
                  <span className="text-muted-foreground">
                    {formatCurrency(totalPaid)} paid
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Category Breakdown</h3>
                {categoryTotals.map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{item.category}</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(item.total)}
                        <span className="ml-1 text-xs text-muted-foreground">
                          ({item.percentage.toFixed(0)}%)
                        </span>
                      </span>
                    </div>
                    <Progress value={item.percentage} className="h-1" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Budget Summary</CardTitle>
            <CardDescription>
              Key figures at a glance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col space-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-weday-primary text-white">
                <DollarSign className="h-6 w-6" />
              </div>
              
              <div className="space-y-0.5">
                <p className="text-muted-foreground text-sm">Total Budget</p>
                <p className="text-2xl font-bold">{formatCurrency(totalBudget)}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Estimated</span>
                <span className="font-medium">{formatCurrency(totalEstimated)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Actual</span>
                <span className="font-medium">{formatCurrency(totalActual)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Paid</span>
                <span className="font-medium text-green-600">{formatCurrency(totalPaid)}</span>
              </div>
              
              <div className="flex items-center justify-between border-t pt-4">
                <span className="text-sm font-medium">Remaining</span>
                <span className={`font-medium ${
                  remaining >= 0 ? "text-green-600" : "text-red-600"
                }`}>
                  {formatCurrency(remaining)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Expense List</CardTitle>
            <CardDescription>
              All your wedding expenses in one place
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expense</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Estimated</TableHead>
                  <TableHead>Actual</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground"
                    >
                      No expenses found.
                    </TableCell>
                  </TableRow>
                ) : (
                  expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{expense.name}</p>
                          {expense.vendor && (
                            <p className="text-xs text-muted-foreground">
                              {expense.vendor}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{expense.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {formatCurrency(expense.estimatedCost)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(expense.actualCost)}
                      </TableCell>
                      <TableCell>{formatDate(expense.dueDate)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`paid-${expense.id}`}
                            checked={expense.paid}
                            onCheckedChange={(checked) =>
                              handleTogglePaid(expense.id, checked as boolean)
                            }
                          />
                          <label
                            htmlFor={`paid-${expense.id}`}
                            className={`text-sm ${
                              expense.paid
                                ? "text-green-600 font-medium"
                                : "text-muted-foreground"
                            }`}
                          >
                            {expense.paid ? "Paid" : "Unpaid"}
                          </label>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditExpense(expense.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveExpense(expense.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Budget;
