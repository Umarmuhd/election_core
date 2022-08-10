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
exports.findUserByPartyName = exports.findParty = exports.createParty = void 0;
const party_model_1 = require("./party.model");
function createParty(input) {
    return party_model_1.PartyModel.create(input);
}
exports.createParty = createParty;
function findParty(Party_Id) {
    return party_model_1.PartyModel.findOne({ Party_Id });
}
exports.findParty = findParty;
function findUserByPartyName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return party_model_1.PartyModel.findOne({ name });
    });
}
exports.findUserByPartyName = findUserByPartyName;
// export function findBaskets() {
//   return basket_Id.find({
//     published: true,
//   }).lean();
// }
