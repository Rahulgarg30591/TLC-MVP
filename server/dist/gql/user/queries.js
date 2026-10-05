"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyResetQuery = exports.getUserByEmail = exports.getUserByPhone = void 0;
exports.getUserByPhone = `
  query UserByPhone($phoneNumber: String!) {
    users(where: { phoneNumber: { _eq: $phoneNumber } }) {
      id
      name
      password
      isVerified
      isAdminVerified
      gender
      phoneNumber
      email
      yearOfJoining
      location
      city
      state
      pincode
      isAdmin
      dob
    }
  }
`;
exports.getUserByEmail = `
  query MyQuery($email: String!) {
    users(where: { email: { _eq: $email } }) {
      id
      name
      password
      isVerified
      isAdminVerified
      gender
      phoneNumber
      email
      yearOfJoining
      location
      city
      state
      pincode
      isAdmin
      dob
    }
  }
`;
exports.verifyResetQuery = `
  query VerifyResetQuery($token: String!, $_eq: Boolean = true) {
    users(where: {token: {_eq: $token}, isPassToBeReset: {_eq: $_eq}}, limit: 1) {
      email
      id
      isAdminVerified
      isPassToBeReset
      isVerified
      token
      name
    }
  }
`;
