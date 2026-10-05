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
const queries_1 = require("../../gql/volunteers/queries");
const mutations_1 = require("../../gql/volunteers/mutations");
const bcrypt_1 = require("bcrypt");
const inviteSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (req.body.token && req.body.token !== 'null' && req.body.token !== 'NULL') {
        const inviteResult = yield (0, getData_1.default)(queries_1.verifyVolunteerInvite, { token: req.body.token });
        if (inviteResult === null || inviteResult === void 0 ? void 0 : inviteResult.errors) {
            return res.status(400).json({
                status: 'error',
                message: (_a = inviteResult === null || inviteResult === void 0 ? void 0 : inviteResult.errors[0]) === null || _a === void 0 ? void 0 : _a.message
            });
        }
        const invite = (_c = (_b = inviteResult === null || inviteResult === void 0 ? void 0 : inviteResult.data) === null || _b === void 0 ? void 0 : _b.Invitations) === null || _c === void 0 ? void 0 : _c[0];
        if (!invite) {
            return res.status(404).json({
                status: 'error',
                message: "Invitation doesn't exist."
            });
        }
        const phone = (0, global_1.normalizeMobile)(req.body.phoneNumber);
        const emailRaw = (req.body.email || '').replace('%40', '@').trim();
        const email = emailRaw ? emailRaw.toLowerCase() : null;
        if (invite.phone_number && invite.phone_number !== phone) {
            return res.status(404).json({
                status: 'error',
                message: "This invitation is for a different phone number."
            });
        }
        if (!invite.phone_number && invite.email && invite.email !== email) {
            return res.status(404).json({
                status: 'error',
                message: "Invitation doesn't exist for the given email."
            });
        }
        if (!phone) {
            return res.status(400).json({
                status: 'error',
                message: 'Please provide a valid 10-digit mobile number',
            });
        }
        const encryptPass = yield (0, bcrypt_1.hash)(req.body.password, 12);
        const variables = Object.assign(Object.assign({}, req.body), { inviteToken: req.body.token, isAdmin: invite.isAdmin, name: (0, global_1.capitaliseStr)(req.body.name), state: (0, global_1.capitaliseStr)(req.body.state), location: (0, global_1.capitaliseStr)(req.body.location), city: (0, global_1.capitaliseStr)(req.body.city), email, phoneNumber: phone, dob: (0, global_1.formatDate)(req.body.dob), password: encryptPass, isAdminVerified: true, isVerified: true, token: null, isAccepted: true });
        const data = yield (0, getData_1.default)(mutations_1.signupInvitation, variables);
        if (data === null || data === void 0 ? void 0 : data.errors) {
            return res.status(400).json({
                status: 'error',
                message: (_d = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _d === void 0 ? void 0 : _d.message
            });
        }
        if (((_f = (_e = data === null || data === void 0 ? void 0 : data.data) === null || _e === void 0 ? void 0 : _e.update_Invitations) === null || _f === void 0 ? void 0 : _f.affected_rows) && ((_h = (_g = data === null || data === void 0 ? void 0 : data.data) === null || _g === void 0 ? void 0 : _g.insert_users) === null || _h === void 0 ? void 0 : _h.affected_rows)) {
            return res.status(200).json({
                status: 'success',
                message: "User registered successfully!"
            });
        }
        return res.status(400).json({
            status: 'error',
            message: "Something went wrong. Please try again later!"
        });
    }
    return res.status(400).json({
        status: 'error',
        message: "Invalid Invitation!"
    });
});
exports.default = inviteSignup;
