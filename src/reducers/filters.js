const filtersReducerDefaultState = {
	text: '',
	profession: 'all',
};

export default (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_ITEM_TEXT_FILTER':
			return {
				...state,
				text: action.text,
			};
		case 'SET_ITEM_PROFESSION_FILTER':
			return {
				...state, profession: action.profession
			};
		default:
			return state;
	}
}