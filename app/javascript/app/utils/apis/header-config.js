let authApiHeaderConfig = {
  "Content-Type": "application/json",
  "access-token": undefined,
  "client": undefined,
  "uid": undefined,
  "token-type": "Bearer",
  "expiry": undefined
}

// clean all values headers
const resetAuthApiHeaderConfig = () => {
  authApiHeaderConfig["access-token"] = undefined;
  authApiHeaderConfig["client"] = undefined;
  authApiHeaderConfig["uid"] = undefined;
  authApiHeaderConfig["expiry"] = undefined;
}

// set values to headers
const setAuthApiHeaderConfig = (headerConfig) => {
  authApiHeaderConfig["access-token"] = headerConfig["access-token"];
  authApiHeaderConfig["client"] = headerConfig.client;
  authApiHeaderConfig["uid"] = headerConfig.uid;
  authApiHeaderConfig["expiry"] = headerConfig.expiry;
}

// get authApiHeader
const getAuthApiHeaderConfig = () => (authApiHeader);