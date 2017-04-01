// clean all values headers
export const resetAuthApiHeaderConfig = () => {
  localStorage.removeItem('session');
  localStorage.removeItem('user');
}

// set values to headers
export const setAuthApiHeaderConfig = (headerConfig, userData) => {
  const authApiHeaderConfig = {};
  authApiHeaderConfig["access-token"] = headerConfig["access-token"];
  authApiHeaderConfig["client"] = headerConfig.client;
  authApiHeaderConfig["uid"] = headerConfig.uid;
  authApiHeaderConfig["expiry"] = headerConfig.expiry;
  localStorage.setItem('session', JSON.stringify(authApiHeaderConfig));
  localStorage.setItem('user', JSON.stringify(userData));
}

// get authApiHeader
export const getAuthApiHeaderConfig = () => (JSON.parse(localStorage.getItem('session')));

export const verifyExpiryAccessToken = () => {
  const session = getAuthApiHeaderConfig();
  const dateNow = new Date();
  const dateExpiry = new Date (parseInt(session['expiry'], 10) * 1000);
  // convert ruby time (seconds) to js time (millis) and compare with the current date
  return dateExpiry > dateNow || null;
}


const HeaderConfig = {
  resetAuthApiHeaderConfig,
  setAuthApiHeaderConfig,
  getAuthApiHeaderConfig
}
export default HeaderConfig;