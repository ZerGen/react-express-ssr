import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reducer as homeReducer } from '../../src/containers/home/store'
import clientAxios from '../../client/request'
import serverAxios from '../../server/request'


const reducer = combineReducers({
    home: homeReducer
})

export const getStore = req => {
    // 改变服务器端的store 那么就使用serverAxios serverAxios(req)
    return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios(req))))
}

export const getClientStore = () => {
    const defaultState = window.context && window.context.state || {};
    // 改变客户端store的内容 一定要使用clientAxios
    return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}