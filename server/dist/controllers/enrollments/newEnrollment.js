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
const mutations_1 = require("../../gql/enrollments/mutations");
const newEnrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const mobile_number = (0, global_1.normalizeMobile)((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.mobile_number);
    if (!mobile_number) {
        return res.status(400).json({
            status: 'error',
            message: 'Please provide a valid 10-digit mobile number',
        });
    }
    const emailRaw = (((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.email) || '').trim();
    const children = (_d = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.children) === null || _d === void 0 ? void 0 : _d.map((child) => {
        return {
            dob: (0, global_1.formatDate)(child.dob),
            gender: child.gender,
            name: (0, global_1.capitaliseStr)(child.name)
        };
    });
    const variables = Object.assign(Object.assign({}, req === null || req === void 0 ? void 0 : req.body), { mobile_number, enrolled_by: (_f = (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.enrolled_by) === null || _f === void 0 ? void 0 : _f.toLowerCase(), state: (0, global_1.capitaliseStr)((_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.state), name: (0, global_1.capitaliseStr)((_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.name), email: emailRaw ? emailRaw.toLowerCase() : null, children });
    const data = yield (0, getData_1.default)(mutations_1.addEnrollment, variables);
    if (data === null || data === void 0 ? void 0 : data.errors) {
        return res.status(400).json({
            status: 'error',
            message: (0, global_1.enrollmentConstraintMessage)((_j = data === null || data === void 0 ? void 0 : data.errors[0]) === null || _j === void 0 ? void 0 : _j.message)
        });
    }
    if ((_l = (_k = data === null || data === void 0 ? void 0 : data.data) === null || _k === void 0 ? void 0 : _k.insert_enrollments) === null || _l === void 0 ? void 0 : _l.affected_rows) {
        return res.status(200).json({
            status: 'success',
            message: 'Enrollment inserted successfully'
        });
    }
    return res.status(400).json({
        status: 'error',
        message: 'Something went wrong. Please try again later!'
    });
});
exports.default = newEnrollment;
