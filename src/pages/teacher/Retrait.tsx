import { useState } from "react";
import { motion } from "framer-motion";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { QrCode, Camera, CheckCircle, Clock, Shield, History } from "lucide-react";
import { teacherRetraits, teacherHistoriqueRetraits } from "@/data/teacherMockData";

const Retrait = () => {
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      toast({ title: "QR Code validé ✅", description: "Aminata Diop - Retrait autorisé par Mamadou Diop" });
    }, 2000);
  };

  return (
    <TeacherLayout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Retrait d'élèves</h1>
          <p className="text-muted-foreground">Scannez les QR codes pour valider les retraits</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><QrCode size={20} />Scanner un QR Code</CardTitle></CardHeader>
            <CardContent>
              <div className="aspect-square max-w-sm mx-auto bg-muted rounded-xl flex items-center justify-center mb-4">
                {scanning ? (
                  <div className="text-center"><div className="animate-pulse"><Camera className="h-16 w-16 text-primary mx-auto mb-2" /></div><p className="text-sm text-muted-foreground">Scan en cours...</p></div>
                ) : (
                  <div className="text-center"><QrCode className="h-16 w-16 text-muted-foreground mx-auto mb-2" /><p className="text-sm text-muted-foreground">Caméra prête</p></div>
                )}
              </div>
              <Button className="w-full" size="lg" onClick={handleScan} disabled={scanning}><Camera size={18} className="mr-2" />{scanning ? "Scan en cours..." : "Scanner"}</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Shield size={20} />Autorisations valides aujourd'hui</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {teacherRetraits.filter(r => r.statut === "valide").map(retrait => (
                <div key={retrait.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Avatar><AvatarImage src={retrait.photo} /><AvatarFallback>{retrait.eleve.charAt(0)}</AvatarFallback></Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{retrait.eleve}</p>
                    <p className="text-xs text-muted-foreground">{retrait.personneAutorisee} ({retrait.relation})</p>
                  </div>
                  <Badge variant="outline" className="gap-1"><CheckCircle size={12} />Valide</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><History size={20} />Historique des retraits</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teacherHistoriqueRetraits.map(h => (
                <div key={h.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center"><CheckCircle className="text-success" size={18} /></div>
                    <div><p className="font-medium">{h.eleve}</p><p className="text-xs text-muted-foreground">Retiré par {h.retirePar} ({h.relation})</p></div>
                  </div>
                  <div className="text-right text-sm"><p className="font-medium">{format(h.date, "HH:mm")}</p><p className="text-xs text-muted-foreground">{format(h.date, "d MMM", { locale: fr })}</p></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </TeacherLayout>
  );
};

export default Retrait;
