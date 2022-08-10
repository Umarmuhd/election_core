"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const requireUser_1 = __importDefault(require("../../middleware/requireUser"));
const party_controller_1 = require("./party.controller");
const router = express_1.default.Router();
const imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
const logo = (0, multer_1.default)({ storage: imageStorage }).single("logo");
router.post("/", [requireUser_1.default], party_controller_1.createPartyHandler);
router.get("/", party_controller_1.getAllUserPartyHandler);
router.get("/high", party_controller_1.getHighestPartyHandler);
router.get("/:Party_Id", requireUser_1.default, party_controller_1.getSinglePartyHandler);
router.delete("/:Party_Id", requireUser_1.default, party_controller_1.deletePartyHandler);
exports.default = router;
