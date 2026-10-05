"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupInvitation = exports.resendInvite = exports.deleteInvite = exports.newInvite = exports.updateAdminVerification = exports.DeleteInvitationsByEmail = exports.DeleteVolunteersById = exports.UpdateVolunteerRoleById = void 0;
exports.UpdateVolunteerRoleById = `
  mutation UpdateById($id: Int!, $isAdmin: Boolean!) {
    update_users(where: {id: {_eq: $id}, isAdminVerified: {_eq: true}, isVerified: {_eq: true}}, _set: {isAdmin: $isAdmin}) {
      affected_rows
    }
  }
`;
exports.DeleteVolunteersById = `
  mutation DeleteVolunteersById($ids: [Int!]!) {
    delete_users(where: {id: {_in: $ids}, isVerified: {_eq: true}}) {
      affected_rows
      returning {
        email
      }
    }
  }
`;
exports.DeleteInvitationsByEmail = `
  mutation DeleteInvitationsByEmail($emails: [String!]!) {
    delete_Invitations(where: {email: {_in: $emails}}) {
      affected_rows
    }
  }
`;
exports.updateAdminVerification = `
  mutation UpdateAdminVerification($id: Int!, $isAdmin: Boolean!) {
    update_users(where: {id: {_eq: $id}, isVerified: {_eq: true}, isAdminVerified: {_eq: false}}, _set: {isAdmin: $isAdmin, isAdminVerified: true}) {
      affected_rows
    }
  }
`;
exports.newInvite = `
  mutation NewInvite($isAccepted: Boolean = false, $isAdmin: Boolean = false, $name: String!, $token: String!, $email: String, $phone_number: String!, $created_at: timestamptz = "now()") {
    insert_Invitations(objects: {isAccepted: $isAccepted, isAdmin: $isAdmin, name: $name, token: $token, email: $email, phone_number: $phone_number, created_at: $created_at}) {
      affected_rows
    }
  }
`;
exports.deleteInvite = `
  mutation DeleteInvitation($email: String!, $token: String!) {
    delete_Invitations(where: {email: {_eq: $email}, token: {_eq: $token}}) {
      affected_rows
    }
  }
`;
exports.resendInvite = `
  mutation ResendInvite($email: String!, $created_at: timestamptz = "now()", $token: String!) {
    update_Invitations(where: {email: {_eq: $email}, isAccepted: {_eq: false}}, _set: {created_at: $created_at, token: $token}) {
      affected_rows
    }
  }
`;
exports.signupInvitation = `
  mutation SignupInvitation($inviteToken: String!, $email: String, $token: String, $isAccepted: Boolean!, $city: String!, $dob: date!, $gender: String!, $isAdmin: Boolean!, $isAdminVerified: Boolean!, $isVerified: Boolean!, $location: String!, $name: String!, $password: String!, $phoneNumber: String!, $pincode: Int!, $state: String!, $yearOfJoining: Int!) {
    update_Invitations(where: {token: {_eq: $inviteToken}}, _set: {token: $token, isAccepted: $isAccepted}) {
      affected_rows
    }
    insert_users(objects: {city: $city, dob: $dob, email: $email, gender: $gender, isAdmin: $isAdmin, isAdminVerified: $isAdminVerified, isVerified: $isVerified, location: $location, name: $name, password: $password, phoneNumber: $phoneNumber, pincode: $pincode, state: $state, token: $token, yearOfJoining: $yearOfJoining}) {
      affected_rows
    }
  }
`;
