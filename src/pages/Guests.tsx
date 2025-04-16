
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Badge } from "@/components/ui/badge";
import { Check, PlusCircle, Search, Trash, X } from "lucide-react";

type GuestStatus = "pending" | "attending" | "not attending";

interface Guest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: GuestStatus;
  plusOne: boolean;
  group?: string;
  mealPreference?: string;
}

const Guests = () => {
  const [guests, setGuests] = useState<Guest[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      phone: "555-123-4567",
      status: "attending",
      plusOne: true,
      group: "Family",
      mealPreference: "Chicken",
    },
    {
      id: "2",
      name: "Emma Johnson",
      email: "emma@example.com",
      phone: "555-987-6543",
      status: "attending",
      plusOne: false,
      group: "Friends",
      mealPreference: "Vegetarian",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      status: "not attending",
      plusOne: false,
      group: "Work",
    },
    {
      id: "4",
      name: "Sophia Davis",
      email: "sophia@example.com",
      phone: "555-111-2222",
      status: "pending",
      plusOne: true,
      group: "Family",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [newGuest, setNewGuest] = useState<Omit<Guest, "id">>({
    name: "",
    email: "",
    phone: "",
    status: "pending",
    plusOne: false,
    group: "",
    mealPreference: "",
  });

  const handleAddGuest = () => {
    const guest: Guest = {
      ...newGuest,
      id: Date.now().toString(),
    };
    setGuests([...guests, guest]);
    setNewGuest({
      name: "",
      email: "",
      phone: "",
      status: "pending",
      plusOne: false,
      group: "",
      mealPreference: "",
    });
    setOpen(false);
  };

  const handleRemoveGuest = (id: string) => {
    setGuests(guests.filter((guest) => guest.id !== id));
  };

  const handleUpdateStatus = (id: string, status: GuestStatus) => {
    setGuests(
      guests.map((guest) =>
        guest.id === id ? { ...guest, status } : guest
      )
    );
  };

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (guest.group &&
        guest.group.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getTotalAttending = () => {
    let count = guests.filter((guest) => guest.status === "attending").length;
    // Add plus ones
    count += guests.filter(
      (guest) => guest.status === "attending" && guest.plusOne
    ).length;
    return count;
  };

  const getStatusColor = (status: GuestStatus) => {
    switch (status) {
      case "attending":
        return "bg-green-100 text-green-800";
      case "not attending":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Guest List</h1>
          <p className="text-muted-foreground">
            Manage your wedding guests and RSVPs
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Guest
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Guest</DialogTitle>
              <DialogDescription>
                Add the details of your new guest here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newGuest.name}
                  onChange={(e) =>
                    setNewGuest({ ...newGuest, name: e.target.value })
                  }
                  placeholder="Full Name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newGuest.email}
                  onChange={(e) =>
                    setNewGuest({ ...newGuest, email: e.target.value })
                  }
                  placeholder="Email Address"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  value={newGuest.phone}
                  onChange={(e) =>
                    setNewGuest({ ...newGuest, phone: e.target.value })
                  }
                  placeholder="Phone Number"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="group">Group (Optional)</Label>
                <Input
                  id="group"
                  value={newGuest.group}
                  onChange={(e) =>
                    setNewGuest({ ...newGuest, group: e.target.value })
                  }
                  placeholder="Family, Friends, etc."
                />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="plusOne" className="flex-1">
                  Plus One
                </Label>
                <Select
                  value={newGuest.plusOne ? "yes" : "no"}
                  onValueChange={(value) =>
                    setNewGuest({ ...newGuest, plusOne: value === "yes" })
                  }
                >
                  <SelectTrigger id="plusOne" className="w-[120px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGuest}>Add Guest</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Invited</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{guests.length}</div>
              <p className="text-xs text-muted-foreground">Guests on your list</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Confirmed Attending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-weday-primary">
                {getTotalAttending()}
              </div>
              <p className="text-xs text-muted-foreground">
                Including plus ones
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Awaiting Response</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">
                {
                  guests.filter((guest) => guest.status === "pending").length
                }
              </div>
              <p className="text-xs text-muted-foreground">
                Pending RSVPs
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Guest List</CardTitle>
            <CardDescription>
              Manage your guests, track RSVPs, and organize seating.
            </CardDescription>
            <div className="mt-4 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search guests..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Plus One</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGuests.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-muted-foreground"
                    >
                      No guests found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredGuests.map((guest) => (
                    <TableRow key={guest.id}>
                      <TableCell className="font-medium">{guest.name}</TableCell>
                      <TableCell>{guest.email}</TableCell>
                      <TableCell>
                        {guest.group ? (
                          <Badge variant="outline">{guest.group}</Badge>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={guest.status}
                          onValueChange={(value) =>
                            handleUpdateStatus(
                              guest.id,
                              value as GuestStatus
                            )
                          }
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue>
                              <span
                                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(guest.status)}`}
                              >
                                {guest.status === "attending" && (
                                  <Check className="mr-1 h-3 w-3" />
                                )}
                                {guest.status === "not attending" && (
                                  <X className="mr-1 h-3 w-3" />
                                )}
                                {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                              </span>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="attending">Attending</SelectItem>
                            <SelectItem value="not attending">Not Attending</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {guest.plusOne ? (
                          <Badge className="bg-weday-primary">Yes</Badge>
                        ) : (
                          <span className="text-muted-foreground">No</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveGuest(guest.id)}
                        >
                          <Trash className="h-4 w-4 text-muted-foreground" />
                        </Button>
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

export default Guests;
