import { useState } from "react";
import { motion } from "framer-motion";
import { TeacherLayout } from "@/components/layout/TeacherLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Check,
  X,
  Clock,
  FileText,
  CalendarIcon,
  CheckCircle,
  Users,
  AlertCircle,
} from "lucide-react";
import { teacherClasses, teacherStudents } from "@/data/teacherMockData";

type AttendanceStatus = "present" | "absent" | "late" | "justified";

interface StudentAttendance {
  id: string;
  nom: string;
  prenom: string;
  photo: string;
  status: AttendanceStatus;
  comment: string;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const Presence = () => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState(teacherClasses[0]?.nom || "");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [period, setPeriod] = useState<"morning" | "afternoon">("morning");

  const classStudents = teacherStudents.filter((s) => s.classe === selectedClass);

  const [attendance, setAttendance] = useState<StudentAttendance[]>(
    classStudents.map((s) => ({
      id: s.id,
      nom: s.nom,
      prenom: s.prenom,
      photo: s.photo,
      status: "present" as AttendanceStatus,
      comment: "",
    }))
  );

  const updateAttendance = (studentId: string, status: AttendanceStatus) => {
    setAttendance((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, status } : s))
    );
  };

  const updateComment = (studentId: string, comment: string) => {
    setAttendance((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, comment } : s))
    );
  };

  const markAllPresent = () => {
    setAttendance((prev) =>
      prev.map((s) => ({ ...s, status: "present" as AttendanceStatus }))
    );
    toast({
      title: "Tous présents",
      description: "Tous les élèves ont été marqués présents.",
    });
  };

  const validateAttendance = () => {
    const absents = attendance.filter((s) => s.status === "absent").length;
    const lates = attendance.filter((s) => s.status === "late").length;
    
    toast({
      title: "Présence validée ✅",
      description: `${attendance.length - absents - lates} présents, ${absents} absents, ${lates} retards`,
    });
  };

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case "present": return "bg-success text-success-foreground hover:bg-success/90";
      case "absent": return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
      case "late": return "bg-warning text-warning-foreground hover:bg-warning/90";
      case "justified": return "bg-info text-info-foreground hover:bg-info/90";
    }
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case "present": return <Check size={16} />;
      case "absent": return <X size={16} />;
      case "late": return <Clock size={16} />;
      case "justified": return <FileText size={16} />;
    }
  };

  const presentCount = attendance.filter((s) => s.status === "present").length;
  const absentCount = attendance.filter((s) => s.status === "absent").length;
  const lateCount = attendance.filter((s) => s.status === "late").length;

  // Update attendance list when class changes
  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    const newStudents = teacherStudents.filter((s) => s.classe === value);
    setAttendance(
      newStudents.map((s) => ({
        id: s.id,
        nom: s.nom,
        prenom: s.prenom,
        photo: s.photo,
        status: "present" as AttendanceStatus,
        comment: "",
      }))
    );
  };

  return (
    <TeacherLayout>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Header */}
        <motion.div variants={item} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Faire l'appel</h1>
            <p className="text-muted-foreground">Enregistrez la présence de vos élèves</p>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <Select value={selectedClass} onValueChange={handleClassChange}>
                  <SelectTrigger className="w-[180px]">
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

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[180px] justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(selectedDate, "d MMM yyyy", { locale: fr })}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      locale={fr}
                    />
                  </PopoverContent>
                </Popover>

                <div className="flex bg-muted rounded-lg p-1">
                  <Button
                    variant={period === "morning" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPeriod("morning")}
                  >
                    Matin
                  </Button>
                  <Button
                    variant={period === "afternoon" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPeriod("afternoon")}
                  >
                    Après-midi
                  </Button>
                </div>

                <Button variant="outline" onClick={markAllPresent} className="ml-auto">
                  <CheckCircle size={16} className="mr-2" />
                  Tout présent
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Summary */}
        <motion.div variants={item} className="grid grid-cols-3 gap-4">
          <Card className="bg-success/10 border-success/20">
            <CardContent className="pt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <Check className="text-success" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{presentCount}</p>
                <p className="text-sm text-muted-foreground">Présents</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-destructive/10 border-destructive/20">
            <CardContent className="pt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                <X className="text-destructive" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-destructive">{absentCount}</p>
                <p className="text-sm text-muted-foreground">Absents</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-warning/10 border-warning/20">
            <CardContent className="pt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                <Clock className="text-warning" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">{lateCount}</p>
                <p className="text-sm text-muted-foreground">Retards</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Student List */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={20} />
                {selectedClass} - {attendance.length} élèves
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendance.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.photo} />
                        <AvatarFallback>{student.prenom[0]}{student.nom[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.prenom} {student.nom}</p>
                        <p className="text-sm text-muted-foreground">{selectedClass}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {(["present", "absent", "late", "justified"] as AttendanceStatus[]).map(
                        (status) => (
                          <button
                            key={status}
                            onClick={() => updateAttendance(student.id, status)}
                            className={cn(
                              "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all",
                              student.status === status
                                ? getStatusColor(status)
                                : "bg-background border hover:bg-muted"
                            )}
                            title={status === "present" ? "Présent" : status === "absent" ? "Absent" : status === "late" ? "Retard" : "Justifié"}
                          >
                            {getStatusIcon(status)}
                          </button>
                        )
                      )}
                    </div>

                    {(student.status === "absent" || student.status === "late") && (
                      <Textarea
                        placeholder="Commentaire..."
                        value={student.comment}
                        onChange={(e) => updateComment(student.id, e.target.value)}
                        className="md:w-48 h-10 resize-none"
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {attendance.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Aucun élève dans cette classe</h3>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Validate Button */}
        {attendance.length > 0 && (
          <motion.div variants={item} className="sticky bottom-4">
            <Button onClick={validateAttendance} className="w-full h-14 text-lg" size="lg">
              <CheckCircle size={20} className="mr-2" />
              Valider l'appel
            </Button>
          </motion.div>
        )}
      </motion.div>
    </TeacherLayout>
  );
};

export default Presence;
