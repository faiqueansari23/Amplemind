const API_BASE_URL = 'https://qaswatechnologies.com/anti_theft/public/api/';

const API_ENDPOINTS = {

  LOGIN: `${API_BASE_URL}login`,
  SIGNUP: `${API_BASE_URL}signup`,
 
  // niche wali get API hai isiliye end point par user_id dena zruri hai
  USER: (userId) => `${API_BASE_URL}user?user_id=${userId}`,
  UPDATECONTACT: (userId) => `${API_BASE_URL}update_contact/${userId}`,
  LOGOUT: (userId) => `${API_BASE_URL}logout/${userId}`,
  FETCHING_CONTACT: (userId) => `${API_BASE_URL}fetching_contact?user_id=${userId}`,
};

export default API_ENDPOINTS;