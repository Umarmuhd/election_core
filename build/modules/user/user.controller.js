"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserHandler = exports.registerUserHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_service_1 = require("./user.service");
function registerUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { first_name, last_name, email, password } = req.body;
        try {
            if (!first_name || !last_name || !email || !password) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: 'All fields are required',
                });
                return;
            }
            const user = yield (0, user_service_1.createUser)(Object.assign({}, req.body));
            return res
                .status(http_status_codes_1.StatusCodes.CREATED)
                .json({ success: true, message: 'User created successfully' });
        }
        catch (e) {
            console.log(e);
            if (e.code === 11000) {
                return res
                    .status(http_status_codes_1.StatusCodes.CONFLICT)
                    .json({ success: false, message: 'User already exists' });
            }
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: e.message });
        }
    });
}
exports.registerUserHandler = registerUserHandler;
function getCurrentUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user_id = res.locals.user._id;
        try {
            const user = yield (0, user_service_1.findUserById)(user_id);
            if (!user) {
                return res
                    .status(500)
                    .json({ status: "success", message: "unauthorized request" });
            }
            return res.status(200).json({
                status: "success",
                message: "user data and wallet",
                data: Object.assign({}, user),
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ status: "failed", message: error.message });
        }
    });
}
exports.getCurrentUserHandler = getCurrentUserHandler;
