import get from "lodash/get"

export const getAllNews = (state) => {
	return get(state, "news.allNews");
};
