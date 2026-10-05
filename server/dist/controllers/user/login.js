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
const queries_1 = require("../../gql/user/queries");
const mutations_1 = require("../../gql/user/mutations");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
const global_1 = require("../../utils/global");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    const identifier = (((_a = req.body) === null || _a === void 0 ? void 0 : _a.email) || ((_b = req.body) === null || _b === void 0 ? void 0 : _b.phoneNumber) || '').trim();
    const { password } = req.body;
    if (!identifier || !password) {
        return res
            .status(400)
            .json({ message: 'Please provide your phone number and password!', status: 'error' });
    }
    const phone = (0, global_1.normalizeMobile)(identifier);
    const data = phone
        ? yield (0, getData_1.default)(queries_1.getUserByPhone, { phoneNumber: phone })
        : yield (0, getData_1.default)(queries_1.getUserByEmail, { email: identifier.toLowerCase() });
    if ((_c = data === null || data === void 0 ? void 0 : data.errors) === null || _c === void 0 ? void 0 : _c.length) {
        return res.status(500).json({
            status: 'error',
            message: 'Database is unavailable. Please try again later.',
        });
    }
    if (!((_e = (_d = data === null || data === void 0 ? void 0 : data.data) === null || _d === void 0 ? void 0 : _d.users) === null || _e === void 0 ? void 0 : _e.length)) {
        return res
            .status(400)
            .json({ status: 'error', message: 'User does not exists!' });
    }
    const user = data.data.users[0];
    const decryptedPass = yield (0, bcrypt_1.compare)(password, user === null || user === void 0 ? void 0 : user.password);
    if (!decryptedPass) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid Credentials',
        });
    }
    if (!user.isVerified) {
        return res.status(401).json({
            status: 'error',
            message: 'Email is not verified. Please follow instructions sent on mail',
        });
    }
    if (!user.isAdminVerified) {
        return res.status(403).json({
            status: 'error',
            message: 'Your account is not verified yet. Please contact your admin for more details.',
        });
    }
    let userToSend = JSON.parse(JSON.stringify(user));
    userToSend === null || userToSend === void 0 ? true : delete userToSend.password;
    const tokenObj = {
        id: user === null || user === void 0 ? void 0 : user.id,
        email: user === null || user === void 0 ? void 0 : user.email,
        phoneNumber: user === null || user === void 0 ? void 0 : user.phoneNumber,
        isAdmin: user === null || user === void 0 ? void 0 : user.isAdmin
    };
    const token = jsonwebtoken_1.default.sign(tokenObj, process.env.JWT_SECRET_KEY || '', {
        expiresIn: '24h'
    });
    const updateUserStatus = (user === null || user === void 0 ? void 0 : user.email)
        ? yield (0, getData_1.default)(mutations_1.updateStatus, { email: user.email, isLoggedIn: token })
        : yield (0, getData_1.default)(mutations_1.updateStatusById, { id: user.id, isLoggedIn: token });
    userToSend = Object.assign(Object.assign({}, userToSend), { key: token });
    if ((_g = (_f = updateUserStatus === null || updateUserStatus === void 0 ? void 0 : updateUserStatus.data) === null || _f === void 0 ? void 0 : _f.update_users) === null || _g === void 0 ? void 0 : _g.affected_rows) {
        return res.status(200).json({ status: 'success', user: userToSend });
    }
    return res.status(400).json({ status: 'error', message: 'Something went wrong. Please try again later!' });
});
exports.default = login;
