import { addRecipes } from "../../actions/recipes";

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
    const action = addRecipes(recipe);
    
    expect(action).toEqual({
        type: "ADD_RECIPES",
        recipes: {
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

test('should add default recipe', () => {

    const action = addRecipes();

    expect(action).toEqual({
        type: "ADD_RECIPES",
        recipes: {
            "professions": [""],
            "type": "",
            "craft": {
                "blizzardId": 0,
                "quantity": 1
            },
            "reagents": [{
                "blizzardId": 0,
                "quantity": 0
            }, {
                "blizzardId": 1,
                "quantity": 0
            }]
        }
    })
});