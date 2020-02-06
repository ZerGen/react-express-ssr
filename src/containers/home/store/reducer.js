import { CHANGE_LIST } from './constants'

const defaultState = {
    newList: []
}

export default (state = defaultState, action) => {
    switch(action.type) {
        case CHANGE_LIST:
            return {
                ...state,
                newList: action.list
            }
        default :
            return state;
    }
}