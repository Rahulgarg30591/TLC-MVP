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
const global_1 = require("../../utils/global");
const getData_1 = __importDefault(require("../../utils/getData"));
const mutations_1 = require("../../gql/user/mutations");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const id = Number((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!(token === null || token === void 0 ? void 0 : token.id) || Number(token.id) !== id) {
        return res.status(403).json({
            status: 'error',
            message: 'You are not allowed to update user details!'
        });
    }
    const variables = Object.assign(Object.assign({}, req === null || req === void 0 ? void 0 : req.body), { id, name: (0, global_1.capitaliseStr)(req.body.name), state: (0, global_1.capitaliseStr)(req.body.state), location: (0, global_1.capitaliseStr)(req.body.location), city: (0, global_1.capitaliseStr)(req.body.city), dob: (0, global_1.formatDate)(req.body.dob) });
    const data = yield (0, getData_1.default)(mutations_1.updateUserById, variables);
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_b = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _b === void 0 ? void 0 : _b.message,
        });
    }
    if (!((_d = (_c = data === null || data === void 0 ? void 0 : data.data) === null || _c === void 0 ? void 0 : _c.update_users) === null || _d === void 0 ? void 0 : _d.affected_rows)) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found!',
        });
    }
    return res.status(200).json({
        status: 'success',
        message: 'User updated successfully!'
    });
});
exports.default = updateUser;
