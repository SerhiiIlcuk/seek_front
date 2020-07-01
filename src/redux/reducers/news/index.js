import { produce } from "immer";
import {types} from "../../types/news";

const initialState = {
	allNews: undefined,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case types.ALL_NEWS_RESULT:
			return produce(state, draft => {
				draft.allNews = action.payload;
			});
		default:
			return state
	}
};
