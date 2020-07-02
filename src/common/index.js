export const truncateText = (text, count) => {
	if (text && typeof text === 'string' && text.trim().length > 0) {
		if (text.trim().length > count) {
			return text.slice(0, count) + '...';
		}
	}

	return text;
}
