import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  ClipboardCheck,
  BookOpen,
  MessageSquare,
  Plus,
  Send,
  Image,
  CheckCircle,
  Clock,
  ArrowRight,
  Bell,
  QrCode,
} from "lucide-react";
import { 
  teacherStats, 
  teacherClasses, 
  teacherRappels, 
  teacherMessages,
  teacherRetraits,
} from "@/data/teacherMockData";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const TeacherDashboard = () => {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <TeacherLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Header */}
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Bonjour, M. Diallo 👋
            </h1>
            <p className="text-muted-foreground capitalize">{today}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/enseignant/presence">
                <ClipboardCheck size={18} className="mr-2" />
                Faire l'appel
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Classes assignées"
            value={teacherStats.classesAssignees}
            icon={<Users size={20} />}
            variant="primary"
          />
          <StatsCard
            title="Élèves"
            value={teacherStats.totalEleves}
            icon={<Users size={20} />}
            variant="info"
          />
          <StatsCard
            title="Présences à faire"
            value={teacherStats.presencesAFaire}
            icon={<ClipboardCheck size={20} />}
            variant={teacherStats.presencesAFaire > 0 ? "warning" : "success"}
          />
          <StatsCard
            title="Devoirs en cours"
            value={teacherStats.devoirsEnCours}
            icon={<BookOpen size={20} />}
            variant="secondary"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rappels du jour */}
          <motion.div variants={item} className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="text-primary" size={20} />
                  Rappels du jour
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {teacherRappels.map((rappel, index) => (
                  <motion.div
                    key={rappel.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        rappel.type === "presence" ? "bg-primary/10 text-primary" :
                        rappel.type === "notes" ? "bg-info/10 text-info" :
                        "bg-warning/10 text-warning"
                      }`}>
                        {rappel.type === "presence" ? <ClipboardCheck size={18} /> :
                         rappel.type === "notes" ? <BookOpen size={18} /> :
                         <Users size={18} />}
                      </div>
                      <div>
                        <p className="font-medium">{rappel.titre}</p>
                        <p className="text-sm text-muted-foreground">{rappel.heure}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <CheckCircle size={16} />
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Actions rapides */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex flex-col h-20 gap-2" asChild>
                  <Link to="/enseignant/presence">
                    <ClipboardCheck size={20} />
                    <span className="text-xs">Faire l'appel</span>
                  </Link>
                </Button>
                <Button variant="outline" className="flex flex-col h-20 gap-2" asChild>
                  <Link to="/enseignant/devoirs">
                    <Plus size={20} />
                    <span className="text-xs">Créer devoir</span>
                  </Link>
                </Button>
                <Button variant="outline" className="flex flex-col h-20 gap-2" asChild>
                  <Link to="/enseignant/annonces">
                    <Send size={20} />
                    <span className="text-xs">Annonce</span>
                  </Link>
                </Button>
                <Button variant="outline" className="flex flex-col h-20 gap-2" asChild>
                  <Link to="/enseignant/galerie">
                    <Image size={20} />
                    <span className="text-xs">Galerie</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mes classes */}
          <motion.div variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="text-primary" size={20} />
                  Mes classes
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/enseignant/classes">
                    Voir tout <ArrowRight size={14} className="ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {teacherClasses.slice(0, 3).map((classe) => (
                  <Link 
                    key={classe.id} 
                    to={`/enseignant/classes/${classe.id}`}
                    className="block"
                  >
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <span className="font-bold text-primary">{classe.nom.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold">{classe.nom}</p>
                          <p className="text-sm text-muted-foreground">{classe.effectif} élèves • {classe.matiere}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{classe.tauxPresence}%</p>
                        <p className="text-xs text-muted-foreground">Présence</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Derniers messages */}
          <motion.div variants={item}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="text-primary" size={20} />
                  Messages récents
                  {teacherStats.messagesNonLus > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {teacherStats.messagesNonLus}
                    </Badge>
                  )}
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/enseignant/messagerie">
                    Voir tout <ArrowRight size={14} className="ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {teacherMessages.slice(0, 3).map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
                      !message.lu ? "bg-primary/5 border border-primary/20" : "bg-muted/50"
                    }`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>{message.expediteur.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">{message.expediteur}</p>
                        <span className="text-xs text-muted-foreground">
                          {message.date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{message.role}</p>
                      <p className="text-sm mt-1 line-clamp-1">{message.contenu}</p>
                    </div>
                    {!message.lu && (
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Autorisations de retrait */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <QrCode className="text-primary" size={20} />
                Autorisations de retrait du jour
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/enseignant/retrait">
                  Scanner QR <ArrowRight size={14} className="ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {teacherRetraits.filter(r => r.statut === "valide").slice(0, 3).map((retrait) => (
                  <div 
                    key={retrait.id}
                    className="flex items-center gap-3 p-4 rounded-xl bg-muted/50"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={retrait.photo} />
                      <AvatarFallback>{retrait.eleve.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{retrait.eleve}</p>
                      <p className="text-sm text-muted-foreground">{retrait.classe}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {retrait.personneAutorisee}
                        </Badge>
                        {retrait.heure && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock size={12} /> {retrait.heure}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </TeacherLayout>
  );
};

export default TeacherDashboard;
