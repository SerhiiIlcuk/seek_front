import { produce } from "immer";
import {types} from "../../types/news";

const initialState = {
	allNews: undefined,
	news: undefined,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.ALL_NEWS_RESULT:
			return produce(state, draft => {
				draft.allNews = action.payload;
			});
		case types.NEWS_RESULT:
			return produce(state, draft => {
				draft.news = action.payload;
			});
		default:
			return state
	}
};
