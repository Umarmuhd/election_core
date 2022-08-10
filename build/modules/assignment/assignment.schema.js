"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAssignmentSchema = void 0;
const zod_1 = require("zod");
exports.updateAssignmentSchema = {
    body: (0, zod_1.object)({
        ward: (0, zod_1.string)(),
        votes: (0, zod_1.number)(),
        party: (0, zod_1.string)(),
    }),
    params: (0, zod_1.object)({
        assignment_Id: (0, zod_1.string)(),
    }),
};
