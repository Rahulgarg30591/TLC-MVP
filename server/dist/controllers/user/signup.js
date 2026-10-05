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
const crypto_js_1 = __importDefault(require("crypto-js"));
const getData_1 = __importDefault(require("../../utils/getData"));
const mutations_1 = require("../../gql/user/mutations");
const generateMail_1 = __importDefault(require("../../utils/generateMail"));
const nodeMailer_1 = __importDefault(require("../../utils/nodeMailer"));
const global_1 = require("../../utils/global");
const bcrypt_1 = require("bcrypt");
const accountExistsMessage = (message) => {
    const msg = message || '';
    if (msg.includes('users_phoneNumber_key')) {
        return 'An account with this phone number already exists';
    }
    if (msg.includes('users_email_key')) {
        return 'An account with this email already exists';
    }
    return msg;
};
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const mutation = mutations_1.InsertUserMutation;
    const phoneNumber = (0, global_1.normalizeMobile)((_a = req.body) === null || _a === void 0 ? void 0 : _a.phoneNumber);
    if (!phoneNumber) {
        return res.status(400).json({
            status: 'error',
            message: 'Please provide a valid 10-digit mobile number',
        });
    }
    const emailRaw = (((_b = req.body) === null || _b === void 0 ? void 0 : _b.email) || '').trim();
    const email = emailRaw ? emailRaw.toLowerCase() : null;
    if (emailRaw && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw)) {
        return res.status(400).json({
            status: 'error',
            message: 'Please provide a valid email',
        });
    }
    const encryptPass = yield (0, bcrypt_1.hash)(req.body.password, 12);
    let token = email
        ? crypto_js_1.default.AES.encrypt(email, process.env.CRYPTO_TICKET || '').toString()
        : '';
    const variables = Object.assign(Object.assign({}, req.body), { name: (0, global_1.capitaliseStr)(req.body.name), state: (0, global_1.capitaliseStr)(req.body.state), location: (0, global_1.capitaliseStr)(req.body.location), city: (0, global_1.capitaliseStr)(req.body.city), email,
        phoneNumber, dob: (0, global_1.formatDate)(req.body.dob), password: encryptPass, isVerified: !email, token });
    if (!email) {
        const created = yield (0, getData_1.default)(mutation, variables);
        if (created === null || created === void 0 ? void 0 : created.errors) {
            return res.status(400).json({
                status: 'error',
                message: accountExistsMessage((_c = created.errors[0]) === null || _c === void 0 ? void 0 : _c.message),
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Account created. An admin needs to approve it before you can sign in.',
        });
    }
    const data = yield (0, getData_1.default)(mutation, variables);
    if (!data.errors) {
        const mailOptions = {
            from: 'infotech@thelastcentre.com',
            to: req.body.email,
            subject: 'Verification of TLC Email',
            text: '',
            html: (0, generateMail_1.default)(`https://tlc-mvp-server.vercel.app/user/verifyUser?token=${variables.token}`, (0, global_1.capitaliseStr)(req.body.name)),
        };
        nodeMailer_1.default.sendMail(mailOptions, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (!err) {
                return res.status(200).json({
                    status: 'success',
                    message: 'Mail sent successfully!',
                });
            }
            yield (0, getData_1.default)(mutations_1.DeleteUserByEmail, {
                email: req.body.email,
            });
            return res.status(400).json({
                status: 'error',
                message: 'Something went wrong, Please try again!',
            });
        }));
        return;
    }
    return res.status(400).json({
        status: 'error',
        message: accountExistsMessage((_d = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _d === void 0 ? void 0 : _d.message),
    });
});
exports.default = signup;
