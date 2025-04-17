
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserPlus, Send, Search, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mock data for conversations
const mockVendors = [
  {
    id: 1,
    name: "Elegant Gardens Venue",
    avatar: "",
    lastMessage: "We can accommodate your request for the outdoor ceremony. Let me check availability.",
    timestamp: "2 hours ago",
    unread: true,
    type: "venue"
  },
  {
    id: 2,
    name: "Golden Plate Catering",
    avatar: "",
    lastMessage: "I've attached the updated menu options based on your preferences.",
    timestamp: "Yesterday",
    unread: false,
    type: "catering"
  },
  {
    id: 3,
    name: "Blossom Floral Designs",
    avatar: "",
    lastMessage: "The seasonal peonies will be available for your wedding date.",
    timestamp: "3 days ago",
    unread: false,
    type: "flowers"
  }
];

const mockTeam = [
  {
    id: 4,
    name: "Alex (Best Person)",
    avatar: "",
    lastMessage: "I'll coordinate with the groomsmen about suit fittings next week.",
    timestamp: "1 hour ago",
    unread: true,
    type: "team"
  },
  {
    id: 5,
    name: "Mom",
    avatar: "",
    lastMessage: "Just checking in about the rehearsal dinner arrangements.",
    timestamp: "5 hours ago",
    unread: false,
    type: "family"
  },
  {
    id: 6,
    name: "Wedding Planning Group",
    avatar: "",
    lastMessage: "Sarah: I found a great photographer within our budget!",
    timestamp: "Yesterday",
    unread: false,
    type: "group"
  }
];

// Mock messages for active conversation
const mockMessages = [
  {
    id: 1,
    senderId: 1,
    text: "Hello! I wanted to follow up on your inquiry about our venue for your wedding.",
    timestamp: "10:21 AM",
    isMe: false
  },
  {
    id: 2,
    senderId: "me",
    text: "Hi there! Yes, we're interested in the outdoor garden ceremony with indoor reception option.",
    timestamp: "10:25 AM",
    isMe: true
  },
  {
    id: 3,
    senderId: 1,
    text: "We can definitely accommodate that! The garden is beautiful in June with all the flowers in bloom.",
    timestamp: "10:28 AM",
    isMe: false
  },
  {
    id: 4,
    senderId: "me",
    text: "That sounds perfect. What's the maximum guest capacity for that setup?",
    timestamp: "10:30 AM",
    isMe: true
  },
  {
    id: 5,
    senderId: 1,
    text: "We can accommodate up to 150 guests for the garden ceremony and indoor reception. Would you like to schedule a visit to see the space in person?",
    timestamp: "10:32 AM",
    isMe: false
  },
  {
    id: 6,
    senderId: "me",
    text: "Yes, we would love to schedule a visit! Are you available next Saturday afternoon?",
    timestamp: "10:34 AM",
    isMe: true
  },
  {
    id: 7,
    senderId: 1,
    text: "We can accommodate your request for the outdoor ceremony. Let me check availability.",
    timestamp: "10:36 AM",
    isMe: false
  }
];

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  type: string;
}

interface Message {
  id: number;
  senderId: number | string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

const Messages = () => {
  const [activeTab, setActiveTab] = useState("vendors");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      if (activeTab === "vendors") {
        setContacts(mockVendors);
      } else {
        setContacts(mockTeam);
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    if (contacts.length > 0 && !activeContact) {
      setActiveContact(contacts[0]);
      setMessages(mockMessages);
    }
  }, [contacts, activeContact]);

  const handleSelectContact = (contact: Contact) => {
    setActiveContact(contact);
    // Mark as read when selected
    if (contact.unread) {
      setContacts(contacts.map(c => 
        c.id === contact.id ? { ...c, unread: false } : c
      ));
    }
    setMessages(mockMessages);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const message: Message = {
      id: messages.length + 1,
      senderId: "me",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto animate-fade-in">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Communicate with your vendors and wedding party</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)] min-h-[500px]">
          {/* Contacts Panel */}
          <Card className="lg:col-span-1 border overflow-hidden">
            <CardHeader className="px-4 py-3 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search messages..." 
                    className="h-9 pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button size="icon" variant="ghost" className="text-muted-foreground">
                  <UserPlus size={18} />
                </Button>
              </div>

              <Tabs defaultValue="vendors" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="vendors" className="flex-1">Vendors</TabsTrigger>
                  <TabsTrigger value="team" className="flex-1">Wedding Party</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <ScrollArea className="h-[calc(100vh-320px)] min-h-[400px]">
              {loading ? (
                // Loading skeleton
                <div className="space-y-1 p-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center space-x-3 px-3 py-3 animate-pulse">
                      <div className="w-10 h-10 rounded-full bg-muted"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                        <div className="h-3 bg-muted rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredContacts.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No contacts found
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {filteredContacts.map(contact => (
                    <div 
                      key={contact.id}
                      onClick={() => handleSelectContact(contact)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-md cursor-pointer transition-colors ${
                        activeContact?.id === contact.id 
                          ? 'bg-weday-light/25 dark:bg-weday-dark/20' 
                          : 'hover:bg-muted/50'
                      } ${contact.unread ? 'font-medium' : ''}`}
                    >
                      <Avatar>
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback className="bg-weday-primary/20 text-weday-primary">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium truncate">{contact.name}</p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {contact.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="text-xs truncate text-muted-foreground">
                            {contact.lastMessage}
                          </p>
                          {contact.unread && (
                            <span className="ml-2 w-2 h-2 rounded-full bg-weday-primary"></span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </Card>

          {/* Chat Panel */}
          <Card className="lg:col-span-2 flex flex-col border">
            {activeContact ? (
              <>
                <CardHeader className="px-6 py-4 border-b flex-row items-center space-y-0 space-x-3">
                  <Avatar>
                    <AvatarImage src={activeContact.avatar} />
                    <AvatarFallback className="bg-weday-primary/20 text-weday-primary">
                      {activeContact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{activeContact.name}</CardTitle>
                    <p className="text-xs text-muted-foreground capitalize">{activeContact.type}</p>
                  </div>
                </CardHeader>

                <ScrollArea className="flex-1 p-4 h-[calc(100vh-400px)] min-h-[300px]">
                  <div className="space-y-4">
                    {messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[75%] px-4 py-2 rounded-lg ${
                            message.isMe 
                              ? 'bg-weday-primary text-white' 
                              : 'bg-muted/40'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 ${message.isMe ? 'text-white/70' : 'text-muted-foreground'}`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Input 
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      size="icon"
                      disabled={newMessage.trim() === ""}
                    >
                      <Send size={18} />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-6">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Your Messages</h3>
                  <p className="text-muted-foreground mt-1">
                    Select a conversation to start messaging
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
