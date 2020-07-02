import {types}  from "../../types/news";

export const createNewsAction = (news) => ({
	type: types.CREATE_NEWS,
	payload: {
		news
	}
})

export const fetchAllNewsAction = () => ({
	type: types.FETCH_ALL_NEWS,
})

export const deleteNewsAction = (id) => ({
	type: types.DELETE_NEWS,
	payload: {
		id
	}
})

export const fetchNewsAction = (id) => ({
	type: types.FETCH_NEWS,
	payload: {
		id
	}
})

export const updateNewsAction = (news) => ({
	type: types.UPDATE_NEWS,
	payload: {
		news
	}
})
