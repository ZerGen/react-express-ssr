import { matchRoutes, renderRoutes } from 'react-router-config'
import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'
import { getStore } from '../../src/store'
import routes from '../../src/router/config'

const render = function (res, store, req, context) {
    const content = renderToString((
        <Provider store={store}>
            <StaticRouter context={context}
                location={req.path}
            >
                <div>
                    {/* {routes.map(route => (
                        <Route key={route.key}
                            {...route}
                        />
                    ))} */}
                    {renderRoutes(routes)}
                </div>
            </StaticRouter>
        </Provider>
    ))
    const cssStr = context.css.length ? context.css.join('\n') : ''
    console.log(cssStr, 'cssStr')
    const renderData = {
        title: '',
        description: '',
        key: '',
        content,
        cssStr,
        state: JSON.stringify(store.getState())
    }
    res.render('index', renderData)
}

const routeHandler = function (req, res, next){
    const store = getStore(req)

    // 根据路由的路径 往store里面塞数据
    const matchedRoutes = matchRoutes(routes, req.path)
    // 让matchedRoutes里面所有的组件对应的loadData方法都执行一次
    const promises = []
    matchedRoutes.forEach(item => {
        if(item.route.loadData) {
            // 让所有组件的Promise 请求都外包一层promise
            // 防止接口速度慢而导致的内容显示不一致的 bug
            const promise = new Promise( resolve => {
                item.route.loadData(store).then(resolve).catch(resolve)
            })
            promises.push(promise)
        }
    })
    Promise.all(promises).then(() => {
        const context = {
            css: []
        }

        if(context.NOT_FOUND) {
            res.status(404)
            render(res, store, req, context)
        }else {
            render(res, store, req, context)
        }
        next()
    })
}

export default routeHandler