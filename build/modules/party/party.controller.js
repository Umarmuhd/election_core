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
exports.deletePartyHandler = exports.getHighestPartyHandler = exports.getAllUserPartyHandler = exports.getSinglePartyHandler = exports.createPartyHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const party_model_1 = require("./party.model");
const party_service_1 = require("./party.service");
function createPartyHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id: userId } = res.locals.user;
        const party = req.body.name;
        // const logo = req.file;
        try {
            // if (!req.file) {
            //   res
            //     .status(400)
            //     .json({ status: 'failed', message: 'Please add an image' });
            //   return;
            // }
            console.log(party);
            const existingward = yield (0, party_service_1.findUserByPartyName)(party);
            if (existingward) {
                res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
                    success: false,
                    message: 'Party Exist',
                });
                return;
            }
            console.log(userId);
            const wardvotes = yield (0, party_service_1.createParty)(Object.assign(Object.assign({}, req.body), { owner: userId }));
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                success: true,
                message: 'Result Submitted successfully!',
                data: wardvotes,
            });
        }
        catch (err) {
            console.log(err);
            return res
                .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: err.message });
        }
    });
}
exports.createPartyHandler = createPartyHandler;
function getSinglePartyHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const party_Id = req.params.party_Id;
        try {
            const basket = yield party_model_1.PartyModel.findOne({ party_Id }).populate('owner', 'first_name last_name email address');
            if (!basket) {
                return res
                    .status(400)
                    .json({ status: 'failed', message: 'Basket not found' });
            }
            return res.status(200).json({
                status: 'success',
                message: 'Basket found',
                data: {
                    basket,
                },
            });
        }
        catch (error) {
            return res.status(409).json({ status: 'failed', message: error.message });
        }
    });
}
exports.getSinglePartyHandler = getSinglePartyHandler;
function getAllUserPartyHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const party = yield party_model_1.PartyModel.find({}).sort({ votes: -1 }).limit(4);
            return res
                .status(200)
                .json({ status: 'success', message: 'Parties list', data: party });
        }
        catch (error) {
            return res.status(409).json({ status: 'failed', message: error.message });
        }
    });
}
exports.getAllUserPartyHandler = getAllUserPartyHandler;
function getHighestPartyHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const party = yield party_model_1.PartyModel.find({}).sort({ votes: -1 }).limit(1);
            return res
                .status(200)
                .json({ status: 'success', message: 'Parties list', data: party });
        }
        catch (error) {
            return res.status(409).json({ status: 'failed', message: error.message });
        }
    });
}
exports.getHighestPartyHandler = getHighestPartyHandler;
function deletePartyHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const basket_Id = req.params.Party_Id;
        try {
            const basket = yield party_model_1.PartyModel.findOneAndDelete({ basket_Id });
            if (!basket) {
                return res
                    .status(400)
                    .json({ status: 'failed', message: 'Basket not found' });
            }
            return res.status(200).json({
                status: 'success',
                message: 'Basket Deleted',
            });
        }
        catch (error) {
            return res.status(409).json({ status: 'failed', message: error.message });
        }
    });
}
exports.deletePartyHandler = deletePartyHandler;
