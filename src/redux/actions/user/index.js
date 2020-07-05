import {
	FETCH_USER,
	UPDATE_USER,
	FETCH_ALL_ADMINS,
	UPDATE_ADMIN,
	DELETE_ADMIN,
	ADD_ADMIN,
} from "../../types/user";

export const fetchUserAction = () => ({
	type: FETCH_USER
})

export const updateUserAction = (userData) => ({
	type: UPDATE_USER,
	payload: userData
})

export const fetchAllAdminsAction = () => ({
	type: FETCH_ALL_ADMINS,
})

export const updateAdminAction = (admin) => ({
	type: UPDATE_ADMIN,
	payload: admin,
})

export const deleteAdminAction = (admin) => ({
	type: DELETE_ADMIN,
	payload: admin,
})

export const addAdminAction = (admin) => ({
	type: ADD_ADMIN,
	payload: admin,
})
