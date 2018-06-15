import {DELETE_ARTICLE, UPDATE_ITEM_UNITS} from './../constants'

export function deleteArticle(id) {
    return{
        type: DELETE_ARTICLE,
        payload: { id }
    }
}

export function updateItemUnits({id, units}) {
    return {
        type: UPDATE_ITEM_UNITS,
        payload: {id, units}
    }
}