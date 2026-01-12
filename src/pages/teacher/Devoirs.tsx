import { useState } from "react";
import { motion } from "framer-motion";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Plus,
  Search,
  BookOpen,
  Calendar as CalendarIcon,
  Paperclip,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  FileText,
} from "lucide-react";
import { teacherDevoirs, teacherClasses } from "@/data/teacherMockData";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const getStatutBadge = (statut: string) => {
  switch (statut) {
    case "actif":
      return <Badge className="bg-success/10 text-success border-success/20">En cours</Badge>;
    case "termine":
      return <Badge className="bg-muted text-muted-foreground">Terminé</Badge>;
    case "brouillon":
      return <Badge variant="outline">Brouillon</Badge>;
    default:
      return <Badge variant="secondary">{statut}</Badge>;
  }
};

const Devoirs = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClasse, setFilterClasse] = useState("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newDevoir, setNewDevoir] = useState({
    titre: "",
    classe: "",
    description: "",
    dateLimite: new Date(),
  });

  const filteredDevoirs = teacherDevoirs.filter((devoir) => {
    const matchSearch = devoir.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      devoir.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchClasse = filterClasse === "all" || devoir.classe === filterClasse;
    return matchSearch && matchClasse;
  });

  const handleCreate = () => {
    toast({
      title: "Devoir créé ✅",
      description: `Le devoir "${newDevoir.titre}" a été créé avec succès.`,
    });
    setIsCreateOpen(false);
    setNewDevoir({ titre: "", classe: "", description: "", dateLimite: new Date() });
  };

  const devoirsActifs = teacherDevoirs.filter((d) => d.statut === "actif").length;
  const devoirsTermines = teacherDevoirs.filter((d) => d.statut === "termine").length;

  return (
    <TeacherLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Header */}
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Devoirs</h1>
            <p className="text-muted-foreground">Créez et gérez les devoirs de vos classes</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus size={18} className="mr-2" />
                Créer un devoir
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Nouveau devoir</DialogTitle>
                <DialogDescription>
                  Créez un nouveau devoir pour vos élèves
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="titre">Titre</Label>
                  <Input
                    id="titre"
                    placeholder="Ex: Exercices sur les fractions"
                    value={newDevoir.titre}
                    onChange={(e) => setNewDevoir({ ...newDevoir, titre: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="classe">Classe</Label>
                  <Select
                    value={newDevoir.classe}
                    onValueChange={(value) => setNewDevoir({ ...newDevoir, classe: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une classe" />
                    </SelectTrigger>
                    <SelectContent>
                      {teacherClasses.map((c) => (
                        <SelectItem key={c.id} value={c.nom}>
                          {c.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez le devoir..."
                    value={newDevoir.description}
                    onChange={(e) => setNewDevoir({ ...newDevoir, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date limite</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(newDevoir.dateLimite, "d MMMM yyyy", { locale: fr })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newDevoir.dateLimite}
                        onSelect={(date) => date && setNewDevoir({ ...newDevoir, dateLimite: date })}
                        locale={fr}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Fichier joint (optionnel)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Paperclip className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Glissez un fichier ici ou cliquez pour parcourir
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Annuler
                </Button>
                <Button variant="secondary">Enregistrer brouillon</Button>
                <Button onClick={handleCreate}>Publier</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold">{teacherDevoirs.length}</p>
                <p className="text-sm text-muted-foreground">Total devoirs</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <Clock className="text-success" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold">{devoirsActifs}</p>
                <p className="text-sm text-muted-foreground">En cours</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <CheckCircle className="text-muted-foreground" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold">{devoirsTermines}</p>
                <p className="text-sm text-muted-foreground">Terminés</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div variants={item} className="flex flex-wrap gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un devoir..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterClasse} onValueChange={setFilterClasse}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Toutes les classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les classes</SelectItem>
              {teacherClasses.map((c) => (
                <SelectItem key={c.id} value={c.nom}>
                  {c.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Devoirs List */}
        <motion.div variants={item} className="space-y-4">
          {filteredDevoirs.map((devoir) => (
            <Card key={devoir.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{devoir.titre}</h3>
                      {getStatutBadge(devoir.statut)}
                      {devoir.fichierJoint && (
                        <Badge variant="outline" className="gap-1">
                          <Paperclip size={12} />
                          Fichier
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{devoir.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen size={14} />
                        {devoir.classe} • {devoir.matiere}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarIcon size={14} />
                        {format(devoir.dateLimite, "d MMM yyyy", { locale: fr })}
                      </span>
                    </div>
                  </div>

                  {devoir.statut === "actif" && (
                    <div className="md:w-48">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Soumissions</span>
                        <span className="font-medium">{devoir.soumissions}/{devoir.total}</span>
                      </div>
                      <Progress value={(devoir.soumissions / devoir.total) * 100} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye size={18} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit size={18} />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {filteredDevoirs.length === 0 && (
          <motion.div variants={item} className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Aucun devoir trouvé</h3>
            <p className="text-muted-foreground">Créez votre premier devoir ou modifiez vos filtres</p>
          </motion.div>
        )}
      </motion.div>
    </TeacherLayout>
  );
};

export default Devoirs;
