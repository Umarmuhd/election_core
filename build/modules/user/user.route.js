"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requireUser_1 = __importDefault(require("../../middleware/requireUser"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/', requireUser_1.default, (req, res) => {
    return res.send(res.locals.user);
});
router.post('/', user_controller_1.registerUserHandler);
router.get("/me", requireUser_1.default, user_controller_1.getCurrentUserHandler);
exports.default = router;
