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
const adminVerified = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const id = Number((_a = req.body) === null || _a === void 0 ? void 0 : _a.id);
    const isAdmin = ((_b = req.body) === null || _b === void 0 ? void 0 : _b.isAdmin) === true || ((_c = req.body) === null || _c === void 0 ? void 0 : _c.isAdmin) === 'true';
    const variables = {
        id,
        isAdmin,
    };
    const data = yield (0, getData_1.default)(mutations_1.updateAdminVerification, variables);
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_d = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _d === void 0 ? void 0 : _d.message
        });
    }
    if ((_f = (_e = data === null || data === void 0 ? void 0 : data.data) === null || _e === void 0 ? void 0 : _e.update_users) === null || _f === void 0 ? void 0 : _f.affected_rows) {
        return res.status(200).json({
            status: 'success',
            message: 'User verified successfully!'
        });
    }
    return res.status(400).json({
        status: 'error',
        message: 'User already verified!'
    });
});
exports.default = adminVerified;
