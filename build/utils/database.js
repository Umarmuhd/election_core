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
exports.disconnectFromDatabase = exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("./logger"));
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING ||
    "mongodb://localhost:27017/election";
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(DB_CONNECTION_STRING);
            logger_1.default.info("Connected to database");
        }
        catch (e) {
            logger_1.default.error(e, "Failed to connect to database. Goodbye");
            process.exit(1);
        }
    });
}
exports.connectToDatabase = connectToDatabase;
function disconnectFromDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
        logger_1.default.info("Disconnect from database");
        return;
    });
}
exports.disconnectFromDatabase = disconnectFromDatabase;
