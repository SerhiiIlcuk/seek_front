import get from "lodash/get"

export const getAllNews = (state) => {
	return get(state, "news.allNews");
};

export const getNews = (state) => {
	return get(state, "news.news");
};
