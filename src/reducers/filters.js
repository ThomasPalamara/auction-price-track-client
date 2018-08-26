export default (state = { text: '' }, action) => {
	switch (action.type) {
		case 'SET_ITEM_TEXT_FILTER':
			return {text: action.text};
		default:
			return state;
	}
}