import { addRecipe } from "../../actions/shoppingList";

test('should add recipe', () => {
    const recipe = {
        "professions": ["alchemy"],
        "type": "flask",
        "craft": {
            "blizzardId": 152641,
            "quantity": 1
        },
        "reagents": [{
            "blizzardId": 152510,
            "quantity": 5
        }, {
            "blizzardId": 152507,
            "quantity": 10
        }, {
            "blizzardId": 152509,
            "quantity": 15
        }]
    }
    const action = addRecipe(recipe);
    expect(action).toEqual({
        type: "ADD_RECIPE",
        recipe: {
            "professions": ["alchemy"],
            "type": "flask",
            "craft": {
                "blizzardId": 152641,
                "quantity": 1
            },
            "reagents": [{
                "blizzardId": 152510,
                "quantity": 5
            }, {
                "blizzardId": 152507,
                "quantity": 10
            }, {
                "blizzardId": 152509,
                "quantity": 15
            }]
        }
    })
});