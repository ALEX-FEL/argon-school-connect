import { useState } from "react";
import { motion } from "framer-motion";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Plus, Megaphone, Eye, Edit, Trash2 } from "lucide-react";
import { teacherAnnonces, teacherClasses } from "@/data/teacherMockData";

const Annonces = () => {
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreate = () => {
    toast({ title: "Annonce publiée ✅", description: "Votre annonce a été publiée." });
    setIsCreateOpen(false);
  };

  return (
    <TeacherLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Annonces</h1>
            <p className="text-muted-foreground">Publiez des annonces pour vos classes</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button><Plus size={18} className="mr-2" />Nouvelle annonce</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Nouvelle annonce</DialogTitle></DialogHeader>
              <div className="space-y-4 py-4">
                <div><Label>Titre</Label><Input placeholder="Titre de l'annonce" /></div>
                <div><Label>Classe cible</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes mes classes</SelectItem>
                      {teacherClasses.map(c => <SelectItem key={c.id} value={c.nom}>{c.nom}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Contenu</Label><Textarea placeholder="Contenu..." rows={4} /></div>
                <div><Label>Priorité</Label>
                  <Select defaultValue="normale"><SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="haute">Haute</SelectItem>
                      <SelectItem value="normale">Normale</SelectItem>
                      <SelectItem value="basse">Basse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter><Button variant="outline" onClick={() => setIsCreateOpen(false)}>Annuler</Button><Button onClick={handleCreate}>Publier</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {teacherAnnonces.map(annonce => (
            <Card key={annonce.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{annonce.titre}</h3>
                      <Badge variant={annonce.priorite === "haute" ? "destructive" : "secondary"}>{annonce.priorite}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{annonce.contenu}</p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>{annonce.classe}</span>
                      <span>{format(annonce.date, "d MMM yyyy", { locale: fr })}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon"><Eye size={16} /></Button>
                    <Button variant="ghost" size="icon"><Edit size={16} /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive"><Trash2 size={16} /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </TeacherLayout>
  );
};

export default Annonces;
