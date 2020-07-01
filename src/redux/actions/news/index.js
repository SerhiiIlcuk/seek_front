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
