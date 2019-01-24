import React from "react";
import { Checkbox } from "antd";
import WHLink from "../WHLink";


const Recipe = (props) => (
    <Checkbox.Group style={{ width: '100%' }} onChange={props.handler}>
        <Checkbox value="recipe">Recipe</Checkbox>
        {
            props.recipe.craft &&
            <ul className="craft">
                <li>Craft: </li>
                <li>
                    <Checkbox value={props.recipe.craft.blizzardId}><WHLink {...props.recipe.craft} /></Checkbox>
                </li>
            </ul>
        }
        <ul className="reagent">
            <li>Reagents: </li>
            {props.recipe.reagents.map((reagent, i) => (
                <li key={i}><Checkbox value={reagent.blizzardId}><WHLink {...reagent} /></Checkbox></li>
            ))}

        </ul>
    </Checkbox.Group>
);

export default Recipe;