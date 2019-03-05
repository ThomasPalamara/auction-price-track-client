import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import WHLink from '../WHLink';
import { recipePropTypes } from '../../constants';


const Recipe = ({ recipe, handler }) => (
  <Checkbox.Group style={{ width: '100%' }} onChange={handler}>
    <Checkbox value="recipe">Recipe</Checkbox>
    {
      recipe.craft
      && (
        <ul className="craft">
          <li>Craft: </li>
          <li>
            <Checkbox value={recipe.craft.blizzardId}><WHLink {...recipe.craft} /></Checkbox>
          </li>
        </ul>
      )
    }
    <ul className="reagent">
      <li>Reagents: </li>
      {recipe.reagents.map(reagent => (
        <li key={reagent.blizzardId}>
          <Checkbox value={reagent.blizzardId}><WHLink {...reagent} /></Checkbox>
        </li>
      ))}

    </ul>
  </Checkbox.Group>
);

Recipe.propTypes = {
  handler: PropTypes.func.isRequired,
  recipe: recipePropTypes.isRequired,
};


export default Recipe;


// <Checkbox.Group style={{ width: '100%' }} onChange={handler}>
// <Checkbox value="recipe">Recipe</Checkbox>
// {
//     recipe.craft &&
//     <ul className="craft">
//         <li>Craft: </li>
//         <li>
//             <Checkbox value={{id:recipe.craft.blizzardId,name:recipe.craft.name}}>
// <WHLink {...recipe.craft} /></Checkbox>
//         </li>
//     </ul>
// }
// <ul className="reagent">
//     <li>Reagents: </li>
//     {recipe.reagents.map((reagent, i) => (
//         <li key={i}><Checkbox value={{id:reagent.blizzardId,name:reagent.name}}>
// <WHLink {...reagent} /></Checkbox></li>
//     ))}

// </ul>
// </Checkbox.Group>
