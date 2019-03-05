export default (list, { text, profession, isCustom }) => (
  list.filter((item) => {
    // const textMatch = item.description.toLowerCase().includes(text.toLowerCase());
    const professionMatch = profession !== 'all' ? item.professions.indexOf(profession) !== -1 : true;
    const isCustomMatch = item.isCustom === isCustom;
    return isCustomMatch && professionMatch;
  })
);
