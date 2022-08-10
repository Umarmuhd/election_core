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
exports.findUserByWard = exports.findAssignment = exports.createAssignment = void 0;
const assignment_model_1 = require("./assignment.model");
function createAssignment(input) {
    return assignment_model_1.AssignmentModel.create(input);
}
exports.createAssignment = createAssignment;
function findAssignment(assignment_Id) {
    return assignment_model_1.AssignmentModel.findOne({ assignment_Id });
}
exports.findAssignment = findAssignment;
function findUserByWard(ward) {
    return __awaiter(this, void 0, void 0, function* () {
        return assignment_model_1.AssignmentModel.findOne({ ward });
    });
}
exports.findUserByWard = findUserByWard;
// export function findBaskets() {
//   return basket_Id.find({
//     published: true,
//   }).lean();
// }
