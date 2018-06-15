import { articles as defaultArticles } from './../fixtures'
import {DELETE_ARTICLE, UPDATE_ITEM_UNITS} from './../constants'

export default (articleState = defaultArticles, action) => {
	const {type} = action

    switch(type){
        case DELETE_ARTICLE: 
        		let indexToDel = findProductIndex(articleState, action.payload.id)
            return [...articleState.slice(0, indexToDel), ...articleState.slice(indexToDel+1)]

      	 case UPDATE_ITEM_UNITS:
            let existingItemIndex = findProductIndex(articleState, action.payload.id);
            if (articleState[existingItemIndex].units === 1 && action.payload.units === -1) {
                break;
            }
            articleState[existingItemIndex].units += action.payload.units
            return articleState.concat([])

        
    }

    function findProductIndex(products, id) {
        return products.findIndex((p) => p.id === id)
    }

    return articleState
}