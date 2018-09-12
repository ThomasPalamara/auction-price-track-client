export const setTextFilter = (text = '') => ({
    type: 'SET_ITEM_TEXT_FILTER',
    text
})

export const setProfessionFilter = (profession = 'all') => ({
    type: 'SET_ITEM_PROFESSION_FILTER',
    profession
})