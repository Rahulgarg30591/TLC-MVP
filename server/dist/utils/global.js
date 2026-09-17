"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollmentConstraintMessage = exports.normalizeMobile = exports.formatDate = exports.capitaliseStr = void 0;
const capitaliseStr = (str) => {
    let s = str.trim().split('');
    let ans = '';
    for (let i = 0; i < s.length; i++) {
        if (i === 0 || s[i - 1] === ' ') {
            s[i] = s[i].toUpperCase();
        }
        else {
            s[i] = s[i].toLowerCase();
        }
        ans += s[i];
    }
    return ans;
};
exports.capitaliseStr = capitaliseStr;
const formatDate = (date) => {
    return new Date(date).toISOString();
};
exports.formatDate = formatDate;
/** Indian 10-digit mobile. Strips spaces, dashes, and a leading 91 / +91. */
const normalizeMobile = (value) => {
    if (!value)
        return null;
    let digits = String(value).replace(/\D/g, '');
    if (digits.startsWith('91') && digits.length === 12) {
        digits = digits.slice(2);
    }
    if (/^[6-9]\d{9}$/.test(digits))
        return digits;
    return null;
};
exports.normalizeMobile = normalizeMobile;
const enrollmentConstraintMessage = (message) => {
    const msg = message || '';
    if (msg.includes('enrollments_mobile_number_key')) {
        return 'Enrollment with this phone number already exists';
    }
    if (msg.includes('enrollments_email_key')) {
        return 'Enrollment with this email already exists';
    }
    if (msg.includes('Uniqueness violation')) {
        return 'Enrollment already exists';
    }
    return msg;
};
exports.enrollmentConstraintMessage = enrollmentConstraintMessage;
