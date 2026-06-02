import { Router } from "express";
import {
  createExam,
  createSubject,
  deleteExam,
  deleteUser,
  deleteSubject,
  getMe,
  listExams,
  listSubjects,
  login,
  updateExam,
  updateProfile,
  updateSubject,
} from "../controllers/apiController.js";

const router = Router();

router.post("/auth/login", login);
router.get("/me", getMe);
router.delete("/me", deleteUser);
router.patch("/profile", updateProfile);

router.get("/subjects", listSubjects);
router.post("/subjects", createSubject);
router.patch("/subjects/:id", updateSubject);
router.delete("/subjects/:id", deleteSubject);

router.get("/exams", listExams);
router.post("/exams", createExam);
router.patch("/exams/:id", updateExam);
router.delete("/exams/:id", deleteExam);

export default router;