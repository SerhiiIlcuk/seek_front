import {types}  from "../../types/news";

export const createNewsAction = (news) => ({
	type: types.CREATE_NEWS,
	payload: {
		news
	}
})
