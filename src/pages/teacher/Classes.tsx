import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Users,
  Search,
  Clock,
  MapPin,
  TrendingUp,
  ClipboardCheck,
  BookOpen,
  GraduationCap,
  Image,
  ArrowRight,
} from "lucide-react";
import { teacherClasses, teacherStudents } from "@/data/teacherMockData";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClasses = teacherClasses.filter((classe) =>
    classe.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classe.matiere.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStudentsByClass = (className: string) => {
    return teacherStudents.filter((s) => s.classe === className);
  };

  return (
    <TeacherLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Header */}
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Mes Classes</h1>
            <p className="text-muted-foreground">Gérez vos classes et vos élèves</p>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div variants={item}>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une classe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Classes Grid */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClasses.map((classe) => {
            const students = getStudentsByClass(classe.nom);
            
            return (
              <Card key={classe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{classe.nom}</CardTitle>
                      <p className="text-muted-foreground">{classe.matiere}</p>
                    </div>
                    <Badge variant="secondary">{classe.niveau}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {/* Info Row */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <Users className="h-5 w-5 mx-auto text-primary mb-1" />
                      <p className="text-lg font-bold">{classe.effectif}</p>
                      <p className="text-xs text-muted-foreground">Élèves</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <TrendingUp className="h-5 w-5 mx-auto text-success mb-1" />
                      <p className="text-lg font-bold">{classe.tauxPresence}%</p>
                      <p className="text-xs text-muted-foreground">Présence</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <GraduationCap className="h-5 w-5 mx-auto text-info mb-1" />
                      <p className="text-lg font-bold">{classe.moyenneClasse}</p>
                      <p className="text-xs text-muted-foreground">Moyenne</p>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{classe.horaire}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{classe.salle}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Taux de présence</span>
                      <span className="font-medium">{classe.tauxPresence}%</span>
                    </div>
                    <Progress value={classe.tauxPresence} className="h-2" />
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/enseignant/presence?classe=${classe.nom}`}>
                        <ClipboardCheck size={14} className="mr-1" />
                        Présence
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/enseignant/notes?classe=${classe.nom}`}>
                        <BookOpen size={14} className="mr-1" />
                        Notes
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/enseignant/galerie?classe=${classe.nom}`}>
                        <Image size={14} className="mr-1" />
                        Galerie
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link to={`/enseignant/classes/${classe.id}`}>
                        Détails <ArrowRight size={14} className="ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {filteredClasses.length === 0 && (
          <motion.div variants={item} className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Aucune classe trouvée</h3>
            <p className="text-muted-foreground">Essayez de modifier votre recherche</p>
          </motion.div>
        )}
      </motion.div>
    </TeacherLayout>
  );
};

export default Classes;
