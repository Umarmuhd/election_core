import express from "express";
import multer from "multer";
import requireLecturer from "../../middleware/requireLecturer";
import requireUser from "../../middleware/requireUser";
import {
  createPartyHandler, deletePartyHandler, getAllUserPartyHandler, getHighestPartyHandler, getSinglePartyHandler
} from "./party.controller";
const router = express.Router();

const imageStorage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const logo = multer({ storage: imageStorage }).single("logo");

router.post("/", [requireUser], createPartyHandler);
router.get("/", getAllUserPartyHandler);
router.get("/high", getHighestPartyHandler);
router.get("/:Party_Id", requireUser, getSinglePartyHandler);
router.delete("/:Party_Id", requireUser, deletePartyHandler);


export default router;
