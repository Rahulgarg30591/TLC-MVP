"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyVolunteerInvite = exports.checkEmailAvailability = exports.checkPhoneAvailability = exports.VolunteerById = exports.searchAndFilterVolunteers = exports.filterVolunteersQuery = exports.getVolunteers = void 0;
exports.getVolunteers = `
  query Volunteers($offset: Int!, $limit: Int!) {
    users(offset: $offset, limit: $limit, where: {isVerified: {_eq: true}}, order_by: {id: desc}) {
      id
      gender
      email
      dob
      city
      isAdmin
      isAdminVerified
      location
      name
      phoneNumber
      pincode
      state
      yearOfJoining
    }
    users_aggregate(where: {isVerified: {_eq: true}}) {
      aggregate {
        count
      }
    }
  }
`;
exports.filterVolunteersQuery = `
  query filterVolunteersQuery($where: users_bool_exp = {}, $offset: Int!, $limit: Int!, $order_by: [users_order_by!]) {
    users(where: $where, offset: $offset, limit: $limit, order_by: $order_by){
      id
      gender
      email
      dob
      city
      isAdmin
      isAdminVerified
      location
      name
      phoneNumber
      pincode
      state
      yearOfJoining
    }
    users_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
exports.searchAndFilterVolunteers = `
  query SearchAndFilter($where: users_bool_exp = {}, $offset: Int!, $limit: Int!, $order_by: [users_order_by!]) {
    users(where: $where, offset: $offset, limit: $limit, order_by: $order_by) {
      id
      gender
      email
      dob
      city
      isAdmin
      isAdminVerified
      location
      name
      phoneNumber
      pincode
      state
      yearOfJoining
    }
    users_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
exports.VolunteerById = `
  query VolunteerById($id: Int!, $isVerified: Boolean = true) {
    users(where: {id: {_eq: $id}, isVerified: {_eq: $isVerified}}) {
      id
      gender
      email
      dob
      city
      isAdmin
      isAdminVerified
      location
      name
      phoneNumber
      pincode
      state
      yearOfJoining
      workshop_volunteers {
        workshop {
          concluding_date
          end_date
          id
          start_date
          types
          venue
          venue_city
        }
      }
      workshop_lead_volunteers {
        workshop {
          concluding_date
          end_date
          id
          start_date
          types
          venue
          venue_city
        }
      }
      meetings_volunteers {
        meeting {
          date
          id
          type
          venue
          venue_city
        }
      }
    }
  }
`;
exports.checkPhoneAvailability = `
  query CheckPhone($phoneNumber: String!) {
    users(where: {phoneNumber: {_eq: $phoneNumber}}) {
      id
      phoneNumber
    }
    Invitations(where: {phone_number: {_eq: $phoneNumber}, isAccepted: {_eq: false}}) {
      phone_number
      name
    }
  }
`;
exports.checkEmailAvailability = `
  query checkEmailAvailability($email: String!) {
    users(where: {email: {_eq: $email}}) {
      email
      name
    }
    Invitations(where: {email: {_eq: $email}}) {
      name
      email
      isAccepted
      created_at
    }
  }
`;
exports.verifyVolunteerInvite = `
  query VerifyInvite($token: String!, $isAccepted: Boolean = false) {
    Invitations(where: {token: {_eq: $token}, isAccepted: {_eq: $isAccepted}}) {
      created_at
      email
      phone_number
      isAdmin
    }
  }
`;
