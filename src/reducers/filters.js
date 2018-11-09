const filtersReducerDefaultState = {
	text: '',
	profession: 'all',
	isCustom: false,
};

export default (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_ITEM_TEXT_FILTER':
			return {
				...state, text: action.text
			};
		case 'SET_ITEM_PROFESSION_FILTER':
			return {
				...state, profession: action.profession
			};
		case 'SET_ITEM_IS_CUSTOM_FILTER':
			return {
				...state, isCustom: action.isCustom
			};
		default:
			return state;
	}
}