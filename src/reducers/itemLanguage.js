export default (state = { itemLanguage: 'en' }, action) => {
	switch (action.type) {
		case 'SET_ITEM_LANGUAGE':
			return action.language;
		default:
			return state;
	}
}