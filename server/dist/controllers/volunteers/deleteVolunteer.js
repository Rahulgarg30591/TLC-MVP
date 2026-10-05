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
const getData_1 = __importDefault(require("../../utils/getData"));
const mutations_1 = require("../../gql/volunteers/mutations");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const deleteVolunteer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { authorization } = req === null || req === void 0 ? void 0 : req.headers;
    let token;
    try {
        let authToken = authorization;
        authToken = authToken.split('Bearer ');
        authToken = authToken[1];
        token = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET_KEY || '');
    }
    catch (err) {
        return res.status(401).json({
            status: 'error',
            message: 'Token expired! Please login again.'
        });
    }
    const ids = (((_a = req.body) === null || _a === void 0 ? void 0 : _a.ids) || [])
        .map((id) => Number(id))
        .filter((id) => id && id !== Number(token === null || token === void 0 ? void 0 : token.id));
    if (!ids.length) {
        return res.status(403).json({
            status: 'error',
            message: 'You cannot delete yourself!'
        });
    }
    const data = yield (0, getData_1.default)(mutations_1.DeleteVolunteersById, { ids });
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_b = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _b === void 0 ? void 0 : _b.message
        });
    }
    if ((_d = (_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.delete_users) === null || _d === void 0 ? void 0 : _d.affected_rows) {
        const emails = (data.data.delete_users.returning || [])
            .map((row) => row.email)
            .filter(Boolean);
        if (emails.length) {
            yield (0, getData_1.default)(mutations_1.DeleteInvitationsByEmail, { emails });
        }
        return res.status(200).json({
            status: 'success',
            message: "Users deleted successfully!"
        });
    }
    return res.status(400).json({
        status: 'error',
        message: "Users you are deleting is not found at the moment. Please try again later!"
    });
});
exports.default = deleteVolunteer;
