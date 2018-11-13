export const setTextFilter = (text = '') => ({
    type: 'SET_EXT_FILTER',
    text
})

export const setProfessionFilter = (profession = 'all') => ({
    type: 'SET_PROFESSION_FILTER',
    profession
})

export const setisCustomFilter = (isCustom = false) => ({
    type: 'SET_IS_CUSTOM_FILTER',
    isCustom
})