import {
   makeGetRequest,
   makePostRequest,
   makePutRequest,
} from "./http-service";
import config from "../config/index";
import {endPoints} from "../config/end-points";

/**
 * auth
 * @param {object} data email and password
 */
export const login = (data) => {
   return new Promise((resolve, reject) => {
	  makePostRequest(config.baseUrl + endPoints.login, false, data)
		 .then(res => {
			resolve(res);
		 })
		 .catch(e => {
			console.log("API call error: ", e);
			reject(e);
		 });
   });
};

/**
 * register
 * @param {object} data email and password
 */
export const register = (data) => {
   return new Promise((resolve, reject) => {
	  makePostRequest(config.baseUrl + endPoints.register, false, data)
		 .then(res => {
			resolve(res);
		 })
		 .catch(e => {
			console.log("API call error: ", e);
			reject(e);
		 });
   });
};

/**
 * fotgotPassword
 * @param {*} param0 email
 */
export const fotgotPassword = ({email}) => {
   return new Promise((resolve, reject) => {
	  makePostRequest(config.baseUrl + endPoints.forgotPassword, false, {
		 username: email
	  })
		 .then(res => {
			resolve(res);
		 })
		 .catch(e => {
			console.log("API call error: ", e);
			reject(e);
		 });
   });
};

/**
 * @description getUserDetails - to get the details by token
 */
export const getUserDetails = () => {
   return new Promise((resolve, reject) => {
	  makeGetRequest(config.baseUrl + endPoints.userLoad, true)
		 .then(res => {
			resolve(res);
		 })
		 .catch(e => {
			console.log("API call error: ", e);
			reject(e);
		 });
   });
};


/**
 * updateUser - to update the user details
 * @param {object} data information to be updated with
 */
export const updateUser = (data) => {
   return new Promise((resolve, reject) => {
	  makePutRequest(config.baseUrl + endPoints.userUpdate, true, data)
		 .then(res => {
			resolve(res);
		 })
		 .catch(e => {
			console.log("API call error: ", e);
			reject(e);
		 });
   });
};

/**
 * @description create company
 */
export const createCompany = (data) => {
   return new Promise((resolve, reject) => {
	  makePostRequest(config.baseUrl + endPoints.createCompany, true, data)
		 .then(res => {
			resolve(res);
		 })
		 .catch(e => {
			console.log("API call error: ", e);
			reject(e);
		 });
   });
};

/**
 * @description upload image
 */
export const uploadImage = (data) => {
   return new Promise((resolve, reject) => {
	  makePostRequest(config.baseUrl + endPoints.uploadImage, true, data)
		 .then(res => {
			resolve(res);
		 })
		 .catch(e => {
			console.log("API call error: ", e);
			reject(e);
		 });
   });
};

/**
 * @description update company
 */
export const updateCompany = (data, companyId) => {
   return new Promise((resolve, reject) => {
	  makePutRequest(config.baseUrl + endPoints.updateCompany + companyId, true, data)
		 .then(res => {
			resolve(res);
		 })
		 .catch(e => {
			console.log("API call error: ", e);
			reject(e);
		 });
   });
};

/**
 * @description getCompanyDetails - to get the details of company by user token
 */
export const getCompanyDetails = (companyId) => {
   return new Promise((resolve, reject) => {
	  makeGetRequest(config.baseUrl + endPoints.companyLoad + companyId, true)
		 .then(res => {
			resolve(res);
		 })
		 .catch(e => {
			console.log("API call error: ", e);
			reject(e);
		 });
   });
};
