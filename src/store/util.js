export const UpdateObject = (oldObject, newValues) => Object.assign({}, oldObject, newValues);

export const UpdateObjectInArray = (oldArray, itemId, callback) => {
	return oldArray.map(item => {
		if (item.id !== itemId) {
			return item;
		}
		return callback(item);
	});
};
