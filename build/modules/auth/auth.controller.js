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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const omit_1 = __importDefault(require("../../helpers/omit"));
const user_service_1 = require("../user/user.service");
const auth_utils_1 = require("./auth.utils");
function loginHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email || !password) {
            res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ success: false, message: 'Email and password are required' });
            return;
        }
        const user = yield (0, user_service_1.findUserByEmail)(email);
        if (!user) {
            res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ success: false, message: 'Invalid login credentials' });
            return;
        }
        const isValid = yield user.comparePassword(password);
        if (!isValid) {
            return res
                .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
                .json({ success: false, message: 'Invalid login credentials' });
        }
        const payload = (0, omit_1.default)(user.toJSON(), ['password', '__v']);
        const accessToken = (0, auth_utils_1.signJwt)(payload);
        res.cookie('accessToken', accessToken, {
            maxAge: 3.154e10,
            httpOnly: true,
            domain: process.env.NODE_ENV !== "production" ? "localhost" : "escroww.africa",
            path: "/",
            sameSite: 'strict',
            secure: false,
        });
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ success: true, message: 'login success!', accessToken, user });
    });
}
exports.loginHandler = loginHandler;
