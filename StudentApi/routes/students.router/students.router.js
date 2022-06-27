const express=require("express");
const router=express.Router();

const studentController=require("../../controllers/students.controller");
const {authMiddleware}=require("../../middleware/auth.middleware");


router.get("/students",studentController.getAllStudents);
router.get("/students/:StudentId",authMiddleware,studentController.getStudentById);
router.post("/students",authMiddleware,studentController.newStudent);
router.put("/students/:StudentId",authMiddleware,studentController.updateStudent);
router.delete("/students/:StudentId",authMiddleware,studentController.deleteStudent);


module.exports=router;