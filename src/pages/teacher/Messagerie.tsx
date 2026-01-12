import { useState } from "react";
import { motion } from "framer-motion";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Check,
  CheckCheck,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import { teacherMessages } from "@/data/teacherMockData";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: "me" | "them";
  read: boolean;
}

const Messagerie = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = teacherMessages.filter((msg) =>
    msg.expediteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.sujet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = teacherMessages.filter((m) => !m.lu).length;

  const selectedMessage = teacherMessages.find((m) => m.id === selectedConversation);

  // Simulated conversation messages
  const conversationMessages: Message[] = selectedMessage ? [
    { id: "1", content: selectedMessage.contenu, timestamp: selectedMessage.date, sender: "them", read: true },
    { id: "2", content: "Merci pour votre message. Je prends note de cette information.", timestamp: new Date(selectedMessage.date.getTime() + 3600000), sender: "me", read: true },
  ] : [];

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    toast({
      title: "Message envoyé ✅",
      description: "Votre message a été envoyé avec succès.",
    });
    setNewMessage("");
  };

  return (
    <TeacherLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="h-[calc(100vh-8rem)]">
        <motion.div variants={item} className="h-full">
          <Card className="h-full flex flex-col md:flex-row overflow-hidden">
            {/* Conversations List */}
            <div className={cn(
              "w-full md:w-80 border-r flex flex-col",
              selectedConversation && "hidden md:flex"
            )}>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare size={20} />
                    Messages
                    {unreadCount > 0 && (
                      <Badge variant="destructive">{unreadCount}</Badge>
                    )}
                  </CardTitle>
                </div>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {filteredConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={cn(
                        "w-full p-3 rounded-lg text-left transition-colors mb-1",
                        selectedConversation === conversation.id
                          ? "bg-primary/10"
                          : "hover:bg-muted",
                        !conversation.lu && "bg-primary/5"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.avatar} />
                          <AvatarFallback>{conversation.expediteur.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={cn(
                              "font-medium text-sm truncate",
                              !conversation.lu && "text-primary"
                            )}>
                              {conversation.expediteur}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {format(conversation.date, "d MMM", { locale: fr })}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{conversation.role}</p>
                          <p className="text-sm mt-1 line-clamp-1">{conversation.sujet}</p>
                        </div>
                        {!conversation.lu && (
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}

                  {filteredConversations.length === 0 && (
                    <div className="text-center py-8">
                      <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Aucune conversation</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Conversation Detail */}
            <div className={cn(
              "flex-1 flex flex-col",
              !selectedConversation && "hidden md:flex"
            )}>
              {selectedMessage ? (
                <>
                  {/* Header */}
                  <div className="p-4 border-b flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <ArrowLeft size={20} />
                    </Button>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedMessage.avatar} />
                      <AvatarFallback>{selectedMessage.expediteur.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{selectedMessage.expediteur}</p>
                      <p className="text-sm text-muted-foreground">{selectedMessage.role}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical size={20} />
                    </Button>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      <div className="text-center">
                        <Badge variant="secondary" className="text-xs">
                          {format(selectedMessage.date, "EEEE d MMMM yyyy", { locale: fr })}
                        </Badge>
                      </div>

                      {conversationMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={cn(
                            "flex",
                            msg.sender === "me" ? "justify-end" : "justify-start"
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[80%] rounded-2xl px-4 py-2",
                              msg.sender === "me"
                                ? "bg-primary text-primary-foreground rounded-br-none"
                                : "bg-muted rounded-bl-none"
                            )}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <div className={cn(
                              "flex items-center gap-1 mt-1",
                              msg.sender === "me" ? "justify-end" : "justify-start"
                            )}>
                              <span className={cn(
                                "text-xs",
                                msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                              )}>
                                {format(msg.timestamp, "HH:mm")}
                              </span>
                              {msg.sender === "me" && (
                                msg.read ? <CheckCheck size={14} className="text-primary-foreground/70" /> : <Check size={14} className="text-primary-foreground/70" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Paperclip size={20} />
                      </Button>
                      <Textarea
                        placeholder="Écrire un message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="min-h-[44px] max-h-32 resize-none"
                        rows={1}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                      />
                      <Button onClick={handleSend} disabled={!newMessage.trim()}>
                        <Send size={18} />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Sélectionnez une conversation</h3>
                    <p className="text-muted-foreground">
                      Choisissez une conversation pour voir les messages
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </TeacherLayout>
  );
};

export default Messagerie;
