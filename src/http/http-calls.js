import {
   makeGetRequest,
   makePostRequest,
   makePutRequest,
   makeDeleteRequest,
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
 *@description updateUser - to update the user details
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
 * @description fetch all admins
 */
export const fetchAllAdmins = () => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endPoints.fetchAllAdmins, true)
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
 *@description updateAdmin - to update the admin roles
 * @param {object} data information to be updated with
 */
export const updateAdmin = (data) => {
	return new Promise((resolve, reject) => {
		makePutRequest(config.baseUrl + endPoints.updateAdmin, true, data)
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
 *@description deleteAdmin - to delete admin user
 * @param {object} data information to be updated with
 */
export const deleteAdmin = (data) => {
	return new Promise((resolve, reject) => {
		makeDeleteRequest(config.baseUrl + endPoints.deleteAdmin, true, data)
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
 * @description admin creates company
 */
export const adminCreateCompany = (data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endPoints.adminCreateCompany, true, data)
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
 * @description publish company
 */
export const publishCompany = (companyId) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endPoints.publishCompany + companyId, true)
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
 * @description un publish company
 */
export const unPublishCompany = (companyId) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endPoints.unPublishCompany + companyId, true)
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
 * @description update employee of company (specially update roles)
 */
export const updateEmployee = (data) => {
   return new Promise((resolve, reject) => {
	  makePutRequest(config.baseUrl + endPoints.updateEmployee, true, data)
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
 * @description update employee of company (specially update roles)
 */
export const deleteEmployee = (data) => {
   return new Promise((resolve, reject) => {
	  makeDeleteRequest(config.baseUrl + endPoints.deleteEmployee, true, data)
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

/**
 * @description fetch all companies
 * @return {Promise<unknown>}
 */
export const fetchAllCompanies = () => {
   return new Promise((resolve, reject) => {
	  makeGetRequest(config.baseUrl + endPoints.fetchAllCompanies, false)
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
 * @description fetch verified companies
 * @return {Promise<unknown>}
 */
export const fetchVerifiedCompanies = () => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endPoints.fetchVerifiedCompanies, false)
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
 * @description fetch all company Types
 * @return {Promise<unknown>}
 */
export const fetchAllCompanyTypes = () => {
   return new Promise((resolve, reject) => {
	  makeGetRequest(config.baseUrl + endPoints.fetchAllCompanyTypes, false)
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
 * @description upload resume file
 * @param formData
 */
export const uploadFile = async (formData) => {
   const res = await fetch(config.baseUrl + endPoints.uploadFile, {
	  method: 'POST',
	  headers: {
		 'x-token': localStorage.getItem('token'),
	  },
	  body: formData
   }).then(res => {
	  return res.json();
   }).catch(err => {
	  console.log(err);
   });

   return res;
}

/**
 * @description create job
 */
export const createJob = (data) => {
   return new Promise((resolve, reject) => {
	  makePostRequest(config.baseUrl + endPoints.createJob, true, data)
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
 * @description update job
 */
export const updateJob = (data) => {
   return new Promise((resolve, reject) => {
	  makePutRequest(config.baseUrl + endPoints.createJob, true, data)
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
 * @description apply to job
 */
export const applyToJob = (data) => {
   return new Promise((resolve, reject) => {
	  makePostRequest(config.baseUrl + endPoints.applyJob, true, data)
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
 * @description fetch job by id
 * @param id
 * @return {Promise<unknown>}
 */
export const fetchJob = (id) => {
   return new Promise((resolve, reject) => {
	  makeGetRequest(config.baseUrl + endPoints.fetchJob + id, true)
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
 * @description fetch all jobs published
 */
export const fetchAllJobs = () => {
   return new Promise((resolve, reject) => {
	  makeGetRequest(config.baseUrl + endPoints.fetchAllJobs, false)
		 .then(res => {
			resolve(res);
		 })
		 .catch(e => {
			console.log("API call error: ", e);
			reject(e);
		 });
   });
}

/**
 * @description fetch jobs created by employee (me)
 */
export const fetchEmployeeJobs = () => {
   return new Promise((resolve, reject) => {
	  makeGetRequest(config.baseUrl + endPoints.fetchEmployeeJobs, true)
		 .then(res => {
			resolve(res);
		 })
		 .catch(e => {
			console.log("API call error: ", e);
			reject(e);
		 });
   });
}

export const fetchCompanyJobs = (companyId) => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endPoints.fetchCompanyJobs + "/" + companyId, false)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				console.log("API call error: ", e);
				reject(e);
			});
	});
};

export const updateJobSettings = (settings) => {
   return new Promise((resolve, reject) => {
	  makePostRequest(config.baseUrl + endPoints.updateJobSettings, true, settings)
		 .then(res => {
			resolve(res);
		 })
		 .catch(e => {
			console.log("API call error: ", e);
			reject(e);
		 });
   });
}

/**
 * @description fetch all skills
 * @return {Promise<unknown>}
 */
export const fetchAllSkills = () => {
   return new Promise((resolve, reject) => {
	  makeGetRequest(config.baseUrl + endPoints.fetchAllSkills, false)
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
 * @description fetch all professions
 * @return {Promise<unknown>}
 */
export const fetchAllProfessions = () => {
   return new Promise((resolve, reject) => {
	  makeGetRequest(config.baseUrl + endPoints.fetchAllProfessions, false)
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
 * @description fetch all job locations
 * @return {Promise<unknown>}
 */
export const fetchAllJobLocations = () => {
   return new Promise((resolve, reject) => {
	  makeGetRequest(config.baseUrl + endPoints.fetchAllJobLocations, false)
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
 * @description fetch all job categories
 * @return {Promise<unknown>}
 */
export const fetchAllJobCategories = () => {
   return new Promise((resolve, reject) => {
	  makeGetRequest(config.baseUrl + endPoints.fetchAllJobCategories, false)
		 .then(res => {
			resolve(res);
		 })
		 .catch(e => {
			console.log("API call error: ", e);
			reject(e);
		 });
   });
};

export const createNews = (data) => {
	return new Promise((resolve, reject) => {
		makePostRequest(config.baseUrl + endPoints.createNews, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				console.log("API call error: ", e);
				reject(e);
			});
	});
}

export const updateNews = (data) => {
	const newsId = data._id;
	return new Promise((resolve, reject) => {
		makePutRequest(config.baseUrl + endPoints.updateNews + "/" + newsId, true, data)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				console.log("API call error: ", e);
				reject(e);
			});
	});
}

export const fetchAllNews = () => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endPoints.fetchAllNews, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				console.log("API call error: ", e);
				reject(e);
			});
	});
}

export const fetchNews = (id) => {
	return new Promise((resolve, reject) => {
		makeGetRequest(config.baseUrl + endPoints.fetchNews + "/" + id, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				console.log("API call error: ", e);
				reject(e);
			});
	});
}

export const deleteNews = (id) => {
	return new Promise((resolve, reject) => {
		makeDeleteRequest(config.baseUrl + endPoints.deleteNews + "/" + id, true)
			.then(res => {
				resolve(res);
			})
			.catch(e => {
				console.log("API call error: ", e);
				reject(e);
			});
	});
}
