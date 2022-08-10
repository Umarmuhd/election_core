"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const { RAPYD_SALT_LENGTH } = process.env;
exports.default = () => {
    try {
        return crypto_1.default.randomBytes(Number(RAPYD_SALT_LENGTH)).toString('hex');
    }
    catch (error) {
        console.error('Error generating salt');
        throw error;
    }
};
