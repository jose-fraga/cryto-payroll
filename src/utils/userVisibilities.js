import { USER_TYPE } from "./constants";

export function onlyAdmins(userTypes) {
  if (!userTypes) {
    return false;
  }

  return userTypes.includes(USER_TYPE.ADMIN)
}

export function onlyCustomers(userTypes) {
  if (!userTypes) {
    return false;
  }

  return userTypes.includes(USER_TYPE.CUSTOMER)
}

export function onlyCompanies(userTypes) {
  if (!userTypes) {
    return false;
  }

  return userTypes.includes(USER_TYPE.COMPANY)
}

export function onlyInfluencers(userTypes) {
  if (!userTypes) {
    return false;
  }

  return userTypes.includes(USER_TYPE.INFLUENCER)
}

export function onlyCompaniesAndInfluencers(userTypes) {
  if (!userTypes) {
    return false;
  }

  return onlyInfluencers(userTypes) && onlyCompanies(userTypes);
}