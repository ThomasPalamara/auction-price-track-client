/* eslint-disable import/prefer-default-export */
export const setItemLanguage = (language = 'en') => ({
  type: 'SET_ITEM_LANGUAGE',
  language,
});
