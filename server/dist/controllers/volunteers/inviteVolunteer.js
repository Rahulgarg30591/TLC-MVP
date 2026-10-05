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
const queries_1 = require("../../gql/volunteers/queries");
const crypto_js_1 = __importDefault(require("crypto-js"));
const mutations_1 = require("../../gql/volunteers/mutations");
const global_1 = require("../../utils/global");
const generateMail_1 = __importDefault(require("../../utils/generateMail"));
const nodeMailer_1 = __importDefault(require("../../utils/nodeMailer"));
const inviteVolunteer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const name = (0, global_1.capitaliseStr)(((_a = req.body) === null || _a === void 0 ? void 0 : _a.name) || '');
    const phone = (0, global_1.normalizeMobile)(((_b = req.body) === null || _b === void 0 ? void 0 : _b.phoneNumber) || ((_c = req.body) === null || _c === void 0 ? void 0 : _c.phone));
    const emailRaw = (((_d = req.body) === null || _d === void 0 ? void 0 : _d.email) || '').trim();
    const email = emailRaw ? emailRaw.toLowerCase() : null;
    const isAdmin = ((_e = req.body) === null || _e === void 0 ? void 0 : _e.isAdmin) === true || ((_f = req.body) === null || _f === void 0 ? void 0 : _f.isAdmin) === 'true';
    if (!name || name.length < 3) {
        return res.status(400).json({
            status: 'error',
            message: 'Name must be at least 3 characters long',
        });
    }
    if (!phone) {
        return res.status(400).json({
            status: 'error',
            message: 'Please provide a valid 10-digit mobile number',
        });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({
            status: 'error',
            message: 'Please provide a valid email',
        });
    }
    const existing = yield (0, getData_1.default)(queries_1.checkPhoneAvailability, { phoneNumber: phone });
    if (existing === null || existing === void 0 ? void 0 : existing.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_g = existing.errors[0]) === null || _g === void 0 ? void 0 : _g.message,
        });
    }
    if ((_j = (_h = existing === null || existing === void 0 ? void 0 : existing.data) === null || _h === void 0 ? void 0 : _h.users) === null || _j === void 0 ? void 0 : _j.length) {
        return res.status(400).json({
            status: 'error',
            message: 'This phone number is already registered',
        });
    }
    if ((_l = (_k = existing === null || existing === void 0 ? void 0 : existing.data) === null || _k === void 0 ? void 0 : _k.Invitations) === null || _l === void 0 ? void 0 : _l.length) {
        return res.status(400).json({
            status: 'error',
            message: 'An invitation is already waiting for this phone number',
        });
    }
    const token = crypto_js_1.default.AES.encrypt(phone, process.env.CRYPTO_TICKET || '').toString();
    const created = yield (0, getData_1.default)(mutations_1.newInvite, {
        name,
        email,
        phone_number: phone,
        token,
        isAdmin,
    });
    if (created === null || created === void 0 ? void 0 : created.errors) {
        return res.status(400).json({
            status: 'error',
            message: (_m = created.errors[0]) === null || _m === void 0 ? void 0 : _m.message,
        });
    }
    const signupPath = `/signup?ticket=${encodeURIComponent(token)}&phone=${phone}`;
    if (email) {
        const mailOptions = {
            from: 'infotech@thelastcentre.com',
            to: email,
            subject: 'TLC Invitation',
            text: '',
            html: (0, generateMail_1.default)(`https://tlc-mvp-app.vercel.app${signupPath}`, name, 'Accept Invitation', 'TLC invites you to join. You will sign up with your phone number.'),
        };
        nodeMailer_1.default.sendMail(mailOptions, () => { });
    }
    return res.status(200).json({
        status: 'success',
        message: email
            ? 'Invitation ready. Share the phone signup link. A copy was also emailed.'
            : 'Invitation ready. Share this phone signup link.',
        signupPath,
        phone,
    });
});
exports.default = inviteVolunteer;
