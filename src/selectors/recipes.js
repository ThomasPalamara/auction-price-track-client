export default (list, { text, profession, isCustom}) => {
	console.log(list);
	return list.filter((item) => {
		// const textMatch = item.description.toLowerCase().includes(text.toLowerCase());
        const professionMatch = profession !== 'all' ? item.professions.indexOf(profession) != -1 : true ;
        const isCustomMatch = item.isCustom ? item.isCustom === isCustom : false === isCustom;
		return isCustomMatch && professionMatch;
	});
};
