import { motion } from "framer-motion";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Image, Upload, Eye, Trash2 } from "lucide-react";
import { teacherGalerie } from "@/data/teacherMockData";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const Galerie = () => (
  <TeacherLayout>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Galerie & Activités</h1>
          <p className="text-muted-foreground">Partagez des photos et vidéos avec les parents</p>
        </div>
        <Button><Plus size={18} className="mr-2" />Créer un album</Button>
      </div>

      <Card>
        <CardContent className="p-8 text-center border-2 border-dashed rounded-lg">
          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="font-medium mb-1">Glissez vos fichiers ici</p>
          <p className="text-sm text-muted-foreground mb-4">ou cliquez pour parcourir</p>
          <Button variant="outline">Sélectionner des fichiers</Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teacherGalerie.map(album => (
          <Card key={album.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Image className="h-12 w-12 text-primary/50" />
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">{album.titre}</h3>
                <Badge variant={album.statut === "publie" ? "default" : "secondary"}>{album.statut === "publie" ? "Publié" : "Brouillon"}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{album.description}</p>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{album.classe}</span>
                <span>{album.photos} photos</span>
                <span>{format(album.date, "d MMM", { locale: fr })}</span>
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="flex-1"><Eye size={14} className="mr-1" />Voir</Button>
                <Button variant="ghost" size="icon" className="text-destructive"><Trash2 size={14} /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  </TeacherLayout>
);

export default Galerie;
