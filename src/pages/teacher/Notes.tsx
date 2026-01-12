import { useState } from "react";
import { motion } from "framer-motion";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Download,
  Upload,
  GraduationCap,
  Save,
  FileSpreadsheet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { teacherClasses, teacherStudents, teacherEvaluations } from "@/data/teacherMockData";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const getNoteColor = (note: number) => {
  if (note >= 16) return "text-success font-bold";
  if (note >= 14) return "text-success";
  if (note >= 12) return "text-primary";
  if (note >= 10) return "text-warning";
  return "text-destructive";
};

const Notes = () => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState(teacherClasses[0]?.nom || "");
  const [isAddEvalOpen, setIsAddEvalOpen] = useState(false);
  const [newEval, setNewEval] = useState({
    nom: "",
    type: "Contrôle",
    coefficient: "2",
  });

  const classStudents = teacherStudents.filter((s) => s.classe === selectedClass);
  const classEvaluations = teacherEvaluations.filter((e) => e.classe === selectedClass);

  // Simulated grades - in real app, would come from backend
  const [grades, setGrades] = useState<Record<string, Record<string, number>>>(() => {
    const initial: Record<string, Record<string, number>> = {};
    classStudents.forEach((student) => {
      initial[student.id] = {};
      classEvaluations.forEach((evaluation) => {
        // Random grade for demo
        initial[student.id][evaluation.id] = Math.floor(Math.random() * 12) + 8;
      });
    });
    return initial;
  });

  const updateGrade = (studentId: string, evalId: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 20) {
      setGrades((prev) => ({
        ...prev,
        [studentId]: {
          ...prev[studentId],
          [evalId]: numValue,
        },
      }));
    }
  };

  const calculateAverage = (studentId: string) => {
    const studentGrades = grades[studentId];
    if (!studentGrades) return 0;
    
    let totalWeighted = 0;
    let totalCoef = 0;
    
    classEvaluations.forEach((evaluation) => {
      if (studentGrades[evaluation.id] !== undefined) {
        totalWeighted += studentGrades[evaluation.id] * evaluation.coefficient;
        totalCoef += evaluation.coefficient;
      }
    });
    
    return totalCoef > 0 ? (totalWeighted / totalCoef).toFixed(1) : "N/A";
  };

  const handleSave = () => {
    toast({
      title: "Notes enregistrées ✅",
      description: "Toutes les notes ont été sauvegardées avec succès.",
    });
  };

  const handleAddEvaluation = () => {
    toast({
      title: "Évaluation créée ✅",
      description: `L'évaluation "${newEval.nom}" a été ajoutée.`,
    });
    setIsAddEvalOpen(false);
    setNewEval({ nom: "", type: "Contrôle", coefficient: "2" });
  };

  const classAverage = classStudents.length > 0
    ? (classStudents.reduce((sum, s) => sum + parseFloat(calculateAverage(s.id) as string || "0"), 0) / classStudents.length).toFixed(1)
    : "N/A";

  return (
    <TeacherLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Header */}
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Notes</h1>
            <p className="text-muted-foreground">Saisissez et gérez les notes de vos élèves</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload size={18} className="mr-2" />
              Importer
            </Button>
            <Button variant="outline">
              <Download size={18} className="mr-2" />
              Exporter
            </Button>
            <Button onClick={handleSave}>
              <Save size={18} className="mr-2" />
              Enregistrer
            </Button>
          </div>
        </motion.div>

        {/* Filters & Stats */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="md:col-span-2">
            <CardContent className="pt-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>Classe</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
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
                <Dialog open={isAddEvalOpen} onOpenChange={setIsAddEvalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mt-auto">
                      <Plus size={18} className="mr-2" />
                      Évaluation
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nouvelle évaluation</DialogTitle>
                      <DialogDescription>
                        Ajoutez une nouvelle évaluation pour cette classe
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Nom de l'évaluation</Label>
                        <Input
                          placeholder="Ex: Contrôle 2"
                          value={newEval.nom}
                          onChange={(e) => setNewEval({ ...newEval, nom: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select
                          value={newEval.type}
                          onValueChange={(value) => setNewEval({ ...newEval, type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Contrôle">Contrôle</SelectItem>
                            <SelectItem value="Interrogation">Interrogation</SelectItem>
                            <SelectItem value="Devoir Maison">Devoir Maison</SelectItem>
                            <SelectItem value="TP">TP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Coefficient</Label>
                        <Select
                          value={newEval.coefficient}
                          onValueChange={(value) => setNewEval({ ...newEval, coefficient: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddEvalOpen(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleAddEvaluation}>Ajouter</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <GraduationCap className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold">{classAverage}</p>
                <p className="text-sm text-muted-foreground">Moyenne classe</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-info/10 flex items-center justify-center">
                <FileSpreadsheet className="text-info" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold">{classEvaluations.length}</p>
                <p className="text-sm text-muted-foreground">Évaluations</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Grades Table */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap size={20} />
                Tableau des notes - {selectedClass}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="sticky left-0 bg-background">Élève</TableHead>
                      {classEvaluations.map((evaluation) => (
                        <TableHead key={evaluation.id} className="text-center min-w-[100px]">
                          <div>
                            <p className="font-medium">{evaluation.nom}</p>
                            <Badge variant="outline" className="text-xs mt-1">
                              Coef. {evaluation.coefficient}
                            </Badge>
                          </div>
                        </TableHead>
                      ))}
                      <TableHead className="text-center bg-muted/50">Moyenne</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classStudents.map((student) => {
                      const avg = calculateAverage(student.id);
                      const numAvg = parseFloat(avg as string);
                      
                      return (
                        <TableRow key={student.id}>
                          <TableCell className="sticky left-0 bg-background font-medium">
                            {student.prenom} {student.nom}
                          </TableCell>
                          {classEvaluations.map((evaluation) => (
                            <TableCell key={evaluation.id} className="text-center p-2">
                              <Input
                                type="number"
                                min="0"
                                max="20"
                                step="0.5"
                                value={grades[student.id]?.[evaluation.id] ?? ""}
                                onChange={(e) => updateGrade(student.id, evaluation.id, e.target.value)}
                                className={cn(
                                  "w-16 mx-auto text-center",
                                  grades[student.id]?.[evaluation.id] !== undefined &&
                                    getNoteColor(grades[student.id][evaluation.id])
                                )}
                              />
                            </TableCell>
                          ))}
                          <TableCell className="text-center bg-muted/50 font-bold">
                            <span className={cn(getNoteColor(numAvg), "flex items-center justify-center gap-1")}>
                              {avg}
                              {numAvg >= 12 ? (
                                <TrendingUp size={14} className="text-success" />
                              ) : numAvg < 10 ? (
                                <TrendingDown size={14} className="text-destructive" />
                              ) : null}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {classStudents.length === 0 && (
                <div className="text-center py-12">
                  <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Aucun élève dans cette classe</h3>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Legend */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-success/20" />
                  <span>Excellent (≥16)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-success/10" />
                  <span>Bien (14-16)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-primary/10" />
                  <span>Assez bien (12-14)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-warning/10" />
                  <span>Passable (10-12)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-destructive/10" />
                  <span>Insuffisant (&lt;10)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </TeacherLayout>
  );
};

export default Notes;
