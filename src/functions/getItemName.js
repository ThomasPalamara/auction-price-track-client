
let itemsJSON = {};

export default (id, language = '') =>{
        if(isEmpty(itemsJSON)){
            initItemsNameJSON(() => console.log('done'))
        }else{
            return itemsJSON.find((item) => item.blizzardId === id).name
        }
}

export function initItemsNameJSON(_callback = () => {}){
    fetch(`/api/items`)
    .then(res => res.json())
    .then(response => {
        itemsJSON = response;
        _callback();
    });
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}