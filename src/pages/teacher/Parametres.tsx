import { motion } from "framer-motion";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { User, Bell, Shield, Save, Camera } from "lucide-react";

const Parametres = () => {
  const { toast } = useToast();
  const handleSave = () => toast({ title: "Paramètres enregistrés ✅" });

  return (
    <TeacherLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-3xl">
        <div><h1 className="text-2xl md:text-3xl font-bold">Paramètres</h1><p className="text-muted-foreground">Gérez votre profil et vos préférences</p></div>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><User size={20} />Profil</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20"><AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Diallo" /><AvatarFallback>AD</AvatarFallback></Avatar>
              <Button variant="outline"><Camera size={16} className="mr-2" />Changer la photo</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Nom</Label><Input defaultValue="Diallo" /></div>
              <div><Label>Prénom</Label><Input defaultValue="Abdoulaye" /></div>
              <div><Label>Email</Label><Input type="email" defaultValue="a.diallo@lycee-mariama.sn" /></div>
              <div><Label>Téléphone</Label><Input defaultValue="+221 77 123 4567" /></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Bell size={20} />Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between"><div><p className="font-medium">Messages des parents</p><p className="text-sm text-muted-foreground">Recevoir une notification pour chaque nouveau message</p></div><Switch defaultChecked /></div>
            <Separator />
            <div className="flex items-center justify-between"><div><p className="font-medium">Rappels de présence</p><p className="text-sm text-muted-foreground">Rappel si l'appel n'est pas fait</p></div><Switch defaultChecked /></div>
            <Separator />
            <div className="flex items-center justify-between"><div><p className="font-medium">Notifications par email</p><p className="text-sm text-muted-foreground">Recevoir un résumé quotidien</p></div><Switch /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Shield size={20} />Sécurité</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Mot de passe actuel</Label><Input type="password" /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Nouveau mot de passe</Label><Input type="password" /></div>
              <div><Label>Confirmer</Label><Input type="password" /></div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="w-full"><Save size={18} className="mr-2" />Enregistrer les modifications</Button>
      </motion.div>
    </TeacherLayout>
  );
};

export default Parametres;
