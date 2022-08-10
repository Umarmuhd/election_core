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
exports.deleteAssignmentHandler = exports.getAllUserAssignmentHandler = exports.getSingleAssignmentHandler = exports.createAssignmentHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const assignment_model_1 = require("./assignment.model");
const assignment_service_1 = require("./assignment.service");
const party_model_1 = require("../party/party.model");
function createAssignmentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id: userId } = res.locals.user;
        const ward = req.body.ward;
        try {
            // const existingward = await findUserByWard(ward);
            // if (existingward) {
            //   res.status(StatusCodes.CONFLICT).json({
            //     success: false,
            //     message: 'This Poling Unit Have Submitted Before',
            //   });
            //   return;
            // }
            // console.log(req.body.party);
            console.log(userId);
            const wardvotes = yield (0, assignment_service_1.createAssignment)(Object.assign(Object.assign({}, req.body), { owner: userId }));
            const existingVote = yield party_model_1.PartyModel.findOne({ name: req.body.party });
            if (!existingVote) {
                res.status(400).json({ status: "failed", message: "Party Not found" });
                return;
            }
            existingVote.votes = (existingVote.votes + req.body.votes);
            yield existingVote.save();
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
exports.createAssignmentHandler = createAssignmentHandler;
function getSingleAssignmentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const basket_Id = req.params.assignment_Id;
        try {
            const basket = yield assignment_model_1.AssignmentModel.findOne({ basket_Id }).populate('owner', 'first_name last_name email address');
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
exports.getSingleAssignmentHandler = getSingleAssignmentHandler;
function getAllUserAssignmentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const votes = yield assignment_model_1.AssignmentModel.find({}).sort({ votes: -1 });
            return res
                .status(200)
                .json({ status: 'success', message: 'Votes list', data: votes });
        }
        catch (error) {
            return res.status(409).json({ status: 'failed', message: error.message });
        }
    });
}
exports.getAllUserAssignmentHandler = getAllUserAssignmentHandler;
function deleteAssignmentHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const basket_Id = req.params.assignment_Id;
        try {
            const basket = yield assignment_model_1.AssignmentModel.findOneAndDelete({ basket_Id });
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
exports.deleteAssignmentHandler = deleteAssignmentHandler;
