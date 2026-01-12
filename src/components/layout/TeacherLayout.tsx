import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Megaphone,
  Image,
  QrCode,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}

const SidebarLink = ({ to, icon, label, active, badge, onClick }: SidebarLinkProps) => (
  <Link to={to} onClick={onClick}>
    <motion.div
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200",
        active
          ? "bg-primary text-primary-foreground shadow-lg"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium text-sm">{label}</span>
      </div>
      {badge && badge > 0 && (
        <Badge 
          variant={active ? "secondary" : "default"} 
          className="h-5 min-w-5 flex items-center justify-center text-xs"
        >
          {badge}
        </Badge>
      )}
    </motion.div>
  </Link>
);

interface TeacherLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { to: "/enseignant/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { to: "/enseignant/classes", icon: <Users size={18} />, label: "Mes Classes" },
  { to: "/enseignant/presence", icon: <ClipboardCheck size={18} />, label: "Présence" },
  { to: "/enseignant/devoirs", icon: <BookOpen size={18} />, label: "Devoirs" },
  { to: "/enseignant/notes", icon: <GraduationCap size={18} />, label: "Notes" },
  { to: "/enseignant/messagerie", icon: <MessageSquare size={18} />, label: "Messagerie", badge: 3 },
  { to: "/enseignant/annonces", icon: <Megaphone size={18} />, label: "Annonces" },
  { to: "/enseignant/galerie", icon: <Image size={18} />, label: "Galerie & Activités" },
  { to: "/enseignant/retrait", icon: <QrCode size={18} />, label: "Retrait d'élèves" },
  { to: "/enseignant/rapports", icon: <BarChart3 size={18} />, label: "Rapports" },
  { to: "/enseignant/parametres", icon: <Settings size={18} />, label: "Paramètres" },
];

const teacherUser = {
  name: "M. Abdoulaye Diallo",
  role: "Professeur de Mathématiques",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diallo",
  school: "Lycée Mariama Bâ",
};

export const TeacherLayout = ({ children }: TeacherLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-r border-border fixed h-full">
        {/* Logo */}
        <div className="p-5 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground font-bold text-xl">A</span>
            </div>
            <div>
              <span className="font-bold text-xl text-foreground">ARGON</span>
              <p className="text-xs text-muted-foreground">Espace Enseignant</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
          {menuItems.map((item) => (
            <SidebarLink
              key={item.to}
              {...item}
              active={location.pathname === item.to || location.pathname.startsWith(item.to + "/")}
            />
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarImage src={teacherUser.avatar} />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{teacherUser.name}</p>
              <p className="text-xs text-muted-foreground truncate">{teacherUser.school}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <LogOut size={16} />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-card z-50 lg:hidden flex flex-col shadow-2xl"
            >
              {/* Logo */}
              <div className="p-5 border-b border-border flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl">A</span>
                  </div>
                  <div>
                    <span className="font-bold text-xl text-foreground">ARGON</span>
                    <p className="text-xs text-muted-foreground">Espace Enseignant</p>
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {menuItems.map((item) => (
                  <SidebarLink
                    key={item.to}
                    {...item}
                    active={location.pathname === item.to || location.pathname.startsWith(item.to + "/")}
                    onClick={() => setSidebarOpen(false)}
                  />
                ))}
              </nav>

              {/* User section */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={teacherUser.avatar} />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{teacherUser.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{teacherUser.school}</p>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </Button>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un élève, une classe..."
                  className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
                />
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <LanguageSwitch />

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
              </Button>

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 px-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={teacherUser.avatar} />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block font-medium text-sm">{teacherUser.name}</span>
                    <ChevronDown size={14} className="text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <p className="font-medium">{teacherUser.name}</p>
                      <p className="text-xs text-muted-foreground">{teacherUser.role}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/enseignant/parametres">
                      <Settings className="mr-2 h-4 w-4" />
                      Paramètres
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
