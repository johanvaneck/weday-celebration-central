
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Check, Edit, Mail, Phone, PlusCircle, Trash } from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  category: string;
  contactName?: string;
  email?: string;
  phone?: string;
  website?: string;
  notes?: string;
  booked: boolean;
  cost?: number;
  deposit?: number;
}

const Vendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: "1",
      name: "Elegant Events Venue",
      category: "Venue",
      contactName: "Sarah Johnson",
      email: "sarah@elegantevents.com",
      phone: "555-123-4567",
      website: "https://elegantevents.com",
      notes: "Beautiful venue with garden for ceremony and ballroom for reception.",
      booked: true,
      cost: 8000,
      deposit: 2000,
    },
    {
      id: "2",
      name: "Divine Catering",
      category: "Catering",
      contactName: "Michael Chen",
      email: "michael@divinecatering.com",
      phone: "555-987-6543",
      website: "https://divinecatering.com",
      notes: "Offers a variety of menu options. Need to schedule tasting.",
      booked: false,
      cost: 5000,
    },
    {
      id: "3",
      name: "Blooming Bouquets",
      category: "Florist",
      contactName: "Emma Garcia",
      email: "emma@bloomingbouquets.com",
      phone: "555-456-7890",
      website: "https://bloomingbouquets.com",
      notes: "Specializes in seasonal flowers. Offers package discounts.",
      booked: true,
      cost: 2500,
      deposit: 500,
    },
    {
      id: "4",
      name: "Capture Moments Photography",
      category: "Photography",
      contactName: "David Williams",
      email: "david@capturemoments.com",
      phone: "555-789-0123",
      website: "https://capturemoments.com",
      notes: "Check portfolio for wedding samples. Includes engagement photoshoot.",
      booked: false,
      cost: 3500,
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [newVendor, setNewVendor] = useState<Omit<Vendor, "id">>({
    name: "",
    category: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    notes: "",
    booked: false,
    cost: undefined,
    deposit: undefined,
  });

  const handleAddVendor = () => {
    if (editing) {
      setVendors(
        vendors.map((vendor) =>
          vendor.id === editing
            ? { ...newVendor, id: vendor.id }
            : vendor
        )
      );
      setEditing(null);
    } else {
      const vendor: Vendor = {
        ...newVendor,
        id: Date.now().toString(),
      };
      setVendors([...vendors, vendor]);
    }
    
    setNewVendor({
      name: "",
      category: "",
      contactName: "",
      email: "",
      phone: "",
      website: "",
      notes: "",
      booked: false,
      cost: undefined,
      deposit: undefined,
    });
    setOpen(false);
  };

  const handleEditVendor = (id: string) => {
    const vendor = vendors.find((v) => v.id === id);
    if (vendor) {
      setNewVendor({
        name: vendor.name,
        category: vendor.category,
        contactName: vendor.contactName || "",
        email: vendor.email || "",
        phone: vendor.phone || "",
        website: vendor.website || "",
        notes: vendor.notes || "",
        booked: vendor.booked,
        cost: vendor.cost,
        deposit: vendor.deposit,
      });
      setEditing(id);
      setOpen(true);
    }
  };

  const handleRemoveVendor = (id: string) => {
    setVendors(vendors.filter((vendor) => vendor.id !== id));
  };

  const handleToggleBooked = (id: string) => {
    setVendors(
      vendors.map((vendor) =>
        vendor.id === id ? { ...vendor, booked: !vendor.booked } : vendor
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

  const categories = [
    ...new Set(vendors.map((vendor) => vendor.category)),
  ].sort();
  
  const totalCost = vendors.reduce(
    (total, vendor) => total + (vendor.cost || 0),
    0
  );
  
  const bookedCost = vendors
    .filter((vendor) => vendor.booked)
    .reduce((total, vendor) => total + (vendor.cost || 0), 0);

  return (
    <Layout>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
          <p className="text-muted-foreground">
            Manage your wedding vendors and services
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editing ? "Edit Vendor" : "Add New Vendor"}
              </DialogTitle>
              <DialogDescription>
                {editing
                  ? "Edit the details of your vendor."
                  : "Add the details of your new vendor here."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Vendor Name</Label>
                  <Input
                    id="name"
                    value={newVendor.name}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, name: e.target.value })
                    }
                    placeholder="Business Name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newVendor.category}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, category: e.target.value })
                    }
                    placeholder="Venue, Catering, etc."
                    list="categories"
                  />
                  <datalist id="categories">
                    {categories.map((category) => (
                      <option key={category} value={category} />
                    ))}
                  </datalist>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="contactName">Contact Person</Label>
                <Input
                  id="contactName"
                  value={newVendor.contactName}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, contactName: e.target.value })
                  }
                  placeholder="Contact Name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newVendor.email}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, email: e.target.value })
                    }
                    placeholder="Email Address"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newVendor.phone}
                    onChange={(e) =>
                      setNewVendor({ ...newVendor, phone: e.target.value })
                    }
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={newVendor.website}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, website: e.target.value })
                  }
                  placeholder="https://example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cost">Estimated Cost</Label>
                  <Input
                    id="cost"
                    type="number"
                    value={newVendor.cost || ""}
                    onChange={(e) =>
                      setNewVendor({
                        ...newVendor,
                        cost: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    placeholder="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deposit">Deposit Amount</Label>
                  <Input
                    id="deposit"
                    type="number"
                    value={newVendor.deposit || ""}
                    onChange={(e) =>
                      setNewVendor({
                        ...newVendor,
                        deposit: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newVendor.notes}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, notes: e.target.value })
                  }
                  placeholder="Add any additional information about this vendor"
                  rows={4}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="booked"
                  checked={newVendor.booked}
                  onChange={(e) =>
                    setNewVendor({ ...newVendor, booked: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-weday-primary focus:ring-weday-primary"
                />
                <Label htmlFor="booked">Mark as booked</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setOpen(false);
                setEditing(null);
                setNewVendor({
                  name: "",
                  category: "",
                  contactName: "",
                  email: "",
                  phone: "",
                  website: "",
                  notes: "",
                  booked: false,
                  cost: undefined,
                  deposit: undefined,
                });
              }}>
                Cancel
              </Button>
              <Button onClick={handleAddVendor}>
                {editing ? "Save Changes" : "Add Vendor"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Vendors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{vendors.length}</div>
              <p className="text-xs text-muted-foreground">
                {vendors.filter((v) => v.booked).length} booked / {vendors.length - vendors.filter((v) => v.booked).length} pending
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Estimated Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatCurrency(totalCost)}</div>
              <p className="text-xs text-muted-foreground">
                All vendors combined
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Booked Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-weday-primary">
                {formatCurrency(bookedCost)}
              </div>
              <p className="text-xs text-muted-foreground">
                Confirmed vendors
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vendors.map((vendor) => (
            <Card key={vendor.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{vendor.name}</CardTitle>
                    <CardDescription>{vendor.category}</CardDescription>
                  </div>
                  <Badge
                    variant={vendor.booked ? "default" : "outline"}
                    className={vendor.booked ? "bg-green-500" : ""}
                  >
                    {vendor.booked ? "Booked" : "Not Booked"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {vendor.contactName && (
                  <div className="flex items-center text-muted-foreground">
                    <span className="font-medium">Contact:</span>
                    <span className="ml-2">{vendor.contactName}</span>
                  </div>
                )}
                {vendor.email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <a
                      href={`mailto:${vendor.email}`}
                      className="text-weday-primary hover:underline"
                    >
                      {vendor.email}
                    </a>
                  </div>
                )}
                {vendor.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <a
                      href={`tel:${vendor.phone}`}
                      className="text-weday-primary hover:underline"
                    >
                      {vendor.phone}
                    </a>
                  </div>
                )}
                {vendor.cost && (
                  <div className="flex items-center text-muted-foreground">
                    <span className="font-medium">Cost:</span>
                    <span className="ml-2">{formatCurrency(vendor.cost)}</span>
                    {vendor.deposit && (
                      <span className="ml-2 text-xs">
                        (Deposit: {formatCurrency(vendor.deposit)})
                      </span>
                    )}
                  </div>
                )}
                {vendor.notes && (
                  <div className="mt-2 rounded-md bg-muted p-2 text-muted-foreground">
                    <p className="text-xs">{vendor.notes}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleBooked(vendor.id)}
                  className="text-xs"
                >
                  <Check className="mr-1 h-3 w-3" />
                  {vendor.booked ? "Unmark Booked" : "Mark as Booked"}
                </Button>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditVendor(vendor.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveVendor(vendor.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Vendors;
