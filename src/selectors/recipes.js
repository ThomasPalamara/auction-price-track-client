export default (list, { text, profession, isCustom }) => (
  list.filter((item) => {
    console.log(item);
    const textCraftMatch = item.craft.name.toLowerCase().includes(text.toLowerCase());
    const textReagentMatch = item.reagents.some(reagent => reagent.name.toLowerCase().includes(text.toLowerCase()));
    const professionMatch = profession !== 'all' ? item.professions.includes(profession) : true;
    const isCustomMatch = item.isCustom === isCustom;
    return isCustomMatch && professionMatch && (textReagentMatch || textCraftMatch);
  })
);
