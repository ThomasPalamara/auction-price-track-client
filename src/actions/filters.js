export const setTextFilter = (text = '') => ({
    type: 'SET_ITEM_TEXT_FILTER',
    text
})

export const setProfessionFilter = (profession = 'all') => ({
    type: 'SET_ITEM_PROFESSION_FILTER',
    profession
})

export const setisCustomFilter = (isCustom = false) => ({
    type: 'SET_ITEM_IS_CUSTOM_FILTER',
    isCustom
})