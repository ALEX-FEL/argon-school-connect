import { motion } from "framer-motion";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, FileText, Users, ClipboardCheck } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { teacherPresenceMensuelle, teacherMoyennesParClasse } from "@/data/teacherMockData";

const Rapports = () => (
  <TeacherLayout>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div><h1 className="text-2xl md:text-3xl font-bold">Rapports</h1><p className="text-muted-foreground">Consultez les statistiques de vos classes</p></div>
        <Button><Download size={18} className="mr-2" />Exporter</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><ClipboardCheck size={20} />Taux de présence mensuel</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={teacherPresenceMensuelle}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="mois" className="text-xs" />
                <YAxis domain={[80, 100]} className="text-xs" />
                <Tooltip />
                <Area type="monotone" dataKey="taux" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.2)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 size={20} />Moyennes par classe</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={teacherMoyennesParClasse}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="classe" className="text-xs" />
                <YAxis domain={[0, 20]} className="text-xs" />
                <Tooltip />
                <Bar dataKey="moyenne" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center"><ClipboardCheck className="h-10 w-10 mx-auto text-primary mb-3" /><h3 className="font-semibold mb-1">Rapport de présence</h3><p className="text-sm text-muted-foreground">Détails des présences par classe</p></CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center"><FileText className="h-10 w-10 mx-auto text-info mb-3" /><h3 className="font-semibold mb-1">Rapport des notes</h3><p className="text-sm text-muted-foreground">Synthèse des évaluations</p></CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center"><Users className="h-10 w-10 mx-auto text-success mb-3" /><h3 className="font-semibold mb-1">Rapport d'activité</h3><p className="text-sm text-muted-foreground">Historique des actions</p></CardContent>
        </Card>
      </div>
    </motion.div>
  </TeacherLayout>
);

export default Rapports;
