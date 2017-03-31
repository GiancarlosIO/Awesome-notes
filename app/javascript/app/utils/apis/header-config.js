// clean all values headers
export const resetAuthApiHeaderConfig = () => {
  localStorage.removeItem('session');
}

// set values to headers
export const setAuthApiHeaderConfig = (headerConfig) => {
  const authApiHeaderConfig = {};
  authApiHeaderConfig["access-token"] = headerConfig["access-token"];
  authApiHeaderConfig["client"] = headerConfig.client;
  authApiHeaderConfig["uid"] = headerConfig.uid;
  authApiHeaderConfig["expiry"] = headerConfig.expiry;
  localStorage.setItem('session', JSON.stringify(authApiHeaderConfig));
}

// get authApiHeader
export const getAuthApiHeaderConfig = () => (JSON.parse(localStorage.getItem('session')));

const HeaderConfig = {
  resetAuthApiHeaderConfig,
  setAuthApiHeaderConfig,
  getAuthApiHeaderConfig
}
export default HeaderConfig;