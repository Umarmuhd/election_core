"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const requireUser_1 = __importDefault(require("../../middleware/requireUser"));
const assignmnet_controller_1 = require("./assignmnet.controller");
const router = express_1.default.Router();
const imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
const file = (0, multer_1.default)({ storage: imageStorage }).single("file");
router.post("/", [requireUser_1.default], assignmnet_controller_1.createAssignmentHandler);
router.get("/", assignmnet_controller_1.getAllUserAssignmentHandler);
router.get("/:assignment_Id", requireUser_1.default, assignmnet_controller_1.getSingleAssignmentHandler);
router.delete("/:assignment_Id_Id", requireUser_1.default, assignmnet_controller_1.deleteAssignmentHandler);
exports.default = router;
