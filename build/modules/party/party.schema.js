"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePartySchema = void 0;
const zod_1 = require("zod");
exports.updatePartySchema = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)(),
        votes: (0, zod_1.number)(),
        candidate: (0, zod_1.string)(),
    }),
    params: (0, zod_1.object)({
        Party_Id: (0, zod_1.string)(),
    }),
};
