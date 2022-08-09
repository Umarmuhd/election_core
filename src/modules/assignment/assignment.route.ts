import express from "express";
import multer from "multer";
import requireLecturer from "../../middleware/requireLecturer";
import requireUser from "../../middleware/requireUser";
import {
  createAssignmentHandler, deleteAssignmentHandler, getAllUserAssignmentHandler, getSingleAssignmentHandler
} from "./assignmnet.controller";
const router = express.Router();

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const file = multer({ storage: imageStorage }).single("file");

router.post("/", [requireUser], createAssignmentHandler);
router.get("/", getAllUserAssignmentHandler);
router.get("/:assignment_Id", requireUser, getSingleAssignmentHandler);
router.delete("/:assignment_Id_Id", requireUser, deleteAssignmentHandler);


export default router;
