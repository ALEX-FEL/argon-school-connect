// Teacher Mock Data for ARGON Platform

export const teacherStats = {
  classesAssignees: 4,
  totalEleves: 128,
  presencesAFaire: 2,
  devoirsEnCours: 6,
  messagesNonLus: 3,
  autorisationsValides: 5,
};

export const teacherClasses = [
  {
    id: "1",
    nom: "6ème A",
    niveau: "6ème",
    effectif: 32,
    matiere: "Mathématiques",
    salle: "Salle 101",
    horaire: "Lun, Mar, Jeu - 8h00",
    tauxPresence: 96.5,
    moyenneClasse: 13.8,
  },
  {
    id: "2",
    nom: "5ème B",
    niveau: "5ème",
    effectif: 30,
    matiere: "Mathématiques",
    salle: "Salle 102",
    horaire: "Lun, Mer, Ven - 10h00",
    tauxPresence: 94.2,
    moyenneClasse: 12.5,
  },
  {
    id: "3",
    nom: "4ème A",
    niveau: "4ème",
    effectif: 34,
    matiere: "Mathématiques",
    salle: "Salle 103",
    horaire: "Mar, Jeu, Ven - 14h00",
    tauxPresence: 92.8,
    moyenneClasse: 11.9,
  },
  {
    id: "4",
    nom: "3ème B",
    niveau: "3ème",
    effectif: 32,
    matiere: "Mathématiques",
    salle: "Salle 104",
    horaire: "Lun, Mer, Ven - 16h00",
    tauxPresence: 95.1,
    moyenneClasse: 14.2,
  },
];

export const teacherStudents = [
  { id: "1", nom: "Diop", prenom: "Aminata", classe: "6ème A", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aminata", parent: "Mamadou Diop", telephone: "+221 77 123 4567", moyenne: 15.5, tauxPresence: 98, statut: "actif" },
  { id: "2", nom: "Ndiaye", prenom: "Ousmane", classe: "6ème A", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ousmane", parent: "Fatou Ndiaye", telephone: "+221 77 234 5678", moyenne: 12.8, tauxPresence: 92, statut: "actif" },
  { id: "3", nom: "Sow", prenom: "Fatou", classe: "6ème A", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=FatouS", parent: "Ibrahima Sow", telephone: "+221 77 345 6789", moyenne: 16.2, tauxPresence: 100, statut: "actif" },
  { id: "4", nom: "Fall", prenom: "Moussa", classe: "6ème A", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Moussa", parent: "Aissatou Fall", telephone: "+221 77 456 7890", moyenne: 11.5, tauxPresence: 85, statut: "actif" },
  { id: "5", nom: "Ba", prenom: "Mariama", classe: "6ème A", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariama", parent: "Cheikh Ba", telephone: "+221 77 567 8901", moyenne: 14.8, tauxPresence: 96, statut: "actif" },
  { id: "6", nom: "Sy", prenom: "Ibrahima", classe: "5ème B", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahima", parent: "Awa Sy", telephone: "+221 77 678 9012", moyenne: 13.2, tauxPresence: 94, statut: "actif" },
  { id: "7", nom: "Kane", prenom: "Aissatou", classe: "5ème B", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aissatou", parent: "Oumar Kane", telephone: "+221 77 789 0123", moyenne: 15.0, tauxPresence: 98, statut: "actif" },
  { id: "8", nom: "Gueye", prenom: "Modou", classe: "4ème A", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Modou", parent: "Ndèye Gueye", telephone: "+221 77 890 1234", moyenne: 10.5, tauxPresence: 88, statut: "actif" },
  { id: "9", nom: "Faye", prenom: "Coumba", classe: "4ème A", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Coumba", parent: "Pape Faye", telephone: "+221 77 901 2345", moyenne: 14.2, tauxPresence: 95, statut: "actif" },
  { id: "10", nom: "Diallo", prenom: "Abdou", classe: "3ème B", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abdou", parent: "Mame Diallo", telephone: "+221 77 012 3456", moyenne: 16.8, tauxPresence: 99, statut: "actif" },
];

export const teacherPresenceData = [
  { id: "1", date: new Date("2025-01-10"), classe: "6ème A", validee: true, presents: 30, absents: 1, retards: 1, total: 32 },
  { id: "2", date: new Date("2025-01-10"), classe: "5ème B", validee: true, presents: 28, absents: 2, retards: 0, total: 30 },
  { id: "3", date: new Date("2025-01-09"), classe: "4ème A", validee: true, presents: 32, absents: 1, retards: 1, total: 34 },
  { id: "4", date: new Date("2025-01-09"), classe: "3ème B", validee: true, presents: 31, absents: 0, retards: 1, total: 32 },
  { id: "5", date: new Date("2025-01-08"), classe: "6ème A", validee: false, presents: 0, absents: 0, retards: 0, total: 32 },
];

export const teacherDevoirs = [
  { id: "1", titre: "Exercices sur les fractions", classe: "6ème A", matiere: "Mathématiques", description: "Faire les exercices 1 à 10 page 45", dateLimite: new Date("2025-01-15"), fichierJoint: true, statut: "actif", soumissions: 18, total: 32 },
  { id: "2", titre: "Contrôle sur les équations", classe: "5ème B", matiere: "Mathématiques", description: "Réviser le chapitre 3 pour le contrôle", dateLimite: new Date("2025-01-18"), fichierJoint: false, statut: "actif", soumissions: 25, total: 30 },
  { id: "3", titre: "DM - Géométrie", classe: "4ème A", matiere: "Mathématiques", description: "Devoir maison sur les triangles", dateLimite: new Date("2025-01-20"), fichierJoint: true, statut: "brouillon", soumissions: 0, total: 34 },
  { id: "4", titre: "Exercices algèbre", classe: "3ème B", matiere: "Mathématiques", description: "Résoudre les systèmes d'équations", dateLimite: new Date("2025-01-12"), fichierJoint: false, statut: "termine", soumissions: 32, total: 32 },
  { id: "5", titre: "Préparation brevet", classe: "3ème B", matiere: "Mathématiques", description: "Annales 2024 - Sujet 1", dateLimite: new Date("2025-01-25"), fichierJoint: true, statut: "actif", soumissions: 10, total: 32 },
];

export const teacherNotes = [
  { id: "1", eleve: "Aminata Diop", classe: "6ème A", evaluation: "Contrôle 1", date: new Date("2025-01-05"), note: 16, coefficient: 2, commentaire: "Excellent travail" },
  { id: "2", eleve: "Ousmane Ndiaye", classe: "6ème A", evaluation: "Contrôle 1", date: new Date("2025-01-05"), note: 12, coefficient: 2, commentaire: "Peut mieux faire" },
  { id: "3", eleve: "Fatou Sow", classe: "6ème A", evaluation: "Contrôle 1", date: new Date("2025-01-05"), note: 18, coefficient: 2, commentaire: "Parfait" },
  { id: "4", eleve: "Moussa Fall", classe: "6ème A", evaluation: "Contrôle 1", date: new Date("2025-01-05"), note: 8, coefficient: 2, commentaire: "Insuffisant, revoir les bases" },
  { id: "5", eleve: "Mariama Ba", classe: "6ème A", evaluation: "Contrôle 1", date: new Date("2025-01-05"), note: 15, coefficient: 2, commentaire: "Bon travail" },
];

export const teacherEvaluations = [
  { id: "1", nom: "Contrôle 1", classe: "6ème A", date: new Date("2025-01-05"), type: "Contrôle", coefficient: 2, moyenne: 13.8 },
  { id: "2", nom: "Interro 1", classe: "6ème A", date: new Date("2024-12-15"), type: "Interrogation", coefficient: 1, moyenne: 12.5 },
  { id: "3", nom: "DM 1", classe: "6ème A", date: new Date("2024-12-10"), type: "Devoir Maison", coefficient: 1, moyenne: 14.2 },
  { id: "4", nom: "Contrôle 2", classe: "5ème B", date: new Date("2025-01-08"), type: "Contrôle", coefficient: 2, moyenne: 11.9 },
];

export const teacherMessages = [
  { id: "1", expediteur: "Mamadou Diop", role: "Parent de Aminata", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mamadou", sujet: "Absence prévue", contenu: "Bonjour M. Diallo, je vous informe que Aminata sera absente le 15 janvier pour un rendez-vous médical.", date: new Date("2025-01-10T09:30:00"), lu: false, repondu: false },
  { id: "2", expediteur: "Fatou Ndiaye", role: "Parent de Ousmane", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FatouN", sujet: "Demande de rendez-vous", contenu: "Je souhaiterais vous rencontrer pour discuter des progrès d'Ousmane.", date: new Date("2025-01-09T14:15:00"), lu: false, repondu: false },
  { id: "3", expediteur: "Aissatou Fall", role: "Parent de Moussa", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AissatouF", sujet: "Difficultés en mathématiques", contenu: "Moussa rencontre des difficultés. Y a-t-il des cours de soutien disponibles ?", date: new Date("2025-01-08T16:45:00"), lu: true, repondu: true },
  { id: "4", expediteur: "Direction", role: "Administration", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin", sujet: "Réunion pédagogique", contenu: "Rappel : réunion pédagogique le 20 janvier à 14h en salle des professeurs.", date: new Date("2025-01-07T10:00:00"), lu: true, repondu: false },
];

export const teacherAnnonces = [
  { id: "1", titre: "Contrôle de mathématiques", contenu: "Le contrôle sur les fractions aura lieu le 18 janvier. Révisez bien le chapitre 4.", classe: "6ème A", priorite: "haute", date: new Date("2025-01-10"), publiee: true },
  { id: "2", titre: "Changement de salle", contenu: "Les cours de mathématiques auront lieu en salle 105 cette semaine.", classe: "Toutes les classes", priorite: "normale", date: new Date("2025-01-09"), publiee: true },
  { id: "3", titre: "Matériel nécessaire", contenu: "N'oubliez pas d'apporter votre compas et votre équerre pour le prochain cours.", classe: "4ème A", priorite: "normale", date: new Date("2025-01-08"), publiee: true },
];

export const teacherGalerie = [
  { id: "1", titre: "Olympiades de Mathématiques", classe: "3ème B", date: new Date("2025-01-05"), photos: 12, description: "Participation aux olympiades régionales", statut: "publie" },
  { id: "2", titre: "Travaux de groupe", classe: "6ème A", date: new Date("2024-12-20"), photos: 8, description: "Résolution collaborative de problèmes", statut: "publie" },
  { id: "3", titre: "Sortie pédagogique", classe: "5ème B", date: new Date("2024-12-15"), photos: 24, description: "Visite au musée des sciences", statut: "brouillon" },
];

export const teacherRetraits = [
  { id: "1", eleve: "Aminata Diop", classe: "6ème A", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aminata", personneAutorisee: "Mamadou Diop", relation: "Père", qrCode: "QR-2025-001", validite: "Permanent", statut: "valide", heure: "16:30" },
  { id: "2", eleve: "Ousmane Ndiaye", classe: "6ème A", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ousmane", personneAutorisee: "Awa Ndiaye", relation: "Grand-mère", qrCode: "QR-2025-002", validite: "10/01/2025 - 15/01/2025", statut: "valide", heure: "17:00" },
  { id: "3", eleve: "Fatou Sow", classe: "6ème A", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=FatouS", personneAutorisee: "Ibrahima Sow", relation: "Père", qrCode: "QR-2025-003", validite: "Permanent", statut: "valide", heure: null },
];

export const teacherHistoriqueRetraits = [
  { id: "1", eleve: "Aminata Diop", date: new Date("2025-01-10T16:35:00"), retirePar: "Mamadou Diop", relation: "Père", valideePar: "M. Diallo" },
  { id: "2", eleve: "Moussa Fall", date: new Date("2025-01-10T16:45:00"), retirePar: "Aissatou Fall", relation: "Mère", valideePar: "M. Diallo" },
  { id: "3", eleve: "Ousmane Ndiaye", date: new Date("2025-01-09T17:10:00"), retirePar: "Fatou Ndiaye", relation: "Mère", valideePar: "Mme. Sow" },
];

export const teacherRappels = [
  { id: "1", titre: "Faire l'appel - 6ème A", heure: "08:00", type: "presence" },
  { id: "2", titre: "Rendre les copies - 5ème B", heure: "10:00", type: "notes" },
  { id: "3", titre: "Réunion parents - Moussa Fall", heure: "15:00", type: "reunion" },
];

export const teacherPresenceMensuelle = [
  { mois: "Sept", taux: 95 },
  { mois: "Oct", taux: 93 },
  { mois: "Nov", taux: 91 },
  { mois: "Déc", taux: 88 },
  { mois: "Jan", taux: 94 },
];

export const teacherMoyennesParClasse = [
  { classe: "6ème A", moyenne: 13.8 },
  { classe: "5ème B", moyenne: 12.5 },
  { classe: "4ème A", moyenne: 11.9 },
  { classe: "3ème B", moyenne: 14.2 },
];
