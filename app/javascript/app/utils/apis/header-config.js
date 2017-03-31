let authApiHeaderConfig = {
  "Content-Type": "application/json",
  "access-token": undefined,
  "client": undefined,
  "uid": undefined,
  "token-type": "Bearer",
  "expiry": undefined
}

// clean all values headers
export const resetAuthApiHeaderConfig = () => {
  authApiHeaderConfig["access-token"] = undefined;
  authApiHeaderConfig["client"] = undefined;
  authApiHeaderConfig["uid"] = undefined;
  authApiHeaderConfig["expiry"] = undefined;
}

// set values to headers
export const setAuthApiHeaderConfig = (headerConfig) => {
  authApiHeaderConfig["access-token"] = headerConfig["access-token"];
  authApiHeaderConfig["client"] = headerConfig.client;
  authApiHeaderConfig["uid"] = headerConfig.uid;
  authApiHeaderConfig["expiry"] = headerConfig.expiry;
}

// get authApiHeader
export const getAuthApiHeaderConfig = () => (authApiHeaderConfig);

const HeaderConfig = {
  resetAuthApiHeaderConfig,
  setAuthApiHeaderConfig,
  getAuthApiHeaderConfig
}
export default HeaderConfig;