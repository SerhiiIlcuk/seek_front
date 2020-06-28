export const extractErrorMessage = (entity) => {
	if (entity && entity.length > 0) {
		if (entity[0].hasOwnProperty('constraints')) {
			const keys = Object.keys(entity[0]['constraints']);
			if (keys.length > 0) {
				return entity[0]['constraints'][keys[0]];
			}
		}
	}

	return entity;
}
